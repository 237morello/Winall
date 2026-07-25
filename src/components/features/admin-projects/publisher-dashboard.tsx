"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FolderOpen,
  Globe2,
  LayoutGrid,
  Loader2,
  Lock,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { PlacementZone, ProjectStatut } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DOMAINE_LABELS, DOMAINE_OPTIONS } from "@/lib/project-domaine";
import type { ProjectPlacementSummary, ProjectSummary } from "./admin-projects.types";
import { supprimerProjet } from "./project-actions";
import { definirPublication } from "./publication-actions";

const STATUT_LABELS: Record<ProjectStatut, string> = {
  BROUILLON: "Brouillon",
  EN_COURS: "En cours",
  TERMINE: "Terminé",
  ARCHIVE: "Archivé",
};

const STATUT_OPTIONS = Object.entries(STATUT_LABELS) as Array<
  [ProjectStatut, string]
>;

const ALL = "ALL";
const PAGE_SIZE = 10;

function summarizePlacements(placements: ProjectPlacementSummary[]) {
  return {
    hero: placements.some((p) => p.zone === PlacementZone.HERO),
    projets: placements.some((p) => p.zone === PlacementZone.PROJETS_GLOBAL),
    sousServices: placements.filter(
      (p) => p.zone === PlacementZone.SOUS_SERVICE,
    ).length,
  };
}

function PlacementBadges({
  placements,
}: {
  placements: ProjectPlacementSummary[];
}) {
  const summary = summarizePlacements(placements);
  if (!summary.hero && !summary.projets && summary.sousServices === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {summary.hero && (
        <Badge variant="success" className="gap-1 px-1.5 py-0 text-[10px]">
          <Sparkles className="size-2.5" /> Hero
        </Badge>
      )}
      {summary.projets && (
        <Badge variant="secondary" className="gap-1 px-1.5 py-0 text-[10px]">
          <LayoutGrid className="size-2.5" /> Projets
        </Badge>
      )}
      {summary.sousServices > 0 && (
        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
          {summary.sousServices} sous-service
          {summary.sousServices > 1 ? "s" : ""}
        </Badge>
      )}
    </div>
  );
}

