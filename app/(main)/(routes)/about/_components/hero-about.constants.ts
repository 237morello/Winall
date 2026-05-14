/**
 * @file hero-about.constants.ts
 * @description Données statiques (Model) pour la section Hero À Propos.
 * Principe SOLID : Single Responsibility — ce fichier ne contient QUE les données.
 */

import type { DonneesHeroAPropos, DonneesCarteDisponibilite } from "./hero-about.types";

/**
 * @constant DONNEES_HERO
 * @description Texte principal affiché dans la partie gauche du héro.
 */
export const DONNEES_HERO: DonneesHeroAPropos = {
  texteIntroductif:
    "Winall est tout un personnel devoué ; la clef du succès est la connexion en mondialisation humaine; fiabilité et garanties.",
};

/**
 * @constant DONNEES_CARTE_DISPONIBILITE
 * @description Données pour la carte flottante verte "We are available".
 */
export const DONNEES_CARTE_DISPONIBILITE: DonneesCarteDisponibilite = {
  titre: "We are available",
  sousTitre: "online",
  imageTechnicien: "/images/main-hero-imgAcceuil.png",
  statutBadge: "24/7 support",
};
