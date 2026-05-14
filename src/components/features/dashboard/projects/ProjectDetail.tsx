/**
 * MISSION : Composant Dashboard — ProjectDetail affiche les détails complets d'un projet.
 */
"use client";

import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Activity, 
  CheckCircle2, 
  Clock, 
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PROJECTS } from "./mock-projects";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const EVOLUTION_IMAGES = [
  "/images/main-hero-imgAcceuil.png",
  "/images/main-choix-imgMain (1).png",
  "/images/image-choix.png",
  "/images/63966.jpg",
];

export function ProjectDetail({ projectId }: { projectId: string }) {
  const router = useRouter();
  const project = MOCK_PROJECTS.find(p => p.identifiant === projectId) || MOCK_PROJECTS[0];
  const similarProjects = MOCK_PROJECTS.filter(p => p.categorie === project.categorie && p.identifiant !== project.identifiant);
  const otherProjects = MOCK_PROJECTS.filter(p => p.identifiant !== project.identifiant).slice(0, 3);

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      {/* 1. Header avec bouton retour */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold tracking-tight">{project.titre}</h1>
             <Badge variant={project.statut === "completed" ? "default" : "secondary"}>
                {project.statut === "completed" ? "Terminé" : "En cours"}
             </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{project.categorie} • {project.identifiant}</p>
        </div>
      </div>

      {/* 2. Zone principale : Médias et Infos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Colonne Médias (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl border border-border/20 bg-muted">
            <Image 
              src={project.image} 
              alt={project.titre}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Galerie d'évolution */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
               <Activity className="size-4 text-primary" />
               Évolution du chantier
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {EVOLUTION_IMAGES.map((img, index) => (
                <button key={index} className="relative aspect-square w-24 md:w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary transition-all group shadow-md">
                   <Image src={img} alt="Etape" fill className="object-cover transition-transform group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne Infos (4/12) */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="p-6 border-none bg-card/40 backdrop-blur-sm shadow-none space-y-6">
              <div className="space-y-4 pb-6 border-b border-border/40">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Informations Clés</h3>
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                       <MapPin className="size-4 text-muted-foreground shrink-0 mt-1" />
                       <div className="space-y-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Localisation</p>
                          <p className="text-sm font-medium">{project.localisation}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <Calendar className="size-4 text-muted-foreground shrink-0 mt-1" />
                       <div className="space-y-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Date de début</p>
                          <p className="text-sm font-medium">{project.date}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <User className="size-4 text-muted-foreground shrink-0 mt-1" />
                       <div className="space-y-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Client</p>
                          <p className="text-sm font-medium">{project.client}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Avancement</h3>
                    <span className="text-sm font-black">{project.progression}%</span>
                 </div>
                 <Progress value={project.progression} className="h-2" />
                 <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 text-green-600">
                       <CheckCircle2 className="size-4" />
                       <span className="text-[10px] font-bold">Planifié</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 text-blue-600">
                       <Clock className="size-4" />
                       <span className="text-[10px] font-bold">En cours</span>
                    </div>
                 </div>
              </div>

              <div className="pt-6">
                 <Button className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20">
                    Contacter l&apos;expert assigné
                 </Button>
              </div>
           </Card>
        </div>
      </div>

      {/* 3. Sections du bas : Similarités et Autres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-border/40">
         
         {/* Projets Similaires */}
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold flex items-center gap-2">
                  <LayoutGrid className="size-5 text-primary" />
                  Projets similaires
               </h2>
               <Link href="/dashboard/projects" className="text-xs text-primary font-bold hover:underline">Voir tout</Link>
            </div>
            <div className="grid gap-4">
               {(similarProjects.length > 0 ? similarProjects : MOCK_PROJECTS.slice(0, 2)).map((p) => (
                  <Link key={p.identifiant} href={`/dashboard/projects/${p.identifiant}`}>
                     <div className="group flex items-center gap-4 p-3 rounded-2xl bg-card/30 hover:bg-primary/5 transition-all">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                           <Image src={p.image} alt={p.titre} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{p.titre}</h4>
                           <p className="text-[10px] text-muted-foreground">{p.categorie}</p>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                     </div>
                  </Link>
               ))}
            </div>
         </div>

         {/* Autres Projets */}
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold flex items-center gap-2">
                  <LayoutGrid className="size-5 text-primary" />
                  Autres réalisations
               </h2>
            </div>
            <div className="grid gap-4">
               {otherProjects.map((p) => (
                  <Link key={p.identifiant} href={`/dashboard/projects/${p.identifiant}`}>
                     <div className="group flex items-center gap-4 p-3 rounded-2xl bg-card/30 hover:bg-primary/5 transition-all">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                           <Image src={p.image} alt={p.titre} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{p.titre}</h4>
                           <p className="text-[10px] text-muted-foreground">{p.client}</p>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
