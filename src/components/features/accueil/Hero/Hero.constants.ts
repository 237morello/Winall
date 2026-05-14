import type { BadgeTechnique, LigneHeadline, BoutonAction } from "./Hero.types";

/**
 * @constant BADGE_TECHNIQUE
 * @description Badge technique affiché en haut du hero avec animation pulse.
 */
export const BADGE_TECHNIQUE: BadgeTechnique = {
  texte: "Expert certifié · Support 24/7",
  avecPulse: true,
};

/**
 * @constant LIGNES_HEADLINE
 * @description Les deux lignes de la headline principale du hero.
 */
export const LIGNES_HEADLINE: ReadonlyArray<LigneHeadline> = [
  {
    texte: "Des infrastructures fiables. Des systèmes intelligents.",
  }
];

/**
 * @constant SOUS_TITRE
 * @description Texte d'accompagnement expliquant le positionnement de Winall.
 */
export const SOUS_TITRE =
  "Winall Tech conçoit, installe et maintient vos installations de courant fort et faible. De l'électricité industrielle à la vidéosurveillance, nous garantissons la sécurité et la performance de vos infrastructures.";

/**
 * @constant BOUTON_ACTION
 * @description Bouton d'action principal du hero.
 */
export const BOUTON_ACTION: ReadonlyArray<BoutonAction> = [
  { 
    id: 1,
    texte: "Demander un devis",
    lien: "/dashboard/form?=devis",
  },
  { id:2,texte: "Contactez-nous", lien: "/dashboard/contact" },
];
