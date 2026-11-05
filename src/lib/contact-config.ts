export function contactConfigured() {
  const base =
    process.env.CONTACT_ENABLED === "true" &&
    Boolean(
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL,
    );
  if (process.env.NODE_ENV !== "production") return base;
  return (
    base &&
    Boolean(
      process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") &&
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN &&
      process.env.RATE_LIMIT_SECRET &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      process.env.TURNSTILE_SECRET_KEY,
    )
  );
}
