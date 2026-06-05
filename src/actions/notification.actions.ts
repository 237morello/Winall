"use server";

/**
 * Server Actions — Centre de Notifications
 * 
 * Permet aux utilisateurs de suivre les mises à jour de leurs projets, messages et formulaires.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Récupère les notifications de l'utilisateur connecté.
 */
export async function getNotifications(limit = 50) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Pour le développement : si non connecté, on retourne toutes les notifications
  if (!session?.user) {
    return prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Marque une notification spécifique comme lue.
 */
export async function markAsRead(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    // En développement, on permet de marquer comme lu même sans session
    return prisma.notification.update({
      where: { id },
      data: { lu: true },
    });
  }

  const result = await prisma.notification.update({
    where: { id, userId: session.user.id },
    data: { lu: true },
  });

  revalidatePath("/dashboard");
  return result;
}

/**
 * Marque toutes les notifications de l'utilisateur comme lues.
 */
export async function markAllAsRead() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    const result = await prisma.notification.updateMany({
      where: { lu: false },
      data: { lu: true },
    });
    revalidatePath("/dashboard");
    return result;
  }

  const result = await prisma.notification.updateMany({
    where: { userId: session.user.id, lu: false },
    data: { lu: true },
  });

  revalidatePath("/dashboard");
  return result;
}

/**
 * Supprime une notification.
 */
export async function deleteNotification(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    await prisma.notification.delete({
      where: { id },
    });
  } else {
    await prisma.notification.delete({
      where: { id, userId: session.user.id },
    });
  }

  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Compte les notifications non lues.
 */
export async function getUnreadNotificationsCount() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session?.user) return 0;

  return prisma.notification.count({
    where: { userId: session.user.id, lu: false },
  });
}
