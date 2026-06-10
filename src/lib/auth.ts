import "server-only";

import { render } from "@react-email/render";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, magicLink } from "better-auth/plugins";
import { createHash, randomInt } from "node:crypto";
import { Resend } from "resend";
import MagicLinkEmail from "../../emails/magic-link-template";
import OTPEmail from "../../emails/otp-template";
import prisma from "./prisma";
import { stockageSecondaireRedis } from "./redis";

const urlApplication =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const resend = new Resend(process.env.RESEND_API_KEY);

const providerGoogle =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    : undefined;

const providerGithub =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }
    : undefined;

/**
 * @class ServiceAuthInfrastructure
 * @description Centralise les briques transverses de l'authentification serveur.
 */
class ServiceAuthInfrastructure {
  /**
   * Construit une liste d'origines de confiance sans doublons.
   */
  static construireOriginesDeConfiance(): string[] {
    const origines = [
      urlApplication,
      process.env.NEXT_PUBLIC_APP_URL,
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3002",
    ].filter((origine): origine is string => Boolean(origine));

    return [...new Set(origines)];
  }

  /**
   * Hache une valeur sensible en SHA-256 pour éviter son stockage en clair.
   */
  static hacherValeur(valeur: string): string {
    return createHash("sha256").update(valeur.trim().toLowerCase()).digest("hex");
  }

  /**
   * Hache un email pour éviter de stocker la donnée brute dans les journaux.
   */
  static hacherEmail(email: string): string {
    return ServiceAuthInfrastructure.hacherValeur(email);
  }

  /**
   * Hache un jeton de magic link avant son stockage.
   */
  static hacherJeton(jeton: string): string {
    return createHash("sha256").update(jeton).digest("hex");
  }

  /**
   * Extrait l'adresse IP depuis les en-têtes de la requête d'authentification.
   */
  static extraireAdresseIp(request: Request | undefined): string | null {
    if (!request) {
      return null;
    }

    const adresseTransmise = request.headers.get("x-forwarded-for");

    if (adresseTransmise) {
      return adresseTransmise.split(",")[0]?.trim() ?? null;
    }

    return request.headers.get("x-real-ip");
  }

  /**
   * Ecrit un événement d'audit en arrière-plan pour ne pas ralentir la réponse.
   */
  static journaliserEvenementAuth(
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
          emailHash: ServiceAuthInfrastructure.hacherEmail(email),
          adresseIp: options?.adresseIp ?? null,
          agentUtilisateur: options?.agentUtilisateur ?? null,
          succes: options?.succes ?? false,
          utilisateurId: options?.utilisateurId ?? null,
          details: options?.details,
        },
      })
      .catch((erreur: unknown) => {
        console.error("Erreur lors de l'ecriture du journal d'audit:", erreur);
      });
  }
}

/**
 * @class ServiceOtp
 * @description Gère la génération, le stockage sécurisé et la livraison des OTP.
 */
class ServiceOtp {
  static readonly dureeExpirationEnSecondes = 300;
  static readonly longueurOtp = 6;

  /**
   * Génère un code OTP strictement numérique sur 6 chiffres.
   */
  static genererCodeOtp(): string {
    return `${randomInt(0, 1_000_000)}`.padStart(
      ServiceOtp.longueurOtp,
      "0",
    );
  }

  /**
   * Hache le code OTP avant stockage pour éviter toute lecture en clair.
   */
  static async hacherOtp(otp: string): Promise<string> {
    return createHash("sha256").update(otp).digest("hex");
  }

  /**
   * Rend le template React Email puis déclenche l'envoi Resend sans bloquer la requête.
   */
  static envoyerOtpParCourriel(email: string, otp: string): void {
    void Promise.resolve()
      .then(async () => {
        const html = await render(
          OTPEmail({
            otp,
            dureeExpirationEnMinutes:
              ServiceOtp.dureeExpirationEnSecondes / 60,
          }),
        );

        await resend.emails.send({
          from:
            process.env.EMAIL_FROM || "Winall Tech <onboarding@resend.dev>",
          to: email,
          subject: "Votre code de verification Winall",
          html,
        });
      })
      .catch((erreur: unknown) => {
        console.error("Erreur lors de l'envoi de l'OTP:", erreur);
      });
  }
}

/**
 * @class ServiceMagicLink
 * @description Gère la livraison sécurisée des liens de connexion à usage unique.
 */
class ServiceMagicLink {
  static readonly dureeExpirationEnSecondes = 300;
  static readonly nombreTentativesAutorisees = 1;
  static readonly cheminRedirectionDefaut = "/dashboard";

