/**
 * @file faq-section.constants.ts
 * @description Données statiques (Model) pour la FAQ de la page À Propos.
 * Principe SOLID : SRP — uniquement les données FAQ, OCP — ajouter une question = ajouter un objet.
 */

import type { QuestionFAQ } from "./faq-section.types";

/**
 * @constant QUESTIONS_FAQ
 * @description Liste des questions fréquentes conformes à la maquette.
 *              Toutes les questions sont identiques dans la maquette
 *              (« Comment garantissez-vous la fiabilité du matériel ? »),
 *              mais chacune possède une réponse spécifique.
 */
export const QUESTIONS_FAQ: ReadonlyArray<QuestionFAQ> = [
  {
    id: "faq-1",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse:
      "Nous travaillons exclusivement avec des leaders mondiaux comme Hikvision, Dahua et ZKTeco. Chaque équipement est testé avant la mise en service et bénéficie d'une garantie constructeur intégrée.",
  },
  {
    id: "faq-2",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse:
      "Nos techniciens suivent un protocole de test en 5 étapes : vérification de l'alimentation, test réseau, calibrage vidéo, stress-test 24h et certification finale.",
  },
  {
    id: "faq-3",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse:
      "Chaque installation est couverte par un contrat de maintenance préventive incluant des visites trimestrielles et un remplacement garanti sous 48h en cas de panne.",
  },
  {
    id: "faq-4",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse:
      "Notre stock permanent de pièces détachées certifiées et notre centre de supervision 24/7 garantissent une réactivité maximale pour toute intervention critique.",
  },
  {
    id: "faq-5",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse:
      "Nous travaillons exclusivement avec des leaders mondiaux comme Hikvision, Dahua et ZKTeco. Chaque équipement est certifié et bénéficie d'une garantie constructeur. La mise en service est réalisée par des ingénieurs formés et chaque installation suit un protocole de contrôle qualité rigoureux.",
  },
];
