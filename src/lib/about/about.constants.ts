import type {
  ExpertiseArea,
  FaqItem,
  MvvData,
  Partner,
  Stat,
  TeamMember,
  TimelineItem,
  TrustLabel,
} from './about.types'

export const MVV_DATA: MvvData = {
  mission:
    "Concevoir, déployer et maintenir des infrastructures techniques fiables pour les entreprises qui ne peuvent pas se permettre l'improvisation.",
  vision:
    "Devenir le partenaire de référence des organisations camerounaises pour les environnements électriques, sûreté, réseaux et bâtiments connectés.",
  values: [
    "Diagnostic clair avant engagement",
    "Matériel qualifié et traçable",
    "Déploiement documenté",
    "Support réactif après livraison",
  ],
}

export const ABOUT_STATS: Stat[] = [
  { value: "+10", label: "Années d'expérience", detail: "Présence terrain depuis Douala" },
  { value: "+120", label: "Projets réalisés", detail: "Installations, reprises et extensions", accent: true },
  { value: "+80", label: "Clients accompagnés", detail: "PME, sites commerciaux et résidences" },
  { value: "6", label: "Domaines intégrés", detail: "Électricité, sûreté, IT, domotique", accent: true },
]

export const ABOUT_TIMELINE: TimelineItem[] = [
  {
    year: "2015",
    title: "Fondation opérationnelle",
    description: "Premiers chantiers en génie électrique et BTP avec une équipe terrain basée à Douala.",
  },
  {
    year: "2020",
    title: "Extension sûreté & réseaux",
    description: "Structuration des offres vidéosurveillance, contrôle d'accès, domotique et réseaux IT.",
  },
  {
    year: "2023",
    title: "Écosystème certifié",
    description: "Renforcement des partenariats techniques et standardisation des méthodes d'intégration.",
  },
  {
    year: "Aujourd'hui",
    title: "Plateforme de services",
    description: "Pilotage de projets complets, contrats de maintenance et accompagnement multi-sites.",
    isCurrent: true,
  },
]

export const HERO_TRUST_LABELS: TrustLabel[] = [
  { value: "2015", label: "création à Douala" },
  { value: "B2B", label: "process projet dédié" },
  { value: "SAV", label: "maintenance planifiée" },
]

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    title: "Infrastructures électriques",
    description: "Études, câblage, protections, tableaux et reprises de sites avec une logique de continuité de service.",
    proof: "Plans, repérage et procès-verbal de mise en service.",
  },
  {
    title: "Sûreté électronique",
    description: "Vidéosurveillance, contrôle d'accès, biométrie et alarmes intégrés aux contraintes réelles du site.",
    proof: "Matériel éprouvé, paramétrage propre et transfert utilisateur.",
  },
  {
    title: "Réseaux & bâtiments connectés",
    description: "Réseaux locaux, domotique, supervision et équipements connectés pour bureaux, commerces et résidences.",
    proof: "Architecture lisible, documentation et support post-livraison.",
  },
]

export const ABOUT_PARTNERS: Partner[] = [
  { name: "Hikvision", category: "Vidéosurveillance" },
  { name: "ZKTeco", category: "Contrôle d'accès" },
  { name: "Dahua", category: "Sûreté électronique" },
  { name: "Legrand", category: "Infrastructure électrique" },
  { name: "Schneider Electric", category: "Protection & énergie" },
  { name: "Cisco", category: "Réseaux" },
]

export const ABOUT_TEAM: TeamMember[] = [
  {
    initials: "JN",
    name: "Jean Nkono",
    role: "Direction technique",
    tag: "Génie électrique",
    focus: "Cadrage, contrôle qualité et validation des installations critiques.",
  },
  {
    initials: "AM",
    name: "Alice Mbouda",
    role: "Ingénierie réseaux & IT",
    tag: "Domotique · Réseaux",
    focus: "Architecture réseau, automatisation et continuité des services connectés.",
    accent: true,
  },
  {
    initials: "PF",
    name: "Paul Fotso",
    role: "Intégration sûreté",
    tag: "Hikvision · ZKTeco",
    focus: "Déploiement terrain, paramétrage, tests et transfert aux équipes client.",
  },
]

export const ABOUT_FAQ: FaqItem[] = [
  {
    question: "Comment sécurisez-vous la qualité d'un projet avant le devis ?",
    answer: "Nous commençons par qualifier le site, les contraintes d'exploitation et les priorités du client. Le devis précise ensuite le périmètre, le matériel proposé, les délais et les conditions de mise en service.",
    preview: "Qualification du site, périmètre clair et devis détaillé...",
  },
  {
    question: "Le matériel installé est-il garanti ?",
    answer: "Oui. Nous privilégions des marques reconnues, testons les équipements avant livraison et appliquons les garanties constructeur selon les conditions de chaque fabricant.",
    preview: "Marques reconnues, tests avant livraison et garantie constructeur...",
  },
  {
    question: "Proposez-vous des contrats de maintenance après installation ?",
    answer: "Oui, nous proposons des contrats de maintenance préventive et curative pour les systèmes installés. Les visites, niveaux de support et délais d'intervention sont définis selon la criticité du site.",
    preview: "Maintenance préventive, curative et niveaux de support définis...",
  },
  {
    question: "Intervenez-vous en dehors de Douala ?",
    answer: "Oui, nous intervenons dans plusieurs villes du Cameroun selon la nature, l'envergure et les contraintes logistiques du projet. La faisabilité est confirmée pendant le cadrage.",
    preview: "Interventions possibles dans plusieurs villes du Cameroun...",
  },
  {
    question: "Quel délai prévoir pour un projet complet ?",
    answer: "Le délai dépend du périmètre, de la disponibilité du site et du niveau d'intégration. Pour les projets courants, nous fournissons un calendrier précis à la validation du devis.",
    preview: "Le calendrier est fixé après validation du périmètre...",
  },
]
