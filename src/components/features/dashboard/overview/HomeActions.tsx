/**
 * MISSION : HomeActions - Affiche les nouveautes et les projets recents.
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageTall } from "@/components/features/long-image";
import type { DashboardProject } from "@/types/dashboard.types";

interface HomeActionsProps {
  projetsRecents: DashboardProject[];
}

export function HomeActions({ projetsRecents }: HomeActionsProps) {
  const router = useRouter();

  return (
    <section className="space-y-8 py-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Sparkles className="size-5 text-primary" />
            Quoi de neuf aujourd&apos;hui ?
          </h2>
          <p className="text-sm text-muted-foreground">
            Decouvrez nos dernieres realisations et expertises.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projetsRecents.slice(0, 12).map((projet) => (
          <ImageTall
            key={projet.id}
            id={projet.id}
            image={projet.imageUrl || "/images/63966.jpg"}
            text={projet.titre}
            description={projet.description || "Suivi de projet technique Winall Tech Sarl."}
            categorie={projet.domaine || "Expertise"}
            onClick={() => router.push(`/dashboard/projects/${projet.id}`)}
          />
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="ghost"
          asChild
          className="group rounded-xl px-6 font-bold text-primary hover:bg-primary/5"
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
