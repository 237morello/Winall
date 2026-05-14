/**
 * @file hero-about.types.ts
 * @description Types pour la section Hero de la page À Propos.
 * Principe SOLID : Interface Segregation — chaque type a une responsabilité unique.
 */

/** Données affichées dans le texte principal du héro */
export interface DonneesHeroAPropos {
  /** Le texte introductif descriptif de l'entreprise */
  readonly texteIntroductif: string;
}

/** Données affichées dans la carte flottante "We are available" */
export interface DonneesCarteDisponibilite {
  /** Titre principal de la carte (ex: "We are available") */
  readonly titre: string;
  /** Sous-titre de la carte */
  readonly sousTitre: string;
  /** URL de l'image du technicien */
  readonly imageTechnicien: string;
  /** Badge de statut (ex: "online") */
  readonly statutBadge: string;
}

/** Props publiques du composant HeroAbout */
export interface ProprietesHeroAbout {
  readonly className?: string;
}
