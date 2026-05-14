/**
 * @file footer-about.constants.ts
 * @description Données statiques (Model) pour le Footer.
 * Principe SOLID : SRP — uniquement les données du footer, OCP — ajouter un lien = ajouter un objet.
 */

import type { ColonneFooter } from "./footer-about.types";

/**
 * @constant DESCRIPTION_FOOTER
 * @description Texte de présentation de l'entreprise dans le footer.
 */
export const DESCRIPTION_FOOTER =
  "Winall Tech Sarl — Expert en réseaux informatiques, vidéosurveillance et électricité au Cameroun.";

/**
 * @constant COLONNES_FOOTER
 * @description Colonnes de liens du footer, conformes à la maquette (Services, Liens rapides, Nous contacter).
 */
export const COLONNES_FOOTER: ReadonlyArray<ColonneFooter> = [
  {
    id: "col-services",
    titre: "Services",
    liens: [
      { id: "srv-1", texte: "Réseaux informatiques", lien: "/#services" },
      { id: "srv-2", texte: "Vidéosurveillance", lien: "/#services" },
      { id: "srv-3", texte: "Contrôle d'accès", lien: "/#services" },
      { id: "srv-4", texte: "BTP & Génie Civil", lien: "/#services" },
    ],
  },
  {
    id: "col-liens",
    titre: "Liens rapides",
    liens: [
      { id: "lnk-1", texte: "Accueil", lien: "/" },
      { id: "lnk-2", texte: "À propos", lien: "/about" },
      { id: "lnk-3", texte: "Nos réalisations", lien: "/#projets" },
      { id: "lnk-4", texte: "Contact", lien: "/dashboard/contact" },
    ],
  },
  {
    id: "col-contact",
    titre: "Nous contacter",
    liens: [
      { id: "cnt-1", texte: "contact@winalltech.com", lien: "mailto:contact@winalltech.com" },
      { id: "cnt-2", texte: "+237 6XX XXX XXX", lien: "tel:+2376XXXXXXXX" },
      { id: "cnt-3", texte: "Yaoundé, Cameroun", lien: "#" },
    ],
  },
];

/**
 * @constant ANNEE_COPYRIGHT
 * @description Année affichée dans le copyright, calculée dynamiquement.
 */
export const TEXTE_COPYRIGHT = `© ${new Date().getFullYear()} Winall Tech Sarl — Réseaux | Digital Solutions | Tous droits réservés.`;
