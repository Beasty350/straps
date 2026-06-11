// lib/rate-limit.ts
type RateLimitStore = Map<string, { count: number; resetAt: number }>;

const store: RateLimitStore = new Map();

/**
 * Simple sliding‑window rate limiter.
 * @param key - unique identifier (e.g. IP + endpoint)
 * @param limit - max requests per window
 * @param windowSeconds - time window in seconds
 * @returns { success: boolean, remaining: number, reset: number }
 */
export function checkRateLimit(key: string, limit: number, windowSeconds: number) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const record = store.get(key);

  if (!record || record.resetAt < now) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetAt };
  }

  record.count++;
  store.set(key, record);
  return { success: true, remaining: limit - record.count, reset: record.resetAt };
}