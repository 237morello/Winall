import type { LucideIcon } from "lucide-react";

export interface AboutMetric {
  value: string;
  label: string;
}

export interface AboutPillar {
  title: string;
  description: string;
  image: string;
}

export interface AboutTimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface AboutValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutMethodStep {
  title: string;
  description: string;
}

export interface AboutLeader {
  name: string;
  role: string;
  specialty: string;
  description: string;
  initials: string;
  /** Photo optionnelle : remplace la pastille d'initiales quand fournie. */
  image?: string;
}

export interface AboutMissionItem {
  question: string;
  preview: string;
}

export type FaqProps = AboutMissionItem[];
