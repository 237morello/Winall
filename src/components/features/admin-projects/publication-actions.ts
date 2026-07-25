"use server";

import { revalidatePath } from "next/cache";
import { PlacementZone } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

/** Rafraîchit les surfaces publiques impactées par un changement de publication. */
function revalidatePublicSurfaces() {
  revalidatePath("/");
  revalidatePath("/projets");
  revalidatePath("/services");
  // Revalide toutes les pages service détail (projets par sous-service).
  revalidatePath("/services/[serviceSlug]", "page");
}

/**
 * Publie ou dépublie un projet.
 * La date `publishedAt` est posée à la première publication et conservée ensuite
 * (elle représente la date de première mise en ligne, jamais réécrite).
 */
export async function definirPublication(
  projectId: string,
  publier: boolean,
): Promise<void> {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { publishedAt: true },
  });
  if (!project) throw new Error("Projet introuvable.");

  await prisma.project.update({
    where: { id: projectId },
    data: {
      isPublished: publier,
      publishedAt:
        publier && !project.publishedAt ? new Date() : project.publishedAt,
    },
  });

  revalidatePath(`/admin/systeme/publisher/${projectId}/publication`);
  revalidatePath("/admin/systeme/publisher");
  revalidatePublicSurfaces();
}

export interface PlacementInput {
  projectId: string;
  zone: PlacementZone;
  /** Requis (non-null) uniquement quand zone = SOUS_SERVICE. */
  subServiceSlug: string | null;
  actif: boolean;
  ordre: number;
}

/**
 * Active/désactive un emplacement d'un projet dans une zone (avec ordre),
 * ou le supprime si `actif` est false. Idempotent grâce à la contrainte unique
 * (projectId, zone, subServiceSlug).
 */
export async function definirPlacement(input: PlacementInput): Promise<void> {
  await requireAdmin();

  const { projectId, zone, actif } = input;
  const subServiceSlug =
    zone === PlacementZone.SOUS_SERVICE ? input.subServiceSlug : null;
  const ordre = Number.isFinite(input.ordre) ? Math.trunc(input.ordre) : 0;

  if (zone === PlacementZone.SOUS_SERVICE && !subServiceSlug) {
    throw new Error("subServiceSlug requis pour un placement de sous-service.");
  }

  if (actif) {
    // On n'utilise pas upsert : la contrainte unique porte sur une colonne
    // nullable (subServiceSlug), que Postgres traite comme distincte pour NULL.
    // findFirst + update/create gère correctement les zones globales (null).
    const existing = await prisma.projectPlacement.findFirst({
      where: { projectId, zone, subServiceSlug },
      select: { id: true },
    });
    if (existing) {
      await prisma.projectPlacement.update({
        where: { id: existing.id },
        data: { ordre },
      });
    } else {
      await prisma.projectPlacement.create({
        data: { projectId, zone, subServiceSlug, ordre },
      });
    }
  } else {
    await prisma.projectPlacement.deleteMany({
      where: { projectId, zone, subServiceSlug },
    });
  }

  revalidatePath(`/admin/systeme/publisher/${projectId}/publication`);
  revalidatePublicSurfaces();
}
