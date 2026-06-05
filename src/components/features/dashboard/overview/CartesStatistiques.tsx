/**
 * MISSION : Composant Dashboard — CartesStatistiques affiche les métriques clés.
 * Migration : Utilisation de DashboardService et design premium Winall.
 */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardService } from "@/services/dashboard.service";
import type { CarteStatistiqueTableauDeBord } from "@/types/dashboard.types";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, FileSpreadsheet, FolderKanban, Bell, MessageSquareDot, CheckCheck, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  FileSpreadsheet,
  FolderKanban,
  Bell,
  MessageSquareDot,
  CheckCheck,
};

interface CartesStatistiquesProps {
  cartes: CarteStatistiqueTableauDeBord[];
}

export function CartesStatistiques({ cartes }: CartesStatistiquesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cartes.map((carte, index) => {
        const classesTendance = DashboardService.obtenirCouleurStatut(carte.tendance);
        const Icon = ICON_MAP[carte.icone] || Bell;
        
        return (
          <div
            key={carte.identifiant}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-p/30 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {carte.libelle}
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-p/10 text-p transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {carte.valeur}
                  </span>
                  <Badge className={cn("rounded-lg px-2 py-0.5 text-[10px] font-bold border border-current/20", classesTendance)}>
                    {carte.evolution}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {carte.resume}
                </p>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
