"use server";

/**
 * Server Actions — Messagerie Privée
 * Permet à l'Admin de contacter un client et vice-versa.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const MessageSchema = z.object({
  receiverUserId: z.string().min(1, "Destinataire requis"),
  contenu: z.string().min(1, "Le message ne peut pas être vide"),
});

/** Envoie un message privé à un autre utilisateur */
export async function envoyerMessage(receiverUserId: string, contenu: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  const donnees = MessageSchema.parse({ receiverUserId, contenu });

  // Vérifier que le destinataire existe
  const destinataire = await prisma.user.findUnique({ where: { id: donnees.receiverUserId } });
  if (!destinataire) throw new Error("Destinataire introuvable");

  const message = await prisma.message.create({
    data: {
      contenu: donnees.contenu.trim(),
      senderUserId: session.user.id,
      receiverUserId: donnees.receiverUserId,
    },
  });

  // Notifier le destinataire
  await prisma.notification.create({
    data: {
      type: "NOUVEAU_MESSAGE",
      titre: `💬 Nouveau message de ${session.user.name}`,
      message: contenu.slice(0, 100) + (contenu.length > 100 ? "..." : ""),
      lienUrl: `/messages/${session.user.id}`,
      userId: donnees.receiverUserId,
    },
  });

  revalidatePath("/messages");
  revalidatePath("/dashboard/messages");

  return message;
}

/** Récupère la conversation entre deux utilisateurs */
export async function getConversation(autreUserId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  // Marquer les messages reçus comme lus
  await prisma.message.updateMany({
    where: {
      senderUserId: autreUserId,
      receiverUserId: session.user.id,
      lu: false,
    },
    data: { lu: true },
  });

  return prisma.message.findMany({
    where: {
      OR: [
        { senderUserId: session.user.id, receiverUserId: autreUserId },
        { senderUserId: autreUserId, receiverUserId: session.user.id },
      ],
    },
    include: {
      senderUser: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

/** Récupère la liste des conversations de l'utilisateur connecté */
export async function getMesConversations() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  // Récupère le dernier message de chaque conversation
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderUserId: session.user.id },
        { receiverUserId: session.user.id },
      ],
    },
    include: {
      senderUser: { select: { id: true, name: true, image: true } },
      receiverUser: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    distinct: ["senderUserId", "receiverUserId"],
  });

  return messages;
}

/** Compte les messages non lus */
export async function getNombreMessagesNonLus() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return 0;

  return prisma.message.count({
    where: { receiverUserId: session.user.id, lu: false },
  });
}
