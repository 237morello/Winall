"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageTall } from "@/components/features/long-image";
import type {
  DashboardProject,
  DashboardStats,
  UtilisateurTableauDeBord,
} from "@/types/dashboard.types";
import { HeroSection } from "./HeroSection";
import { HomeActions } from "./HomeActions";

interface DashboardOverviewProps {
  utilisateur: UtilisateurTableauDeBord;
  projetsRecents: DashboardProject[];
  stats: DashboardStats;
}

export function DashboardOverview({
  utilisateur,
  projetsRecents,
  stats,
}: DashboardOverviewProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen]);

  return (
    <div className="relative space-y-12 pb-20">
      {searchOpen ? (
        <button
          type="button"
          aria-label="Fermer la recherche"
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-[90] cursor-default bg-background/25 backdrop-blur-[3px]"
        />
      ) : null}

      <HeroSection
        utilisateur={utilisateur}
        stats={stats}
        searchOpen={searchOpen}
        onSearchOpenChange={setSearchOpen}
      />

      <HomeActions projetsRecents={projetsRecents} />

      <div className="space-y-8 border-t border-border/40 pt-8">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-3 text-3xl font-black tracking-tight">
            Quoi de neuf chez Winall
            <span className="size-2 rounded-full bg-primary animate-pulse" />
          </h2>
          <p className="text-sm font-medium text-muted-foreground">
            Decouvrez nos dernieres realisations et expertises sur le terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          {projetsRecents.length === 0 &&
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="flex aspect-[3/4] items-center justify-center rounded-[2rem] border-2 border-dashed bg-muted/20 p-6 text-center"
              >
                <p className="text-xs text-muted-foreground">Nouveau projet a venir...</p>
              </Card>
            ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            className="group gap-2 rounded-full border-border/60 px-8 shadow-lg shadow-primary/5 transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Explorer tous nos projets
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