  /**
   * Hache le jeton envoyé à l'utilisateur avant son stockage en base.
   */
  static async hacherJeton(jeton: string): Promise<string> {
    return ServiceAuthInfrastructure.hacherJeton(jeton);
  }

  /**
   * Force une redirection dashboard si le callback est absent ou vide.
   */
  static construireUrlDeConnexion(url: string): string {
    const urlConnexion = new URL(url);
    const callbackURL = urlConnexion.searchParams.get("callbackURL");

    if (!callbackURL) {
      urlConnexion.searchParams.set(
        "callbackURL",
        ServiceMagicLink.cheminRedirectionDefaut,
      );
    }

    return urlConnexion.toString();
  }

  /**
   * Rend le template React Email puis déclenche l'envoi Resend sans bloquer la requête.
   */
  static envoyerLienParCourriel(email: string, url: string): void {
    void Promise.resolve()
      .then(async () => {
        const html = await render(
          MagicLinkEmail({
            url,
            dureeExpirationEnMinutes:
              ServiceMagicLink.dureeExpirationEnSecondes / 60,
          }),
        );

        await resend.emails.send({
          from:
            process.env.EMAIL_FROM || "Winall Tech <onboarding@resend.dev>",
          to: email,
          subject: "Votre lien de connexion Winall",
          html,
        });
      })
      .catch((erreur: unknown) => {
        console.error("Erreur lors de l'envoi du magic link:", erreur);
      });
  }
}

/**
 * Configuration d'infrastructure Better Auth.
 * Cette phase prépare Prisma, les cookies, Redis, OTP et Magic Link.
 */
export const auth = betterAuth({
  baseURL: urlApplication,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secondaryStorage: stockageSecondaireRedis,
  trustedOrigins: ServiceAuthInfrastructure.construireOriginesDeConfiance(),
  advanced: {
    useSecureCookies: urlApplication.startsWith("https://"),
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: urlApplication.startsWith("https://"),
    },
  },
  socialProviders: {
    ...(providerGoogle ? { google: providerGoogle } : {}),
    ...(providerGithub ? { github: providerGithub } : {}),
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CLIENT",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const admins = ["morelnguekeng@gmail.com"];
          if (admins.includes(user.email)) {
            return {
              data: {
                ...user,
                role: "ADMIN",
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [
    magicLink({
      expiresIn: ServiceMagicLink.dureeExpirationEnSecondes,
      allowedAttempts: ServiceMagicLink.nombreTentativesAutorisees,
      rateLimit: {
        window: 300,
        max: 3,
      },
      storeToken: {
        type: "custom-hasher",
        hash: ServiceMagicLink.hacherJeton,
      },
      async sendMagicLink({ email, url }, ctx) {
        const adresseIp = ServiceAuthInfrastructure.extraireAdresseIp(
          ctx?.request,
        );
        const agentUtilisateur =
          ctx?.request?.headers.get("user-agent") ?? null;
        const urlConnexion = ServiceMagicLink.construireUrlDeConnexion(url);

        ServiceMagicLink.envoyerLienParCourriel(email, urlConnexion);
        ServiceAuthInfrastructure.journaliserEvenementAuth(
          "MAGIC_LINK_SENT",
          email,
          {
            adresseIp,
            agentUtilisateur,
            succes: true,
            details: {
              expirationEnSecondes:
                ServiceMagicLink.dureeExpirationEnSecondes,
              tentativesAutorisees:
                ServiceMagicLink.nombreTentativesAutorisees,
            },
          },
        );
      },
    }),
    emailOTP({
      otpLength: ServiceOtp.longueurOtp,
      expiresIn: ServiceOtp.dureeExpirationEnSecondes,
      allowedAttempts: 5,
      rateLimit: {
        window: 300,
        max: 3,
      },
      storeOTP: {
        hash: ServiceOtp.hacherOtp,
      },
      generateOTP({ type }) {
        if (type !== "sign-in") {
          return undefined;
        }

        return ServiceOtp.genererCodeOtp();
      },
      async sendVerificationOTP({ email, otp, type }, ctx) {
        const adresseIp = ServiceAuthInfrastructure.extraireAdresseIp(
          ctx?.request,
        );
        const agentUtilisateur =
          ctx?.request?.headers.get("user-agent") ?? null;

        ServiceOtp.envoyerOtpParCourriel(email, otp);
        ServiceAuthInfrastructure.journaliserEvenementAuth("OTP_SENT", email, {
          adresseIp,
          agentUtilisateur,
          succes: true,
          details: {
            type,
            expirationEnSecondes: ServiceOtp.dureeExpirationEnSecondes,
          },
        });
      },
    }),
  ],
});
