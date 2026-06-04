"use server";

/**
 * Server Actions — Messagerie Privée
 * 
 * Gère les échanges entre les clients et l'équipe administrative de Winall Tech.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { EmailService } from "@/services/email.service";

// ============================================================
// SCHÉMA DE VALIDATION (ZOD)
// ============================================================

const MessageSchema = z.object({
  receiverId: z.string().min(1, "Destinataire requis"),
  content: z.string().min(1, "Le message ne peut pas être vide"),
});

// ============================================================
// ACTIONS DE MESSAGERIE
// ============================================================

/**
 * Envoie un message privé.
 */
export async function sendMessage(data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const validated = MessageSchema.parse(data);
  const senderId = session?.user?.id || "guest-dev";
  const senderName = session?.user?.name || "Expert Winall";

  const message = await prisma.message.create({
    data: {
      contenu: validated.content.trim(),
      senderUserId: senderId,
      receiverUserId: validated.receiverId,
    },
    include: { 
      senderUser: { select: { name: true } },
      receiverUser: { select: { email: true } } 
    }
  });

  // 1. Notification interne (BBD)
  await prisma.notification.create({
    data: {
      userId: validated.receiverId,
      type: "NOUVEAU_MESSAGE",
      titre: `💬 Message de ${senderName}`,
      message: validated.content.slice(0, 100) + (validated.content.length > 100 ? "..." : ""),
      lienUrl: `/dashboard/chat/${senderId}`,
    },
  });

  // 2. Notification Email (si possible)
  if (message.receiverUser?.email) {
    await EmailService.envoyerNotificationMessage(
      message.receiverUser.email,
      senderName,
      validated.content.slice(0, 100) + "..."
    ).catch(err => console.error("Erreur envoi email message:", err));
  }

  revalidatePath("/dashboard/chat");
  return { success: true, message };
}

/**
 * Récupère les messages d'une conversation spécifique.
 */
export async function getMessages(otherUserId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserId = session?.user?.id || "guest-dev";

  // Marquer comme lus les messages reçus de cet utilisateur
  await prisma.message.updateMany({
    where: {
      senderUserId: otherUserId,
      receiverUserId: currentUserId,
      lu: false,
    },
    data: { lu: true },
  });

  return prisma.message.findMany({
    where: {
      OR: [
        { senderUserId: currentUserId, receiverUserId: otherUserId },
        { senderUserId: otherUserId, receiverUserId: currentUserId },
      ],
    },
    include: {
      senderUser: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

/**
 * Récupère la liste des conversations (utilisateurs avec qui on a échangé).
 */
export async function getConversations() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Pour le développement : si non connecté, on retourne toutes les conversations clients (comportement Admin)
  if (!session?.user) {
    return prisma.user.findMany({
      where: { role: "CLIENT" },
      include: {
        messagesSent: { orderBy: { createdAt: "desc" }, take: 1 },
        messagesReceived: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
  }

  const role = (session.user as { role?: string }).role?.toUpperCase();
  const currentUserId = session.user.id;

  // Pour l'Admin : liste tous les clients avec qui il y a eu échange
  if (role === "ADMIN") {
    return prisma.user.findMany({
      where: {
        OR: [
          { messagesSent: { some: { receiverUserId: currentUserId } } },
          { messagesReceived: { some: { senderUserId: currentUserId } } },
        ],
        role: "CLIENT",
      },
      include: {
        messagesSent: { orderBy: { createdAt: "desc" }, take: 1 },
        messagesReceived: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
  }

  // Pour un Client : seulement les Admins
  return prisma.user.findMany({
    where: {
      OR: [
        { messagesSent: { some: { receiverUserId: currentUserId } } },
        { messagesReceived: { some: { senderUserId: currentUserId } } },
      ],
      role: "ADMIN",
    },
    include: {
      messagesSent: { orderBy: { createdAt: "desc" }, take: 1 },
      messagesReceived: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

/**
 * Compte les messages non lus globalement pour l'utilisateur.
 */
export async function getUnreadMessagesCount() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session?.user) return 0;

  return prisma.message.count({
    where: { receiverUserId: session.user.id, lu: false },
  });
}

/**
 * Récupère l'ID du support administratif.
 */
export async function getSupportAdminId() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });
  return admin?.id ?? "";
}
