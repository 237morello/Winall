/**
 * @file mission-values.types.ts
 * @description Types pour la section Mission, Vision & Valeurs.
 * Principe SOLID : ISP — interfaces granulaires et ciblées.
 */

/** Un bloc texte Mission ou Vision */
export interface BlocIdentite {
  readonly id: string;
  readonly titre: string;
  readonly description: string;
}

/** Une valeur de l'entreprise affichée dans un accordion */
export interface ValeurEntreprise {
  readonly id: string;
  readonly titre: string;
  readonly contenu: string;
}

/** Props publiques du composant MissionValues */
export interface ProprietesMissionValues {
  readonly className?: string;
}
