/**
 * @file history-timeline.types.ts
 * @description Types pour la section Frise Chronologique.
 * Principe SOLID : ISP — interface dédiée à la timeline.
 */

/** Une étape de la frise chronologique */
export interface EtapeTimeline {
  readonly id: string;
  /** Année affichée dans le badge */
  readonly annee: string;
  /** Libellé court sous le badge (ex: "Fondation") */
  readonly label: string;
  /** Si true, le badge est mis en avant (style orange plein) */
  readonly actif?: boolean;
}

/** Props publiques du composant HistoryTimeline */
export interface ProprietesTimeline {
  readonly className?: string;
}
