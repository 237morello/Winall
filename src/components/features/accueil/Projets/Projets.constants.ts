import { ProjetWinall } from "./Projets.types";

/**
 * @constant LISTE_PROJETS
 * @description Projets références de Winall Tech Sarl au Cameroun avec métriques business.
 */
export const LISTE_PROJETS: ProjetWinall[] = [
  {
    id: 1,
    titre: "Hôpital Laquintinie - Douala",
    categorie: "Sécurité & Réseaux",
    description:
      "Déploiement réseau fibre optique et vidéosurveillance 4K pour 200+ caméras avec stockage centralisé.",
    imageSrc: "/images/projet-hopital-laquintinie.jpg",
    duree: "6 mois",
    budget: "150M XAF",
    resultats: "99.9% disponibilité réseau, 0 incident sécurité",
  },
  {
    id: 2,
    titre: "Siège Social ENEO - Yaoundé",
    categorie: "Contrôle d'accès",
    description:
      "Système biométrique multi-sites pour 1500 employés avec gestion centralisée des droits d'accès.",
    imageSrc: "/images/projet-eneo-siege.jpg",
    duree: "4 mois",
    budget: "85M XAF",
    resultats: "Traçabilité 100% des accès, réduction 40% fraudes",
  },
  {
    id: 3,
    titre: "Complexe Scolaire Les Casques",
    categorie: "Réseaux & Sécurité",
    description:
      "Réseau Wi-Fi 6 couvrant 3 campus et système de sécurité incendie certifié NF.",
    imageSrc: "/images/projet-ecole-casques.jpg",
    duree: "3 mois",
    budget: "45M XAF",
    resultats: "Connectivité 2000+ utilisateurs, certification sécurité",
  },
  {
    id: 4,
    titre: "Banque Atlantique - 10 agences",
    categorie: "Sécurité Multisites",
    description:
      "Vidéosurveillance IA et alarmes connectées pour réseau bancaire national.",
    imageSrc: "/images/projet-banque-atlantique.jpg",
    duree: "8 mois",
    budget: "200M XAF",
    resultats: "Surveillance temps réel 24/7, réduction 60% tentatives",
  },
  {
    id: 5,
    titre: "Zone Industrielle Logbessou",
    categorie: "Infrastructure Complète",
    description:
      "Génie civil et câblage pour 50 entreprises avec datacenter et redondance électrique.",
    imageSrc: "/images/projet-zone-industrielle.jpg",
    duree: "12 mois",
    budget: "500M XAF",
    resultats: "50 entreprises connectées, 99.99% uptime garanti",
  },
  {
    id: 6,
    titre: "Hotel Mont Fébé - Yaoundé",
    categorie: "Domotique & Sécurité",
    description:
      "Gestion éclairage intelligent et contrôle d'accès 300 chambres avec système intégré.",
    imageSrc: "/images/projet-hotel-mont-febe.jpg",
    duree: "5 mois",
    budget: "75M XAF",
    resultats: "Économie 30% énergie, satisfaction client 95%",
  },
  {
    id: 7,
    titre: "Ministère des Postes",
    categorie: "Sécurité Gouvernement",
    description:
      "Système de sécurité haute disponibilité avec certification nationale pour données sensibles.",
    imageSrc: "/images/projet-ministere-postes.jpg",
    duree: "7 mois",
    budget: "120M XAF",
    resultats: "Conformité normes étatiques, audit sécurité validé",
  },
  {
    id: 8,
    titre: "Centre Commercial Douala Grand Mall",
    categorie: "Réseaux & Télécom",
    description:
      "Réseau fibre optique pour 150 commerces avec Wi-Fi public et système de gestion centralisée.",
    imageSrc: "/images/projet-douala-grand-mall.jpg",
    duree: "6 mois",
    budget: "95M XAF",
    resultats: "150 commerces connectés, 50000+ utilisateurs Wi-Fi/mois",
  },
];
