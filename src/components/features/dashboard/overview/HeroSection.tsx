/**
 * MISSION : Composant Dashboard — HeroSection affiche le message de bienvenue, la recherche globale et les services.
 */
"use client";

import * as React from "react";
import { Command, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DashboardService } from "@/services/dashboard.service";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { ServicesGrid } from "./ServicesGrid";

interface HeroSectionProps {
  utilisateur: UtilisateurTableauDeBord;
}

export function HeroSection({ utilisateur }: HeroSectionProps) {
  const [salutation, setSalutation] = React.useState("Bonjour");
  const refRecherche = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const heure = new Date().getHours();
    if (heure >= 18 || heure < 5) {
      setSalutation("Bonsoir");
    } else {
      setSalutation("Bonjour");
    }

    const gererRaccourci = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        refRecherche.current?.focus();
      }
    };

    window.addEventListener("keydown", gererRaccourci);
    return () => window.removeEventListener("keydown", gererRaccourci);
  }, []);

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-6">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          {salutation}, <span className="text-primary">{DashboardService.obtenirPrenom(utilisateur)}</span> !
        </h1>
        
        <div className="relative mx-auto max-w-2xl group">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              ref={refRecherche}
              aria-label="Recherche globale"
              placeholder="Recherchez des projets, des ressources et bien plus encore"
              className="h-16 rounded-2xl border-border/50 bg-card/50 pl-14 pr-24 text-lg shadow-xl focus-visible:ring-primary/20 transition-all border-none"
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-[10px] font-bold text-muted-foreground select-none pointer-events-none">
              <span className="text-xs">Ctrl</span>
              <span className="text-xs">K</span>
            </div>
          </div>
        </div>
      </div>

      <ServicesGrid />
    </section>
  );
}
