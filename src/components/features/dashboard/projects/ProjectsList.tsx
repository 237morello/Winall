/**
 * MISSION : Composant Dashboard — ProjectsList affiche la grille des projets avec filtrage avancé.
 */
"use client";

import { SlidersHorizontal, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PROJECTS } from "./mock-projects";
import { HeroSection } from "../overview/HeroSection";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

export function ProjectsList({ utilisateur }: { utilisateur: UtilisateurTableauDeBord }) {
  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero réutilisé */}
      <HeroSection utilisateur={utilisateur} />

      {/* 2. Barre de titre et Filtres */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tous les projets</h2>
          <p className="text-sm text-muted-foreground">Gérez et suivez l&apos;avancement de vos chantiers.</p>
        </div>
        
        {/* Logo de filtrage avancé style Excel tout à droite */}
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors shadow-sm">
          <SlidersHorizontal className="size-5" />
        </Button>
      </div>

      {/* 3. Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {MOCK_PROJECTS.map((project) => (
          <Link key={project.identifiant} href={`/dashboard/projects/${project.identifiant}`}>
            <Card className="group overflow-hidden border-border/50 bg-card/30 hover:bg-card/50 transition-all hover:shadow-xl hover:shadow-primary/5 border-none shadow-none cursor-pointer">
              <div className="flex flex-col md:flex-row gap-6 p-4">
                {/* Image du projet */}
                <div className="relative aspect-square w-full md:w-48 shrink-0 overflow-hidden rounded-2xl">
                  <Image 
                    src={project.image} 
                    alt={project.titre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant={project.statut === "completed" ? "default" : "secondary"} className="bg-background/80 backdrop-blur-md text-[10px] uppercase font-bold text-foreground border-none">
                      {project.statut === "completed" ? "Terminé" : project.statut === "actif" ? "En cours" : "En attente"}
                    </Badge>
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                      <span>{project.categorie}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">{project.titre}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{project.resume}</p>
                  </div>

                  <div className="mt-4 space-y-4">
                    {/* Infos rapides */}
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {project.localisation}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {project.date}
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>Progression</span>
                        <span>{project.progression}%</span>
                      </div>
                      <Progress value={project.progression} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
