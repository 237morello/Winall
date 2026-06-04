"use server";

/**
 * Server Actions — Gestion des Utilisateurs
 * 
 * Permet de gérer les profils, les rôles et l'activité des utilisateurs.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Role } from "@/lib/generated/prisma";

import { StorageService } from "@/services/storage.service";

// ============================================================
// SCHÉMAS DE VALIDATION (ZOD)
// ============================================================

const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

const AdminUserSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  role: z.nativeEnum(Role).default(Role.CLIENT),
  image: z.string().optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type AdminUserInput = z.infer<typeof AdminUserSchema>;

// ============================================================
// ACTIONS DE PROFIL (UTILISATEUR)
// ============================================================

/**
 * Met à jour le profil de l'utilisateur connecté.
 */
export async function updateUserProfile(data: UpdateProfileInput) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("Non autorisé");

    const validated = UpdateProfileSchema.parse(data);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: validated.name },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Profil mis à jour avec succès" };
  } catch (error) {
    console.error("Erreur updateUserProfile:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Données invalides" };
    }
    return { success: false, error: "Une erreur est survenue lors de la mise à jour" };
  }
}

// ============================================================
// ACTIONS D'ADMINISTRATION (ADMIN ONLY)
// ============================================================

/**
 * Crée un utilisateur via l'interface admin.
 */
export async function adminCreateUser(data: AdminUserInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const validated = AdminUserSchema.parse(data);

  const user = await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      role: validated.role,
      image: validated.image,
      emailVerified: true, // Marquer comme vérifié puisque créé par admin
    },
  });

  revalidatePath("/admin/users");
  return { success: true, user };
}

/**
 * Met à jour un utilisateur via l'interface admin.
 */
export async function adminUpdateUser(id: string, data: Partial<AdminUserInput>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const validated = AdminUserSchema.partial().parse(data);

  const user = await prisma.user.update({
    where: { id },
    data: validated,
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${id}`);
  return { success: true, user };
}

/**
 * Supprime un utilisateur via l'interface admin.
 */
export async function adminDeleteUser(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const user = await prisma.user.findUnique({ where: { id } });

  // Supprimer l'image de profil du stockage si elle existe
  if (user?.image && user.image.includes("winall-storage")) {
    try {
      await StorageService.deleteFile(user.image);
    } catch (error) {
      console.error("Erreur suppression image profil lors de adminDeleteUser:", error);
    }
  }

  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * Récupère tous les utilisateurs.
 */
export async function getUsers() {
  const session = await auth.api.getSession({ headers: await headers() });
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
  const session = await auth.api.getSession({ headers: await headers() });
  const currentRole = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (currentRole !== "ADMIN") throw new Error("Accès refusé");

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/dashboard/admin/users");
  return { success: true };
}

/**
 * Récupère l'activité complète d'un utilisateur spécifique.
 */
export async function getUserActivity(targetUserId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      projects: { orderBy: { updatedAt: "desc" } },
      formulaires: { orderBy: { createdAt: "desc" } },
      messagesSent: { orderBy: { createdAt: "desc" }, take: 10 },
      messagesReceived: { orderBy: { createdAt: "desc" }, take: 10 },
      comments: {
        include: { project: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
