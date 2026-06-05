/**
 * @file HeroCarousel.types.ts
 * @description Contrats de données pour le composant HeroCarousel.
 * Suit le pattern MVC (Service + Vue) de l'architecture Winall Tech.
 */

/**
 * @interface SlideHero
 * @description Représente une diapositive du carousel hero.
 * Chaque slide correspond à un domaine d'expertise Winall.
 */
export interface SlideHero {
  /** Identifiant unique de la slide — utilisé comme key React et aria-label */
  readonly id: string;
  /** Étiquette du domaine métier affichée en badge */
  readonly metier: string;
  /**
   * Headline principal — court, percutant, pas de point final.
   * Supporte les sauts de ligne via "\n" (rendu avec white-space: pre-line).
   */
  readonly accroche: string;
  /** Sous-titre d'une ligne qui complète l'accroche sans tout révéler */
  readonly sousAccroche: string;
  /** Texte du bouton CTA */
  readonly ctaTexte: string;
  /** Route de destination du CTA (App Router Next.js) */
  readonly ctaLien: string;
  /**
   * Chemin vers l'image depuis le dossier /public.
   * Format attendu : "/images/hero/[nom-du-fichier].jpg"
   * Dimensions recommandées : 1920×1080px, < 500 Ko après compression.
   */
  readonly image: string;
  /** Texte alternatif descriptif pour l'accessibilité (WCAG AA) */
  readonly imageAlt: string;
}

/**
 * @type DirectionTransition
 * @description Direction de la transition entre deux slides.
 * - "suivant"   → nouvelle slide entre par le haut, sort par le bas
 * - "precedent" → nouvelle slide entre par le bas, sort par le haut
 */
export type DirectionTransition = "suivant" | "precedent";

/**
 * @interface EtatCarousel
 * @description État interne complet du carousel.
 * Géré par useState dans le composant Vue.
 */
export interface EtatCarousel {
  /** Index de la slide actuellement affichée */
  readonly indexActuel: number;
  /** Direction de la dernière navigation — détermine l'animation cube */
  readonly direction: DirectionTransition;
  /** Verrou de transition — bloque les double-clics pendant l'animation */
  readonly estEnTransition: boolean;
}

/**
 * @interface ProprietesHeroCarousel
 * @description Props publiques exposées par le composant SectionHeroCarousel.
 */
export interface ProprietesHeroCarousel {
  className?: string;
  /** Durée en millisecondes entre deux transitions automatiques. Défaut : 6000 */
  autoPlayInterval?: number;
}
