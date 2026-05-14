"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const commentSchema = z.object({
  projectId: z.string(),
  contenu: z.string().min(1, "Le commentaire ne peut pas être vide"),
});

/**
 * Ajoute un commentaire à un projet.
 */
export async function addProjectComment(data: z.infer<typeof commentSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  const validatedData = commentSchema.parse(data);

  // Vérifier si l'utilisateur a le droit de commenter (Admin ou propriétaire)
  const project = await prisma.project.findUnique({
    where: { id: validatedData.projectId },
  });

  const role = (session.user as { role?: string }).role?.toUpperCase();
  if (role !== "ADMIN" && project?.userId !== session.user.id) {
    throw new Error("Accès refusé");
  }

  const comment = await prisma.projectComment.create({
    data: {
      contenu: validatedData.contenu,
      projectId: validatedData.projectId,
      userId: session.user.id,
    },
  });

  // Notifier l'autre partie
  const recipientId = role === "ADMIN" ? project?.userId : (await prisma.user.findFirst({ where: { role: "ADMIN" } }))?.id;

  if (recipientId) {
    await prisma.notification.create({
      data: {
        userId: recipientId,
        type: "NOUVEAU_COMMENTAIRE",
        titre: "Nouveau commentaire sur projet",
        message: `${session.user.name} a commenté : "${validatedData.contenu.substring(0, 50)}..."`,
        lienUrl: `/dashboard/${recipientId}/projects/${validatedData.projectId}`,
      },
    });
  }

  revalidatePath(`/dashboard/${session.user.id}/projects/${validatedData.projectId}`);
  return { success: true, comment };
}
