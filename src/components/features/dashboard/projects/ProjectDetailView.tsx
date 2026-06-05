/**
 * MISSION : ProjectDetailView — Affiche les détails d'un projet avec carrousel interactif.
 * Design Premium : Flexbox, Zone image à droite, Zone texte à gauche.
 */
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  FileText,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { ProjetGalerieTableauDeBord } from "@/types/dashboard.types";

interface ProjectDetailViewProps {
  project: ProjetGalerieTableauDeBord & { imageUrl?: string; images?: string[]; domaine?: string };
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [mainImage, setMainImage] = React.useState(project.imageUrl || project.image || "/images/63966.jpg");
  const [rating, setRating] = React.useState(0);
  const [liked, setLiked] = React.useState<boolean | null>(null);

  const images = [
    project.imageUrl || project.image,
    ...(project.images || []),
    "/images/63966.jpg",
    "/images/footer.png"
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col lg:flex-row gap-12 py-10">
      {/* Zone Texte (Gauche) */}
      <div className="flex-1 space-y-8 order-2 lg:order-1">
        <div className="space-y-4">
          <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            {project.domaine || project.categorie}
          </Badge>
          <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
            {project.titre}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    "size-5 cursor-pointer transition-colors",
                    s <= rating ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={() => setRating(s)}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-muted-foreground">(12 avis clients)</span>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          {project.resume}
          <p className="mt-4">
            Réalisation technique de haute précision effectuée par les équipes de Winall Tech Sarl.
            Nous avons mis en place des infrastructures robustes répondant aux normes internationales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-6">
          <div className="flex items-center gap-2 p-1 rounded-full bg-muted/50 border border-border">
            <Button
              variant="ghost"
              size="sm"
              className={cn("rounded-full gap-2 px-4", liked === true && "bg-background shadow-sm")}
              onClick={() => setLiked(true)}
            >
              <ThumbsUp className={cn("size-4", liked === true && "text-primary fill-primary")} />
              <span className="text-xs font-bold">J&apos;aime</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("rounded-full gap-2 px-4", liked === false && "bg-background shadow-sm")}
              onClick={() => setLiked(false)}
            >
              <ThumbsDown className={cn("size-4", liked === false && "text-destructive fill-destructive")} />
              <span className="text-xs font-bold">Pas mal</span>
            </Button>
          </div>

          <Button variant="outline" size="sm" className="rounded-full gap-2 px-6">
             <Share2 className="size-4" />
             <span className="text-xs font-bold">Partager</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
          <Button className="rounded-2xl h-16 text-lg font-bold gap-3 shadow-xl shadow-primary/20">
            <FileText className="size-6" />
            Demander un devis similaire
          </Button>
          <Button variant="secondary" className="rounded-2xl h-16 text-lg font-bold gap-3">
            <MessageSquare className="size-6" />
            Discuter avec un expert
          </Button>
        </div>
      </div>

      {/* Zone Image (Droite) */}
      <div className="flex-1 space-y-6 order-1 lg:order-2">
        <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-muted shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={mainImage}
                alt={project.titre}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Carrousel & Boutons */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img, idx) => (
              <Popover key={idx}>
                <PopoverTrigger asChild>
                  <button
                    onMouseEnter={() => {}} // Could trigger popover on hover if desired
                    onClick={() => setMainImage(img)}
                    className={cn(
                      "relative shrink-0 size-20 rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 active:scale-95",
                      mainImage === img ? "border-primary shadow-lg shadow-primary/20" : "border-transparent"
                    )}
                  >
                    <Image src={img} alt={`Miniature ${idx}`} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-white font-bold">Note {idx + 1}</span>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-20 p-1 rounded-lg border-none bg-background shadow-xl">
                  <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <Image src={img} alt="Preview" fill className="object-cover" />
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
