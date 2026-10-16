import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function secureMatch(actual: string, expected: string) {
  const first = Buffer.from(actual);
  const second = Buffer.from(expected);
  return first.length === second.length && timingSafeEqual(first, second);
}

export function createSession(
  secret: string,
  expiresAt = Date.now() + 8 * 3600000,
) {
  const payload = Buffer.from(
    JSON.stringify({ expiresAt, nonce: randomBytes(16).toString("hex") }),
  ).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return payload + "." + signature;
}

export function validSession(value: string, secret: string) {
  if (secret.length < 32) return false;
  try {
    const parts = value.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
    const signature = createHmac("sha256", secret)
      .update(parts[0])
      .digest("base64url");
    if (!secureMatch(parts[1], signature)) return false;
    const payload = JSON.parse(Buffer.from(parts[0], "base64url").toString());
    return (
      typeof payload.expiresAt === "number" &&
      Number.isFinite(payload.expiresAt) &&
      payload.expiresAt > Date.now() &&
      typeof payload.nonce === "string"
    );
  } catch {
    return false;
  }
}
