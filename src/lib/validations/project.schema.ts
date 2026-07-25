import { z } from "zod";
import { ProjectDomaine, ProjectStatut } from "@prisma/client";

/**
 * Schéma de validation d'un projet (création / édition).
 * Les valeurs sont pré-nettoyées côté action (nombres/dates convertis,
 * chaînes vides transformées en null) avant d'être validées ici.
 */
export const projectFormSchema = z.object({
  titre: z
    .string()
    .trim()
    .min(2, "Le titre doit contenir au moins 2 caractères.")
    .max(200, "Le titre est trop long."),
  description: z
    .string()
    .trim()
    .min(10, "La description doit contenir au moins 10 caractères."),
  domaine: z.nativeEnum(ProjectDomaine),
  statut: z.nativeEnum(ProjectStatut),
  budget: z
    .number()
    .min(0, "Le budget ne peut pas être négatif.")
    .nullable(),
  progression: z
    .number()
    .int()
    .min(0, "La progression va de 0 à 100.")
    .max(100, "La progression va de 0 à 100."),
  imageUrl: z.string().trim().max(500).nullable(),
  images: z.array(z.string()),
  localisation: z.string().trim().max(200).nullable(),
  dateDebut: z.date().nullable(),
  dateFin: z.date().nullable(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
