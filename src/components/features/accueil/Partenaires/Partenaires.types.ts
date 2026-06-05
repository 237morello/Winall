/**
 * @interface PartenaireWinall
 * @description Représente une technologie ou une marque partenaire avec description.
 */
export interface PartenaireWinall {
  id: number;
  titre: string;
  imageSrc: string;
  description: string;
}

/**
 * @interface PartenairesProps
 * @description Propriétés pour le composant Partenaires.
 */
export interface PartenairesProps {
  partenaires?: PartenaireWinall[];
}
