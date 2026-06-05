import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ServiceRedis } from "@/lib/redis";
import { toNextJsHandler } from "better-auth/next-js";
import { createHash } from "node:crypto";
import { z } from "zod";

const gestionnaireAuth = toNextJsHandler(auth);

const domainesJetablesBloques = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "sharklasers.com",
  "tempmail.com",
  "yopmail.com",
]);

const schemaDemandeOtp = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Adresse email invalide.")
    .refine((email) => {
      const domaine = email.split("@")[1] ?? "";
      return !domainesJetablesBloques.has(domaine);
    }, "Les adresses email jetables sont interdites."),
  type: z.enum([
    "sign-in",
    "change-email",
    "email-verification",
    "forget-password",
  ]),
});

const schemaVerificationOtp = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide."),
  otp: z.string().trim().length(6, "Le code OTP doit contenir 6 chiffres."),
});

/**
 * @class ServiceJournalAuth
 * @description Fournit les briques de hachage et d'audit pour les endpoints auth.
 */
class ServiceJournalAuth {
  /**
   * Hache une valeur sensible sans conserver sa version brute.
   */
  static hacherValeur(valeur: string): string {
    return createHash("sha256").update(valeur.trim().toLowerCase()).digest("hex");
  }

  /**
   * Hache un email pour indexer le journal d'audit.
   */
  static hacherEmail(email: string): string {
    return ServiceJournalAuth.hacherValeur(email);
  }

  /**
   * Hache un jeton magic link comme dans la configuration Better Auth.
   */
  static hacherJetonMagicLink(jeton: string): string {
    return createHash("sha256").update(jeton).digest("hex");
  }

  /**
   * Écrit un audit en arrière-plan pour ne pas retarder la réponse HTTP.
   */
  static journaliserEvenement(
    typeEvenement: string,
    email: string,
    options?: {
      adresseIp?: string | null;
      agentUtilisateur?: string | null;
      succes?: boolean;
      details?: Record<string, string | number | boolean | null>;
      utilisateurId?: string;
    },
  ): void {
    void prisma.authAuditLog
      .create({
        data: {
          typeEvenement,
          emailHash: ServiceJournalAuth.hacherEmail(email),
          adresseIp: options?.adresseIp ?? null,
          agentUtilisateur: options?.agentUtilisateur ?? null,
          succes: options?.succes ?? false,
          utilisateurId: options?.utilisateurId ?? null,
          details: options?.details,
        },
      })
      .catch((erreur: unknown) => {
        console.error("Erreur lors de l'ecriture de l'audit auth:", erreur);
      });
  }

  /**
   * Tente de retrouver l'email associé au jeton magic link avant vérification.
   */
  static async retrouverEmailMagicLink(
    jeton: string | null,
  ): Promise<string | null> {
    if (!jeton) {
      return null;
    }

    const jetonHache = ServiceJournalAuth.hacherJetonMagicLink(jeton);
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: jetonHache,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!verification) {
      return null;
    }

    try {
      const valeur = JSON.parse(verification.value) as {
        email?: string;
      };

      return typeof valeur.email === "string" ? valeur.email : null;
    } catch {
      return null;
    }
  }
}

/**
 * @class ServiceRouteOtp
 * @description Protège les endpoints OTP avec validation, quota Redis et verrou d'échecs.
 */
class ServiceRouteOtp {
  static readonly fenetreOtpEnSecondes = 300;
  static readonly maximumOtpParFenetre = 3;
  static readonly maximumEchecsConsecutifs = 5;
  static readonly dureeVerrouEnSecondes = 300;

  /**
   * Hache l'email pour éviter de l'exposer dans les clés Redis.
   */
  static hacherEmail(email: string): string {
    return ServiceJournalAuth.hacherEmail(email);
  }

  /**
   * Extrait le chemin Better Auth indépendamment de l'origine.
   */
  static extraireChemin(url: string): string {
    return new URL(url).pathname;
  }

  /**
   * Lit l'adresse IP source depuis les en-têtes proxy les plus courants.
   */
  static extraireAdresseIp(requete: Request): string {
    const adresseTransmise = requete.headers.get("x-forwarded-for");

    if (adresseTransmise) {
      return adresseTransmise.split(",")[0]?.trim() || "inconnue";
    }

    return requete.headers.get("x-real-ip") || "inconnue";
  }

