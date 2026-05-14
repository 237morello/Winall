/**
 * @file history-timeline.constants.ts
 * @description Données statiques (Model) pour la frise chronologique.
 * Principe SOLID : SRP — uniquement les données de la timeline.
 */

import type { EtapeTimeline } from "./history-timeline.types";

/**
 * @constant ETAPES_TIMELINE
 * @description Les étapes clés de l'histoire de Winall Tech Sarl.
 *              Pour ajouter une étape, il suffit d'ajouter un objet à ce tableau (OCP).
 */
export const ETAPES_TIMELINE: ReadonlyArray<EtapeTimeline> = [
  {
    id: "etape-2015",
    annee: "2015",
    label: "Fondation",
  },
  {
    id: "etape-2020",
    annee: "2020",
    label: "Expansion",
  },
  {
    id: "etape-2023",
    annee: "2023",
    label: "Digitalisation",
    actif: true,
  },
  {
    id: "etape-aujourdhui",
    annee: "Aujourd'hui",
    label: "Leader Local",
  },
];
