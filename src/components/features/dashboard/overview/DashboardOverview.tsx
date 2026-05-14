/**
 * MISSION : Composant Dashboard — DashboardOverview assemble les éléments de la page d'accueil.
 * Design Premium : Hero, Services, Actions (3 cartes), Quoi de neuf.
 */
import { HeroSection } from "./HeroSection";
import { HomeActions } from "./HomeActions";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DashboardOverviewProps {
  utilisateur: UtilisateurTableauDeBord;
}

const NOUVEAUTES = [
  {
    title: "Support 24/7 disponible",
    description: "Notre équipe technique est maintenant disponible pour vos urgences.",
    image: "/images/Group 24.png",
    tag: "Nouveau",
  },
  {
    title: "Guide Domotique 2026",
    description: "Découvrez comment optimiser votre consommation d'énergie.",
    image: "/images/Group 25.png",
    tag: "Tutoriel",
  },
  {
    title: "Nouveaux Panneaux Solaires",
    description: "Performance accrue de 20% sur nos installations photovoltaïques.",
    image: "/images/Group 26.png",
    tag: "Annonce",
  },
];

export function DashboardOverview({ utilisateur }: DashboardOverviewProps) {
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero & Barre de recherche & Grille de Services */}
      <HeroSection utilisateur={utilisateur} />
      
      {/* 2. Actions Rapides (Les 3 Cartes) */}
      <HomeActions />

      {/* 3. Section "Quoi de neuf" */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Quoi de neuf chez Winall</h2>
          <Button variant="ghost" size="sm" className="text-xs">Voir tout</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NOUVEAUTES.map((news) => (
            <Card key={news.title} className="group overflow-hidden border-border/50 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer border-none shadow-none">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute top-3 left-3 z-20">
                  <Badge className="bg-primary/90 text-[10px] font-bold uppercase tracking-wider">{news.tag}</Badge>
                </div>
                {/* Image placeholder - Uses images from public/images/ found earlier */}
                <Image 
                  src={news.image} 
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-white font-bold text-sm leading-snug">{news.title}</h3>
                  <p className="text-white/70 text-[10px] mt-1 line-clamp-2">{news.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
