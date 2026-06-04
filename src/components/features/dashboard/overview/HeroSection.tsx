/**
 * MISSION : Composant Dashboard — HeroSection affiche le message de bienvenue, la recherche globale et les services.
 * Optimisé avec titre, sous-titre et barre de recherche dynamique.
 */
"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DashboardService } from "@/services/dashboard.service";
import type { DashboardStats, UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { ServicesGrid } from "./ServicesGrid";

interface HeroSectionProps {
  utilisateur: UtilisateurTableauDeBord;
  stats: DashboardStats;
}

export function HeroSection({ utilisateur, stats }: HeroSectionProps) {
  const [salutation, setSalutation] = React.useState("Bonjour");
  const [placeholder, setPlaceholder] = React.useState("Recherchez une expertise, un projet...");
  const refRecherche = React.useRef<HTMLInputElement | null>(null);
  
  const SUGGESTIONS = React.useMemo(() => [
    "Installation Vidéosurveillance",
    "Maintenance Réseau Fibre",
    "Audit Sécurité Incendie",
    "Projet Domotique Villa",
    "Déploiement Téléphonie IP"
  ], []);

  React.useEffect(() => {
    const heure = new Date().getHours();
    setSalutation(heure >= 18 || heure < 5 ? "Bonsoir" : "Bonjour");

    // Cycle de placeholders pour simuler des suggestions
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(`Essayer : "${SUGGESTIONS[i % SUGGESTIONS.length]}"`);
      i++;
    }, 3000);

    const gererRaccourci = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        refRecherche.current?.focus();
      }
    };

    window.addEventListener("keydown", gererRaccourci);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", gererRaccourci);
    };
  }, [SUGGESTIONS]);

  return (
    <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out py-10">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            {salutation}, <span className="text-primary">{DashboardService.obtenirPrenom(utilisateur)}</span> !
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg font-medium max-w-2xl mx-auto">
            Ravi de vous revoir. Gérez vos infrastructures et suivez vos projets en toute sérénité.
          </p>
        </div>

        {/* Statistiques Rapides Synchronisées */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 text-blue-600 border border-blue-500/10 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-black">{stats.myProjects || 0}</span> Projets actifs
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-black">{stats.myUnreadMessages || 0}</span> Nouveaux messages
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/5 text-amber-600 border border-amber-500/10 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-black">{stats.myPendingQuotes || 0}</span> Devis en attente
          </div>
        </div>
        
        <div className="relative mx-auto max-w-2xl group mt-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              ref={refRecherche}
              aria-label="Recherche globale"
              placeholder={placeholder}
              className="h-16 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md pl-14 pr-24 text-base md:text-lg focus-visible:ring-primary/20 transition-all shadow-xl shadow-primary/5"
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-[10px] font-bold text-muted-foreground select-none pointer-events-none hidden md:flex">
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
