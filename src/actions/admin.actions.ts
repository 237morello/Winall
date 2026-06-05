"use server";

import prisma from "@/lib/prisma";
import type { FormStatut, ProjectStatut } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

/**
 * Met à jour le statut d'un projet.
 */
export async function updateProjectStatus(projectId: string, statut: ProjectStatut) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { statut },
    });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Erreur updateProjectStatus:", error);
    return { success: false, error: "Impossible de mettre à jour le projet." };
  }
}

/**
 * Met à jour le statut d'une demande de formulaire.
 */
export async function updateFormRequestStatus(requestId: string, statut: FormStatut) {
  try {
    await prisma.formRequest.update({
      where: { id: requestId },
      data: { statut },
    });
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error("Erreur updateFormRequestStatus:", error);
    return { success: false, error: "Impossible de mettre à jour la demande." };
  }
}
