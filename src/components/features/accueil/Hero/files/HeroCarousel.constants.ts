/**
 * @file HeroCarousel.constants.ts
 * @description Données statiques des 5 slides du carousel hero Winall Tech Sarl.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMAGES REQUISES
 * ─────────────────────────────────────────────────────────────────────────────
 * Placer dans : /public/images/hero/
 *
 * ┌───────────────────────────┬────────────────────────────────────────────────────────────┐
 * │ Fichier attendu           │ Recherche Freepik recommandée                              │
 * ├───────────────────────────┼────────────────────────────────────────────────────────────┤
 * │ courant-fort.jpg          │ "electrician industrial panel africa worker"                │
 * │ videosurveillance.jpg     │ "security camera surveillance cctv control room"            │
 * │ btp.jpg                   │ "construction worker building site africa engineer"         │
 * │ domotique.jpg             │ "smart home automation tablet modern interior"              │
 * │ reseaux.jpg               │ "network engineer server room data center cables"           │
 * └───────────────────────────┴────────────────────────────────────────────────────────────┘
 *
 * FORMAT : JPEG — 1920×1080px minimum — < 500 Ko (compresser avec squoosh.app)
 * LICENCE : Freepik Premium ou photos libres de droits (Unsplash, Pexels)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { SlideHero } from "./HeroCarousel.types";

/**
 * @constant SLIDES_HERO
 * @description Les 5 slides du carousel, une par domaine d'expertise Winall.
 *
 * Règle rédactionnelle pour l'accroche :
 * - Maximum 8 mots par ligne, 2 lignes maximum
 * - Tease sans tout révéler — crée la tension vers le CTA
 * - Pas de point final sur un headline display
 * - Utiliser "\n" pour forcer un saut de ligne expressif
 */
export const SLIDES_HERO: ReadonlyArray<SlideHero> = [
  {
    id: "courant-fort",
    metier: "Courant Fort",
    accroche: "L'énergie qui fait\ntourner vos projets.",
    sousAccroche:
      "Installations électriques industrielles et domestiques, certifiées aux normes camerounaises.",
    ctaTexte: "Voir nos installations →",
    ctaLien: "/services/courant-fort",
    image: "/images/hero/courant-fort.jpg",
    imageAlt:
      "Technicien Winall réalisant une installation électrique sur un tableau industriel",
  },
  {
    id: "videosurveillance",
    metier: "Vidéosurveillance",
    accroche: "Rien ne passe\nsans que vous le sachiez.",
    sousAccroche:
      "Systèmes de surveillance IP intelligents, pilotables depuis votre téléphone, partout au Cameroun.",
    ctaTexte: "Protéger mon site →",
    ctaLien: "/services/videosurveillance",
    image: "/images/hero/videosurveillance.jpg",
    imageAlt:
      "Système de vidéosurveillance IP installé et configuré par Winall Tech Sarl",
  },
  {
    id: "btp",
    metier: "BTP & Génie Civil",
    accroche: "Du béton, de la méthode,\nzéro mauvaise surprise.",
    sousAccroche:
      "Travaux de construction et d'infrastructure livrés dans les délais, avec garantie contractuelle.",
    ctaTexte: "Explorer nos chantiers →",
    ctaLien: "/services/btp",
    image: "/images/hero/btp.jpg",
    imageAlt:
      "Chantier de construction et de génie civil supervisé par l'équipe Winall Tech",
  },
  {
    id: "domotique",
    metier: "Domotique & Éclairage",
    accroche: "Votre bâtiment\npense pour vous.",
    sousAccroche:
      "Automatisation intelligente de l'éclairage, du contrôle d'accès et du confort thermique.",
    ctaTexte: "Voir comment ça marche →",
    ctaLien: "/services/domotique",
    image: "/images/hero/domotique.jpg",
    imageAlt:
      "Interface domotique installée par Winall dans une résidence moderne camerounaise",
  },
  {
    id: "reseaux",
    metier: "Réseaux & Téléphonie IP",
    accroche: "Un réseau qui tient\nmême quand tout flanche.",
    sousAccroche:
      "Infrastructure réseau, câblage structuré et téléphonie IP — déployés et maintenus par nos ingénieurs.",
    ctaTexte: "Auditer mon réseau →",
    ctaLien: "/services/reseaux",
    image: "/images/hero/reseaux.jpg",
    imageAlt:
      "Ingénieur réseau Winall Tech en train de câbler une infrastructure informatique professionnelle",
  },
];

/**
 * @constant DUREE_AUTO_PLAY
 * @description Intervalle en millisecondes entre deux transitions automatiques.
 * Valeur recommandée : 5000–7000ms (ni trop rapide, ni trop lent pour la lecture).
 */
export const DUREE_AUTO_PLAY = 6000;

/**
 * @constant DUREE_TRANSITION
 * @description Durée en millisecondes de l'animation cube entre deux slides.
 * Doit être inférieure à DUREE_AUTO_PLAY.
 */
export const DUREE_TRANSITION = 700;
