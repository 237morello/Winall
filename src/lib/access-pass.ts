import prisma from "@/lib/prisma";
import { hashSecret, verifySecret } from "@/lib/password";

/**
 * Pass d'accès partagé de l'administration Winall.
 * Stocké haché dans AdminPreference (clé `admin_access_pass`, `value` JSON),
 * pour être vérifiable et remplaçable sans redéploiement (cf. scripts/set-admin-pass.ts).
 */

export const ACCESS_PASS_KEY = "admin_access_pass";

/** Vérifie un pass en clair contre la valeur stockée. `false` si non configuré. */
export async function verifyAccessPass(plain: string): Promise<boolean> {
  if (!plain) {
    return false;
  }

  const record = await prisma.adminPreference.findUnique({
    where: { key: ACCESS_PASS_KEY },
    select: { value: true },
  });

  const stored = typeof record?.value === "string" ? record.value : null;
  return verifySecret(plain, stored);
}

/** Pose ou remplace le pass d'accès (haché). Utilisé par le script CLI. */
export async function setAccessPass(plain: string): Promise<void> {
  const hashed = await hashSecret(plain);
  await prisma.adminPreference.upsert({
    where: { key: ACCESS_PASS_KEY },
    create: { key: ACCESS_PASS_KEY, value: hashed },
    update: { value: hashed },
  });
}
