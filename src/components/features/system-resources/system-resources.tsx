import {
  CheckCircle2,
  Database,
  FileText,
  FolderClosed,
  HardDrive,
  MinusCircle,
  Rocket,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/system-stats";
import type { ActivityType } from "@/lib/system-stats";
import type { SystemResourcesProps } from "./system-resources.types";

const TABLE_LABELS: Record<string, string> = {
  projets: "Projets",
  utilisateurs: "Utilisateurs",
  formulaires: "Formulaires",
  factures: "Factures",
  messages: "Messages",
  commentaires: "Commentaires",
  placements: "Emplacements",
};

const ACTIVITY_META: Record<
  ActivityType,
  { icon: typeof Rocket; color: string }
> = {
  projet: { icon: Rocket, color: "text-primary" },
  formulaire: { icon: FileText, color: "text-blue-500" },
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SystemResources({
  dbSizeBytes,
  counts,
  storage,
  systemInfo,
  services,
  activity,
}: SystemResourcesProps) {
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div className="space-y-6">
      {/* Base de données + Stockage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Database className="size-4 text-primary" />
            <CardTitle className="text-base font-medium">
              Base de données
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {Object.entries(counts).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4 py-2.5">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <span className="text-sm text-muted-foreground">
                      {TABLE_LABELS[key] ?? key}
                    </span>
                    <div className="h-1.5 max-w-56 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.max((value / maxCount) * 100, 2)}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-right text-sm font-medium tabular-nums text-foreground">
                    {value.toLocaleString("fr-FR")}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-muted-foreground">Taille totale</span>
                <Badge variant="outline">{formatBytes(dbSizeBytes)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <HardDrive className="size-4 text-primary" />
            <CardTitle className="text-base font-medium">
              Stockage Supabase
            </CardTitle>
          </CardHeader>
          <CardContent>
            {storage.unavailable ? (
              <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-700">
                <FolderClosed className="mt-0.5 size-4 shrink-0" />
                <p>
                  Le bucket <code>winall-storage</code> est indisponible ou
                  vide. Vérifiez la configuration Supabase Storage pour suivre
                  l&apos;usage réel.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                <div className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-muted-foreground">
                    Nombre de fichiers
                  </span>
                  <span className="font-medium text-foreground">
                    {storage.fileCount.toLocaleString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-muted-foreground">Taille totale</span>
                  <Badge variant="outline">
                    {formatBytes(storage.totalBytes)}
                  </Badge>
                </div>
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Les quotas du plan Supabase (requêtes/24h, bande passante)
              nécessitent l&apos;API Management et ne sont pas exposés ici.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Informations système + Services externes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Informations système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {systemInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-medium text-foreground">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Services externes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
                >
                  {service.configured ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  ) : (
                    <MinusCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {service.name}
                      </p>
                      <Badge
                        variant={service.configured ? "success" : "neutral"}
                        className="px-1.5 py-0 text-[10px]"
                      >
                        {service.configured ? "Actif" : "Non configuré"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente (réelle) */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Aucune activité récente.
            </p>
          ) : (
            <div className="divide-y divide-border/60">
              {activity.map((item) => {
                const meta = ACTIVITY_META[item.type];
                const Icon = meta.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Icon className={cn("size-4", meta.color)} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
