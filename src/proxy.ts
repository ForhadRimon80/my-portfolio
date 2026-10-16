import { NextRequest, NextResponse } from "next/server";
import { validSession } from "@/lib/sessionToken";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("portfolio-admin")?.value || "";
  const authenticated = validSession(session, process.env.ADMIN_TOKEN || "");
  const loginPage = request.nextUrl.pathname === "/admin/login";
  if (!authenticated && !loginPage) return NextResponse.redirect(new URL("/admin/login", request.url));
  if (authenticated && loginPage) return NextResponse.redirect(new URL("/admin", request.url));
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