export function PublisherDashboard({ projects }: { projects: ProjectSummary[] }) {
  const [query, setQuery] = useState("");
  const [statutFilter, setStatutFilter] = useState<string>(ALL);
  const [domaineFilter, setDomaineFilter] = useState<string>(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchQuery = project.titre
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchStatut =
          statutFilter === ALL || project.statut === statutFilter;
        const matchDomaine =
          domaineFilter === ALL || project.domaine === domaineFilter;
        return matchQuery && matchStatut && matchDomaine;
      }),
    [projects, query, statutFilter, domaineFilter],
  );

  useEffect(() => {
    setPage(1);
  }, [query, statutFilter, domaineFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  const selectedProject =
    projects.find((project) => project.id === selectedId) ?? null;

  const hasProjects = projects.length > 0;

  return (
    <div className="mx-auto max-w-[88rem] space-y-6 p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher un projet"
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="w-full sm:w-44">
              <Select value={statutFilter} onValueChange={setStatutFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>Tous les statuts</SelectItem>
                  {STATUT_OPTIONS.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={domaineFilter} onValueChange={setDomaineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>Tous les domaines</SelectItem>
                  {DOMAINE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!hasProjects ? (
            <EmptyState
              icon={<FolderOpen className="size-8 text-muted-foreground" />}
              title="Aucun projet pour l'instant"
              description="Créez votre premier projet pour commencer à publier sur le site."
              action={
                <Link
                  href="/admin/systeme/publisher/nouveau"
                  className={buttonVariants({ size: "sm" })}
                >
                  <Plus className="size-4" />
                  Nouveau projet
                </Link>
              }
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Search className="size-8 text-muted-foreground" />}
              title="Aucun résultat"
              description="Aucun projet ne correspond à ces filtres."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Projet</th>
                      <th className="px-4 py-3 font-medium">Domaine</th>
                      <th className="px-4 py-3 font-medium">Statut</th>
                      <th className="px-4 py-3 font-medium">Publication</th>
                      <th className="px-4 py-3 font-medium">Emplacements</th>
                      <th className="px-4 py-3 font-medium">Maj</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginated.map((project) => (
                      <tr
                        key={project.id}
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setSelectedId(project.id)}
                      >
                        <td className="px-4 py-4 font-medium text-foreground">
                          <div>{project.titre}</div>
                          {project.localisation ? (
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <MapPin className="mr-1 size-3" />
                              {project.localisation}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {DOMAINE_LABELS[project.domaine]}
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="outline">
                            {STATUT_LABELS[project.statut]}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          {project.isPublished ? (
                            <Badge variant="success" className="gap-1.5">
                              <Globe2 className="size-3" />
                              Publié
                            </Badge>
                          ) : (
                            <Badge variant="neutral" className="gap-1.5">
                              <Lock className="size-3" />
                              Privé
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <PlacementBadges placements={project.placements} />
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">
                          {new Date(project.updatedAt).toLocaleDateString("fr-FR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Affichage {rangeStart}–{rangeEnd} sur {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Page précédente"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Page {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Page suivante"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <ProjectDetailSheet
        project={selectedProject}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function ProjectDetailSheet({
  project,
  onClose,
}: {
  project: ProjectSummary | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="w-full overflow-y-auto sm:max-w-xl"
        showCloseButton
      >
        {project ? (
          <div className="space-y-6 p-1">
            <SheetHeader className="p-0">
              <SheetTitle className="text-2xl">{project.titre}</SheetTitle>
              <SheetDescription>
                Modifié le{" "}
                {new Date(project.updatedAt).toLocaleDateString("fr-FR")}
              </SheetDescription>
            </SheetHeader>

            {project.imageUrl ? (
              <div className="overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.titre}
                  className="h-44 w-full object-cover"
                />
              </div>
            ) : null}

            <QuickPublishToggle
              projectId={project.id}
              isPublished={project.isPublished}
              publishedAt={project.publishedAt}
            />

            <Card className="border-border bg-muted/20">
              <CardContent className="space-y-3 p-5">
                <DetailRow
                  label="Statut"
                  value={STATUT_LABELS[project.statut]}
                />
                <DetailRow
                  label="Domaine"
                  value={DOMAINE_LABELS[project.domaine]}
                />
                {project.localisation ? (
                  <DetailRow
                    label="Localisation"
                    value={project.localisation}
                  />
                ) : null}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Emplacements</span>
                  <PlacementBadges placements={project.placements} />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              <Link
                href={`/admin/systeme/publisher/${project.id}/edition`}
                className={buttonVariants({
                  className: "h-11 justify-start",
                })}
              >
                <Edit3 className="mr-2 size-4" />
                Modifier les informations
              </Link>
              <Link
                href={`/admin/systeme/publisher/${project.id}/publication`}
                className={buttonVariants({
                  variant: "outline",
                  className: "h-11 justify-start",
                })}
              >
                <ArrowRight className="mr-2 size-4" />
                Gérer la publication & les emplacements
              </Link>
              <DeleteProjectDialog
                projectId={project.id}
                titre={project.titre}
              />
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function QuickPublishToggle({
  projectId,
  isPublished,
  publishedAt,
}: {
  projectId: string;
  isPublished: boolean;
  publishedAt: Date | null;
}) {
  const [checked, setChecked] = useState(isPublished);
  const [isPending, startTransition] = useTransition();

  function toggle(next: boolean) {
    setChecked(next);
    startTransition(() => {
      void definirPublication(projectId, next);
    });
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div>
        <p className="text-sm font-medium">
          {checked ? "Publié sur le site" : "Non publié (privé)"}
        </p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {isPending ? (
            <>
              <Loader2 className="size-3 animate-spin" /> Mise à jour…
            </>
          ) : publishedAt ? (
            <>
              <CalendarClock className="size-3" />
              Depuis le {new Date(publishedAt).toLocaleDateString("fr-FR")}
            </>
          ) : (
            "Bascule la visibilité publique"
          )}
        </p>
      </div>
      <Switch checked={checked} onCheckedChange={toggle} disabled={isPending} />
    </div>
  );
}

function DeleteProjectDialog({
  projectId,
  titre,
}: {
  projectId: string;
  titre: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="h-11 w-full justify-start">
          <Trash2 className="mr-2 size-4" />
          Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer « {titre} » ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le projet et ses emplacements de
            publication seront supprimés. Les factures et formulaires liés seront
            détachés (conservés sans projet). Les commentaires du projet seront
            supprimés.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive-hover"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              startTransition(() => {
                void supprimerProjet(projectId);
              });
            }}
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Supprimer définitivement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
