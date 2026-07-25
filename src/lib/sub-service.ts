import {
  MARKETING_SERVICES,
} from "@/components/features/marketing/marketing.constants";
import type { ServiceSlug } from "@/components/features/marketing/marketing.types";

/**
 * Identité stable d'un sous-service.
 *
 * Les sous-services (`MARKETING_SERVICES[].solutions[]`) n'ont pas d'identifiant
 * dédié dans les constantes : on dérive un slug déterministe depuis leur `name`.
 * Le `subServiceSlug` stocké en base (ProjectPlacement.subServiceSlug) suit le
 * format composite `${serviceSlug}--${slugify(name)}`, ce qui reste stable tant
 * que le nom du sous-service ne change pas.
 */

/** Convertit un texte (avec accents) en slug kebab-case ASCII. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SEPARATOR = "--";

export function buildSubServiceSlug(
  serviceSlug: ServiceSlug,
  solutionName: string,
): string {
  return `${serviceSlug}${SEPARATOR}${slugify(solutionName)}`;
}

export function parseSubServiceSlug(
  value: string,
): { serviceSlug: string; solutionSlug: string } | null {
  const idx = value.indexOf(SEPARATOR);
  if (idx === -1) return null;
  return {
    serviceSlug: value.slice(0, idx),
    solutionSlug: value.slice(idx + SEPARATOR.length),
  };
}

export interface SubServiceOption {
  /** subServiceSlug composite à stocker en base. */
  slug: string;
  /** Nom du sous-service. */
  name: string;
  /** Libellé complet pour l'UI : "Service — Sous-service". */
  label: string;
  serviceSlug: ServiceSlug;
  serviceTitle: string;
}

/** Liste plate de tous les sous-services de tous les services (pour l'UI de publication). */
export function getAllSubServices(): SubServiceOption[] {
  return MARKETING_SERVICES.flatMap((service) =>
    service.solutions.map((solution) => ({
      slug: buildSubServiceSlug(service.slug, solution.name),
      name: solution.name,
      label: `${service.title} — ${solution.name}`,
      serviceSlug: service.slug,
      serviceTitle: service.title,
    })),
  );
}

/** Sous-services groupés par service, pour un affichage en sections dans l'UI. */
export function getSubServicesGroupedByService(): Array<{
  serviceSlug: ServiceSlug;
  serviceTitle: string;
  subServices: SubServiceOption[];
}> {
  return MARKETING_SERVICES.map((service) => ({
    serviceSlug: service.slug,
    serviceTitle: service.title,
    subServices: service.solutions.map((solution) => ({
      slug: buildSubServiceSlug(service.slug, solution.name),
      name: solution.name,
      label: `${service.title} — ${solution.name}`,
      serviceSlug: service.slug,
      serviceTitle: service.title,
    })),
  }));
}
