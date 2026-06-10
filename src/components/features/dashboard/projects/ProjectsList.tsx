/**
 * MISSION : ProjectsList - Galerie projets du dashboard client avec recherche et filtres.
 */
"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageTall } from "@/components/features/long-image";
import { cn } from "@/lib/utils";
import {
  getProjectDomainLabel,
  PROJECT_DOMAIN_OPTIONS,
  type ProjectDomainValue,
} from "@/components/features/dashboard/domain-options";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

type ProjectListItem = {
  id: string;
  titre: string;
  description?: string | null;
  domaine?: string | null;
  imageUrl?: string | null;
  localisation?: string | null;
  progression?: number | null;
  statut?: string | null;
};

export function ProjectsList({
  projets,
  selectedDomain,
  query,
}: {
  utilisateur: UtilisateurTableauDeBord;
  projets: ProjectListItem[];
  stats: { myProjects?: number; myUnreadMessages?: number; myPendingQuotes?: number };
  selectedDomain?: ProjectDomainValue | null;
  query?: string;
}) {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = React.useState(12);
  const selectedDomainLabel = getProjectDomainLabel(selectedDomain);
  const visibleDomains = PROJECT_DOMAIN_OPTIONS.slice(0, 6);
  const selectedDomainIsVisible = visibleDomains.some((domain) => domain.value === selectedDomain);
  const hasFilters = Boolean(selectedDomain || query);
  const visibleProjects = projets.slice(0, visibleCount);
  const canShowMore = projets.length > 12 && visibleCount < projets.length;

  React.useEffect(() => {
    setVisibleCount(12);
  }, [query, selectedDomain, projets.length]);

  function buildProjectsUrl(next: { q?: string; domaine?: string | null }) {
    const params = new URLSearchParams();
    const nextQuery = next.q?.trim() ?? query?.trim();

    if (nextQuery) {
      params.set("q", nextQuery);
    }

    if (next.domaine) {
      params.set("domaine", next.domaine);
    }

    const search = params.toString();
    return search ? `/dashboard/projects?${search}` : "/dashboard/projects";
  }

  function applyDomain(domain: ProjectDomainValue | null) {
    router.push(buildProjectsUrl({ q: query, domaine: domain }));
  }

  return (
    <div className="space-y-8 pb-12">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {visibleDomains.map((domain) => {
          const Icon = domain.icon;
          const active = selectedDomain === domain.value;

          return (
            <button
              key={domain.value}
              type="button"
              onClick={() => applyDomain(active ? null : domain.value)}
              className={cn(
                "group min-h-28 rounded-lg border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                active
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-border/70 text-foreground",
              )}
              aria-pressed={active}
            >
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-lg transition-colors",
                  active ? "bg-primary text-primary-foreground" : domain.iconClassName,
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="mt-4 block truncate text-sm font-bold">{domain.label}</span>
              <span
                className={cn(
                  "mt-1 line-clamp-2 block text-xs leading-5",
                  active ? "text-primary/80" : "text-muted-foreground",
                )}
              >
                {domain.description}
              </span>
            </button>
          );
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "group min-h-28 rounded-lg border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selectedDomain && !selectedDomainIsVisible
                  ? "border-primary bg-primary/5 text-primary shadow-md"
                  : "border-border/70 text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-10 place-items-center rounded-lg",
                  selectedDomain && !selectedDomainIsVisible
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <SlidersHorizontal className="size-5" />
              </span>
              <span className="mt-4 block truncate text-sm font-bold">
                {selectedDomain && !selectedDomainIsVisible ? selectedDomainLabel : "Filtres"}
              </span>
              <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                Tous les domaines
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-lg border-border/70 p-2">
            <DropdownMenuLabel className="px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Domaines
            </DropdownMenuLabel>
            {PROJECT_DOMAIN_OPTIONS.map((domain) => {
              const Icon = domain.icon;
              const active = selectedDomain === domain.value;

              return (
                <DropdownMenuItem
                  key={domain.value}
                  onSelect={() => applyDomain(active ? null : domain.value)}
                  className={cn(
                    "cursor-pointer rounded-md px-2 py-2.5",
                    active && "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-md",
                      active ? "bg-primary text-primary-foreground" : domain.iconClassName,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{domain.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {domain.description}
                    </span>
                  </span>
                </DropdownMenuItem>
              );
            })}
            {hasFilters ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => router.push("/dashboard/projects")}
                  className="cursor-pointer rounded-md px-2 py-2.5 text-muted-foreground focus:text-primary"
                >
                  <X className="size-4" />
                  Reinitialiser les filtres
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {selectedDomainLabel ? `Projets ${selectedDomainLabel}` : "Tous les projets"}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>
                <span className="font-semibold text-foreground">{projets.length}</span> resultat(s)
              </span>
              {query ? (
                <Badge variant="outline" className="rounded-md border-border/70 bg-card">
                  Recherche: {query}
                </Badge>
              ) : null}
              {selectedDomainLabel ? (
                <Badge variant="outline" className="rounded-md border-primary/30 bg-primary/5 text-primary">
                  {selectedDomainLabel}
                </Badge>
              ) : null}
            </div>
          </div>

          {hasFilters ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 rounded-md text-muted-foreground hover:text-primary"
              onClick={() => router.push("/dashboard/projects")}
            >
              <X className="size-4" />
              Reinitialiser
            </Button>
          ) : null}
        </div>

      {projets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <div key={project.id} className="space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card px-3 py-2 shadow-sm">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {getProjectDomainLabel(project.domaine) ?? project.domaine ?? "Projet"}
                    </p>
                    {project.localisation ? (
                      <p className="truncate text-xs text-muted-foreground">{project.localisation}</p>
                    ) : null}
                  </div>
                  <Badge className="rounded-md bg-primary/10 text-primary hover:bg-primary/10">
                    {project.progression ?? 0}%
                  </Badge>
                </div>
                <ImageTall
                  id={project.id}
                  image={project.imageUrl || "/images/63966.jpg"}
                  text={project.titre}
                  description={project.description || ""}
                  categorie={getProjectDomainLabel(project.domaine) ?? project.domaine ?? "Projet Winall"}
                  onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                />
              </div>
            ))}
          </div>

          {canShowMore ? (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-md border-border/70 bg-card px-6 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                onClick={() => setVisibleCount((count) => Math.min(count + 6, projets.length))}
              >
                Voir plus
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-lg font-semibold text-foreground">Aucun projet trouve</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Essayez un autre mot-cle, retirez le domaine actif ou revenez a tous les projets.
          </p>
          <Button className="mt-5 rounded-md" onClick={() => router.push("/dashboard/projects")}>
            Voir tous les projets
          </Button>
        </div>
      )}
      </section>
    </div>
  );
}
