/**
 * @file leaders-section.types.ts
 * @description Types pour la section Équipe Dirigeante.
 * Principe SOLID : ISP — interface dédiée aux leaders.
 */

/** Un membre de l'équipe dirigeante */
export interface MembreDirigeant {
  readonly id: string;
  readonly nom: string;
  readonly poste: string;
  /** URL de l'image du dirigeant (optionnel, placeholder gris si absent) */
  readonly imageUrl?: string;
}

/** Props publiques du composant LeadersSection */
export interface ProprietesLeaders {
  readonly className?: string;
}
