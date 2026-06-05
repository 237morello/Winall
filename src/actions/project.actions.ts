"use server";

/**
 * Server Actions — Gestion des Projets (Portfolio & Dashboard)
 * 
 * Permet de gérer le cycle de vie des projets Winall Tech.
 * RÈGLE : Lecture publique autorisée pour la vitrine.
 * RÈGLE : Création/Modification réservée aux Administrateurs.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProjectStatut, ProjectDomaine, NotificationType, Prisma } from "@/lib/generated/prisma";
import { EmailService } from "@/services/email.service";
import { StorageService } from "@/services/storage.service";

// ============================================================
// SCHÉMAS DE VALIDATION (ZOD)
// ============================================================

const ProjectSchema = z.object({
  titre: z.string().min(3, "Le titre doit avoir au moins 3 caractères"),
  description: z.string().min(10, "La description est trop courte"),
  domaine: z.enum(["BTP", "RESEAU", "VIDEOSURVEILLANCE", "CONTROLE_ACCES", "SECURITE_INCENDIE", "TELEPHONIE_IP", "IT"]),
  statut: z.enum(["BROUILLON", "EN_COURS", "TERMINE", "ARCHIVE"]).default("EN_COURS"),
  isPublic: z.boolean().default(false),
  localisation: z.string().optional().nullable(),
  budget: z.number().default(0),
  progression: z.number().min(0).max(100).default(0),
  dateDebut: z.date().optional().nullable(),
  dateFin: z.date().optional().nullable(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  images: z.array(z.string().url()).default([]),
  userId: z.string().optional().nullable(), // ID du client lié
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// ============================================================
// LECTURE (PUBLIC & AUTHENTIFIÉ)
// ============================================================

/**
 * Récupère les projets publics pour le portfolio.
 */
export async function getPublicProjects(domaine?: ProjectDomaine) {
  return prisma.project.findMany({
    where: {
      isPublic: true,
      statut: { in: ["EN_COURS", "TERMINE"] },
      ...(domaine ? { domaine } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { comments: true } },
    },
  });
}

/**
 * Récupère les projets selon le rôle de l'utilisateur (Dashboard).
 */
export async function getProjects() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Pour le développement : si non authentifié, on retourne tous les projets
  if (!session?.user) {
    return prisma.project.findMany({
      include: { 
        user: { select: { id: true, name: true, email: true, image: true } },
        _count: { select: { comments: true, formulaires: true } }
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  const role = (session.user as { role?: string }).role?.toUpperCase();

  if (role === "ADMIN") {
    return prisma.project.findMany({
      include: { 
        user: { select: { id: true, name: true, email: true, image: true } },
        _count: { select: { comments: true, formulaires: true } }
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  // Pour un client, on ne retourne que ses projets
  return prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { comments: true } },
    },
  });
}

/**
 * Récupère les détails d'un projet par son ID.
 */
export async function getProjectById(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: { 
      user: { select: { id: true, name: true, email: true, image: true } },
      comments: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "desc" }
      }
    },
  });

  if (!project) return null;

  // Sécurité : Un client ne peut voir que son projet (sauf s'il est public)
  // Pour le développement : on ignore le contrôle si non connecté
  if (session?.user) {
    const role = (session.user as { role?: string }).role?.toUpperCase();
    if (role !== "ADMIN" && project.userId !== session.user.id && !project.isPublic) {
      throw new Error("Accès refusé");
    }
  }

  return project;
}

/**
 * Récupère les autres projets du même domaine accessibles par l'utilisateur courant.
 */
export async function getRelatedProjectsByDomain(id: string, limit = 8) {
  const session = await auth.api.getSession({ headers: await headers() });
  const project = await prisma.project.findUnique({
    where: { id },
    select: { id: true, domaine: true },
  });

  if (!project) return [];

  const role = (session?.user as { role?: string } | undefined)?.role?.toUpperCase();
  const accessFilter =
    !session?.user || role === "ADMIN"
      ? {}
      : {
          OR: [
            { userId: session.user.id },
            { isPublic: true },
          ],
        };

  return prisma.project.findMany({
    where: {
      id: { not: project.id },
      domaine: project.domaine,
      ...accessFilter,
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}

// ============================================================
// ÉCRITURE (ADMIN ONLY)
// ============================================================

/**
 * Crée un nouveau projet.
 */
export async function createProject(data: ProjectInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const validated = ProjectSchema.parse(data);

  const project = await prisma.project.create({
    data: {
      ...validated,
      statut: validated.statut as ProjectStatut,
      userId: validated.userId === "none" ? null : validated.userId,
    },
    include: { user: true }
  });

  // Notification Email si un client est assigné
  if (project.user?.email) {
    await EmailService.envoyerNotificationProjet(project.user.email, project.user.name, project.titre);
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin/projects");
  revalidatePath("/projets");
  return { success: true, project };
}

/**
 * Met à jour un projet existant.
 */
export async function updateProject(id: string, data: Partial<ProjectInput>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const validated = ProjectSchema.partial().parse(data);
  const oldProject = await prisma.project.findUnique({ where: { id } });

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...validated,
      userId: validated.userId === "none" ? null : validated.userId,
    } as Prisma.ProjectUpdateInput,
    include: { user: true }
  });

  // Notifications si le statut change
  if (project.userId && validated.statut && oldProject?.statut !== validated.statut) {
    let titre = "";
    let type: NotificationType | null = null;

    if (validated.statut === "EN_COURS") {
      type = "PROJET_DEBUT";
      titre = `🚀 Votre projet "${project.titre}" a démarré !`;
    } else if (validated.statut === "TERMINE") {
      type = "PROJET_TERMINE";
      titre = `✅ Votre projet "${project.titre}" est terminé !`;
    }

    if (type) {
      await prisma.notification.create({
        data: {
          type,
          titre,
          message: `Le statut de votre projet a été mis à jour : ${validated.statut}.`,
          lienUrl: `/dashboard/projects/${id}`,
          userId: project.userId,
        },
      });
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin/projects");
  revalidatePath(`/dashboard/projects/${id}`);
  revalidatePath("/projets");
  
  return { success: true, project };
}

/**
 * Supprime un projet.
 */
export async function deleteProject(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const project = await prisma.project.findUnique({ where: { id } });

  const projectImages = [project?.imageUrl, ...(project?.images ?? [])].filter(
    (image): image is string => Boolean(image),
  );

  for (const image of projectImages) {
    try {
      await StorageService.deleteFile(image);
    } catch (error) {
      console.error("Erreur suppression image lors de deleteProject:", error);
    }
  }

  await prisma.project.delete({ where: { id } });

  revalidatePath("/dashboard");
  revalidatePath("/admin/projects");
  revalidatePath("/projets");
  return { success: true };
}
