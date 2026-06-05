import { Skill } from "./types";

export const getExpertSkills = (): Skill[] => {
  return [
    {
      id: "skill-support",
      image: "/images/Group 24.png",
      label: "Support Technique",
      description: "Service disponible 7j/7 avec une expertise garantie à 100% pour vos infrastructures."
    },
    {
      id: "skill-fullstack-1",
      image: "/images/Group 25.png",
      label: "Développement Fullstack",
      description: "Maintenance et déploiement continu 7j/7 pour assurer une haute disponibilité."
    },
    {
      id: "skill-fullstack-2",
      image: "/images/Group 26.png",
      label: "Intégration Systèmes",
      description: "Optimisation de vos flux de travail par l'interconnexion de vos outils critiques."
    }
  ];
};
