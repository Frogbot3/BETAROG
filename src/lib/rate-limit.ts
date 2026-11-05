import { createHmac } from "node:crypto";
const localBuckets = new Map<string, { count: number; expires: number }>();
const windowSeconds = 900;
const lua =
  "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return n";
export async function rateLimit(ip: string): Promise<boolean> {
  const hash = createHmac(
    "sha256",
    process.env.RATE_LIMIT_SECRET || "local-development-only",
  )
    .update(ip)
    .digest("hex");
  const key = `betarog:inquiry:${hash}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", lua, "1", key, String(windowSeconds)]),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Rate limiter unavailable");
    const payload = (await response.json()) as {
      result?: number;
      error?: string;
    };
    if (payload.error || typeof payload.result !== "number")
      throw new Error("Invalid rate limiter response");
    return payload.result <= 5;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Distributed rate limiter not configured");
  const now = Date.now();
  for (const [entryKey, value] of localBuckets)
    if (value.expires < now) localBuckets.delete(entryKey);
  const bucket = localBuckets.get(key) || {
    count: 0,
    expires: now + windowSeconds * 1000,
  };
  bucket.count += 1;
  localBuckets.set(key, bucket);
  return bucket.count <= 5;
}
