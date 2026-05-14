/**
 * @file footer-about.types.ts
 * @description Types pour le Footer de la page À Propos.
 * Principe SOLID : ISP — interfaces distinctes par groupe de données.
 */

/** Un lien de la colonne du footer */
export interface LienFooter {
  readonly id: string;
  readonly texte: string;
  readonly lien: string;
}

/** Une colonne de liens du footer */
export interface ColonneFooter {
  readonly id: string;
  readonly titre: string;
  readonly liens: ReadonlyArray<LienFooter>;
}

/** Props publiques du composant FooterAbout */
export interface ProprietesFooter {
  readonly className?: string;
}
