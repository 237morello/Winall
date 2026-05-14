"use server";

/**
 * Server Actions — Gestion des Notifications
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

/** Récupère les notifications de l'utilisateur connecté */
export async function getMesNotifications(limite = 20) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: limite,
  });
}

/** Compte les notifications non lues */
export async function getNombreNotificationsNonLues() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return 0;

  return prisma.notification.count({
    where: { userId: session.user.id, lu: false },
  });
}

/** Marque une notification comme lue */
export async function marquerCommeLue(notificationId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.notification.update({
    where: { id: notificationId, userId: session.user.id },
    data: { lu: true },
  });

  revalidatePath("/");
}

/** Marque TOUTES les notifications comme lues */
export async function marquerToutesCommeLues() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.notification.updateMany({
    where: { userId: session.user.id, lu: false },
    data: { lu: true },
  });

  revalidatePath("/");
}

/** Supprime une notification */
export async function supprimerNotification(notificationId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  await prisma.notification.delete({
    where: { id: notificationId, userId: session.user.id },
  });

  revalidatePath("/");
}
