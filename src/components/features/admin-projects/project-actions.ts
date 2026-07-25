"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { projectFormSchema } from "@/lib/validations/project.schema";

export interface ProjectActionState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/** Construit un dictionnaire champ -> messages à partir d'une ZodError (compatible Zod 4). */
function toFieldErrors(error: ZodError): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    (result[key] ??= []).push(issue.message);
  }
  return result;
}

/** Convertit une valeur FormData en nombre ou null si vide/invalide. */
function toNumberOrNull(value: FormDataEntryValue | null): number | null {
  if (value === null) return null;
  const str = String(value).trim();
  if (str === "") return null;
  const n = Number(str);
  return Number.isNaN(n) ? null : n;
}

/** Convertit une valeur FormData (input date "YYYY-MM-DD") en Date ou null. */
function toDateOrNull(value: FormDataEntryValue | null): Date | null {
  if (value === null) return null;
  const str = String(value).trim();
  if (str === "") return null;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Convertit une chaîne éventuellement vide en null. */
function toStringOrNull(value: FormDataEntryValue | null): string | null {
  if (value === null) return null;
  const str = String(value).trim();
  return str === "" ? null : str;
}

/** Parse le champ caché "images" (JSON d'un tableau d'URLs). */
function parseImages(value: FormDataEntryValue | null): string[] {
  if (value === null) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function parseProjectForm(formData: FormData) {
  return projectFormSchema.safeParse({
    titre: String(formData.get("titre") ?? ""),
    description: String(formData.get("description") ?? ""),
    domaine: String(formData.get("domaine") ?? ""),
    statut: String(formData.get("statut") ?? ""),
    budget: toNumberOrNull(formData.get("budget")),
    progression: toNumberOrNull(formData.get("progression")) ?? 0,
    imageUrl: toStringOrNull(formData.get("imageUrl")),
    images: parseImages(formData.get("images")),
    localisation: toStringOrNull(formData.get("localisation")),
    dateDebut: toDateOrNull(formData.get("dateDebut")),
    dateFin: toDateOrNull(formData.get("dateFin")),
  });
}

export async function creerProjet(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return {
      error: "Certains champs sont invalides.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const created = await prisma.project.create({
    data: {
      titre: data.titre,
      description: data.description,
      domaine: data.domaine,
      statut: data.statut,
      budget: data.budget ?? 0,
      progression: data.progression,
      imageUrl: data.imageUrl,
      images: data.images,
      localisation: data.localisation,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
    },
    select: { id: true },
  });

  revalidatePath("/admin/systeme/publisher");
  redirect(`/admin/systeme/publisher/${created.id}/publication`);
}

export async function modifierProjet(
  projectId: string,
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  await requireAdmin();

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return {
      error: "Certains champs sont invalides.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  await prisma.project.update({
    where: { id: projectId },
    data: {
      titre: data.titre,
      description: data.description,
      domaine: data.domaine,
      statut: data.statut,
      budget: data.budget ?? 0,
      progression: data.progression,
      imageUrl: data.imageUrl,
      images: data.images,
      localisation: data.localisation,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
    },
  });

  revalidatePath("/admin/systeme/publisher");
  revalidatePath(`/admin/systeme/publisher/${projectId}/edition`);
  redirect("/admin/systeme/publisher");
}

export async function supprimerProjet(projectId: string): Promise<void> {
  await requireAdmin();

  // Les relations sont gérées au niveau schema :
  // ProjectComment / ProjectPlacement en cascade, FormRequest / Invoice en SetNull.
  await prisma.project.delete({ where: { id: projectId } });

  revalidatePath("/admin/systeme/publisher");
  redirect("/admin/systeme/publisher");
}
