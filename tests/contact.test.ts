import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import { POST } from "@/app/api/contact/route";
import { rateLimit } from "@/lib/rate-limit";
vi.mock("@/lib/rate-limit", () => ({ rateLimit: vi.fn(async () => true) }));
const origin = "https://betarog.example";
const valid = () => ({
  name: "Test Visitor",
  email: "visitor@example.com",
  projectType: "Web Development",
  budget: "Let’s discuss",
  message: "This is a synthetic test inquiry, not a real customer message.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
  submissionId: randomUUID(),
  turnstileToken: "synthetic-token",
});
const request = (
  body: unknown = valid(),
  headers: Record<string, string> = {},
) =>
  new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: { origin, "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
function configured() {
  vi.stubEnv("CONTACT_ENABLED", "true");
  vi.stubEnv("RESEND_API_KEY", "test-only");
  vi.stubEnv("CONTACT_FROM_EMAIL", "form@example.com");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-only");
  vi.stubEnv("RATE_LIMIT_SECRET", "test-only-secret");
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-only");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "test-only");
}
beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", origin);
  vi.stubEnv("CONTACT_ENABLED", "false");
  vi.mocked(rateLimit).mockResolvedValue(true);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});
describe("contact request boundary", () => {
  it("rejects a different origin", async () => {
    expect(
      (await POST(request(valid(), { origin: "https://untrusted.example" })))
        .status,
    ).toBe(403);
  });
  it("rejects missing origins", async () => {
    const req = request();
    req.headers.delete("origin");
    expect((await POST(req)).status).toBe(403);
  });
  it("requires JSON", async () => {
    expect(
      (await POST(request(valid(), { "content-type": "text/plain" }))).status,
    ).toBe(415);
  });
  it("rejects malformed JSON", async () => {
    expect((await POST(request("{invalid"))).status).toBe(400);
  });
  it("limits streamed bodies even without content-length", async () => {
    expect(
      (await POST(request(JSON.stringify({ message: "x".repeat(17000) }))))
        .status,
    ).toBe(413);
  });
  it("returns field errors for invalid email and missing consent", async () => {
    const res = await POST(
      request({ ...valid(), email: "invalid", consent: false }),
    );
    expect(res.status).toBe(400);
    const payload = await res.json();
    expect(payload.errors.email).toBeDefined();
    expect(payload.errors.consent).toBeDefined();
  });
  it("rejects header-injection characters in names", async () => {
    expect(
      (
        await POST(
          request({ ...valid(), name: "Name\r\nBcc: other@example.com" }),
        )
      ).status,
    ).toBe(400);
  });
  it("rejects honeypot submissions without claiming delivery", async () => {
    const res = await POST(request({ ...valid(), website: "spam" }));
    expect(res.status).toBe(400);
    expect((await res.json()).message).not.toMatch(/accepted|sent/i);
  });
  it("rejects too-fast and expired submissions", async () => {
    expect(
      (await POST(request({ ...valid(), startedAt: Date.now() }))).status,
    ).toBe(400);
    expect(
      (await POST(request({ ...valid(), startedAt: Date.now() - 90_000_000 })))
        .status,
    ).toBe(400);
  });
  it("does not send or claim success when unconfigured", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    const res = await POST(request());
    expect(res.status).toBe(503);
    expect((await res.json()).message).toContain("not been sent");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("fails closed in production without distributed protection", async () => {
    configured();
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    expect((await POST(request())).status).toBe(503);
  });
});
describe("configured delivery using mocked providers only", () => {
  beforeEach(configured);
  it("enforces the rate limit before contacting the email provider", async () => {
    vi.mocked(rateLimit).mockResolvedValue(false);
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    const res = await POST(request());
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("900");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("fails closed when the rate limiter is unavailable", async () => {
    vi.mocked(rateLimit).mockRejectedValue(new Error("offline"));
    expect((await POST(request())).status).toBe(503);
  });
  it("requires a challenge token", async () => {
    expect(
      (await POST(request({ ...valid(), turnstileToken: "" }))).status,
    ).toBe(400);
  });
  it("rejects unsuccessful and wrong-host challenge results", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          Response.json({
            success: true,
            hostname: "wrong.example",
            action: "contact",
          }),
        ),
    );
    expect((await POST(request())).status).toBe(400);
  });
  it("does not claim success when the email provider rejects", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "betarog.example",
          action: "contact",
        }),
      )
      .mockResolvedValueOnce(
        Response.json({ error: "test rejection" }, { status: 403 }),
      );
    vi.stubGlobal("fetch", fetcher);
    const res = await POST(request());
    expect(res.status).toBe(502);
    expect((await res.json()).message).toContain("could not accept");
  });
  it("only confirms acceptance after the provider returns an ID", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          success: true,
          hostname: "betarog.example",
          action: "contact",
        }),
      )
      .mockResolvedValueOnce(Response.json({ id: "mock-email-id" }));
    vi.stubGlobal("fetch", fetcher);
    const data = valid();
    const res = await POST(request(data));
    expect(res.status).toBe(200);
    expect((await res.json()).message).toContain("accepted for delivery");
    const emailCall = fetcher.mock.calls[1];
    const options = emailCall[1] as RequestInit;
    const email = JSON.parse(options.body as string);
    expect(email.reply_to).toBe(data.email);
    expect(email.to).toEqual(["owner@example.com"]);
    expect(email.html).toBeUndefined();
    expect((options.headers as Record<string, string>)["Idempotency-Key"]).toBe(
      `inquiry-${data.submissionId}`,
    );
  });
  it("handles network errors without claiming success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const res = await POST(request());
    expect(res.status).toBe(503);
    expect((await res.json()).message).toContain("could not confirm");
  });
});