  /**
   * Extrait l'agent utilisateur de manière sûre.
   */
  static extraireAgentUtilisateur(requete: Request): string | null {
    return requete.headers.get("user-agent");
  }

  /**
   * Retourne une réponse JSON homogène pour les refus de sécurité.
   */
  static construireReponseErreur(message: string, statut: number): Response {
    return Response.json({ error: message }, { status: statut });
  }

  /**
   * Construit les clés Redis du quota OTP pour l'email et l'adresse IP.
   */
  static construireClesQuota(email: string, adresseIp: string): string[] {
    const emailHash = ServiceRouteOtp.hacherEmail(email);

    return [
      `auth:otp:quota:email:${emailHash}`,
      `auth:otp:quota:ip:${adresseIp}`,
    ];
  }

  /**
   * Construit les clés Redis de verrou temporaire après plusieurs échecs.
   */
  static construireClesVerrou(email: string, adresseIp: string): string[] {
    const emailHash = ServiceRouteOtp.hacherEmail(email);

    return [
      `auth:otp:verrou:email:${emailHash}`,
      `auth:otp:verrou:ip:${adresseIp}`,
    ];
  }

  /**
   * Construit les clés Redis de comptage des échecs OTP.
   */
  static construireClesEchec(email: string, adresseIp: string): string[] {
    const emailHash = ServiceRouteOtp.hacherEmail(email);

    return [
      `auth:otp:echec:email:${emailHash}`,
      `auth:otp:echec:ip:${adresseIp}`,
    ];
  }

  /**
   * Incrémente les quotas OTP et refuse la requête au-delà de 3 envois sur 5 minutes.
   */
  static async appliquerRateLimitEnvoiOtp(
    email: string,
    adresseIp: string,
  ): Promise<Response | null> {
    if (!ServiceRedis.estDisponible()) {
      return null;
    }

    for (const cle of ServiceRouteOtp.construireClesQuota(email, adresseIp)) {
      const compteur = await ServiceRedis.incrementer(cle);

      if (compteur === 1) {
        await ServiceRedis.definirExpiration(
          cle,
          ServiceRouteOtp.fenetreOtpEnSecondes,
        );
      }

      if (compteur > ServiceRouteOtp.maximumOtpParFenetre) {
        return ServiceRouteOtp.construireReponseErreur(
          "Trop de demandes OTP. Reessayez dans 5 minutes.",
          429,
        );
      }
    }

    return null;
  }

  /**
   * Vérifie si l'email ou l'adresse IP est actuellement verrouillé.
   */
  static async verifierVerrouOtp(
    email: string,
    adresseIp: string,
  ): Promise<Response | null> {
    if (!ServiceRedis.estDisponible()) {
      return null;
    }

    for (const cle of ServiceRouteOtp.construireClesVerrou(email, adresseIp)) {
      const verrou = await ServiceRedis.lireTexte(cle);

      if (verrou) {
        return ServiceRouteOtp.construireReponseErreur(
          "Trop de tentatives OTP echouees. Reessayez dans 5 minutes.",
          423,
        );
      }
    }

    return null;
  }

  /**
   * Enregistre un échec OTP et pose un verrou temporaire au 5e échec.
   */
  static async enregistrerEchecOtp(
    email: string,
    adresseIp: string,
  ): Promise<void> {
    if (!ServiceRedis.estDisponible()) {
      return;
    }

    for (const cle of ServiceRouteOtp.construireClesEchec(email, adresseIp)) {
      const compteur = await ServiceRedis.incrementer(cle);

      if (compteur === 1) {
        await ServiceRedis.definirExpiration(
          cle,
          ServiceRouteOtp.dureeVerrouEnSecondes,
        );
      }

      if (compteur >= ServiceRouteOtp.maximumEchecsConsecutifs) {
        const cleVerrou = cle.replace(":echec:", ":verrou:");
        await ServiceRedis.ecrireTexte(
          cleVerrou,
          "1",
          ServiceRouteOtp.dureeVerrouEnSecondes,
        );
      }
    }
  }

  /**
   * Réinitialise les compteurs d'échec après une vérification OTP réussie.
   */
  static async reinitialiserEchecsOtp(
    email: string,
    adresseIp: string,
  ): Promise<void> {
    if (!ServiceRedis.estDisponible()) {
      return;
    }

    for (const cle of ServiceRouteOtp.construireClesEchec(email, adresseIp)) {
      await ServiceRedis.supprimer(cle);
    }

    for (const cle of ServiceRouteOtp.construireClesVerrou(email, adresseIp)) {
      await ServiceRedis.supprimer(cle);
    }
  }
}

