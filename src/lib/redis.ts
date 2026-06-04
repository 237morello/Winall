import "server-only";
import { Redis } from "@upstash/redis";

type StockageSecondaireAuthentification = {
  get(cle: string): Promise<string | null>;
  set(cle: string, valeur: string, dureeDeVieEnSecondes?: number): Promise<void>;
  delete(cle: string): Promise<void>;
};

/**
 * @class ServiceRedis
 * @description Fournit un accès performant à Upstash Redis via le SDK officiel.
 */
export class ServiceRedis {
  private static client: Redis | null = null;

  /**
   * Initialise et retourne le client Redis Upstash (Singleton).
   */
  private static obtenirClient(): Redis | null {
    if (this.client) return this.client;

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      return null;
    }

    this.client = new Redis({
      url,
      token,
    });

    return this.client;
  }

  /**
   * Indique si Redis est activé et configuré.
   */
  static estDisponible(): boolean {
    return !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
  }

  /**
   * Lit une valeur texte brute.
   */
  static async lireTexte(cle: string): Promise<string | null> {
    try {
      const client = this.obtenirClient();
      if (!client) return null;
      return await client.get<string>(cle);
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de la lecture (${cle}):`, erreur);
      return null;
    }
  }

  /**
   * Définit une valeur texte avec TTL optionnel.
   */
  static async ecrireTexte(
    cle: string,
    valeur: string,
    dureeDeVieEnSecondes?: number,
  ): Promise<void> {
    try {
      const client = this.obtenirClient();
      if (!client) return;

      if (typeof dureeDeVieEnSecondes === "number" && dureeDeVieEnSecondes > 0) {
        await client.set(cle, valeur, { ex: dureeDeVieEnSecondes });
      } else {
        await client.set(cle, valeur);
      }
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de l'écriture (${cle}):`, erreur);
    }
  }

  /**
   * Incrémente un compteur Redis atomiquement.
   */
  static async incrementer(cle: string): Promise<number> {
    try {
      const client = this.obtenirClient();
      if (!client) return 0;
      return await client.incr(cle);
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de l'incrémentation (${cle}):`, erreur);
      return 0;
    }
  }

  /**
   * Définit explicitement une durée de vie sur une clé.
   */
  static async definirExpiration(
    cle: string,
    dureeDeVieEnSecondes: number,
  ): Promise<void> {
    try {
      const client = this.obtenirClient();
      if (!client) return;
      await client.expire(cle, dureeDeVieEnSecondes);
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de l'expiration (${cle}):`, erreur);
    }
  }

  /**
   * Lit le TTL courant d'une clé.
   */
  static async lireDureeDeVie(cle: string): Promise<number | null> {
    try {
      const client = this.obtenirClient();
      if (!client) return null;
      const ttl = await client.ttl(cle);
      return ttl < 0 ? null : ttl;
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de la lecture du TTL (${cle}):`, erreur);
      return null;
    }
  }

  /**
   * Supprime une clé si elle existe.
   */
  static async supprimer(cle: string): Promise<void> {
    try {
      const client = this.obtenirClient();
      if (!client) return;
      await client.del(cle);
    } catch (erreur) {
      console.error(`[Redis] Erreur lors de la suppression (${cle}):`, erreur);
    }
  }

  /**
   * Expose le contrat minimal attendu par Better Auth pour secondaryStorage.
   */
  static creerStockageSecondaire():
    | StockageSecondaireAuthentification
    | undefined {
    if (!ServiceRedis.estDisponible()) {
      return undefined;
    }

    return {
      async get(cle) {
        return ServiceRedis.lireTexte(cle);
      },
      async set(cle, valeur, dureeDeVieEnSecondes) {
        await ServiceRedis.ecrireTexte(cle, valeur, dureeDeVieEnSecondes);
      },
      async delete(cle) {
        await ServiceRedis.supprimer(cle);
      },
    };
  }
}

export const stockageSecondaireRedis =
  ServiceRedis.creerStockageSecondaire();
