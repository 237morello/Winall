"use server";

/**
 * Server Actions — Gestion des Projets (Portfolio & Vitrine)
 *
 * RÈGLE : Toute action qui écrit en BDD vérifie d'abord la session.
 * RÈGLE : Toute donnée entrante est validée par Zod avant d'aller en BDD.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import type { ProjectInput } from "@/app/types/database";
import { ProjectStatut, ProjectDomaine, NotificationType } from "@/lib/generated/prisma";

// ============================================================
// SCHÉMA ZOD — Validation des données avant insertion en BDD
// ============================================================

const ProjectSchema = z.object({
  titre: z.string().min(3, "Le titre doit avoir au moins 3 caractères"),
  description: z.string().min(10, "La description est trop courte"),
  domaine: z.enum(["BTP", "RESEAU", "VIDEOSURVEILLANCE", "CONTROLE_ACCES", "SECURITE_INCENDIE", "TELEPHONIE_IP", "IT"]),
  statut: z.enum(["BROUILLON", "EN_COURS", "TERMINE", "ARCHIVE"]),
  isPublic: z.boolean().default(false),
  localisation: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string().url()).optional().default([]),
  userId: z.string().optional(),
});

// ============================================================
// LECTURE (READ) — Pas besoin d'authentification pour la vitrine
// ============================================================

/** Récupère les projets publics pour la page vitrine (accès anonyme) */
export async function getProjectsPublics(domaine?: string) {
  return prisma.project.findMany({
    where: {
      isPublic: true,
      statut: { in: ["EN_COURS", "TERMINE"] },
      // Filtre optionnel par domaine
      ...(domaine ? { domaine: domaine as ProjectDomaine } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { comments: true } },
    },
  });
}

/** Récupère UN projet public avec ses commentaires */
export async function getProjectPublicAvecCommentaires(projectId: string) {
  return prisma.project.findFirst({
    where: { id: projectId, isPublic: true },
    include: {
      comments: {
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

/** Récupère les projets du client connecté (accès authentifié) */
export async function getMesProjets() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  return prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { comments: true } },
    },
  });
}

/** [ADMIN] Récupère TOUS les projets avec leurs clients */
export async function getAllProjectsAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");
  if ((session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
      _count: { select: { comments: true, formulaires: true } },
    },
  });
}

// ============================================================
// ÉCRITURE (WRITE) — Réservée à l'Admin
// ============================================================

/** [ADMIN] Crée un nouveau projet */
export async function createProject(data: ProjectInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");
  if ((session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  // Validation Zod
  const donnees = ProjectSchema.parse(data);

  const newProject = await prisma.project.create({ data: donnees as Prisma.ProjectCreateInput });

  // Invalide le cache de la page vitrine et du dashboard Admin
  revalidatePath("/projets");
  revalidatePath("/dashboard");

  return newProject;
}

/** [ADMIN] Modifie un projet existant et envoie des notifications si statut change */
export async function updateProject(projectId: string, data: Partial<ProjectInput>) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");
  if ((session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  const validation = ProjectSchema.partial().parse(data);

  // Vérifier si le statut a changé (pour notifications)
  const ancienProjet = await prisma.project.findUnique({ where: { id: projectId } });

  const projectMisAJour = await prisma.project.update({
    where: { id: projectId },
    data: validation as Prisma.ProjectUpdateInput,
  });

  // Si le statut change et qu'un client est lié, envoyer une notification
  if (ancienProjet?.userId && data.statut && ancienProjet.statut !== data.statut) {
    let titre = "";
    let message = "";
    let type: NotificationType | null = null;

    if (data.statut === ProjectStatut.EN_COURS) {
      type = "PROJET_DEBUT";
      titre = `🚀 Votre projet "${ancienProjet.titre}" a démarré !`;
      message = "L'équipe Winall Tech a officiellement lancé votre projet.";
    } else if (data.statut === ProjectStatut.TERMINE) {
      type = "PROJET_TERMINE";
      titre = `✅ Votre projet "${ancienProjet.titre}" est terminé !`;
      message = "Félicitations ! Votre projet est maintenant finalisé. Consultez le rapport.";
    }

    if (type) {
      await prisma.notification.create({
        data: {
          type,
          titre,
          message,
          lienUrl: `/projets/${projectId}`,
          userId: ancienProjet.userId,
        },
      });
    }
  }

  revalidatePath("/projets");
  revalidatePath(`/projets/${projectId}`);
  revalidatePath("/dashboard");

  return projectMisAJour;
}

/** [ADMIN] Supprime un projet */
export async function deleteProject(projectId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");
  if ((session.user as { role?: string }).role !== "ADMIN") throw new Error("Accès refusé");

  await prisma.project.delete({ where: { id: projectId } });

  revalidatePath("/projets");
  revalidatePath("/dashboard");
}

// ============================================================
// COMMENTAIRES — Pour Admin et Client propriétaire
// ============================================================

/** Ajoute un commentaire sur un projet */
export async function addCommentaire(projectId: string, contenu: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  if (contenu.trim().length < 2) throw new Error("Commentaire trop court");

  const comment = await prisma.projectComment.create({
    data: {
      contenu: contenu.trim(),
      projectId,
      userId: session.user.id,
    },
  });

  // Notifier l'Admin si c'est un client qui commente
  if ((session.user as { role?: string }).role !== "ADMIN") {
    const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
    const projet = await prisma.project.findUnique({ where: { id: projectId }, select: { titre: true } });

    await prisma.notification.createMany({
      data: admins.map((admin) => ({
        type: "NOUVEAU_COMMENTAIRE" as NotificationType,
        titre: `💬 Nouveau commentaire sur "${projet?.titre}"`,
        message: `${session.user!.name} a commenté : "${contenu.slice(0, 80)}..."`,
        lienUrl: `/dashboard/projets/${projectId}`,
        userId: admin.id,
      })),
    });
  }

  revalidatePath(`/projets/${projectId}`);
  return comment;
}
