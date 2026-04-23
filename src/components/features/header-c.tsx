/**
 * Mission : Composant UI réutilisable : header-c structure la barre de navigation principale de l'application.
 */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { ActiveLink } from "./active-link";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  className?: string;
}

export const HeaderC = ({ className = "" }: HeaderProps) => {
  return (
    <header
      className={cn(
        className,
        "fixed inset-x-0 top-0 z-50 h-16 border-b border-border/50 bg-background/95 shadow-sm shadow-black/5 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo_v2.png"
            width={44}
            height={44}
            alt="Winall Tech"
            className="object-contain"
          />
          <div className="space-y-0.5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-p">
              Winall
            </p>
            <p className="text-xs text-muted-foreground">Tech SARL</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <ActiveLink href="/">Accueil</ActiveLink>
          <ActiveLink href="/services">Services</ActiveLink>
          <ActiveLink href="/projets">Projets</ActiveLink>
          <ActiveLink href="/about">À propos</ActiveLink>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-p text-p hover:bg-p hover:text-background"
          >
            Contact pro
          </Button>
          <div className="hidden items-center gap-1 rounded-full border border-border/50 px-3 py-1 text-xs font-semibold text-muted-foreground sm:flex">
            <span className="inline-flex h-2 w-2 rounded-full bg-p" />
            live support 24/7
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-p hover:text-p md:hidden"
            aria-label="Menu mobile"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
};
