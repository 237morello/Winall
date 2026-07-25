"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, Globe2, LayoutGrid, Sparkles } from "lucide-react";
import { PlacementZone } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { getSubServicesGroupedByService } from "@/lib/sub-service";
import { definirPlacement, definirPublication } from "./publication-actions";

interface PlacementDTO {
  zone: PlacementZone;
  subServiceSlug: string | null;
  ordre: number;
}

interface PublicationPanelProps {
  projectId: string;
  isPublished: boolean;
  publishedAt: string | null;
  placements: PlacementDTO[];
}

/** Clé locale d'un emplacement. */
function placementKey(zone: PlacementZone, slug: string | null): string {
  return slug ? `${zone}:${slug}` : zone;
}

interface LocalState {
  actif: boolean;
  ordre: number;
}

export function PublicationPanel({
  projectId,
  isPublished: initialPublished,
  publishedAt,
  placements,
}: PublicationPanelProps) {
  const [isPublished, setIsPublished] = useState(initialPublished);
  const [isPending, startTransition] = useTransition();

  const initialMap = new Map<string, LocalState>();
  for (const p of placements) {
    initialMap.set(placementKey(p.zone, p.subServiceSlug), {
      actif: true,
      ordre: p.ordre,
    });
  }
  const [local, setLocal] = useState<Map<string, LocalState>>(initialMap);

  const groupes = getSubServicesGroupedByService();

  function getState(zone: PlacementZone, slug: string | null): LocalState {
    return local.get(placementKey(zone, slug)) ?? { actif: false, ordre: 0 };
  }

  function updateLocal(
    zone: PlacementZone,
    slug: string | null,
    next: LocalState,
  ) {
    setLocal((current) => {
      const copy = new Map(current);
      copy.set(placementKey(zone, slug), next);
      return copy;
    });
  }

  function commitPlacement(
    zone: PlacementZone,
    slug: string | null,
    next: LocalState,
  ) {
    updateLocal(zone, slug, next);
    startTransition(() => {
      void definirPlacement({
        projectId,
        zone,
        subServiceSlug: slug,
        actif: next.actif,
        ordre: next.ordre,
      });
    });
  }

  function togglePublication(next: boolean) {
    setIsPublished(next);
    startTransition(() => {
      void definirPublication(projectId, next);
    });
  }

  return (
    <div className="space-y-6">
      {/* Bloc 1 — Publication globale */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Publication</CardTitle>
            <p className="text-sm text-muted-foreground">
              {isPublished
                ? publishedAt
                  ? `En ligne depuis le ${new Date(publishedAt).toLocaleDateString("fr-FR")}`
                  : "En ligne"
                : "Hors ligne (privé)"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {isPublished ? "Publié" : "Privé"}
            </span>
            <Switch
              checked={isPublished}
              onCheckedChange={togglePublication}
              disabled={isPending}
            />
          </div>
        </CardHeader>
      </Card>

      {!isPublished && (
        <div className="flex items-start gap-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <p>
            Ce projet n&apos;est pas publié. Vous pouvez préparer ses
            emplacements ci-dessous, mais ils resteront invisibles sur le site
            tant que le projet n&apos;est pas publié.
          </p>
        </div>
      )}

      {/* Bloc 2 — Zones globales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Zones d&apos;affichage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PlacementRow
            icon={<Sparkles className="size-4 text-primary" />}
            titre="Carrousel Hero (accueil)"
            description="Le projet apparaît dans le grand carrousel de la page d'accueil."
            state={getState(PlacementZone.HERO, null)}
            disabled={isPending}
            onChange={(next) => commitPlacement(PlacementZone.HERO, null, next)}
          />
          <PlacementRow
            icon={<LayoutGrid className="size-4 text-primary" />}
            titre="Projets (réalisations)"
            description="Le projet apparaît dans la section réalisations (accueil, /projets, /services)."
            state={getState(PlacementZone.PROJETS_GLOBAL, null)}
            disabled={isPending}
            onChange={(next) =>
              commitPlacement(PlacementZone.PROJETS_GLOBAL, null, next)
            }
          />
        </CardContent>
      </Card>

      {/* Bloc 3 — Sous-services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sous-services</CardTitle>
          <p className="text-sm text-muted-foreground">
            Affichez ce projet sous un ou plusieurs sous-services précis.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {groupes.map((groupe) => (
            <div key={groupe.serviceSlug} className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Globe2 className="size-4 text-muted-foreground" />
                {groupe.serviceTitle}
              </p>
              <div className="space-y-2 pl-6">
                {groupe.subServices.map((sub) => (
                  <PlacementRow
                    key={sub.slug}
                    titre={sub.name}
                    compact
                    state={getState(PlacementZone.SOUS_SERVICE, sub.slug)}
                    disabled={isPending}
                    onChange={(next) =>
                      commitPlacement(
                        PlacementZone.SOUS_SERVICE,
                        sub.slug,
                        next,
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

interface PlacementRowProps {
  titre: string;
  description?: string;
  icon?: React.ReactNode;
  compact?: boolean;
  state: LocalState;
  disabled?: boolean;
  onChange: (next: LocalState) => void;
}

function PlacementRow({
  titre,
  description,
  icon,
  compact,
  state,
  disabled,
  onChange,
}: PlacementRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-3">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={state.actif}
          disabled={disabled}
          onCheckedChange={(checked) =>
            onChange({ actif: checked === true, ordre: state.ordre })
          }
        />
        <div>
          <p className={compact ? "text-sm" : "text-sm font-medium"}>
            {icon && <span className="mr-1.5 inline-block align-middle">{icon}</span>}
            {titre}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {state.actif && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Ordre
          <input
            type="number"
            min={0}
            value={state.ordre}
            disabled={disabled}
            onChange={(e) =>
              onChange({ actif: true, ordre: Number(e.target.value) || 0 })
            }
            className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-primary"
          />
        </label>
      )}
    </div>
  );
}