/**
 * @class ServiceRouteMagicLink
 * @description Centralise l'audit du cycle de verification des magic links.
 */
class ServiceRouteMagicLink {
  /**
   * Détermine si la route courante correspond à la vérification du magic link.
   */
  static estRouteVerificationMagicLink(chemin: string): boolean {
    return chemin.endsWith("/magic-link/verify");
  }

  /**
   * Détermine si la réponse représente une vérification réussie.
   */
  static estVerificationReussie(reponse: Response): boolean {
    const emplacement = reponse.headers.get("location");

    if (emplacement?.includes("error=")) {
      return false;
    }

    return reponse.ok || reponse.status >= 300 && reponse.status < 400;
  }

  /**
   * Journalise la vérification si le jeton a réellement produit une session.
   */
  static journaliserVerification(
    email: string | null,
    requete: Request,
    reponse: Response,
  ): void {
    if (!email || !ServiceRouteMagicLink.estVerificationReussie(reponse)) {
      return;
    }

    ServiceJournalAuth.journaliserEvenement("MAGIC_LINK_VERIFIED", email, {
      adresseIp: ServiceRouteOtp.extraireAdresseIp(requete),
      agentUtilisateur: ServiceRouteOtp.extraireAgentUtilisateur(requete),
      succes: true,
      details: {
        statutHttp: reponse.status,
      },
    });
  }
}

export const PATCH = gestionnaireAuth.PATCH;
export const PUT = gestionnaireAuth.PUT;
export const DELETE = gestionnaireAuth.DELETE;

export async function GET(requete: Request): Promise<Response> {
  const chemin = ServiceRouteOtp.extraireChemin(requete.url);

  if (!ServiceRouteMagicLink.estRouteVerificationMagicLink(chemin)) {
    return gestionnaireAuth.GET(requete);
  }

  const urlRequete = new URL(requete.url);
  const jeton = urlRequete.searchParams.get("token");
  const email = await ServiceJournalAuth.retrouverEmailMagicLink(jeton);
  const reponse = await gestionnaireAuth.GET(requete);

  ServiceRouteMagicLink.journaliserVerification(email, requete, reponse);

  return reponse;
}

export async function POST(requete: Request): Promise<Response> {
  const chemin = ServiceRouteOtp.extraireChemin(requete.url);

  if (chemin.endsWith("/email-otp/send-verification-otp")) {
    const corps = await requete.clone().json();
    const donnees = schemaDemandeOtp.safeParse(corps);

    if (!donnees.success) {
      return ServiceRouteOtp.construireReponseErreur(
        donnees.error.issues[0]?.message || "Requete OTP invalide.",
        400,
      );
    }

    const adresseIp = ServiceRouteOtp.extraireAdresseIp(requete);
    const reponseBlocage = await ServiceRouteOtp.verifierVerrouOtp(
      donnees.data.email,
      adresseIp,
    );

    if (reponseBlocage) {
      return reponseBlocage;
    }

    const reponseLimite = await ServiceRouteOtp.appliquerRateLimitEnvoiOtp(
      donnees.data.email,
      adresseIp,
    );

    if (reponseLimite) {
      return reponseLimite;
    }
  }

  if (chemin.endsWith("/sign-in/email-otp")) {
    const corps = await requete.clone().json();
    const donnees = schemaVerificationOtp.safeParse(corps);

    if (!donnees.success) {
      return ServiceRouteOtp.construireReponseErreur(
        donnees.error.issues[0]?.message || "Verification OTP invalide.",
        400,
      );
    }

    const adresseIp = ServiceRouteOtp.extraireAdresseIp(requete);
    const reponseBlocage = await ServiceRouteOtp.verifierVerrouOtp(
      donnees.data.email,
      adresseIp,
    );

    if (reponseBlocage) {
      return reponseBlocage;
    }

    const reponse = await gestionnaireAuth.POST(requete);

    if (reponse.ok) {
      await ServiceRouteOtp.reinitialiserEchecsOtp(
        donnees.data.email,
        adresseIp,
      );
      return reponse;
    }

    await ServiceRouteOtp.enregistrerEchecOtp(donnees.data.email, adresseIp);
    return reponse;
  }

  return gestionnaireAuth.POST(requete);
}
