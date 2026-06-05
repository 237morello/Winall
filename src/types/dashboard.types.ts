import type { LucideIcon } from "lucide-react";

/**
 * MISSION : Types Dashboard — Définitions des interfaces pour les entités métier et UI.
 */

export type BusinessStatus =
  | "active"
  | "prospect"
  | "pending"
  | "approved"
  | "sent"
  | "paid"
  | "overdue"
  | "info"
  | "warning"
  | "critical";

export interface DashboardProject {
  id: string;
  titre: string;
  description?: string | null;
  domaine?: string | null;
  imageUrl?: string | null;
}

export interface DashboardStats {
  myProjects: number;
  myUnreadMessages: number;
  myPendingQuotes: number;
}

// --- Entités Métier (Model) ---

export interface ClientEntity {
  id: string;
  name: string;
  contact: string;
  city: string;
  status: "active" | "prospect" | "pending";
  projects: number;
}

export interface QuoteEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "pending" | "approved" | "sent";
}

export interface InvoiceEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

export interface NotificationEntity {
  id: string;
  title: string;
  source: string;
  createdAt: string;
  status: "info" | "warning" | "critical";
}

export interface DashboardSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

// --- Interfaces UI (Vues/Props) ---

export interface UtilisateurTableauDeBord {
  id: string;
  nom: string;
  email: string;
  role?: "client" | "admin";
}

export interface LienNavigationTableauDeBord {
  identifiant: string;
  libelle: string;
  href: string;
  description: string;
  raccourci: string;
  icone: LucideIcon;
  categorie: string;
  shortcut?: string; // Pour compatibilité avec rich-tooltip
}

export interface CarteStatistiqueTableauDeBord {
  identifiant: string;
  libelle: string;
  valeur: string;
  evolution: string;
  resume: string;
  tendance: "hausse" | "baisse" | "stable";
  icone: string;
}

export interface MessageTableauDeBord {
  identifiant: string;
  expediteur: string;
  avatar: string;
  sujet: string;
  extrait: string;
  moment: string;
  prioritaire: boolean;
  nonLu: boolean;
}

export interface ActiviteTableauDeBord {
  identifiant: string;
  titre: string;
  detail: string;
  moment: string;
  progression: number;
  statut: "succes" | "alerte" | "information";
  icone: LucideIcon;
}

export interface ProjetGalerieTableauDeBord {
  identifiant: string;
  titre: string;
  categorie: string;
  client: string;
  localisation: string;
  date: string;
  progression: number;
  statut: "actif" | "pending_validation" | "completed";
  image: string;
  resume: string;
}

export interface RaccourciTableauDeBord {
  identifiant: string;
  libelle: string;
  description: string;
  icone: LucideIcon;
}

export interface ValeurHeroTableauDeBord {
  identifiant: string;
  valeur: string;
  libelle: string;
}

export type FilDarianeTableauDeBord = Record<string, string>;
