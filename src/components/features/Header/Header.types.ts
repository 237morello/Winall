/**
 * @description D�finit la structure d'un lien de navigation de l'en-t�te.
 */
export interface LienNavigationHeader {
  libelle: string;
  href: string;
}

/**
 * @description Définit la structure d'une action principale affichée dans l'en-tête.
 */
export interface ActionHeader {
  id: number;
  libelle: string;
  href: string;
}




/**
 * @description D�crit les propri�t�s publiques du composant Header.
 */
export interface ProprietesHeader {
  className?: string;
}
