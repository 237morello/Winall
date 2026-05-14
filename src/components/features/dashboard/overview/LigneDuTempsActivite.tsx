/**
 * MISSION : Composant Dashboard — LigneDuTempsActivite affiche les événements récents.
 * Migration : Utilisation de DashboardService et UI raffinée.
 */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardService } from "@/services/dashboard.service";
import type { ActiviteTableauDeBord } from "@/types/dashboard.types";
import { cn } from "@/lib/utils";

interface LigneDuTempsActiviteProps {
  activites: ActiviteTableauDeBord[];
}

export function LigneDuTempsActivite({ activites }: LigneDuTempsActiviteProps) {
  const params = useParams<{ userId: string }>();

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 py-4">
        <CardTitle className="text-base font-bold">Activités récentes</CardTitle>
        <Link
          href={`/dashboard/${params.userId}/notifications`}
          className="text-xs font-bold text-p hover:underline underline-offset-4"
        >
          Voir tout →
        </Link>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {activites.map((act, index) => {
          const colorClass = DashboardService.obtenirCouleurStatut(act.statut);

          return (
            <div
              key={act.identifiant}
              className="flex items-start gap-4 animate-in fade-in slide-in-from-right-2 duration-300 ease-out"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn("mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl", colorClass)}>
                <act.icone className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-bold text-foreground">{act.titre}</p>
                  <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{act.moment}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {act.detail}
                </p>
                {act.progression > 0 && (
                   <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-p transition-all duration-1000 ease-out" 
                        style={{ width: `${act.progression}%` }}
                      />
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
