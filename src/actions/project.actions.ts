"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ProjectStatut } from "@/lib/generated/prisma";

// --- Schémas de Validation ---

const projectSchema = z.object({
  titre: z.string().min(3, "Titre trop court"),
  description: z.string().min(10, "Description trop courte"),
  domaine: z.enum(["BTP", "RESEAU", "VIDEOSURVEILLANCE", "CONTROLE_ACCES", "SECURITE_INCENDIE", "TELEPHONIE_IP", "IT"]),
  localisation: z.string().optional(),
  budget: z.number().optional(),
  userId: z.string().optional(), // ID du client
});

// --- Actions ---

/**
 * Récupère les projets selon le rôle de l'utilisateur.
 */
export async function getProjects() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  const role = (session.user as { role?: string }).role?.toUpperCase();

  if (role === "ADMIN") {
    return prisma.project.findMany({
      include: { user: true },
      orderBy: { updatedAt: "desc" },
    });
  }

  // Pour un client, on ne retourne que ses projets
  return prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });
}

/**
 * Récupère les détails d'un projet spécifique.
 */
export async function getProjectById(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  const project = await prisma.project.findUnique({
    where: { id },
    include: { 
      user: true,
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" }
      }
    },
  });

  if (!project) return null;

  // Sécurité : Un client ne peut voir que son projet
  const role = (session.user as { role?: string }).role?.toUpperCase();
  if (role !== "ADMIN" && project.userId !== session.user.id) {
    throw new Error("Accès refusé");
  }

  return project;
}

import { EmailService } from "@/services/email.service";

/**
 * Crée un nouveau projet (Admin uniquement).
 */
export async function createProject(data: z.infer<typeof projectSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session.user as { role?: string }).role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Action réservée aux administrateurs");

  const validatedData = projectSchema.parse(data);

  const project = await prisma.project.create({
    data: {
      titre: validatedData.titre,
      description: validatedData.description,
      domaine: validatedData.domaine,
      localisation: validatedData.localisation,
      userId: validatedData.userId,
      statut: "EN_COURS",
    },
    include: { user: true }
  });

  // Notification Email si client assigné
  if (project.user?.email) {
    await EmailService.envoyerNotificationProjet(project.user.email, project.user.name, project.titre);
  }

  revalidatePath("/dashboard");
  return { success: true, project };
}

/**
 * Met à jour un projet (Admin uniquement).
 */
export async function updateProject(id: string, data: {
  titre: string;
  description: string;
  statut: ProjectStatut; 
  progression: string;
  localisation?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const project = await prisma.project.update({
    where: { id },
    data: {
      titre: data.titre,
      description: data.description,
      statut: data.statut,
      progression: parseInt(data.progression),
      localisation: data.localisation,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, project };
}
