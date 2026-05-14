"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

// Exemple de schéma de validation
const updateProfileSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * @action updateUserProfile
 * @description Exemple d'Action Serveur pour mettre à jour le profil.
 * Les Server Actions doivent toujours valider l'authentification et les données entrantes.
 */
export async function updateUserProfile(data: UpdateProfileInput) {
  try {
    // 1. Validation de session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Non autorisé");
    }

    // 2. Validation des données
    const validatedData = updateProfileSchema.parse(data);

    // 3. Appel au service (Business Logic)
    // Ici, on pourrait appeler un service pour mettre à jour la DB
    // console.log("Mise à jour pour:", session.user.id, "Data:", validatedData);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: validatedData.name },
    });

    return { success: true, message: "Profil mis à jour avec succès" };
  } catch (error) {
    console.error("Erreur updateUserProfile:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Données invalides", issues: error.issues };
    }
    return { success: false, error: "Une erreur est survenue lors de la mise à jour" };
  }
}
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Récupère tous les utilisateurs (Admin uniquement).
 */
export async function getUsers() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Met à jour le rôle d'un utilisateur.
 */
export async function updateUserRole(userId: string, role: "ADMIN" | "CLIENT") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentRole = (session?.user as { role?: string })?.role?.toUpperCase();
  if (currentRole !== "ADMIN") throw new Error("Accès refusé");

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Récupère l'activité complète d'un utilisateur spécifique (Admin uniquement).
 */
export async function getUserActivity(targetUserId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      projects: {
        orderBy: { updatedAt: "desc" },
      },
      formulaires: {
        orderBy: { createdAt: "desc" },
      },
      messagesSent: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      messagesReceived: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      comments: {
        include: { project: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
