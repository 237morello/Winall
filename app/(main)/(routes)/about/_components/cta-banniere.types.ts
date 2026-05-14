/**
 * @file cta-banniere.types.ts
 * @description Types pour la bannière CTA de la page À Propos.
 * Principe SOLID : ISP — interface dédiée à la bannière.
 */

/** Un bouton CTA de la bannière */
export interface BoutonCTA {
  readonly id: string;
  readonly texte: string;
  readonly lien: string;
  readonly variante: "principal" | "secondaire";
}

/** Données de la bannière CTA */
export interface DonneesBanniereCTA {
  readonly titre: string;
  readonly sousTitre: string;
  readonly boutons: ReadonlyArray<BoutonCTA>;
}

/** Props publiques du composant CTABanniere */
export interface ProprietesCTABanniere {
  readonly className?: string;
}
