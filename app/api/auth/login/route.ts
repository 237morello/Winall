import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAdminSession, adminSessionCookieName } from "@/lib/admin-session";
import { verifyAccessPass } from "@/lib/access-pass";
import { verifySecret } from "@/lib/password";

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const pass = String(formData.get("pass") || "");
  const callbackUrl = String(formData.get("callbackUrl") || "/admin");

  if (!email || !password || !pass) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  // Barrière n°1 : le pass d'accès partagé (message unique, ne révèle pas le champ fautif).
  if (!(await verifyAccessPass(pass))) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  // Barrière n°2 : compte administrateur avec mot de passe défini.
  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, role: true, passwordHash: true },
  });

  if (!user || user.role !== "ADMIN" || !user.passwordHash) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  if (!(await verifySecret(password, user.passwordHash))) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }

  const response = NextResponse.redirect(
    new URL(callbackUrl.startsWith("/") ? callbackUrl : "/admin", request.url),
  );
  response.cookies.set(adminSessionCookieName, await createAdminSession(user.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
