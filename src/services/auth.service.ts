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
    const message = erreur?.message?.trim();
    if (!message) return messageParDefaut;

    const messageMinuscule = message.toLowerCase();
    const correspondances: Array<[string[], string]> = [
      [["invalid otp", "invalid code", "otp is invalid", "code is invalid"], "Le code saisi est invalide. Verifiez les 6 chiffres puis reessayez."],
      [["expired", "expire"], "Ce code a expire. Renvoyez un nouveau code pour continuer."],
      [["too many", "rate limit", "too_many"], "Trop de tentatives. Patientez quelques instants avant de reessayer."],
      [["email", "not found"], "Aucun acces n'est associe a cet email."],
      [["network", "fetch"], "La connexion au service d'authentification a echoue. Reessayez dans un instant."],
    ];

    const correspondance = correspondances.find(([motifs]) =>
      motifs.some((motif) => messageMinuscule.includes(motif)),
    );

    return correspondance?.[1] || message;
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
  static async verifierOtp(email: string, otp: string, name?: string) {
    const nomNettoye = name?.trim();

    return authClient.signIn.emailOtp({
      email,
      otp,
      ...(nomNettoye ? { name: nomNettoye } : {}),
    });
  }

  /**
   * Declenche l'envoi d'un magic link vers l'email demande.
   */
  static async envoyerLienMagique(email: string, callbackURL: string, name?: string) {
    const nomNettoye = name?.trim();

    return authClient.signIn.magicLink({
      email,
      callbackURL,
      ...(nomNettoye ? { name: nomNettoye } : {}),
    });
  }
}
