/**
 * @interface ProjetWinall
 * @description Représente une réalisation majeure de Winall Tech Sarl avec métriques business.
 */
export interface ProjetWinall {
  id: number;
  titre: string;
  categorie: string;
  description: string;
  imageSrc: string;
  duree: string;
  budget: string;
  resultats: string;
}

/**
 * @interface ProjetsProps
 * @description Propriétés pour le composant Projets.
 */
export interface ProjetsProps {
  projets?: ProjetWinall[];
}
