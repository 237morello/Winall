import React from "react";
import {
  Zap,
  ShieldCheck,
  Network,
  Flame,
  HardHat,
  Settings,
} from "lucide-react";
import { ServiceWinall } from "./Services.types";

/**
 * @constant LISTE_SERVICES
 * @description Liste complète des services experts de Winall.
 */
export const LISTE_SERVICES: ServiceWinall[] = [
  {
    titre: "Électricité & Bâtiment",
    description:
      "Conception et réalisation d'installations électriques fiables.",
    icone: React.createElement(Zap, { className: "h-6 w-6" }),
    details: [
      {
        id: 1,
        accroche: "L'électricité est au cœur de tout bâtiment moderne.",
        explication:
          "Nous concevons des installations adaptées aux maisons, bureaux et chantiers.",
        competences: [
          "Installation complète",
          "Mise aux normes",
          "Éclairage moderne",
          "Dépannage",
        ],
        noteFinale: "Sécurité et économie d'énergie garanties.",
      },
    ],
  },
  {
    titre: "Réseaux & Télécom",
    description:
      "Solutions de connectivité haute fiabilité pour entreprises camerounaises.",
    icone: React.createElement(Network, { className: "h-6 w-6" }),
    details: [
      {
        id: 2,
        accroche: "Connectivité professionnelle adaptée au Cameroun.",
        explication:
          "Déploiement de réseaux fibre optique et sans-fil avec garantie de bande passante même pendant les coupures.",
        competences: [
          "Fibre optique",
          "Wi-Fi 6",
          "Téléphonie IP",
          "VPN sécurisé",
        ],
        noteFinale:
          "99.9% de disponibilité garantie dans les grandes villes camerounaises.",
      },
    ],
  },
  {
    titre: "Sécurité Électronique",
    description: "Vidéosurveillance IA et contrôle d'accès biométrique.",
    icone: React.createElement(ShieldCheck, { className: "h-6 w-6" }),
    details: [
      {
        id: 3,
        accroche: "Protection intelligente pour vos infrastructures critiques.",
        explication:
          "Systèmes de vidéosurveillance avec IA adaptés aux conditions d'éclairage africaines et stockage local/cloud.",
        competences: [
          "Caméras 4K Hikvision",
          "Reconnaissance faciale",
          "Contrôle d'accès ZKTeco",
          "Alertes en temps réel",
        ],
        noteFinale:
          "Réduction de 85% des incidents de sécurité chez nos clients.",
      },
    ],
  },
  {
    titre: "Sécurité Incendie",
    description: "Détection automatique et systèmes d'extinction certifiés.",
    icone: React.createElement(Flame, { className: "h-6 w-6" }),
    details: [
      {
        id: 4,
        accroche: "Protection incendie conforme aux normes internationales.",
        explication:
          "Systèmes de détection fumée, chaleur et flamme avec alertes automatiques et extinction automatique adaptée.",
        competences: [
          "Détecteurs intelligents",
          "Extinction automatique",
          "Alarmes connectées",
          "Maintenance préventive",
        ],
        noteFinale: "Certification NF et ISO 9001 sur tous nos équipements.",
      },
    ],
  },
  {
    titre: "Génie Civil & BTP",
    description:
      "Infrastructure technique et câblage pour projets industriels.",
    icone: React.createElement(HardHat, { className: "h-6 w-6" }),
    details: [
      {
        id: 5,
        accroche: "Fondations solides pour vos projets technologiques.",
        explication:
          "Génie civil spécialisé pour salles serveurs, tours de télécommunications et infrastructures de sécurité.",
        competences: [
          "Salles blanches",
          "Faux planchers techniques",
          "Chemins de câbles",
          "Mise à la terre",
        ],
        noteFinale: "Plus de 50 projets industriels réalisés au Cameroun.",
      },
    ],
  },
  {
    titre: "Maintenance & Support",
    description: "Contrat de maintenance 24/7 avec garantie d'intervention.",
    icone: React.createElement(Settings, { className: "h-6 w-6" }),
    details: [
      {
        id: 6,
        accroche:
          "Continuité de service garantie pour vos opérations critiques.",
        explication:
          "Contrats de maintenance préventive et curative avec équipe locale et pièces de rechange disponibles.",
        competences: [
          "Support 24/7",
          "Maintenance préventive",
          "Pièces de rechange",
          "Rapports mensuels",
        ],
        noteFinale:
          "Intervention garantie sous 4h dans les grandes villes camerounaises.",
      },
    ],
  },
];
