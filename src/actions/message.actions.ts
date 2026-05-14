"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const messageSchema = z.object({
  receiverId: z.string(),
  contenu: z.string().min(1),
});

/**
 * Récupère les messages entre l'utilisateur actuel et un autre.
 */
export async function getMessages(otherUserId?: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  const currentUserId = session.user.id;
  const role = (session.user as { role?: string }).role?.toUpperCase();

  // Si c'est un client, il ne peut parler qu'à l'admin
  if (role !== "ADMIN") {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) return [];

    return prisma.message.findMany({
      where: {
        OR: [
          { senderUserId: currentUserId, receiverUserId: admin.id },
          { senderUserId: admin.id, receiverUserId: currentUserId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  // Si c'est l'admin et qu'un otherUserId est fourni
  if (otherUserId) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderUserId: currentUserId, receiverUserId: otherUserId },
          { senderUserId: otherUserId, receiverUserId: currentUserId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  return [];
}

import { EmailService } from "@/services/email.service";

/**
 * Envoie un message.
 */
export async function sendMessage(data: z.infer<typeof messageSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Non autorisé");

  const validatedData = messageSchema.parse(data);

  const message = await prisma.message.create({
    data: {
      contenu: validatedData.contenu,
      senderUserId: session.user.id,
      receiverUserId: validatedData.receiverId,
    },
    include: { receiverUser: true, senderUser: true }
  });

  // Notification Email au destinataire
  if (message.receiverUser?.email) {
    await EmailService.envoyerNotificationMessage(
      message.receiverUser.email,
      message.senderUser.name,
      message.contenu.substring(0, 100) + "..."
    );
  }

  revalidatePath("/dashboard");
  return { success: true, message };
}

/**
 * Récupère l'identifiant du compte administrateur support.
 */
export async function getSupportAdminId() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  return admin?.id ?? "";
}

/**
 * Récupère la liste des conversations (Admin uniquement).
 */
export async function getConversations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Accès réservé");

  // Récupère tous les utilisateurs qui ont envoyé ou reçu des messages
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { messagesSent: { some: { receiverUserId: session?.user.id } } },
        { messagesReceived: { some: { senderUserId: session?.user.id } } },
      ],
      role: "CLIENT",
    },
    include: {
      messagesSent: { orderBy: { createdAt: "desc" }, take: 1 },
      messagesReceived: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return users;
}
