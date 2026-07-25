import { ClipboardCheck, FileText, Headset, ShieldCheck, Wrench, Zap } from "lucide-react";
import type {
  AboutLeader,
  AboutMethodStep,
  AboutMetric,
  AboutPillar,
  AboutTimelineItem,
  AboutValue,
  FaqProps,
} from "./about.types";

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "Expertise locale",
    description:
      "Une connaissance concrete des sites, des contraintes d'exploitation et des realites techniques en Afrique centrale.",
    image: "/images/Group 24.png",
  },
  {
    title: "Standards professionnels",
    description:
      "Des installations documentees, testees et livrees avec une exigence de fiabilite durable.",
    image: "/images/Group 25.png",
  },
  {
    title: "Securite client",
    description:
      "Des choix techniques orientes protection des personnes, continuite d'activite et maitrise des risques.",
    image: "/images/Group 26.png",
  },
];

export const ABOUT_METRICS: AboutMetric[] = [
  { value: "200+", label: "Projets realises" },
  { value: "10+", label: "Annees d'experience" },
  { value: "5", label: "Poles d'expertise" },
  { value: "100%", label: "Engagement terrain" },
];

export const ABOUT_TIMELINE: AboutTimelineItem[] = [
  {
    period: "Origine",
    title: "Firex Global Engineering",
    description:
      "L'histoire demarre avec une culture d'intervention terrain: installations techniques, maintenance, securite et accompagnement de proximite.",
  },
  {
    period: "Bascule strategique",
    title: "Du service technique a la solution integree",
    description:
      "Les besoins clients evoluent vers plus de traçabilite, de pilotage et de coordination entre les equipes, les equipements et les donnees.",
  },
  {
    period: "Evolution",
    title: "Naissance de Winall Tech",
    description:
      "Winall Tech structure cette ambition: relier l'expertise terrain aux outils numeriques utiles, sans perdre la rigueur operationnelle.",
  },
  {
    period: "Aujourd'hui",
    title: "Un partenaire technique et digital",
    description:
      "L'entreprise accompagne les organisations sur la securite, les infrastructures, la maintenance, les supports visuels et la transformation digitale.",
  },
];

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: "Securite",
    description:
      "Chaque intervention est pensee pour proteger les personnes, les biens, les donnees et la continuite d'activite.",
    icon: ShieldCheck,
  },
  {
    title: "Fiabilite",
    description:
      "Nous privilegions des solutions robustes, maintenables et adaptees aux conditions reelles d'exploitation.",
    icon: Wrench,
  },
  {
    title: "Expertise terrain",
    description:
      "Le diagnostic commence sur site, avec une lecture precise des contraintes techniques, humaines et budgetaires.",
    icon: ClipboardCheck,
  },
  {
    title: "Innovation utile",
    description:
      "Le digital n'est retenu que lorsqu'il simplifie le pilotage, accelere la decision ou renforce le controle.",
    icon: Zap,
  },
  {
    title: "Documentation",
    description:
      "Plans, comptes rendus, configurations et recommandations facilitent la maintenance apres livraison.",
    icon: FileText,
  },
  {
    title: "Accompagnement",
    description:
      "Nos equipes restent disponibles pour former, ajuster et soutenir l'exploitation des solutions deployees.",
    icon: Headset,
  },
];

export const ABOUT_METHOD: AboutMethodStep[] = [
  {
    title: "Ecouter et cadrer",
    description:
      "Nous clarifions les enjeux, les risques, les priorites et les conditions de reussite avant toute proposition.",
  },
  {
    title: "Diagnostiquer sur site",
    description:
      "Les equipes observent l'existant, identifient les contraintes et valident les choix techniques avec le client.",
  },
  {
    title: "Realiser proprement",
    description:
      "L'installation est conduite avec methode: coordination, tests, securite, documentation et suivi des ecarts.",
  },
  {
    title: "Maintenir et ameliorer",
    description:
      "Apres livraison, nous accompagnons l'exploitation et faisons evoluer les solutions selon les usages reels.",
  },
];

export const ABOUT_LEADERS: AboutLeader[] = [
  {
    name: "Directeur General",
    role: "Vision et strategie",
    specialty: "Transformation technique et digitale",
    description:
      "Porte la vision Winall Tech et veille a l'alignement entre exigence terrain, qualite de service et innovation utile.",
    initials: "DG",
    image: "/images/projets/IMG_4212.jpg",
  },
  {
    name: "Responsable Operations",
    role: "Execution projet",
    specialty: "Installations, maintenance et coordination",
    description:
      "Organise les equipes, suit les chantiers et garantit la qualite d'execution jusqu'a la mise en service.",
    initials: "RO",
  },
  {
    name: "Responsable Solutions",
    role: "Architecture technique",
    specialty: "Reseaux, securite et outils digitaux",
    description:
      "Conçoit des solutions coherentes avec les besoins clients, les contraintes de site et les standards de maintenance.",
    initials: "RS",
  },
];

export const Faqconstants: FaqProps = [
  {
    question: "Comment Winall Tech transforme une demande client en projet fiable ?",
    preview:
      "Nous partons du besoin reel, analysons le site, cadrons les priorites, puis livrons une solution documentee avec des points de controle clairs.",
  },
  {
    question: "Pourquoi associer expertise terrain et outils digitaux ?",
    preview:
      "Parce qu'un bon outil ne remplace pas le terrain: il le rend plus lisible. Le digital sert a tracer, superviser, alerter et mieux maintenir.",
  },
  {
    question: "Quel est l'engagement apres livraison ?",
    preview:
      "Nous accompagnons la prise en main, partageons les documents utiles et restons disponibles pour les ajustements, la maintenance et les evolutions.",
  },
];
