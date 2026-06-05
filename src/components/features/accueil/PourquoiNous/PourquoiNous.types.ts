/**
 * @interface AvantageWinall
 * @description Représente un pilier ou un avantage de l'expertise Winall.
 */
export interface AvantageWinall {
  /** Titre de l'avantage */
  titre: string;
  /** Description détaillée */
  description: string;
  /** Chemin vers l'image illustrative */
  imageSrc: string;
  /** Texte alternatif pour l'image */
  imageAlt: string;
}

/**
 * @interface PourquoiNousProps
 * @description Propriétés pour le composant PourquoiNous.
 */
export interface PourquoiNousProps {
  /** Liste optionnelle d'avantages à afficher */
  avantages?: AvantageWinall[];
}
