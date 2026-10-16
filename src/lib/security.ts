import { createHash, createHmac } from "node:crypto";
import "server-only";
import { database, ServiceError } from "./db";
export function originCheck(req: Request) {
  const origin = req.headers.get("origin");
  const expected = new URL(process.env.SITE_URL || req.url).origin;
  if (origin && origin !== expected)
    throw new ServiceError("Request origin is not allowed.", 403);
}
export async function body(req: Request) {
  if (Number(req.headers.get("content-length") || 0) > 12000)
    throw new ServiceError("Request too large.", 413);
  const text = await req.text();
  if (text.length > 12000) throw new ServiceError("Request too large.", 413);
  try {
    return JSON.parse(text);
  } catch {
    throw new ServiceError("Please send valid JSON.", 400);
  }
}
export function ipHash(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const secret = process.env.APP_SECRET;
  if (!secret) throw new ServiceError("Server secret is not configured.");
  return createHmac("sha256", secret).update(ip).digest("hex");
}
export async function rateLimit(req: Request, scope: string, max = 5) {
  const d = await database();
  const bucket = Math.floor(Date.now() / 3600000);
  const key = createHash("sha256")
    .update(scope + ipHash(req) + bucket)
    .digest("hex");
  const result = await d.collection("limits").findOneAndUpdate(
    { key },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date((bucket + 2) * 3600000) },
    },
    { upsert: true, returnDocument: "after" },
  );
  if ((result?.count || 0) > max)
    throw new ServiceError("Too many requests. Please try again later.", 429);
}
