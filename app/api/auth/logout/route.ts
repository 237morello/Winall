import { NextResponse } from "next/server";
import { adminSessionCookieName } from "@/lib/admin-session";

export async function POST(request: Request): Promise<Response> {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
