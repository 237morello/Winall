import { LucideIcon } from "lucide-react";

export interface AdminHeroBadge {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
  dotColor?: string; // e.g. "bg-primary"
}

export interface AdminHeroTab {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface AdminHeroStat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
}

export interface AdminHeroAction {
  label: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export interface AdminHeroProps {
  titlePrimary: string;
  titleSecondary?: string;
  icon?: LucideIcon;
  badges?: AdminHeroBadge[];
  actions?: AdminHeroAction[];
  tabs?: AdminHeroTab[];
  stats?: AdminHeroStat[];
}
