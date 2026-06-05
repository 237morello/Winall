import { ReactNode } from "react";

/**
 * MISSION : Types pour le système de cartes par domaine métier (Expertise Winall).
 */

export type DomainKeyPoint = {
  id: string;
  label: string;
};

export type DomainUseCase = {
  id: string;
  title: string;
};

export interface DomainColorClasses {
  gradient: string;
  iconBg: string;
  iconText: string;
  badge: string;
  glow: string;
}

export interface Domain {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
  colors: DomainColorClasses;
  keyPoints?: DomainKeyPoint[];
  useCases?: DomainUseCase[];
}

export type DomainKey = "networks" | "security" | "telephony" | "construction";
