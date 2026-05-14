/**
 * @file cta-banniere.constants.ts
 * @description Données statiques (Model) pour la bannière CTA.
 * Principe SOLID : SRP, OCP.
 */

import type { DonneesBanniereCTA } from "./cta-banniere.types";

/**
 * @constant DONNEES_CTA
 * @description Configuration de la bannière CTA conforme à la maquette
 *              ("Un projet en tête ? Parlons-en dès maintenant.").
 */
export const DONNEES_CTA: DonneesBanniereCTA = {
  titre: "Un projet en tête ? Parlons-en dès maintenant.",
  sousTitre:
    "Nos experts sont à votre disposition pour vous accompagner de l'étude à la réalisation.",
  boutons: [
    {
      id: "cta-devis",
      texte: "Demander un devis gratuit",
      lien: "/dashboard/form?=devis",
      variante: "principal",
    },
    {
      id: "cta-realisations",
      texte: "Nos réalisations",
      lien: "/#projets",
      variante: "secondaire",
    },
  ],
};
