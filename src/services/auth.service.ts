"use client";

import { authClient } from "@/lib/auth-client";

/**
 * @class ServiceAuth
 * @description Isole les appels Better Auth utilises par l'interface d'authentification.
 */
export class ServiceAuth {
  /**
   * Retourne un message d'erreur lisible pour l'interface.
   */
  static normaliserMessageErreur(
    erreur: { message?: string } | null | undefined,
    messageParDefaut: string,
  ): string {
    return erreur?.message || messageParDefaut;
  }

  /**
   * Declenche l'envoi d'un code OTP pour la connexion.
   */
  static async envoyerOtp(email: string) {
    return authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
  }

  /**
   * Verifie un code OTP puis ouvre une session si le code est valide.
   */
  static async verifierOtp(email: string, otp: string) {
    return authClient.signIn.emailOtp({
      email,
      otp,
    });
  }

  /**
   * Declenche l'envoi d'un magic link vers l'email demande.
   */
  static async envoyerLienMagique(email: string, callbackURL: string) {
    return authClient.signIn.magicLink({
      email,
      callbackURL,
    });
  }
}
