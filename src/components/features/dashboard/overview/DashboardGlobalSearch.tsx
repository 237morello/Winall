"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  FolderKanban,
  LayoutGrid,
  Loader2,
  Search,
} from "lucide-react";
import { searchProjects } from "@/actions/project.actions";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getProjectDomainLabel, PROJECT_DOMAIN_OPTIONS } from "../domain-options";

type ProjectSearchResult = Awaited<ReturnType<typeof searchProjects>>[number];

interface DashboardGlobalSearchProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  variant?: "hero" | "navbar";
  enableShortcut?: boolean;
}

export function DashboardGlobalSearch({
  className,
  open,
  onOpenChange,
  placeholder = "Rechercher un projet...",
  variant = "hero",
  enableShortcut = true,
}: DashboardGlobalSearchProps) {
  const router = useRouter();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<ProjectSearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);

  const isOpen = open ?? internalOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    },
    [onOpenChange],
  );

  const trimmedQuery = query.trim();
  const isHero = variant === "hero";

  const filteredDomains = React.useMemo(() => {
    const normalized = trimmedQuery.toLowerCase();
    if (!normalized) return PROJECT_DOMAIN_OPTIONS;

    return PROJECT_DOMAIN_OPTIONS.filter((domain) => {
      const searchable = `${domain.label} ${domain.description} ${domain.value}`.toLowerCase();
      return searchable.includes(normalized);
    });
  }, [trimmedQuery]);

  React.useEffect(() => {
    if (!enableShortcut) return;

    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [enableShortcut, setOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const data = await searchProjects({
          q: trimmedQuery || undefined,
          limit: isHero ? 6 : 5,
        });

        if (!cancelled) {
          setResults(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, trimmedQuery ? 220 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isHero, isOpen, trimmedQuery]);

  function closeAndNavigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  function submitSearch() {
    if (!trimmedQuery) return;
    closeAndNavigate(`/dashboard/projects?q=${encodeURIComponent(trimmedQuery)}`);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative text-left transition-transform duration-200",
        isHero ? "mx-auto mt-8 w-full max-w-2xl" : "hidden w-[min(34vw,420px)] md:block",
        isOpen ? "z-[100] scale-[1.01]" : "z-10",
        className,
      )}
    >
      {isHero ? (
        <div className="absolute -inset-1 rounded-2xl bg-primary/10 opacity-60 blur transition duration-500 focus-within:opacity-100" />
      ) : null}

      <div className="relative">
        <Search
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
            isHero ? "size-5" : "size-4",
          )}
        />
        <Input
          ref={inputRef}
          value={isOpen ? query : ""}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(event) => {
            if (!isOpen) setOpen(true);
            setQuery(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-label="Recherche globale projets"
          placeholder={isOpen ? "Rechercher un projet, domaine ou ville..." : placeholder}
          className={cn(
            "border-border/70 bg-background text-foreground placeholder:text-muted-foreground transition-all focus-visible:border-primary/50 focus-visible:ring-primary/20",
            isHero
              ? "h-16 rounded-2xl pl-12 pr-24 text-base shadow-xl shadow-primary/5 md:text-lg"
              : "h-10 rounded-lg pl-10 pr-16 text-sm shadow-none",
            isOpen && "border-primary/50 bg-background shadow-2xl shadow-black/15",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center rounded-md border border-border bg-muted text-[10px] font-bold text-muted-foreground md:flex",
            isHero ? "gap-1.5 px-3 py-2" : "px-2 py-1",
          )}
        >
          Ctrl K
        </div>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-full mt-2 overflow-y-auto rounded-xl border border-primary/20 bg-background p-2 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.24)] animate-in fade-in slide-in-from-top-2 duration-150",
            isHero ? "max-h-[min(560px,calc(100vh-16rem))]" : "max-h-[min(520px,calc(100vh-7rem))]",
          )}
        >
          <button
            type="button"
            onClick={() =>
              closeAndNavigate(
                trimmedQuery
                  ? `/dashboard/projects?q=${encodeURIComponent(trimmedQuery)}`
                  : "/dashboard/projects",
              )
            }
            className="mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <LayoutGrid className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate">
                {trimmedQuery ? "Voir tous les resultats" : "Tous les projets"}
              </span>
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {trimmedQuery ? `Recherche : ${trimmedQuery}` : "Afficher la galerie sans filtre"}
              </span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </button>

          <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Projets
          </div>

          <div className="space-y-1">
            {loading ? (
              <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Recherche en cours...
              </div>
            ) : results.length > 0 ? (
              results.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => closeAndNavigate(`/dashboard/projects/${project.id}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FolderKanban className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{project.titre}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {getProjectDomainLabel(project.domaine) ?? project.domaine}
                      {project.localisation ? ` - ${project.localisation}` : ""}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-xs font-medium text-muted-foreground sm:block">
                    {project.progression}%
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                Aucun projet trouve.
              </div>
            )}
          </div>

          <div className="mt-2 border-t border-border/60 pt-2">
            <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Domaines
            </div>
            <div className="grid gap-1 sm:grid-cols-2">
              {filteredDomains.slice(0, isHero ? 8 : 6).map((domain) => {
                const Icon = domain.icon;

                return (
                  <Link
                    key={domain.value}
                    href={`/dashboard/projects?domaine=${domain.value}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className={cn("grid size-7 place-items-center rounded-md", domain.iconClassName)}>
                      <Icon className="size-3.5" />
                    </span>
                    <span className="truncate">{domain.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {trimmedQuery ? (
            <button
              type="button"
              onClick={submitSearch}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Rechercher dans tous les projets
              <ArrowRight className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
