import { 
  Network, 
  Cctv, 
  Smartphone, 
  HardHat 
} from "lucide-react";
import { Domain, DomainKey } from "./DomainGrid.types";
import React from "react";

/**
 * MISSION : Constantes définissant les domaines d'expertise de Winall Tech Sarl.
 */

export const DOMAINS: Record<DomainKey, Domain> = {
  networks: {
    id: "networks",
    title: "Réseaux & Connectivité",
    description: "Infrastructures de communication robustes, fibre optique et solutions WiFi haute performance pour entreprises.",
    icon: React.createElement(Network, { className: "size-6" }),
    colors: {
      gradient: "from-blue-600/20 via-cyan-400/10 to-transparent",
      iconBg: "bg-blue-500/10",
      iconText: "text-blue-500",
      badge: "border-blue-500/20 text-blue-500",
      glow: "group-hover:shadow-blue-500/20",
    },
    keyPoints: [
      { id: "1", label: "Fibre Optique & LAN" },
      { id: "2", label: "WiFi Professionnel" },
      { id: "3", label: "Audit & Optimisation" },
    ],
  },
  security: {
    id: "security",
    title: "Sécurité Électronique",
    description: "Protection intelligente des biens et des personnes via Vidéoprotection, Contrôle d'Accès et Détection intrusion.",
    icon: React.createElement(Cctv, { className: "size-6" }),
    colors: {
      gradient: "from-emerald-600/20 via-primary/10 to-transparent",
      iconBg: "bg-emerald-500/10",
      iconText: "text-emerald-500",
      badge: "border-emerald-500/20 text-emerald-500",
      glow: "group-hover:shadow-emerald-500/20",
    },
    keyPoints: [
      { id: "1", label: "Vidéosurveillance IP" },
      { id: "2", label: "Contrôle d'Accès" },
      { id: "3", label: "Alarmes Incendie" },
    ],
  },
  telephony: {
    id: "telephony",
    title: "Téléphonie IP",
    description: "Solutions de communication unifiée (PABX/IP-PBX) pour une collaboration fluide et économique.",
    icon: React.createElement(Smartphone, { className: "size-6" }),
    colors: {
      gradient: "from-purple-600/20 via-violet-400/10 to-transparent",
      iconBg: "bg-purple-500/10",
      iconText: "text-purple-500",
      badge: "border-purple-500/20 text-purple-500",
      glow: "group-hover:shadow-purple-500/20",
    },
    keyPoints: [
      { id: "1", label: "Standard IP / VoIP" },
      { id: "2", label: "Visio-conférence" },
      { id: "3", label: "Call Center Solutions" },
    ],
  },
  construction: {
    id: "construction",
    title: "BTP & Énergie",
    description: "Génie civil, aménagements techniques et solutions énergétiques (Solaire) pour infrastructures critiques.",
    icon: React.createElement(HardHat, { className: "size-6" }),
    colors: {
      gradient: "from-destructive/20 via-primary/10 to-transparent",
      iconBg: "bg-destructive/10",
      iconText: "text-destructive",
      badge: "border-destructive/20 text-destructive",
      glow: "group-hover:shadow-destructive/20",
    },
    keyPoints: [
      { id: "1", label: "Génie Civil & BTP" },
      { id: "2", label: "Énergie Solaire" },
      { id: "3", label: "Maintenance Site" },
    ],
  },
};
