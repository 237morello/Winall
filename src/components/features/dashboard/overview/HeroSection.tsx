/**
 * MISSION : Composant Dashboard - HeroSection affiche le message de bienvenue,
 * la recherche globale et les domaines de service.
 */
"use client";

import * as React from "react";
import { DashboardService } from "@/services/dashboard.service";
import type { DashboardStats, UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { DashboardGlobalSearch } from "./DashboardGlobalSearch";
import { ServicesGrid } from "./ServicesGrid";

interface HeroSectionProps {
  utilisateur: UtilisateurTableauDeBord;
  stats: DashboardStats;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
}

export function HeroSection({
  utilisateur,
  searchOpen,
  onSearchOpenChange,
}: HeroSectionProps) {
  const [salutation, setSalutation] = React.useState("Bonjour");
  const [placeholder, setPlaceholder] = React.useState("Recherchez une expertise, un projet...");

  const suggestions = React.useMemo(
    () => [
      "Installation videosurveillance",
      "Maintenance reseau fibre",
      "Audit securite incendie",
      "Projet domotique villa",
      "Deploiement telephonie IP",
    ],
    [],
  );

  React.useEffect(() => {
    const heure = new Date().getHours();
    setSalutation(heure >= 18 || heure < 5 ? "Bonsoir" : "Bonjour");

    let index = 0;
    const interval = window.setInterval(() => {
      setPlaceholder(`Essayer : "${suggestions[index % suggestions.length]}"`);
      index++;
    }, 3000);

    return () => window.clearInterval(interval);
  }, [suggestions]);

  return (
    <section className="space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="space-y-6 text-center">
        <div className="mx-auto max-w-4xl space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {salutation},{" "}
            <span className="text-primary">
              {DashboardService.obtenirPrenom(utilisateur)}
            </span>{" "}
            !
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground md:text-base">
            Ravi de vous revoir. Gerez vos infrastructures et suivez vos projets en toute serenite.
          </p>
        </div>

        <DashboardGlobalSearch
          open={searchOpen}
          onOpenChange={onSearchOpenChange}
          placeholder={placeholder}
          enableShortcut={false}
        />
      </div>

      <ServicesGrid />
    </section>
  );
}
