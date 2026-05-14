/**
 * @file contact-action.types.ts
 * @description Types pour la section Contact Action avec image technicienne.
 * Principe SOLID : ISP — interface dédiée à cette section.
 */

/** Un bouton d'action rapide (mail, devis) */
export interface BoutonActionRapide {
  readonly id: string;
  readonly texte: string;
  readonly lien: string;
  /** Variante de couleur : "vert" pour mail, "orange" pour devis */
  readonly variante: "vert" | "orange";
}

/** Données de la section ContactAction */
export interface DonneesContactAction {
  /** URL de l'image de la technicienne */
  readonly imageTechnicienne: string;
  /** Boutons d'action affichés sur l'image */
  readonly boutons: ReadonlyArray<BoutonActionRapide>;
}

/** Props publiques du composant ContactAction */
export interface ProprietesContactAction {
  readonly className?: string;
}
