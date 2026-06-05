"use client";

import { LogoSection } from "./components/LogoSection";
import { NavigationActions } from "./components/NavigationActions";
import { MobileMenuSheet } from "./components/MobileMenuSheet";
import { cn } from "@/lib/utils";

import type { ProprietesHeader } from "./Header.types";

/**
 * @class EnTeteLogique
 * @description Centralise les petites d�cisions d'affichage pour garder le JSX lisible.
 */
export class EnTeteLogique {
  /**
   * @description Indique si un lien correspond � la route courante.
   */
  static estLienActif(cheminActuel: string, href: string): boolean {
    return cheminActuel === href;
  }

  /**
   * @description Construit les classes Tailwind d'un lien selon son état actif.
   */
  static obtenirClassesLien(estActif: boolean): string {
    return cn(
      "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-out",
      estActif
        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
    );
  }
}

/**
 * @component Header
 * @description Affiche l'en-t�te principal de la page d'accueil Winall.
 */
export function Header({ className }: ProprietesHeader) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/92 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo Section - Gauche */}
        <LogoSection />

        {/* Navigation + Actions - Droite */}
        <NavigationActions />

        {/* Menu Mobile */}
        <MobileMenuSheet />
      </div>
    </header>
  );
}
