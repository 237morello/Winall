import { cookies } from "next/headers";
import {
  adminSessionCookieName,
  verifyAdminSession,
  type AdminSessionPayload,
} from "@/lib/admin-session";

/**
 * Garde admin réutilisable pour les Server Actions et Route Handlers.
 * Les pages sous /admin sont déjà protégées par middleware.ts, mais les
 * Server Actions et Route Handlers ne repassent pas systématiquement par le
 * layout : cette vérification explicite ajoute une défense en profondeur.
 */
export async function requireAdmin(): Promise<AdminSessionPayload> {
  const cookieStore = await cookies();
  const session = await verifyAdminSession(
    cookieStore.get(adminSessionCookieName)?.value,
  );
  if (!session) {
    throw new Error("Non autorisé : session admin requise.");
  }
  return session;
}
