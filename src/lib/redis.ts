import "server-only";

type ReponseUpstash<T> = {
  error?: string;
  result?: T;
};

type ConfigurationRedis = {
  url: string;
  jeton: string;
};

type StockageSecondaireAuthentification = {
  get(cle: string): Promise<string | null>;
  set(cle: string, valeur: string, dureeDeVieEnSecondes?: number): Promise<void>;
  delete(cle: string): Promise<void>;
};

/**
 * @class ServiceRedis
 * @description Fournit un accès minimal et typé à Upstash Redis via son API REST.
 */
export class ServiceRedis {
  /**
   * Vérifie si la configuration Upstash requise est disponible.
   */
  static obtenirConfiguration(): ConfigurationRedis | null {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const jeton = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !jeton) {
      return null;
    }

    return { url, jeton };
  }

  /**
   * Indique si Redis est activé pour les fonctionnalités d'authentification.
   */
  static estDisponible(): boolean {
    return ServiceRedis.obtenirConfiguration() !== null;
  }

  /**
   * Construit l'URL REST Upstash en encodant correctement chaque segment.
   */
  static construireUrlCommande(url: string, segments: string[]): string {
    const chemin = segments.map((segment) => encodeURIComponent(segment)).join("/");
    return `${url}/${chemin}`;
  }

  /**
   * Exécute une commande Redis simple et remonte les erreurs réseau ou métier.
   */
  static async executerCommande<T>(segments: string[]): Promise<T | null> {
    const configuration = ServiceRedis.obtenirConfiguration();

    if (!configuration) {
      return null;
    }

    const reponse = await fetch(
      ServiceRedis.construireUrlCommande(configuration.url, segments),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${configuration.jeton}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!reponse.ok) {
      throw new Error(
        `Upstash Redis a répondu avec le statut ${reponse.status}.`,
      );
    }

    const donnees = (await reponse.json()) as ReponseUpstash<T>;

    if (donnees.error) {
      throw new Error(`Upstash Redis a retourné une erreur: ${donnees.error}`);
    }

    return donnees.result ?? null;
  }

  /**
   * Lit une valeur texte brute.
   */
  static async lireTexte(cle: string): Promise<string | null> {
    const valeur = await ServiceRedis.executerCommande<string | null>(["GET", cle]);
    return valeur ?? null;
  }

  /**
   * Définit une valeur texte avec TTL optionnel.
   */
  static async ecrireTexte(
    cle: string,
    valeur: string,
    dureeDeVieEnSecondes?: number,
  ): Promise<void> {
    if (typeof dureeDeVieEnSecondes === "number" && dureeDeVieEnSecondes > 0) {
      await ServiceRedis.executerCommande([
        "SET",
        cle,
        valeur,
        "EX",
        `${dureeDeVieEnSecondes}`,
      ]);
      return;
    }

    await ServiceRedis.executerCommande(["SET", cle, valeur]);
  }

  /**
   * Incrémente un compteur Redis atomiquement.
   */
  static async incrementer(cle: string): Promise<number> {
    const resultat = await ServiceRedis.executerCommande<number>(["INCR", cle]);
    return typeof resultat === "number" ? resultat : 0;
  }

  /**
   * Définit explicitement une durée de vie sur une clé.
   */
  static async definirExpiration(
    cle: string,
    dureeDeVieEnSecondes: number,
  ): Promise<void> {
    await ServiceRedis.executerCommande(["EXPIRE", cle, `${dureeDeVieEnSecondes}`]);
  }

  /**
   * Lit le TTL courant d'une clé.
   */
  static async lireDureeDeVie(cle: string): Promise<number | null> {
    const resultat = await ServiceRedis.executerCommande<number>(["TTL", cle]);

    if (typeof resultat !== "number" || resultat < 0) {
      return null;
    }

    return resultat;
  }

  /**
   * Supprime une clé si elle existe.
   */
  static async supprimer(cle: string): Promise<void> {
    await ServiceRedis.executerCommande(["DEL", cle]);
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
