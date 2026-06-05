/**
 * Mission : Composant UI réutilisable : $base pour construire l'interface de façon cohérente.
 * Évolué pour devenir le standard d'affichage des projets avec overlay dynamique et bouton d'avis.
 */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ImageProps {
  id?: string;
  image: string;
  size?: {
    height: number;
  };
  text?: string;
  className?: string;
  categorie: string;
  description: string;
  onClick?: () => void;
}

export const ImageTall = ({
  id,
  image,
  size = { height: 350 },
  text = "",
  description,
  categorie,
  className,
  onClick
}: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSource, setImageSource] = useState(image || "/images/63966.jpg");
  const isRemoteStorageImage = imageSource.includes("/storage/v1/object/public/");

  useEffect(() => {
    setImageSource(image || "/images/63966.jpg");
  }, [image]);

  return (
    <motion.section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border bg-muted w-full max-w-[400px] mx-auto sm:max-w-none md:h-[450px] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
      style={{
        minHeight: `${size.height}px`,
      }}
    >
      {/* Image de fond avec effet de zoom au hover */}
      <Image 
        src={imageSource} 
        fill 
        alt={text} 
        unoptimized={isRemoteStorageImage}
        className="object-cover transition-transform duration-700 group-hover:scale-110" 
        onError={() => setImageSource("/images/63966.jpg")}
      />
      
      {/* Overlay dynamique selon le thème (Light: blanc cassé, Dark: noir profond) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-white/30 dark:bg-black/50 backdrop-blur-[2px] transition-all duration-500"
          />
        )}
      </AnimatePresence>

      {/* Bouton d'Avis flottant (Milieu Droit) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30"
          >
             <Button
                size="icon"
                variant="secondary"
                asChild
                className="rounded-full size-12 shadow-2xl hover:scale-110 active:scale-95 transition-all bg-background text-primary border-primary/20"
              >
                <Link href={id ? `/dashboard/projects/${id}#reviews` : "#"}>
                  <MessageCircle className="size-5" />
                </Link>
              </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu textuel et dégradé par défaut */}
      <div
        className="
        absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 transition-all duration-500 
        group-hover:from-black/90 z-20
        "
      >
        <div
          className="
          text-white opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0
          flex justify-start flex-col gap-2 max-w-[90%]
          "
        >
          <Typography variant="h4" className="text-white font-black leading-tight tracking-tight">
            {text}
          </Typography>
          <Typography variant="p" className="text-white/70 text-xs md:text-sm font-medium line-clamp-3">
            {description}
          </Typography>
        </div>

        {/* Badge de catégorie (Haut Gauche) */}
        <div className="absolute top-6 left-6 z-30">
          <Badge className="bg-primary hover:bg-primary border-none text-white shadow-xl px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
            {categorie}
          </Badge>
        </div>
      </div>
      
      {/* Overlay de clic global (si pas sur le bouton) */}
      <div onClick={onClick} className="absolute inset-0 z-[25]" />
    </motion.section>
  );
};
