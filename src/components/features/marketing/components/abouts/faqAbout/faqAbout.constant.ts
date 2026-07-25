import { FaqAboutProps } from "./faqAbout.types";

export const FaqAboutConstant: FaqAboutProps = [
  {
    service: "Approche projet",
    question: "Comment demarre une collaboration avec Winall Tech ?",
    preview: {
      text: "Nous commençons par un cadrage du besoin, une analyse de l'existant et une proposition claire: perimetre, priorites, planning, risques et livrables.",
      libelle: ["Diagnostic", "Cadrage", "Plan d'action"],
    },
  },
  {
    service: "Maintenance",
    question: "Quels types de maintenance accompagnez-vous ?",
    preview: {
      text: "Nous intervenons sur la maintenance preventive, corrective et evolutive des installations techniques, informatiques, reseaux et dispositifs de securite.",
      libelle: ["Preventif", "Correctif", "Suivi d'exploitation"],
    },
  },
  {
    service: "Securite et infrastructures",
    question: "Pouvez-vous intervenir sur des sites deja equipes ?",
    preview: {
      text: "Oui. Nous auditons l'existant, identifions les points faibles, proposons les ameliorations prioritaires et planifions les interventions sans perturber l'activite.",
    },
  },
  {
    service: "Digitalisation",
    question: "Quand recommandez-vous un outil digital ?",
    preview: {
      text: "Lorsque l'outil permet de mieux suivre les operations, centraliser les informations, documenter les interventions ou aider les responsables a prendre de meilleures decisions.",
    },
  },
];
