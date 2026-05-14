"use server";

/**
 * Server Actions — Gestion des Formulaires (Devis, Intervention, Contact)
 *
 * Les formulaires sont la porte d'entrée des prospects et clients.
 * RÈGLE : La soumission d'un formulaire ne nécessite PAS d'être connecté
 *         (un prospect peut envoyer un devis sans avoir de compte).
 * RÈGLE : La lecture et la réponse aux formulaires sont réservées à l'Admin.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { FormType, FormStatut, NotificationType } from "@/lib/generated/prisma";

// ============================================================
// SCHÉMA ZOD — Validation des formulaires
// ============================================================

const FormBaseSchema = z.object({
  nom: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
});

const FormDevisSchema = FormBaseSchema.extend({
  type: z.literal("DEVIS"),
  donnees: z.object({
    domaineInteret: z.enum(["BTP", "RESEAU", "VIDEOSURVEILLANCE", "CONTROLE_ACCES", "SECURITE_INCENDIE", "TELEPHONIE_IP", "IT"]),
    budgetEstimatif: z.string().optional(),
    descriptionBesoin: z.string().min(10, "Veuillez décrire votre besoin"),
    localisation: z.string().min(2, "Veuillez indiquer votre ville"),
  }),
});

const FormInterventionSchema = FormBaseSchema.extend({
  type: z.literal("INTERVENTION"),
  projectId: z.string().cuid("Projet invalide"),
  donnees: z.object({
    niveauUrgence: z.enum(["FAIBLE", "MOYEN", "CRITIQUE"]),
    descriptionProbleme: z.string().min(10, "Décrivez le problème rencontré"),
  }),
});

const FormContactSchema = FormBaseSchema.extend({
  type: z.literal("CONTACT"),
  donnees: z.object({
    sujet: z.string().min(3, "Le sujet est requis"),
    messageContenu: z.string().min(10, "Votre message est trop court"),
  }),
});

// ============================================================
// SOUMISSION (accessible à tous — visiteurs et clients)
// ============================================================

/** Soumet un formulaire de demande de Devis */
export async function soumettreDevis(data: unknown) {
  // Validation stricte
  const donnees = FormDevisSchema.parse(data);

  // Récupérer la session si l'utilisateur est connecté (optionnel)
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  const formulaire = await prisma.formRequest.create({
    data: {
      type: "DEVIS",
      statut: "NON_LU",
      nom: donnees.nom,
      email: donnees.email,
      telephone: donnees.telephone,
      donnees: donnees.donnees,
      userId: session?.user?.id ?? null,
    },
  });

  // Notifier tous les Admins qu'un nouveau devis est arrivé
  await _notifierAdmins({
    type: "NOUVEAU_FORMULAIRE",
    titre: `📋 Nouveau devis reçu de ${donnees.nom}`,
    message: `Domaine : ${donnees.donnees.domaineInteret} — Budget : ${donnees.donnees.budgetEstimatif ?? "Non précisé"} — Ville : ${donnees.donnees.localisation}`,
    lienUrl: `/dashboard/formulaires/${formulaire.id}`,
  });

  return { success: true, id: formulaire.id };
}

/** Soumet une demande d'intervention sur un projet existant */
export async function soumettreIntervention(data: unknown) {
  const donnees = FormInterventionSchema.parse(data);

  // Vérifier que le projet existe bien
  const projet = await prisma.project.findUnique({ where: { id: donnees.projectId } });
  if (!projet) throw new Error("Projet introuvable");

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  const formulaire = await prisma.formRequest.create({
    data: {
      type: "INTERVENTION",
      statut: "NON_LU",
      nom: donnees.nom,
      email: donnees.email,
      telephone: donnees.telephone,
      donnees: donnees.donnees,
      userId: session?.user?.id ?? null,
      projectId: donnees.projectId,
    },
  });

  await _notifierAdmins({
    type: "NOUVEAU_FORMULAIRE",
    titre: `🔧 Demande d'intervention sur "${projet.titre}"`,
    message: `Urgence : ${donnees.donnees.niveauUrgence} — De : ${donnees.nom} (${donnees.email})`,
    lienUrl: `/dashboard/formulaires/${formulaire.id}`,
  });

  return { success: true, id: formulaire.id };
}

/** Soumet un formulaire de contact général */
export async function soumettreContact(data: unknown) {
  const donnees = FormContactSchema.parse(data);

  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  const formulaire = await prisma.formRequest.create({
    data: {
      type: "CONTACT",
      statut: "NON_LU",
      nom: donnees.nom,
      email: donnees.email,
      telephone: donnees.telephone,
      donnees: donnees.donnees,
      userId: session?.user?.id ?? null,
    },
  });

  await _notifierAdmins({
    type: "NOUVEAU_FORMULAIRE",
    titre: `✉️ Nouveau message de ${donnees.nom}`,
    message: `Sujet : ${donnees.donnees.sujet}`,
    lienUrl: `/dashboard/formulaires/${formulaire.id}`,
  });

  return { success: true, id: formulaire.id };
}

// ============================================================
// LECTURE & GESTION (réservées à l'Admin)
// ============================================================

/** [ADMIN] Récupère tous les formulaires avec filtres optionnels */
export async function getFormulairesAdmin(filtres?: { type?: string; statut?: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.formRequest.findMany({
    where: {
      ...(filtres?.type ? { type: filtres.type as FormType } : {}),
      ...(filtres?.statut ? { statut: filtres.statut as FormStatut } : {}),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      project: { select: { id: true, titre: true, domaine: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/** [ADMIN] Répond à un formulaire et notifie le client */
export async function repondreFormulaire(formulaireId: string, reponse: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  if (reponse.trim().length < 5) throw new Error("La réponse est trop courte");

  const formulaireMaj = await prisma.formRequest.update({
    where: { id: formulaireId },
    data: {
      reponseAdmin: reponse.trim(),
      reponduLe: new Date(),
      statut: "CLOS",
    },
  });

  // Notifier le client s'il a un compte
  if (formulaireMaj.userId) {
    await prisma.notification.create({
      data: {
        type: "REPONSE_FORMULAIRE",
        titre: "📬 Winall Tech a répondu à votre demande",
        message: reponse.slice(0, 150) + (reponse.length > 150 ? "..." : ""),
        lienUrl: `/mes-demandes/${formulaireId}`,
        userId: formulaireMaj.userId,
      },
    });
  }

  revalidatePath("/dashboard/formulaires");
  return formulaireMaj;
}

/** [ADMIN] Change le statut d'un formulaire */
export async function changerStatutFormulaire(formulaireId: string, statut: "NON_LU" | "EN_TRAITEMENT" | "CLOS") {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  const result = await prisma.formRequest.update({
    where: { id: formulaireId },
    data: { statut },
  });

  revalidatePath("/dashboard/formulaires");
  return result;
}

// ============================================================
// HELPER INTERNE — Notifier tous les Admins
// ============================================================

async function _notifierAdmins(notif: {
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
