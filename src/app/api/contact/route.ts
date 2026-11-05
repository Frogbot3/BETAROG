import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { contactConfigured } from "@/lib/contact-config";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
const MAX_BYTES = 16_384;
function reply(
  status: number,
  message: string,
  headers?: Record<string, string>,
) {
  return NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error("too-large");
      }
      chunks.push(part.value);
    }
  } finally {
    reader.releaseLock();
  }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    all.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(all);
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Local production previews use explicit loopback origins when no public URL exists.
  // Never trust the request's Host header as an origin allowlist in production.
  const localOrigins =
    !process.env.VERCEL && !process.env.NEXT_PUBLIC_SITE_URL
      ? ["http://127.0.0.1:3000", "http://localhost:3000"]
      : [];
  const trusted = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.NODE_ENV !== "production"
      ? new URL(request.url).origin
      : undefined,
    ...localOrigins,
  ]
    .filter(Boolean)
    .map((value) => {
      try {
        return new URL(value!).origin;
      } catch {
        return "";
      }
    });
  if (!origin || !trusted.includes(origin))
    return reply(
      403,
      "This request could not be verified. Please reload the page.",
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply(415, "Please submit the inquiry through the form.");
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return reply(413, "Your inquiry is too long.");
  let body: unknown;
  try {
    body = JSON.parse(await readBody(request));
  } catch (error) {
    return reply(
      error instanceof Error && error.message === "too-large" ? 413 : 400,
      "Please check your inquiry and try again.",
    );
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Please check the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  const data = parsed.data;
  const age = Date.now() - data.startedAt;
  if (data.website || age < 2000 || age > 86_400_000)
    return reply(400, "Please reload the form and try again.");
  if (!contactConfigured())
    return reply(
      503,
      "Inquiry delivery is not connected yet. Your message has not been sent.",
    );
  try {
    // Vercel overwrites this header. Other production hosts share a conservative bucket
    // until their trusted-proxy IP handling is explicitly configured.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
      : process.env.NODE_ENV === "production"
        ? "shared"
        : "local";
    if (!(await rateLimit(ip)))
      return reply(
        429,
        "Please wait 15 minutes before sending another inquiry.",
        { "Retry-After": "900" },
      );
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken)
        return reply(400, "Please complete the security check.");
      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: data.turnstileToken,
          }),
          signal: AbortSignal.timeout(8000),
          cache: "no-store",
        },
      );
      if (!verification.ok)
        return reply(
          503,
          "The security check is unavailable. Please try again shortly.",
        );
      const result = (await verification.json()) as {
        success?: boolean;
        hostname?: string;
        action?: string;
      };
      if (
        !result.success ||
        result.action !== "contact" ||
        !trusted.some((url) => new URL(url).hostname === result.hostname)
      )
        return reply(
          400,
          "The security check expired or could not be verified. Please try again.",
        );
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry-${data.submissionId}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `BETAROG inquiry: ${data.projectType}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Project: ${data.projectType}`,
          `Budget: ${data.budget}`,
          "",
          data.message,
          "",
          `Reference: ${data.submissionId}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok)
      return reply(
        502,
        "The email service could not accept your inquiry. Your text is still here; please try again.",
      );
    const accepted = (await response.json()) as { id?: string };
    if (!accepted.id)
      return reply(502, "We could not confirm acceptance. Please try again.");
    return reply(
      200,
      "Your inquiry was accepted for delivery. Thank you for sharing your idea.",
    );
  } catch {
    return reply(
      503,
      "We could not confirm delivery. Please try again shortly; your text has been kept.",
    );
  }
}
