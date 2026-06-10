/**
 * MISSION : FancyCard — Wrapper de compatibilité pour le système DomainCard premium.
 * Ce composant redirige les anciennes propriétés vers le nouveau système modulaire.
 */
"use client";

import React from "react";
import { DomainCard } from "./DomainGrid/DomainCard";
import { Domain } from "./DomainGrid/DomainGrid.types";
import { Sparkles } from "lucide-react";

export interface FancyCardProps {
  id?: string;
  title: string;
  description: string;
  image?: string;
  domain?: string;
  domainIcon?: React.ReactNode;
  logo?: React.ReactNode;
  gradient?: "blue" | "purple" | "emerald" | "accent" | "slate";
  onClick?: () => void;
  dialogContent?: React.ReactNode;
}

const gradients = {
  blue: "from-blue-600/20 via-cyan-400/10 to-transparent",
  purple: "from-purple-600/20 via-violet-400/10 to-transparent",
  emerald: "from-emerald-600/20 via-primary/10 to-transparent",
  accent: "from-destructive/20 via-primary/10 to-transparent",
  slate: "from-slate-600/20 via-slate-400/10 to-transparent",
};

const iconBgs = {
  blue: "bg-blue-500/10",
  purple: "bg-purple-500/10",
  emerald: "bg-emerald-500/10",
  accent: "bg-destructive/10",
  slate: "bg-slate-500/10",
};

const iconTexts = {
  blue: "text-blue-500",
  purple: "text-purple-500",
  emerald: "text-emerald-500",
  accent: "text-destructive",
  slate: "text-slate-500",
};

const badges = {
  blue: "border-blue-500/20 text-blue-500",
  purple: "border-purple-500/20 text-purple-500",
  emerald: "border-emerald-500/20 text-emerald-500",
  accent: "border-destructive/20 text-destructive",
  slate: "border-slate-500/20 text-slate-500",
};

const glows = {
  blue: "group-hover:shadow-blue-500/20",
  purple: "group-hover:shadow-purple-500/20",
  emerald: "group-hover:shadow-emerald-500/20",
  accent: "group-hover:shadow-destructive/20",
  slate: "group-hover:shadow-slate-500/20",
};

export const FancyCard = ({
  id,
  title,
  description,
  image,
  domainIcon,
  logo,
  gradient = "slate",
  onClick,
  dialogContent,
}: FancyCardProps) => {
  // Mapping vers la structure Domain pour DomainCard
  const domainData: Domain = {
    id: id || title,
    title,
    description,
    icon: logo || domainIcon || <Sparkles className="size-6" />,
    image,
    colors: {
      gradient: gradients[gradient],
      iconBg: iconBgs[gradient],
      iconText: iconTexts[gradient],
      badge: badges[gradient],
      glow: glows[gradient],
    },
  };

  return (
    <DomainCard 
      domain={domainData} 
      onClick={onClick} 
      showDetails={false} 
      dialogContent={dialogContent}
    />
  );
};
