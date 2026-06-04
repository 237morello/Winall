/**
 * MISSION : Composant Dashboard — ProjectsList affiche la grille des projets avec filtrage avancé.
 */
"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../overview/HeroSection";
import { ImageTall } from "@/components/features/long-image";
import type { DashboardStats, UtilisateurTableauDeBord } from "@/types/dashboard.types";

type ProjectListItem = {
  id: string;
  titre: string;
  description?: string | null;
  domaine?: string | null;
  imageUrl?: string | null;
};

export function ProjectsList({ 
  utilisateur, 
  projets, 
  stats 
}: { 
  utilisateur: UtilisateurTableauDeBord; 
  projets: ProjectListItem[]; 
  stats: { myProjects?: number; myUnreadMessages?: number; myPendingQuotes?: number };
}) {
  const router = useRouter();
  const safeStats: DashboardStats = {
    myProjects: stats.myProjects ?? projets.length,
    myUnreadMessages: stats.myUnreadMessages ?? 0,
    myPendingQuotes: stats.myPendingQuotes ?? 0,
  };

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero réutilisé */}
      <HeroSection utilisateur={utilisateur} stats={safeStats} />

      {/* 2. Barre de titre et Filtres */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tous les projets</h2>
          <p className="text-sm text-muted-foreground">Gérez et suivez l&apos;avancement de vos chantiers.</p>
        </div>
        
        {/* Logo de filtrage avancé style Excel tout à droite */}
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
          <SlidersHorizontal className="size-5" />
        </Button>
      </div>

      {/* 3. Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {projets.length > 0 ? (
          projets.map((project) => (
            <ImageTall
              key={project.id}
              id={project.id}
              image={project.imageUrl || "/images/63966.jpg"}
              text={project.titre}
              description={project.description || ""}
              categorie={project.domaine || "Projet Winall"}
              onClick={() => router.push(`/dashboard/projects/${project.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <p className="text-muted-foreground italic">Aucun projet trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}
