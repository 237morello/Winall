import { z } from "zod";

// ============================================================
// SCHÉMAS DE VALIDATION (ZOD)
// ============================================================

export const BaseFormSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
});

export const QuoteFormSchema = BaseFormSchema.extend({
  type: z.literal("DEVIS"),
  projectId: z.string().uuid("Identifiant de projet invalide").optional(), // ID du projet Winall qui a captivé l'utilisateur
  donnees: z.object({
    domaineInteret: z.enum(["BTP", "RESEAU", "VIDEOSURVEILLANCE", "CONTROLE_ACCES", "SECURITE_INCENDIE", "TELEPHONIE_IP", "IT"]),
    budgetEstimatif: z.string().optional(),
    descriptionBesoin: z.string().min(10, "Veuillez décrire votre besoin avec plus de détails"),
    localisation: z.string().min(2, "La ville ou localisation est requise"),
    imageReferenceUrl: z.string().url().optional(), // Image envoyée par l'utilisateur pour montrer ce qu'il veut
  }),
});

export const InterventionFormSchema = BaseFormSchema.extend({
  type: z.literal("INTERVENTION"),
  projectId: z.string().uuid("Identifiant de projet invalide"),
  donnees: z.object({
    niveauUrgence: z.enum(["FAIBLE", "MOYEN", "CRITIQUE"]),
    descriptionProbleme: z.string().min(10, "Veuillez décrire le problème rencontré"),
  }),
});

export const ContactFormSchema = BaseFormSchema.extend({
  type: z.literal("CONTACT"),
  donnees: z.object({
    sujet: z.string().min(3, "Le sujet est requis"),
    messageContenu: z.string().min(10, "Votre message est trop court"),
  }),
});
