import { z } from "zod";

/**
 * @description Schéma de validation pour l'étape de saisie de l'email.
 */
export const emailSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide."),
});

/**
 * @description Schéma de validation pour l'étape de saisie de l'OTP.
 */
export const otpSchema = z.object({
  otp: z.string().length(6, "Le code doit contenir exactement 6 chiffres."),
});

/**
 * Alias conserves pour les composants qui attendent encore l'ancienne nomenclature.
 */
export const signInSchema = emailSchema;
export const signUpSchema = emailSchema;
export const magicLinkSchema = emailSchema;

export type EmailFormValues = z.infer<typeof emailSchema>;
export type OTPFormValues = z.infer<typeof otpSchema>;
