/**
 * @file leaders-section.constants.ts
 * @description Données statiques (Model) pour la section Équipe Dirigeante.
 * Principe SOLID : SRP — uniquement les données de l'équipe.
 */

import type { MembreDirigeant } from "./leaders-section.types";

/**
 * @constant MEMBRES_DIRIGEANTS
 * @description Liste des dirigeants affichés sous forme de cartes grises (conformes à la maquette).
 *              Les cartes utilisent un placeholder gris si aucune imageUrl n'est définie.
 */
export const MEMBRES_DIRIGEANTS: ReadonlyArray<MembreDirigeant> = [
  {
    id: "leader-1",
    nom: "Morello Kengne",
    poste: "Directeur Général",
  },
  {
    id: "leader-2",
    nom: "Équipe Technique",
    poste: "Ingénieurs & Techniciens",
  },
];
