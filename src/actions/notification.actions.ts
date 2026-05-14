"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Récupère les notifications de l'utilisateur.
 */
export async function getNotifications() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  return prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Marque une notification comme lue.
 */
export async function markAsRead(id: string) {
  await prisma.notification.update({
    where: { id },
    data: { lu: true },
  });

  revalidatePath("/dashboard");
}

/**
 * Marque toutes les notifications comme lues.
 */
export async function markAllAsRead() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  await prisma.notification.updateMany({
    where: { userId: session.user.id, lu: false },
    data: { lu: true },
  });

  revalidatePath("/dashboard");
}
