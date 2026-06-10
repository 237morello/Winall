import { z } from "zod";

/**
 * @description Schema de validation pour l'etape de saisie de l'email.
 */
export const emailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
});

export const authEmailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
  name: z.string().trim().optional(),
});

export const authEmailSignUpSchema = authEmailSchema.extend({
  name: z.string().trim().min(2, "Veuillez entrer votre nom complet."),
});

export const magicLinkSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
  name: z.string().trim().optional(),
});

export const magicLinkSignUpSchema = magicLinkSchema.extend({
  name: z.string().trim().min(2, "Veuillez entrer votre nom complet."),
});

/**
 * @description Schema de validation pour l'etape de saisie de l'OTP.
 */
export const otpSchema = z.object({
  otp: z.string().length(6, "Le code doit contenir exactement 6 chiffres."),
});

/**
 * Alias conserves pour les composants qui attendent encore l'ancienne nomenclature.
 */
export const signInSchema = emailSchema;
export const signUpSchema = emailSchema;

export type EmailFormValues = z.infer<typeof emailSchema>;
export type AuthEmailFormValues = z.infer<typeof authEmailSchema>;
export type MagicLinkFormValues = z.infer<typeof magicLinkSchema>;
export type OTPFormValues = z.infer<typeof otpSchema>;
