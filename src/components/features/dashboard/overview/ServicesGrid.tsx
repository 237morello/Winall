/**
 * MISSION : Composant Dashboard — ServicesGrid affiche les expertises Winall sous forme de cartes interactives.
 */
"use client";

import { 
  Cctv, 
  HardHat, 
  Home, 
  ShieldAlert, 
  Network, 
  Sun,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "Vidéoprotection",
    description: "Caméras IP & IA",
    icon: Cctv,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "BTP & Génie Civil",
    description: "Infrastructures",
    icon: HardHat,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Domotique",
    description: "Maison intelligente",
    icon: Home,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Sécurité Incendie",
    description: "Détection & Alarme",
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Réseaux & Télécoms",
    description: "Fibre & Wi-Fi Pro",
    icon: Network,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Énergie Solaire",
    description: "Photovoltaïque",
    icon: Sun,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-8">
      {SERVICES.map((service) => (
        <button
          key={service.title}
          className="group flex flex-col items-center p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
        >
          <div className={cn("p-3 rounded-xl mb-3 transition-transform group-hover:scale-110", service.bg, service.color)}>
            <service.icon className="size-6" />
          </div>
          <h3 className="text-xs font-bold text-foreground text-center line-clamp-1">{service.title}</h3>
          <p className="text-[10px] text-muted-foreground text-center mt-1 hidden md:block">{service.description}</p>
        </button>
      ))}
    </div>
  );
}
