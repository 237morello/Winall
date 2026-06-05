/**
 * MISSION : Composant Dashboard — SectionProjets affiche la galerie des projets.
 * Migration : Utilisation de DashboardService et design premium.
 */
"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { GraduationCap, HardHat, MonitorSmartphone, PlugZap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DEMANDES_TYPE = [
  { id: "btp", label: "BTP / Construction", desc: "Bâtiment, génie civil, travaux", icon: HardHat, type: "BTP" },
  { id: "electricite", label: "Électricité", desc: "Installation, câblage, audit", icon: PlugZap, type: "Electricité" },
  { id: "web-app", label: "Web & Application", desc: "Site, app mobile, logiciel", icon: MonitorSmartphone, type: "Web & App" },
  { id: "conseil", label: "Conseil & Audit", desc: "Stratégie, formation, expertise", icon: GraduationCap, type: "Conseil" },
] as const;

export function SectionProjets() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  
  // Simulation de catégories (à brancher sur le service plus tard)
  const categories = ["Tous", "BTP", "Electricité", "Web & App", "Maintenance"];
  const [activeCat, setActiveCat] = React.useState("Tous");

  return (
    <section className="space-y-12">
      {/* Galerie Projets */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Projets réalisés</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consultez les derniers livrables par domaine d&apos;expertise.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCat === cat ? "default" : "outline"}
                size="sm"
                className="rounded-xl h-8 text-xs font-bold px-4 transition-all"
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="group overflow-hidden border-border/50 bg-card/40 hover:border-p/40 transition-all rounded-2xl">
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${i + 10}/400/300`}
                  alt="Projet"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Badge className="absolute left-3 top-3 rounded-lg border-none bg-background/80 backdrop-blur-md text-foreground font-bold text-[10px]">
                  BTP
                </Badge>
              </div>
              <CardContent className="p-4 space-y-1">
                <h3 className="font-bold text-sm truncate group-hover:text-p transition-colors">Résidence Horizon {i}</h3>
                <p className="text-xs text-muted-foreground">Yaoundé · Mars 2026</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Raccourcis Demandes */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Nouvelle demande</h2>
          <p className="text-sm text-muted-foreground">Sélectionnez un domaine pour lancer un devis.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEMANDES_TYPE.map((d) => (
            <button
              key={d.id}
              onClick={() => router.push(`/dashboard/${params.userId}/quotes?type=${encodeURIComponent(d.type)}`)}
              className="group relative flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-border/60 bg-muted/30 p-6 text-center transition-all hover:border-p hover:bg-p/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background border border-border group-hover:bg-p group-hover:text-white transition-all">
                <d.icon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <span className="block text-sm font-bold text-foreground">{d.label}</span>
                <span className="block text-[11px] text-muted-foreground leading-tight">{d.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
