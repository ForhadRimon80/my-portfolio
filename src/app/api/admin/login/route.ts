import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, adminSecret, SESSION_SECONDS } from "@/lib/adminAuth";
import { createSession, secureMatch } from "@/lib/sessionToken";
import { failure } from "@/lib/api";
import { ServiceError } from "@/lib/db";
import { body, originCheck } from "@/lib/security";

// A bounded per-process login throttle; the server secret is the real access credential.
const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(req: Request) {
  try {
    originCheck(req);
    const secret = adminSecret();
    const key = createHmac("sha256", secret)
      .update(
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local",
      )
      .digest("hex");
    const now = Date.now();
    for (const [key, value] of attempts)
      if (value.expires < now) attempts.delete(key);
    if (attempts.size > 10000)
      throw new ServiceError("Please try again later.", 429);
    const attempt = attempts.get(key) || {
      count: 0,
      expires: now + 15 * 60000,
    };
    attempt.count++;
    attempts.set(key, attempt);
    if (attempt.count > 5)
      throw new ServiceError(
        "Too many login attempts. Please try again in 15 minutes.",
        429,
      );
    const { token } = z
      .object({ token: z.string().min(1).max(256) })
      .parse(await body(req));
    if (!secureMatch(token, secret))
      throw new ServiceError("Invalid admin token.", 401);
    attempts.delete(key);
    const response = NextResponse.json(
      { message: "Welcome back." },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(ADMIN_COOKIE, createSession(secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    return failure(error);
  }
}
