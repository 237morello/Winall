/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface FancyCardProps {
  title: string;
  description: string;
  logo?: React.ReactNode;
  gradient?: "blue" | "purple" | "emerald" | "orange";
 
  
  /** Contenu affichÃ© dans l'AlertDialog */
  dialogContent?: React.ReactNode;
  /** Texte du bouton de confirmation */
  confirmLabel?: string;
  /** Callback appelÃ© Ã  la confirmation */
  onConfirm?: () => void;
}

// â”€â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const gradients: Record<NonNullable<FancyCardProps["gradient"]>, string> = {
  blue: "from-blue-500/20 via-cyan-400/10 to-transparent",
  purple: "from-violet-500/20 via-purple-400/10 to-transparent",
  emerald: "from-emerald-500/20 via-teal-400/10 to-transparent",
  orange: "from-orange-500/20 via-amber-400/10 to-transparent",
};

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * FancyCard
 *
 * Comportement :
 * - Au survol   â†’ overlay sombre + le contenu de la card devient flou
 *               â†’ un bouton Â« DÃ©couvrir Â» apparaÃ®t au centre
 * - Clic bouton â†’ AlertDialog s'ouvre
 * - Dialog ouvert â†’ l'arriÃ¨re-plan est floutÃ©
 *
 * PrÃ©-requis pour le blur de l'overlay AlertDialog :
 * Dans `components/ui/alert-dialog.tsx`, ajoutez `backdrop-blur-sm` Ã 
 * AlertDialogOverlay :
 *   className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
 */
export const FancyCard = ({
  title,
  description,
  logo,
  gradient = "blue",
  dialogContent,
  confirmLabel = "Explorer",
  onConfirm,
}: FancyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nettoyage du timer au dÃ©montage
  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  const handleMouseEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setIsHovered(false), 150);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setIsHovered(false); // Ferme l'overlay au clic
  };

  return (
    <>
      {/* â”€â”€ Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="group relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="relative overflow-hidden cursor-pointer border-border/60 bg-card shadow-sm transition-shadow duration-500 hover:shadow-2xl">
          {/* Fond dÃ©gradÃ© subtil */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* â”€â”€ Contenu principal (floutÃ© au survol) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            animate={{ filter: isHovered ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10"
          >
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center gap-4">
                {logo && (
                  <div className="relative">
                    {/* Halo dÃ©coratif */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-muted to-background blur-sm transform rotate-6" />
                    <Button
                      size="icon"
                      variant="outline"
                      className="relative h-12 w-12 shrink-0 border-border/60 bg-background/80 shadow-sm backdrop-blur-sm hover:border-border hover:bg-background"
                      tabIndex={-1}
                    >
                      {logo}
                    </Button>
                  </div>
                )}

                <CardTitle className="text-center font-semibold tracking-tight text-foreground">
                  {title}
                </CardTitle>
              </div>

              <CardDescription className="mt-1 text-center leading-relaxed text-muted-foreground">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="h-2" />
          </motion.div>

          {/* â”€â”€ Overlay sombre + bouton (apparaÃ®t au survol) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/55"
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Button
                    size="lg"
                    onClick={handleOpenDialog}
                    className="group/btn bg-background text-foreground shadow-xl transition-all duration-200 hover:scale-105 hover:bg-accent"
                  >
                    <span className="mr-2 font-medium">DÃ©couvrir</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* â”€â”€ AlertDialog (portail, hors du card) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/*
        Pour flouter l'arriÃ¨re-plan quand le dialog est ouvert, ajoutez
        `backdrop-blur-sm` Ã  AlertDialogOverlay dans
        `components/ui/alert-dialog.tsx` :

          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            className
          )}
      */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Largeur augmentÃ©e Ã  max-w-4xl pour Ã©viter tout dÃ©bordement et aÃ©rer le layout */}
        <AlertDialogContent className="max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl md:p-8 lg:max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-base leading-relaxed text-muted-foreground">
              { description}
            </AlertDialogDescription>
            
            {/* 
                LAYOUT : 
                - Mobile : Colonne, Texte en haut, Image en bas.
                - Desktop (lg) : RangÃ©e, Image Ã  gauche (via reverse), Texte Ã  droite.
            */}
            {dialogContent}
           
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel className="rounded-lg border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              Fermer
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className="rounded-lg bg-foreground text-background shadow-md hover:bg-foreground/90"
            >
              {confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
