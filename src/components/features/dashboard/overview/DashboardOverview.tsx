import { HeroSection } from "./HeroSection";
import { HomeActions } from "./HomeActions";
import type { DashboardProject, DashboardStats, UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ImageTall } from "@/components/features/long-image";

interface DashboardOverviewProps {
  utilisateur: UtilisateurTableauDeBord;
  projetsRecents: DashboardProject[];
  stats: DashboardStats;
}

export function DashboardOverview({ utilisateur, projetsRecents, stats }: DashboardOverviewProps) {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero & Barre de recherche & Grille de Services */}
      <HeroSection utilisateur={utilisateur} stats={stats} />
      
      {/* 2. Actions Rapides (Les 3 Cartes) */}
      <HomeActions projetsRecents={projetsRecents} />

      {/* 3. Section "Quoi de neuf" (Projets) - Grille 4x3 */}
      <div className="space-y-8 pt-8 border-t border-border/40">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
            Quoi de neuf chez Winall
            <span className="size-2 rounded-full bg-primary animate-pulse" />
          </h2>
          <p className="text-muted-foreground text-sm font-medium">Découvrez nos dernières réalisations et expertises sur le terrain.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projetsRecents.map((projet) => (
            <ImageTall 
              key={projet.id}
              id={projet.id}
              image={projet.imageUrl || "/images/63966.jpg"}
              text={projet.titre}
              description={projet.description || ""}
              categorie={projet.domaine || "Expertise Winall"}
            />
          ))}

          {/* Fallback si peu de projets pour montrer la grille */}
          {projetsRecents.length === 0 && Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="aspect-[3/4] rounded-[2rem] bg-muted/20 border-dashed border-2 flex items-center justify-center p-6 text-center">
              <p className="text-muted-foreground text-xs">Nouveau projet à venir...</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" className="rounded-full gap-2 px-8 border-border/60 hover:bg-primary hover:text-primary-foreground transition-all group shadow-lg shadow-primary/5">
            <span className="font-bold uppercase tracking-widest text-[10px]">Explorer tous nos projets</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
