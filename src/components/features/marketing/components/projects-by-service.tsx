"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plus,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import type { ServiceProjectGroup } from "@/lib/public-projects";
import { getServiceBySlug } from "../marketing.constants";
import type { MarketingProjectWithService } from "../marketing.types";

interface ProjectsByServiceProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  groups: ServiceProjectGroup[];
  /** Nombre de lignes visibles avant le bouton "+". */
  initialVisible?: number;
  exploreHref?: string;
  exploreLabel?: string;
}

/**
 * Projets organisés en lignes par service (une ligne = un carrousel
 * horizontal indépendant). Seules les `initialVisible` premières lignes sont
 * affichées ; le bouton "+" révèle le reste. Réservé à /projets — les autres
 * pages continuent d'utiliser ProjectsShowcase (carrousel plat mono-liste).
 */
export function ProjectsByService({
  id,
  eyebrow,
  title,
  description,
  groups,
  initialVisible = 3,
  exploreHref = "/services",
  exploreLabel = "Explorer les services",
}: ProjectsByServiceProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleGroups = expanded ? groups : groups.slice(0, initialVisible);
  const hiddenCount = groups.length - visibleGroups.length;

  return (
    <section id={id} className="bg-zinc-50 py-20 sm:py-24">
      <Container size="8xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading level={2} className="mt-3">
              {title}
            </Heading>
            <Lead className="mt-5 max-w-2xl">{description}</Lead>
          </div>

          <Link
            href={exploreHref}
            className={buttonVariants({ variant: "outline", className: "w-fit" })}
          >
            {exploreLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {visibleGroups.map((group) => (
            <ServiceRow key={group.slug} group={group} />
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-accent hover:text-primary"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-accent text-primary">
                <Plus className="size-3.5" aria-hidden="true" />
              </span>
              Voir plus de domaines ({hiddenCount})
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function ServiceRow({ group }: { group: ServiceProjectGroup }) {
  const trackRef = useRef<HTMLDivElement>(null);
  // L'icône (composant React) n'est pas sérialisable depuis le Server
  // Component : on la résout ici, côté client, à partir du slug.
  const Icon = getServiceBySlug(group.slug)?.icon ?? Sparkles;

  function scroll(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Icon className="size-[1.15rem]" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-medium tracking-tight text-foreground">
              {group.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {group.projects.length} projet{group.projects.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/services/${group.slug}`}
            className="hidden items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover sm:inline-flex"
          >
            Voir le service
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Précédent"
              className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:bg-accent"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Suivant"
              className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:bg-accent"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-proximity gap-4 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {group.projects.map((project) => (
          <ProjectTile
            key={`${group.slug}-${project.title}`}
            project={project}
            serviceSlug={group.slug}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectTile({
  project,
  serviceSlug,
}: {
  project: MarketingProjectWithService;
  serviceSlug: string;
}) {
  return (
    <article className="relative min-h-62 w-84 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="336px"
        className="object-cover"
        unoptimized={project.image.startsWith("http")}
      />
      <div className="absolute inset-0 bg-zinc-950/35" />

      <div className="relative z-10 flex min-h-62 flex-col justify-between p-4">
        <span className="inline-flex w-fit items-center rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {project.serviceTitle}
        </span>

        <div>
          <h4 className="text-base font-medium leading-tight tracking-tight text-white">
            {project.title}
          </h4>
          {project.location && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-300">
              <MapPin className="size-3" aria-hidden="true" />
              {project.location}
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-300">
            {project.description}
          </p>
          <Link
            href={`/services/${serviceSlug}`}
            className="mt-3 inline-flex h-8 items-center rounded-md bg-white px-3 text-xs font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
          >
            Voir le service
          </Link>
        </div>
      </div>
    </article>
  );
}
