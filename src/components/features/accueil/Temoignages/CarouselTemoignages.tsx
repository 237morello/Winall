"use client";

/**
 * @file CarouselTemoignages.tsx
 * @description Carrousel interactif pour les témoignages clients avec navigation.
 */

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TemoignageWinall } from "./Temoignages.types";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @interface CarouselTemoignagesProps
 * @description Propriétés pour le composant CarouselTemoignages.
 */
export interface CarouselTemoignagesProps {
  temoignages: TemoignageWinall[];
  className?: string;
}

/**
 * @component CarouselTemoignages
 * @description Carrousel moderne avec animations fluides pour les témoignages.
 */
export const CarouselTemoignages = ({ temoignages, className }: CarouselTemoignagesProps) => {
  const [indexActuel, setIndexActuel] = useState(0);

  const temoignageActuel = temoignages[indexActuel];
  const totalTemoignages = temoignages.length;

  const navigationPrecedente = () => {
    setIndexActuel((prev) => (prev === 0 ? totalTemoignages - 1 : prev - 1));
  };

  const navigationSuivante = () => {
    setIndexActuel((prev) => (prev === totalTemoignages - 1 ? 0 : prev + 1));
  };

  const allerAIndex = (index: number) => {
    setIndexActuel(index);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Carrousel principal */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={indexActuel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-background p-8 md:p-12 rounded-3xl border border-border/40 shadow-lg relative overflow-hidden"
          >
            {/* Quote icon */}
            <div className="absolute top-4 right-4 text-6xl text-primary/10">
              &quot;
            </div>

            {/* Contenu du témoignage */}
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              {/* Texte */}
              <div className="space-y-6">
                <Typography className="text-xl md:text-2xl italic text-foreground leading-relaxed">
                  &quot;{temoignageActuel.contenu}&quot;
                </Typography>

                {/* Informations client */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={temoignageActuel.photo}
                        alt={temoignageActuel.auteur}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Typography className="font-bold text-lg text-foreground">
                        {temoignageActuel.auteur}
                      </Typography>
                      <Typography variant="muted" className="text-sm">
                        {temoignageActuel.poste}
                      </Typography>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="relative h-6 w-6 overflow-hidden rounded">
                          <Image
                            src={temoignageActuel.logo}
                            alt={temoignageActuel.entreprise}
                            fill
                            className="object-contain grayscale"
                          />
                        </div>
                        <Typography variant="muted" className="text-xs font-medium">
                          {temoignageActuel.entreprise}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Résultats */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">📊 Résultats:</span>
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        {temoignageActuel.resultats}
                      </span>
                    </div>
                  </div>

                  {/* Projet */}
                  <div className="text-xs text-muted-foreground border-t pt-3">
                    <span className="font-medium">Projet:</span> {temoignageActuel.projet}
                  </div>
                </div>
              </div>

              {/* Photo grande (desktop) */}
              <div className="hidden md:block">
                <div className="relative h-48 w-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={temoignageActuel.photo}
                    alt={temoignageActuel.auteur}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Boutons précédent/suivant */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={navigationPrecedente}
            className="rounded-full"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={navigationSuivante}
            className="rounded-full"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicateurs */}
        <div className="flex gap-2">
          {temoignages.map((_, index) => (
            <button
              key={index}
              onClick={() => allerAIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === indexActuel
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        {/* Compteur */}
        <div className="text-sm text-muted-foreground">
          {indexActuel + 1} / {totalTemoignages}
        </div>
      </div>
    </div>
  );
};
