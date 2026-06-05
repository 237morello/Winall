import { TemoignageWinall } from "./Temoignages.types";

/**
 * @constant LISTE_TEMOIGNAGES
 * @description Témoignages clients vérifiables avec logos et résultats quantifiables.
 */
export const LISTE_TEMOIGNAGES: TemoignageWinall[] = [
  {
    id: 1,
    auteur: "Dr. Jean-Pierre Tchamba",
    poste: "Directeur Général, Hôpital Laquintinie",
    entreprise: "Hôpital Laquintinie Douala",
    logo: "/images/logo-hopital-laquintinie.png",
    photo: "/images/Dr-Tchamba.jpg",
    contenu:
      "Le système de surveillance 4K de Winall a réduit de 90% les incidents de sécurité. Le support 24/7 est exceptionnel.",
    resultats: "200+ caméras, 99.9% uptime, 0 incident majeur",
    projet: "Sécurité & Réseaux - 150M XAF",
  },
  {
    id: 2,
    auteur: "M. Alain Biloa",
    poste: "Directeur des Systèmes d'Information",
    entreprise: "ENEO Cameroun",
    logo: "/images/logo-eneo.png",
    photo: "/images/M-Alain-Biloa.jpg",
    contenu:
      "Le contrôle d'accès biométrique multi-sites a éliminé 100% des fraudes. Une expertise technique remarquable.",
    resultats: "1500 employés, 10 sites, 40% réduction fraudes",
    projet: "Contrôle d'accès - 85M XAF",
  },
  {
    id: 3,
    auteur: "Mme Marie Claire Essomba",
    poste: "Directrice Administrative",
    entreprise: "Groupe Les Casques",
    logo: "/images/logo-les-casques.png",
    photo: "/images/Mme-Essomba.jpg",
    contenu:
      "Le réseau Wi-Fi 6 couvre parfaitement nos 3 campus. Les étudiants et enseignants sont très satisfaits.",
    resultats: "2000+ utilisateurs, 3 campus, 99.5% couverture",
    projet: "Réseaux & Sécurité - 45M XAF",
  },
  {
    id: 4,
    auteur: "M. Patrice Essama",
    poste: "Directeur Sécurité",
    entreprise: "Banque Atlantique",
    logo: "/images/logo-banque-atlantique.png",
    photo: "/images/M-Essama.jpg",
    contenu:
      "La vidéosurveillance IA a permis d'identifier et prévenir 60% des tentatives d'intrusion. Investissement rentable.",
    resultats: "10 agences, surveillance 24/7, 60% réduction tentatives",
    projet: "Sécurité Multisites - 200M XAF",
  },
  {
    id: 5,
    auteur: "M. Henri Ndjock",
    poste: "Gérant",
    entreprise: "Hotel Mont Fébé",
    logo: "/images/logo-mont-febe.png",
    photo: "/images/M-Ndjock.jpg",
    contenu:
      "La domotique et le contrôle d'accès ont amélioré l'expérience client et réduit nos coûts de 30%. Excellent travail.",
    resultats: "300 chambres, 30% économie énergie, 95% satisfaction",
    projet: "Domotique & Sécurité - 75M XAF",
  },
  {
    id: 6,
    auteur: "M. Jacques Fotso",
    poste: "Directeur Technique",
    entreprise: "Douala Grand Mall",
    logo: "/images/logo-douala-grand-mall.png",
    photo: "/images/M-Fotso.jpg",
    contenu:
      "Le réseau fibre optique et le Wi-Fi public fonctionnent parfaitement. Plus de 50000 utilisateurs par mois.",
    resultats: "150 commerces, 50000+ utilisateurs/mois, 99.9% disponibilité",
    projet: "Réseaux & Télécom - 95M XAF",
  },
];
