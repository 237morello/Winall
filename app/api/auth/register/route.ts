import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createAdminSession, adminSessionCookieName } from "@/lib/admin-session";
import { verifyAccessPass } from "@/lib/access-pass";
import { hashSecret } from "@/lib/password";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court."),
  email: z.string().trim().toLowerCase().email("Email invalide."),
  password: z.string().min(8, "Mot de passe : 8 caractères minimum."),
  pass: z.string().min(1, "Pass d'accès requis."),
});

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    pass: formData.get("pass"),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Champs invalides.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, password, pass } = parsed.data;

  // Le pass d'accès est la seule preuve d'appartenance à Winall Tech requise
  // pour créer un compte administrateur. Sans lui, l'inscription échoue.
  if (!(await verifyAccessPass(pass))) {
    return NextResponse.json({ error: "Pass d'accès invalide." }, { status: 403 });
  }

  try {
    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        role: "ADMIN",
        emailVerified: true,
        passwordHash: await hashSecret(password),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Inscription impossible." },
      { status: 500 },
    );
  }

  // Le pass valide vaut confirmation : session ouverte immédiatement.
  const response = NextResponse.json({ ok: true, redirect: "/admin" });
  response.cookies.set(adminSessionCookieName, await createAdminSession(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
