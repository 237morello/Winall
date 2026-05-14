"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
















const formRequestSchema = z.object({
  type: z.enum(["DEVIS", "INTERVENTION", "CONTACT"]),
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  donnees: z.record(z.any()),
  projectId: z.string().optional(),
});

/**
 * Soumet un nouveau formulaire.
 */
export async function submitFormRequest(data: z.infer<typeof formRequestSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const validatedData = formRequestSchema.parse(data);

  const request = await prisma.formRequest.create({
    data: {
      type: validatedData.type,
      nom: validatedData.nom,
      email: validatedData.email,
      telephone: validatedData.telephone,
      donnees: validatedData.donnees,
      userId: session?.user?.id,
      projectId: validatedData.projectId,
    },
  });

  // Créer une notification pour l'admin
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" } });
  for (const admin of admins) {
    await prisma.notification.create({
      data: {
        userId: admin.id,
        type: "NOUVEAU_FORMULAIRE",
        titre: `Nouvelle demande : ${validatedData.type}`,
        message: `De ${validatedData.nom} (${validatedData.email})`,
        lienUrl: `/dashboard/${admin.id}/admin/requests`,
      },
    });
  }

  revalidatePath("/dashboard");
  return { success: true, id: request.id };
}

/**
 * Récupère les demandes en attente (Admin uniquement).
 */
export async function getFormRequests() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") throw new Error("Accès refusé");

  return prisma.formRequest.findMany({
    include: { user: true, project: true },
    orderBy: { createdAt: "desc" },
  });
}
