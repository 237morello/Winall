"use server";

/**
 * Server Actions — Gestion des Factures
 * 
 * Permet de gérer le cycle de vie des factures Winall Tech.
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { InvoiceStatut } from "@/lib/generated/prisma";

const InvoiceSchema = z.object({
  numero: z.string().min(3),
  montant: z.number().positive(),
  statut: z.enum(["BROUILLON", "ENVOYE", "PAYE", "EN_RETARD", "ANNULE"]).default("BROUILLON"),
  dateEcheance: z.date(),
  userId: z.string(),
  projectId: z.string().optional(),
});

export type InvoiceInput = z.infer<typeof InvoiceSchema>;

/**
 * Récupère les factures selon le rôle de l'utilisateur.
 */
export async function getInvoices() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non authentifié");

  const role = (session.user as { role?: string }).role?.toUpperCase();

  if (role === "ADMIN") {
    return prisma.invoice.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, titre: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: {
      project: { select: { id: true, titre: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Crée une nouvelle facture (ADMIN ONLY).
 */
export async function createInvoice(data: InvoiceInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  const validated = InvoiceSchema.parse(data);

  const invoice = await prisma.invoice.create({
    data: {
      ...validated,
      statut: validated.statut as InvoiceStatut,
    },
  });

  revalidatePath("/dashboard/invoices");
  return { success: true, invoice };
}

/**
 * Met à jour le statut d'une facture.
 */
export async function updateInvoiceStatus(id: string, statut: InvoiceStatut) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  
  if (role !== "ADMIN") throw new Error("Accès refusé");

  await prisma.invoice.update({
    where: { id },
    data: { statut },
  });

  revalidatePath("/dashboard/invoices");
  return { success: true };
}
