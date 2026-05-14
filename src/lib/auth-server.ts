import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Import MINIMAL pour le middleware UNIQUEMENT
// ❌ N'importe PAS magicLink, emailAndPassword, socialProviders (non nécessaires pour getSession)
import prisma from "./prisma";

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

// ⚠️ VERSION LÉGÈRE - Juste pour vérifier la session dans le middleware
export const authMiddleware = betterAuth({
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET || "dev-only-change-me",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // ❌ Pas de plugins ici
  // ❌ Pas de socialProviders ici
  // ✅ Juste la base pour getSession()
});
