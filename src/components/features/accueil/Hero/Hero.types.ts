/**
 * @interface BadgeTechnique
 * @description Définit le badge technique affiché en haut du hero.
 */
export interface BadgeTechnique {
  texte: string;
  avecPulse: boolean;
}

/**
 * @interface LigneHeadline
 * @description Définit une ligne de la headline principale du hero.
 */
export interface LigneHeadline {
  texte: string;
}



/**
 * @interface BoutonAction
 * @description Définit le bouton d'action principal du hero.
 */
export interface BoutonAction {
  id: number;
  texte: string;
  lien: string;
}

/**
 * @interface ProprietesHero
 * @description Définit les propriétés publiques du composant Hero.
 */
export interface ProprietesHero {
  className?: string;
}
