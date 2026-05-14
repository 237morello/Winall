/**
 * @file mission-values.constants.ts
 * @description Données statiques (Model) pour la section Mission, Vision & Valeurs.
 * Principe SOLID : SRP — ce fichier ne gère QUE les données de cette section.
 */

import type { BlocIdentite, ValeurEntreprise } from "./mission-values.types";

/**
 * @constant BLOCS_IDENTITE
 * @description Blocs Mission et Vision affichés dans la partie gauche.
 */
export const BLOCS_IDENTITE: ReadonlyArray<BlocIdentite> = [
  {
    id: "mission",
    titre: "Mission",
    description:
      "Apporter des solutions technologiques robustes et innovantes pour sécuriser et connecter les entreprises camerounaises au monde de demain.",
  },
  {
    id: "vision",
    titre: "Vision",
    description:
      "Devenir le leader panafricain de la sécurité électronique et de l'infrastructure réseau par l'excellence technique et l'intégrité.",
  },
];

/**
 * @constant VALEURS_ENTREPRISE
 * @description Liste des valeurs affichées dans les accordéons côté droit.
 */
export const VALEURS_ENTREPRISE: ReadonlyArray<ValeurEntreprise> = [
  {
    id: "valeur-1",
    titre: "L'Excellence Technique",
    contenu:
      "Nous ne nous contentons pas d'installer du matériel : nous maîtrisons les technologies les plus pointues du marché (Hikvision, ZKTeco, Dahua) pour garantir des systèmes fiables et durables.",
  },
  {
    id: "valeur-2",
    titre: "L'Intégrité Totale",
    contenu:
      "La transparence est au cœur de nos relations. Chaque projet est géré avec une rigueur éthique absolue, de la facturation à la mise en œuvre technique.",
  },
  {
    id: "valeur-3",
    titre: "La Réactivité Critique",
    contenu:
      "Dans nos métiers (sécurité, réseaux), chaque minute compte. Nos équipes interviennent avec une rapidité exemplaire pour assurer la continuité de vos services.",
  },
  {
    id: "valeur-4",
    titre: "L'Innovation Humaine",
    contenu:
      "La technologie est au service de l'homme. Nous formons continuellement nos techniciens pour qu'ils apportent des solutions innovantes adaptées au contexte local.",
  },
];
