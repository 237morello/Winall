"use server";

/**
 * Server Actions — Gestion des Commentaires
 * 
 * Permet aux clients et admins d'échanger sur l'avancement d'un projet.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CommentSchema = z.object({
  projectId: z.string().cuid("Identifiant de projet invalide"),
  content: z.string().min(1, "Le commentaire ne peut pas être vide"),
});

/**
 * Ajoute un commentaire à un projet.
 */
export async function addProjectComment(projectId: string, content: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  const validated = CommentSchema.parse({ projectId, content });

  // Vérifier les droits (Admin ou propriétaire du projet)
  const project = await prisma.project.findUnique({
    where: { id: validated.projectId },
    select: { userId: true, titre: true }
  });

  if (!project) throw new Error("Projet introuvable");

  const role = (session.user as { role?: string }).role?.toUpperCase();
  if (role !== "ADMIN" && project.userId !== session.user.id) {
    throw new Error("Accès refusé");
  }

  const comment = await prisma.projectComment.create({
    data: {
      contenu: validated.content.trim(),
      projectId: validated.projectId,
      userId: session.user.id,
    },
  });

  // Notifier l'autre partie
  const recipientId = role === "ADMIN" ? project.userId : (await prisma.user.findFirst({ where: { role: "ADMIN" } }))?.id;

  if (recipientId) {
    await prisma.notification.create({
      data: {
        userId: recipientId,
        type: "NOUVEAU_COMMENTAIRE",
        titre: `💬 Commentaire sur "${project.titre}"`,
        message: `${session.user.name} : "${validated.content.slice(0, 80)}..."`,
        lienUrl: role === "ADMIN" 
          ? `/dashboard/projects/${validated.projectId}` 
          : `/dashboard/admin/projects/${validated.projectId}`,
      },
    });
  }

  revalidatePath(`/dashboard/projects/${validated.projectId}`);
  revalidatePath(`/projets/${validated.projectId}`);
  
  return { success: true, comment };
}
