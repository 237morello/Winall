/**
 * MISSION : HomeActions — Affiche les nouveautés et les projets récents sous forme de grille FancyCard.
 */
"use client";

import * as React from "react";
import { FancyCard } from "@/components/features/card-hover-light";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Network,
  Cctv,
  HardHat,
  ShieldAlert,
  Zap,
  Radio,
  Lock,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import type { DashboardProject } from "@/types/dashboard.types";

interface HomeActionsProps {
  projetsRecents: DashboardProject[];
}

export function HomeActions({ projetsRecents }: HomeActionsProps) {
  // Mock icons and gradients for variety
  const ICONS = [Network, Cctv, HardHat, ShieldAlert, Zap, Radio, Lock, Cpu];
  const GRADIENTS: ("blue" | "purple" | "emerald" | "orange")[] = [
    "blue",
    "purple",
    "emerald",
    "orange",
  ];

  return (
    <section className="space-y-8 py-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Quoi de neuf aujourd&apos;hui ?
          </h2>
          <p className="text-sm text-muted-foreground">
            Découvrez nos dernières réalisations et expertises.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projetsRecents.slice(0, 12).map((projet, index) => {
          const Icon = ICONS[index % ICONS.length];
          const gradient = GRADIENTS[index % GRADIENTS.length];

          return (
            <FancyCard
              key={projet.id}
              id={projet.id}
              title={projet.titre}
              description={
                projet.description ||
                "Suivi de projet technique Winall Tech Sarl."
              }
              domain={projet.domaine || "Expertise"}
              domainIcon={<Icon className="size-3" />}
              gradient={gradient}
              image={projet.imageUrl || undefined}
            />
          );
        })}

        {/* Si pas assez de projets, on pourrait ajouter des placeholders ou des suggestions de services */}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="ghost"
          asChild
          className="group text-primary font-bold hover:bg-primary/5 rounded-xl px-6"
        >
          <Link href="/dashboard/projects" className="flex items-center gap-2">
            Voir tous les projets
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
