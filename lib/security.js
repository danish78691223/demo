import { NextResponse } from "next/server";

const buckets = globalThis.__webwhaleRateLimitBuckets || new Map();
globalThis.__webwhaleRateLimitBuckets = buckets;

export function getClientIp(request) {
  const forwarded = request?.headers?.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request?.headers?.get("x-real-ip") || "unknown";
}

export function rateLimit(request, key, limit, windowMs) {
  const now = Date.now();
  const ip = getClientIp(request);
  const bucketKey = `${key}:${ip}`;
  const current = buckets.get(bucketKey);

  if (!current || current.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  current.count += 1;
  return null;
}
