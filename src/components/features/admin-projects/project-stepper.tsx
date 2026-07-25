"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectStep = "info" | "images" | "publication";

interface ProjectStepperProps {
  mode: "create" | "edit";
  /** Requis en mode "edit" — absent tant que le projet n'existe pas encore. */
  projectId?: string;
  /** Étape par défaut de la page. Sur la page formulaire (info + images
   * réunies), affinée côté client selon l'ancre de l'URL. */
  current: ProjectStep;
}

const STEPS: { id: ProjectStep; label: string }[] = [
  { id: "info", label: "Informations" },
  { id: "images", label: "Images" },
  { id: "publication", label: "Publication" },
];

/**
 * Stepper cliquable reliant les 3 étapes de la fiche projet. Les routes
 * réelles restent au nombre de 2 (formulaire, publication) : "Informations"
 * et "Images" pointent toutes deux vers le formulaire, avec une ancre pour
 * cibler la bonne carte (cf. ProjectForm, sections #section-info/#section-images).
 */
export function ProjectStepper({ mode, projectId, current }: ProjectStepperProps) {
  const [active, setActive] = useState<ProjectStep>(current);

  useEffect(() => {
    setActive(current);
  }, [current]);

  useEffect(() => {
    if (current === "publication") return;

    function syncFromHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash === "section-images") setActive("images");
      else if (hash === "section-info") setActive("info");
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [current]);

  const formHref =
    mode === "create"
      ? "/admin/systeme/publisher/nouveau"
      : `/admin/systeme/publisher/${projectId}/edition`;
  const publicationHref =
    mode === "edit" && projectId
      ? `/admin/systeme/publisher/${projectId}/publication`
      : undefined;

  function hrefFor(step: ProjectStep): string | undefined {
    if (step === "publication") return publicationHref;
    return `${formHref}#section-${step}`;
  }

  const activeIndex = STEPS.findIndex((step) => step.id === active);

  return (
    <div className="flex flex-wrap items-center" aria-label="Étapes de la fiche projet">
      {STEPS.map((step, index) => {
        const href = hrefFor(step.id);
        const disabled = !href;
        const state =
          index < activeIndex ? "done" : index === activeIndex ? "active" : "todo";

        const content = (
          <span className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                state === "done" && "border-primary bg-primary text-primary-foreground",
                state === "active" && "border-primary bg-accent text-primary",
                state === "todo" && "border-border text-muted-foreground",
              )}
            >
              {state === "done" ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                state === "active"
                  ? "text-primary"
                  : state === "done"
                    ? "text-foreground"
                    : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </span>
        );

        return (
          <div key={step.id} className="flex items-center">
            {disabled ? (
              <span
                className="flex cursor-not-allowed items-center py-1 opacity-50"
                title="Créez d'abord le projet pour gérer sa publication"
              >
                {content}
              </span>
            ) : (
              <Link href={href} className="flex items-center py-1">
                {content}
              </Link>
            )}
            {index < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-3 h-px w-8 sm:w-12",
                  index < activeIndex ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
