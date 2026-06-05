"use server";

/**
 * Server Actions — Statistiques Dashboard
 */

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getDashboardStats() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Pour le développement : si non connecté, on retourne les stats globales
  if (!session?.user) {
    const [totalProjects, activeProjects, pendingForms, totalRevenue] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { statut: "EN_COURS" } }),
      prisma.formRequest.count({ where: { statut: "NON_LU" } }),
      prisma.invoice.aggregate({
        where: { statut: "PAYE" },
        _sum: { montant: true },
      }),
    ]);

    return {
      totalProjects,
      activeProjects,
      pendingForms,
      totalRevenue: totalRevenue._sum.montant || 0,
    };
  }

  const role = (session.user as { role?: string }).role?.toUpperCase();
  const userId = session.user.id;

  if (role === "ADMIN") {
    const [totalProjects, activeProjects, pendingForms, totalRevenue] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { statut: "EN_COURS" } }),
      prisma.formRequest.count({ where: { statut: "NON_LU" } }),
      prisma.invoice.aggregate({
        where: { statut: "PAYE" },
        _sum: { montant: true },
      }),
    ]);

    return {
      totalProjects,
      activeProjects,
      pendingForms,
      totalRevenue: totalRevenue._sum.montant || 0,
    };
  }

  // Stats pour un Client
  const [myProjects, myPendingQuotes, myUnreadMessages, myInvoices] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.formRequest.count({ where: { userId, type: "DEVIS", statut: "NON_LU" } }),
    prisma.message.count({ where: { receiverUserId: userId, lu: false } }),
    prisma.invoice.count({ where: { userId, statut: "EN_RETARD" } }),
  ]);

  return {
    myProjects,
    myPendingQuotes,
    myUnreadMessages,
    myInvoicesInArrears: myInvoices,
  };
}
