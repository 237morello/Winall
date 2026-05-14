/**
 * @file contact-action.constants.ts
 * @description Données statiques (Model) pour la section Contact Action.
 * Principe SOLID : SRP — uniquement les données.
 */

import type { DonneesContactAction } from "./contact-action.types";

/**
 * @constant DONNEES_CONTACT_ACTION
 * @description Configuration de la section avec l'image technicienne et les boutons flottants.
 */
export const DONNEES_CONTACT_ACTION: DonneesContactAction = {
  imageTechnicienne: "/images/image-choix.png",
  boutons: [
    {
      id: "btn-mail",
      texte: "mail",
      lien: "mailto:contact@winalltech.com",
      variante: "vert",
    },
    {
      id: "btn-devis",
      texte: "Devis",
      lien: "/dashboard/form?=devis",
      variante: "orange",
    },
  ],
};
