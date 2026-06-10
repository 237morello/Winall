/**
 * MISSION : Composant Dashboard — ServicesGrid affiche les expertises Winall.
 * Affiche 8 expertises et un bouton dropdown pour tout voir.
 */
"use client";

import {
  Cctv,
  HardHat,
  Home,
  ShieldAlert,
  Network,
  Sun,
  Plus,
  Zap,
  Radio,
  Lock,
  Server,
  Building2,
  Cpu,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Contrôle d'Accès",
    description: "Biométrie & RFID",
    icon: Lock,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Téléphonie IP",
    description: "Standard PABX/IP",
    icon: Radio,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

const ALL_DOMAINS = [
  ...SERVICES,
  { title: "Maintenance IT", icon: Server, color: "text-slate-500" },
  { title: "Génie Électrique", icon: Zap, color: "text-yellow-500" },
  { title: "Audit & Conseil", icon: Building2, color: "text-rose-500" },
  { title: "Solutions IoT", icon: Cpu, color: "text-lime-500" },
];

export function ServicesGrid() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full">
        {SERVICES.map((service) => (
          <button
            key={service.title}
            className="group flex flex-col items-center p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div
              className={cn(
                "p-3 rounded-xl mb-3 transition-transform group-hover:scale-110",
                service.bg,
                service.color,
              )}
            >
              <service.icon className="size-6" />
            </div>
            <h3 className="text-[10px] font-bold text-foreground text-center line-clamp-1">
              {service.title}
            </h3>
          </button>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-2 px-6 border-border/50 hover:bg-primary/5 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
          >
            <LayoutGrid className="size-3.5 text-primary group-hover:rotate-90 transition-transform" />
            <span>Tous les domaines</span>
            <Plus className="size-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="w-64 max-h-[400px] overflow-y-auto rounded-2xl p-2 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
        >
          <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Expertises Winall Tech
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/50" />
          <div className="space-y-1 mt-1">
            {ALL_DOMAINS.map((domain) => (
              <DropdownMenuItem
                key={domain.title}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer focus:bg-primary/5 transition-colors group"
              >
                <div
                  className={cn(
                    "p-1.5 rounded-lg bg-background border border-border/50 group-hover:border-primary/30 transition-colors",
                    domain.color,
                  )}
                >
                  <domain.icon className="size-3.5" />
                </div>
                <span className="text-sm font-medium">{domain.title}</span>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
