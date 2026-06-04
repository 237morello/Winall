"use server";

/**
 * Server Actions — Gestion des Formulaires (Devis, Intervention, Contact)
 * 
 * Les formulaires permettent aux prospects et clients d'interagir avec Winall Tech.
 * RÈGLE : La soumission ne nécessite pas d'authentification (prospects).
 * RÈGLE : La gestion (lecture, réponse) est réservée aux Administrateurs.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import type { FormType, FormStatut, NotificationType, Prisma } from "@/lib/generated/prisma";
import { ContactFormSchema, InterventionFormSchema, QuoteFormSchema } from "@/schemas/form.schema";

// ============================================================
// ACTIONS DE SOUMISSION (PUBLIQUES)
// ============================================================

/**
 * Soumet une demande de devis.
 */
export async function submitQuoteRequest(data: unknown) {
  try {
    const validated = QuoteFormSchema.parse(data);
    const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
    let project: { id: string; titre: string; domaine: string; userId: string | null } | null = null;

    if (validated.projectId) {
      if (!session?.user?.id) {
        return { success: false, error: "Vous devez être connecté pour lier un devis à un projet" };
      }

      project = await prisma.project.findUnique({
        where: { id: validated.projectId },
        select: { id: true, titre: true, domaine: true, userId: true },
      });

      if (!project) return { success: false, error: "Projet introuvable" };
      if (project.userId !== session.user.id) {
        return { success: false, error: "Accès refusé pour ce projet" };
      }
    }

    const request = await prisma.formRequest.create({
      data: {
        type: "DEVIS",
        statut: "NON_LU",
        nom: validated.nom,
        email: validated.email,
        telephone: validated.telephone,
        donnees: validated.donnees,
        userId: session?.user?.id ?? null,
        projectId: validated.projectId ?? null, // Lien vers le projet qui a inspiré l'utilisateur
      },
    });

    await _notifyAdmins({
      type: "NOUVEAU_FORMULAIRE",
      titre: `Nouveau devis : ${validated.nom}`,
      message: `Domaine : ${validated.donnees.domaineInteret} - Ville : ${validated.donnees.localisation}${project ? ` - Projet lie : ${project.titre}` : ""}`,
      lienUrl: `/admin/requests`,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/quotes");
    revalidatePath("/admin/requests");
    return { success: true, id: request.id };
  } catch (error) {
    console.error("Erreur submitQuoteRequest:", error);
    return { success: false, error: "Erreur lors de l'envoi de la demande" };
  }
}

/**
 * Soumet une demande d'intervention technique.
 */
export async function submitInterventionRequest(data: unknown) {
  try {
    const validated = InterventionFormSchema.parse(data);
    const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
    if (!session?.user?.id) {
      return { success: false, error: "Vous devez être connecté pour demander une intervention" };
    }

    const project = await prisma.project.findUnique({
      where: { id: validated.projectId },
      select: { id: true, titre: true, userId: true },
    });
    if (!project) return { success: false, error: "Projet introuvable" };
    if (project.userId !== session.user.id) {
      return { success: false, error: "Accès refusé pour ce projet" };
    }

    const request = await prisma.formRequest.create({
      data: {
        type: "INTERVENTION",
        statut: "NON_LU",
        nom: validated.nom,
        email: validated.email,
        telephone: validated.telephone,
        donnees: validated.donnees,
        userId: session?.user?.id ?? null,
        projectId: validated.projectId,
      },
    });

    await _notifyAdmins({
      type: "NOUVEAU_FORMULAIRE",
      titre: `Intervention sur "${project.titre}"`,
      message: `Urgence : ${validated.donnees.niveauUrgence} - De : ${validated.nom}`,
      lienUrl: `/admin/requests`,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/projects/${validated.projectId}`);
    revalidatePath("/admin/requests");
    return { success: true, id: request.id };
  } catch (error) {
    console.error("Erreur submitInterventionRequest:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'intervention" };
  }
}

/**
 * Soumet un formulaire de contact général.
 */
export async function submitContactRequest(data: unknown) {
  try {
    const validated = ContactFormSchema.parse(data);
    const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

    const request = await prisma.formRequest.create({
      data: {
        type: "CONTACT",
        statut: "NON_LU",
        nom: validated.nom,
        email: validated.email,
        telephone: validated.telephone,
        donnees: validated.donnees,
        userId: session?.user?.id ?? null,
      },
    });

    await _notifyAdmins({
      type: "NOUVEAU_FORMULAIRE",
      titre: `Message de ${validated.nom}`,
      message: `Sujet : ${validated.donnees.sujet}`,
      lienUrl: `/admin/requests`,
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/requests");
    return { success: true, id: request.id };
  } catch (error) {
    console.error("Erreur submitContactRequest:", error);
    return { success: false, error: "Erreur lors de l'envoi du message" };
  }
}

// ============================================================
// ACTIONS DE GESTION (ADMIN ONLY)
// ============================================================

/**
 * Récupère les demandes de formulaires.
 * - ADMIN : voit tout.
 * - CLIENT : voit uniquement les siennes.
 */
export async function getFormRequests(filtres?: { type?: FormType; statut?: FormStatut }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  const role = (session.user as { role?: string }).role?.toUpperCase();
  const userId = session.user.id;

  const whereClause: Prisma.FormRequestWhereInput = {
    ...(filtres?.type ? { type: filtres.type } : {}),
    ...(filtres?.statut ? { statut: filtres.statut } : {}),
  };

  if (role !== "ADMIN") {
    whereClause.userId = userId;
  }

  return prisma.formRequest.findMany({
    where: whereClause,
    include: {
      user: { select: { id: true, name: true, email: true } },
      project: { select: { id: true, titre: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Répond à une demande et notifie l'utilisateur.
 */
export async function respondToFormRequest(id: string, reponse: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const updated = await prisma.formRequest.update({
    where: { id },
    data: {
      reponseAdmin: reponse,
      reponduLe: new Date(),
      statut: "CLOS",
    },
  });

  if (updated.userId) {
    await prisma.notification.create({
      data: {
        userId: updated.userId,
        type: "REPONSE_FORMULAIRE",
        titre: "📬 Winall Tech a répondu à votre demande",
        message: reponse.slice(0, 150) + "...",
        lienUrl: `/dashboard/requests/${id}`,
      },
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
}

// ============================================================
// HELPERS INTERNES
// ============================================================

async function _notifyAdmins(notif: {
  type: NotificationType;
  titre: string;
  message: string;
  lienUrl: string;
}) {
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
  if (admins.length === 0) return;

  await prisma.notification.createMany({
    data: admins.map((admin) => ({
      ...notif,
      userId: admin.id,
    })),
  });
}

/** Alias pour compatibilité ascendante si nécessaire */
export async function submitFormRequest(data: unknown) {
  return submitQuoteRequest(data);
}
