/**
 * @description D�finit la structure d'un lien de navigation de l'en-t�te.
 */
export interface LienNavigationHeader {
  libelle: string;
  href: string;
}

/**
 * @description D�finit la structure d'une action principale affich�e dans l'en-t�te.
 */
export interface ActionHeader {
  libelle: string;
  href: string;
}



/**
 * @description D�crit les propri�t�s publiques du composant Header.
 */
export interface ProprietesHeader {
  className?: string;
}
