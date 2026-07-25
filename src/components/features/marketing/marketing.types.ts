import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "electronique"
  | "genie-civil"
  | "btp"
  | "maintenance"
  | "infographie"
  | "securite-incendie"
  | "reseaux"
  | "autres";

export interface MarketingProject {
  title: string;
  location: string;
  description: string;
  image: string;
}

export interface MarketingProjectWithService extends MarketingProject {
  serviceTitle: string;
  serviceSlug: ServiceSlug;
}

// Section 1 — Problèmes clients
export interface ServiceProblem {
  label: string;
  description: string;
}

// Section 3 — Tableau AVANT/APRÈS
export interface ServiceTransformation {
  before: string;
  after: string;
}

// Section 4 — Sous-services
export interface ServiceSolution {
  name: string;
  description: string;
  benefits: string;
  expectedResult: string;
  /** Puces livrables affichées dans les cartes « Nos prestations » (§4). */
  items: string[];
}

// Section 5 — Fonctionnalités
export interface ServiceFeature {
  name: string;
  advantage: string;
  clientBenefit: string;
}

// Section 6 — Bénéfices business
export interface ServiceBusinessBenefit {
  category: string;
  description: string;
}

// Section 7 — Cas d'utilisation
export interface ServiceUseCase {
  target: string;
  description: string;
}

// Section 8 — Étapes du processus
export interface ServiceProcessStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  deliverable: string;
}

// Section 9 — FAQ
export interface ServiceFaq {
  question: string;
  answer: string;
}

// Bande de chiffres clés (sous le hero)
export interface ServiceKeyStat {
  value: string;
  label: string;
}

export interface MarketingService {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  icon: LucideIcon;
  highlights: string[];
  deliverables: string[];
  projects: MarketingProject[];
  keyStats: ServiceKeyStat[];
  tools: string[];

  // Nouvelles sections pour la page premium
  heroTitle: string;
  heroSubtitle: string;
  problemIntro: string;
  problems: ServiceProblem[];
  solutionTitle: string;
  solutionDescription: string;
  solutionHow: string;
  solutionWhy: string;
  transformations: ServiceTransformation[];
  solutions: ServiceSolution[];
  features: ServiceFeature[];
  businessBenefits: ServiceBusinessBenefit[];
  useCases: ServiceUseCase[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaReassurance: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export interface MarketingContact {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  address: string;
}
