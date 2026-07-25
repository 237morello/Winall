import { PlacementZone, type Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { domaineToSlug } from "@/lib/project-domaine";
import {
  MARKETING_SERVICES,
  getServiceBySlug,
} from "@/components/features/marketing/marketing.constants";
import type {
  MarketingProjectWithService,
  ServiceSlug,
} from "@/components/features/marketing/marketing.types";

/** Image de repli : image du service associé, sinon placeholder. */
function resolveImage(project: Project): string {
  if (project.imageUrl) return project.imageUrl;
  if (project.images.length > 0) return project.images[0];
  const service = getServiceBySlug(domaineToSlug(project.domaine));
  return service?.image ?? "/images/1.JPG";
}

/** Convertit un Project (DB) vers la forme attendue par ProjectsShowcase/ProjectCard. */
export function toMarketingProject(
  project: Project,
): MarketingProjectWithService {
  const serviceSlug = domaineToSlug(project.domaine);
  const service = getServiceBySlug(serviceSlug);
  return {
    title: project.titre,
    location: project.localisation ?? "",
    description: project.description,
    image: resolveImage(project),
    serviceSlug,
    serviceTitle: service?.title ?? project.titre,
  };
}

/**
 * Projets publiés placés dans une zone globale (HERO ou PROJETS_GLOBAL),
 * ordonnés par `ordre`. Ne retourne que les projets réellement publiés.
 */
export async function getPublishedProjectsByZone(
  zone: Extract<PlacementZone, "HERO" | "PROJETS_GLOBAL">,
  limit?: number,
): Promise<MarketingProjectWithService[]> {
  try {
    const placements = await prisma.projectPlacement.findMany({
      where: { zone, project: { isPublished: true } },
      orderBy: { ordre: "asc" },
      include: { project: true },
      take: limit,
    });
    return placements.map((p) => toMarketingProject(p.project));
  } catch (error) {
    // Dégradation gracieuse : le site public bascule sur son contenu statique
    // si la base est momentanément indisponible (build ou incident).
    console.error("getPublishedProjectsByZone a échoué :", error);
    return [];
  }
}

/**
 * Projets publiés placés sous un sous-service précis (subServiceSlug composite),
 * ordonnés par `ordre`.
 */
export async function getPublishedProjectsBySubService(
  subServiceSlug: string,
  limit?: number,
): Promise<MarketingProjectWithService[]> {
  try {
    const placements = await prisma.projectPlacement.findMany({
      where: {
        zone: PlacementZone.SOUS_SERVICE,
        subServiceSlug,
        project: { isPublished: true },
      },
      orderBy: { ordre: "asc" },
      include: { project: true },
      take: limit,
    });
    return placements.map((p) => toMarketingProject(p.project));
  } catch (error) {
    console.error("getPublishedProjectsBySubService a échoué :", error);
    return [];
  }
}

export interface ServiceProjectGroup {
  slug: ServiceSlug;
  title: string;
  projects: MarketingProjectWithService[];
}

/**
 * Regroupe des projets par service, dans l'ordre du catalogue de services
 * (`MARKETING_SERVICES`), en écartant les services sans aucun projet.
 * Utilisé par la page /projets pour organiser l'affichage en lignes.
 *
 * Ne porte pas l'icône du service : `LucideIcon` (composant React) n'est pas
 * sérialisable à travers la frontière Server → Client Component. Le
 * composant client résout l'icône lui-même depuis `slug` via
 * `getServiceBySlug`.
 */
export function groupProjectsByService(
  projects: MarketingProjectWithService[],
): ServiceProjectGroup[] {
  return MARKETING_SERVICES.map((service) => ({
    slug: service.slug,
    title: service.title,
    projects: projects.filter((project) => project.serviceSlug === service.slug),
  })).filter((group) => group.projects.length > 0);
}

export interface HeroSlide {
  key: string;
  image: string;
  title: string;
  tagline: string;
  href: string;
}

/**
 * Slides du carrousel Hero à partir des projets publiés placés en zone HERO.
 * Retourne un tableau vide si aucun projet n'est placé (le composant Hero
 * bascule alors sur un fallback statique).
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const placements = await prisma.projectPlacement.findMany({
      where: { zone: PlacementZone.HERO, project: { isPublished: true } },
      orderBy: { ordre: "asc" },
      include: { project: true },
    });

    return placements.map(({ project }) => ({
      key: project.id,
      image: resolveImage(project),
      title: project.titre,
      tagline: project.description.slice(0, 160),
      href: `/services/${domaineToSlug(project.domaine)}`,
    }));
  } catch (error) {
    // Le carrousel Hero bascule sur son fallback statique (services).
    console.error("getHeroSlides a échoué :", error);
    return [];
  }
}
