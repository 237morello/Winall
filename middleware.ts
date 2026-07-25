import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSession } from "@/lib/admin-session";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = await verifyAdminSession(request.cookies.get(adminSessionCookieName)?.value);
  if (!session) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
