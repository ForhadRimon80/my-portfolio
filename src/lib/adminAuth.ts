import "server-only";
import { cookies } from "next/headers";
import { ServiceError } from "./db";
import { validSession } from "./sessionToken";

export const ADMIN_COOKIE = "portfolio-admin";
export const SESSION_SECONDS = 8 * 3600;

export function adminSecret() {
  const secret = process.env.ADMIN_TOKEN;
  if (!secret || secret.length < 32)
    throw new ServiceError(
      "Admin access is not configured. Set ADMIN_TOKEN to a random value of at least 32 characters.",
    );
  return secret;
}

export async function isAdmin() {
  const secret = process.env.ADMIN_TOKEN || "";
  const value = (await cookies()).get(ADMIN_COOKIE)?.value || "";
  return validSession(value, secret);
}
