/**
 * @interface TemoignageWinall
 * @description Témoignages clients vérifiables avec informations complètes.
 */
export interface TemoignageWinall {
  id: number;
  auteur: string;
  poste: string;
  entreprise: string;
  logo: string;
  photo: string;
  contenu: string;
  resultats: string;
  projet: string;
}

/**
 * @interface TemoignagesProps
 * @description Propriétés pour le composant Temoignages.
 */
export interface TemoignagesProps {
  temoignages?: TemoignageWinall[];
}
