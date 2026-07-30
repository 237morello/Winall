import { ProjectDomaine } from "@prisma/client";
import type { ServiceSlug } from "@/components/features/marketing/marketing.types";

/**
 * Source de vérité du mapping entre l'enum Prisma `ProjectDomaine`
 * (valeurs SCREAMING_SNAKE) et les `ServiceSlug` du site public
 * (slugs kebab-case utilisés dans les URLs /services/[serviceSlug]).
 *
 * Toute conversion domaine <-> service doit passer par ce fichier.
 */
export const DOMAINE_TO_SLUG: Record<ProjectDomaine, ServiceSlug> = {
  ELECTRONIQUE: "electronique",
  GENIE_CIVIL: "genie-civil",
  BTP: "btp",
  MAINTENANCE: "maintenance",
  INFOGRAPHIE: "infographie",
  SECURITE_INCENDIE: "securite-incendie",
  RESEAUX: "reseaux",
  INSTALLATION_ELECTRIQUE: "installation-electrique",
  SOLAIRE: "solaire",
  CONTROLE_ACCES: "controle-acces",
  SONORISATION: "sonorisation",
  DOMOTIQUE: "domotique",
  SYSTEME_INTELLIGENT: "systeme-intelligent",
  AUTRES: "autres",
};

export const SLUG_TO_DOMAINE: Record<ServiceSlug, ProjectDomaine> = {
  electronique: "ELECTRONIQUE",
  "genie-civil": "GENIE_CIVIL",
  btp: "BTP",
  maintenance: "MAINTENANCE",
  infographie: "INFOGRAPHIE",
  "securite-incendie": "SECURITE_INCENDIE",
  reseaux: "RESEAUX",
  "installation-electrique": "INSTALLATION_ELECTRIQUE",
  solaire: "SOLAIRE",
  "controle-acces": "CONTROLE_ACCES",
  sonorisation: "SONORISATION",
  domotique: "DOMOTIQUE",
  "systeme-intelligent": "SYSTEME_INTELLIGENT",
  autres: "AUTRES",
};

/** Libellés français lisibles pour l'UI admin (selects, tableaux, badges). */
export const DOMAINE_LABELS: Record<ProjectDomaine, string> = {
  ELECTRONIQUE: "Électronique",
  GENIE_CIVIL: "Génie civil",
  BTP: "BTP",
  MAINTENANCE: "Maintenance",
  INFOGRAPHIE: "Infographie",
  SECURITE_INCENDIE: "Sécurité incendie",
  RESEAUX: "Réseaux",
  INSTALLATION_ELECTRIQUE: "Installation électrique",
  SOLAIRE: "Plaque solaire",
  CONTROLE_ACCES: "Contrôle d'accès",
  SONORISATION: "Sonorisation",
  DOMOTIQUE: "Domotique",
  SYSTEME_INTELLIGENT: "Système intelligent",
  AUTRES: "Autres",
};

export function domaineToSlug(domaine: ProjectDomaine): ServiceSlug {
  return DOMAINE_TO_SLUG[domaine];
}

export function slugToDomaine(slug: ServiceSlug): ProjectDomaine {
  return SLUG_TO_DOMAINE[slug];
}

/** Liste ordonnée des domaines pour alimenter un <select> (valeur enum + libellé FR). */
export const DOMAINE_OPTIONS: Array<{ value: ProjectDomaine; label: string }> = (
  Object.keys(DOMAINE_LABELS) as ProjectDomaine[]
).map((value) => ({ value, label: DOMAINE_LABELS[value] }));
