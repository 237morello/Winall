import {
  Bell,
  BriefcaseBusiness,
  CheckCheck,
  FileSpreadsheet,
  FolderKanban,
  LayoutDashboard,
  MessageSquareDot,
  Settings,
  Users,
} from "lucide-react";
import type {
  BusinessStatus,
  CarteStatistiqueTableauDeBord,
  ClientEntity,
  DashboardSetting,
  InvoiceEntity,
  LienNavigationTableauDeBord,
  NotificationEntity,
  QuoteEntity,
  UtilisateurTableauDeBord,
} from "@/types/dashboard.types";

/**
 * MISSION : Dashboard Service — Centralise la logique métier, les données et les helpers.
 */

// --- DONNÉES MOCK (Simulation DB) ---

export const CLIENTS_DATA: ClientEntity[] = [
  { id: "CLI-001", name: "Villa Horizon", contact: "Julie Lambert", city: "Lyon", status: "active", projects: 2 },
  { id: "CLI-002", name: "Immeuble Central", contact: "Marc Duret", city: "Paris", status: "pending", projects: 1 },
  { id: "CLI-003", name: "Hotel Azur", contact: "Sonia Perez", city: "Nice", status: "active", projects: 3 },
  { id: "CLI-004", name: "Mairie de Lyon", contact: "Service Urbanisme", city: "Lyon", status: "prospect", projects: 0 },
  { id: "CLI-005", name: "Sogeprom", contact: "Paul Martin", city: "Lille", status: "active", projects: 4 },
];

export const QUOTES_DATA: QuoteEntity[] = [
  { id: "DEV-2401", client: "Villa Horizon", amount: 12450, dueDate: "2026-05-03", status: "pending" },
  { id: "DEV-2402", client: "Hotel Azur", amount: 8600, dueDate: "2026-04-29", status: "approved" },
  { id: "DEV-2403", client: "Mairie de Lyon", amount: 22300, dueDate: "2026-05-15", status: "sent" },
  { id: "DEV-2404", client: "Immeuble Central", amount: 17350, dueDate: "2026-05-07", status: "pending" },
];

export const INVOICES_DATA: InvoiceEntity[] = [
  { id: "FAC-9101", client: "Sogeprom", amount: 5300, dueDate: "2026-04-18", status: "paid" },
  { id: "FAC-9102", client: "Villa Horizon", amount: 7400, dueDate: "2026-04-28", status: "pending" },
  { id: "FAC-9103", client: "Immeuble Central", amount: 9120, dueDate: "2026-04-11", status: "overdue" },
  { id: "FAC-9104", client: "Hotel Azur", amount: 6600, dueDate: "2026-05-02", status: "pending" },
];

export const NOTIFICATIONS_DATA: NotificationEntity[] = [
  { id: "NTF-01", title: "Nouveau ticket support", source: "Client #429", createdAt: "2026-04-15 09:14", status: "warning" },
  { id: "NTF-02", title: "Validation devis recue", source: "Sogeprom", createdAt: "2026-04-15 08:02", status: "info" },
  { id: "NTF-03", title: "Facture en retard", source: "Immeuble Central", createdAt: "2026-04-14 17:41", status: "critical" },
  { id: "NTF-04", title: "Intervention confirmee", source: "Hotel Azur", createdAt: "2026-04-14 13:27", status: "info" },
];

export const SETTINGS_DATA: DashboardSetting[] = [
  { id: "set-notif-email", title: "Notifications email", description: "Recevoir les alertes critiques et les validations devis par email.", enabled: true },
  { id: "set-notif-push", title: "Notifications push", description: "Recevoir les notifications en temps reel dans le dashboard.", enabled: true },
  { id: "set-two-factor", title: "Double authentification", description: "Renforcer la securite du compte administrateur.", enabled: false },
  { id: "set-weekly-report", title: "Rapport hebdomadaire", description: "Generer automatiquement un resume metier chaque semaine.", enabled: false },
];

// --- LOGIQUE MÉTIER & HELPERS ---

export class DashboardService {
  // Helpers de formatage
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  static statusLabel(status: BusinessStatus): string {
    const labels: Record<BusinessStatus, string> = {
      active: "Actif",
      prospect: "Prospect",
      pending: "En attente",
      approved: "Approuvé",
      sent: "Envoyé",
      paid: "Payé",
      overdue: "En retard",
      info: "Info",
      warning: "Alerte",
      critical: "Critique",
    };
    return labels[status];
  }

  static statusVariant(status: BusinessStatus): "default" | "secondary" | "destructive" | "outline" {
    if (status === "critical" || status === "overdue") return "destructive";
    if (status === "pending" || status === "warning") return "secondary";
    if (status === "active" || status === "approved" || status === "paid") return "default";
    return "outline";
  }

  static obtenirCouleurStatut(statut: string): string {
    switch (statut) {
      case "hausse":
      case "succes":
        return "bg-emerald-500/10 text-emerald-500";
      case "baisse":
      case "alerte":
      case "destructive":
        return "bg-red-500/10 text-red-500";
      case "stable":
      case "information":
      case "default":
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  }

  // Logique du Dashboard
  static obtenirPrenom(utilisateur: UtilisateurTableauDeBord): string {
    return utilisateur.nom.trim().split(" ")[0] || "Expert";
  }

  static obtenirInitiales(utilisateur: UtilisateurTableauDeBord): string {
    return utilisateur.nom
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((partie) => partie[0]?.toUpperCase() ?? "")
      .join("");
  }

  static obtenirNavigation(utilisateur: UtilisateurTableauDeBord): LienNavigationTableauDeBord[] {
    const estAdmin = utilisateur.role === "admin";
    
    const liens: LienNavigationTableauDeBord[] = [
      { identifiant: "dashboard", libelle: "Accueil", href: `/dashboard`, description: "Vue d'ensemble", raccourci: "G", icone: LayoutDashboard, categorie: "principal", shortcut: "⌘+D" },
      { identifiant: "projects", libelle: "Mes Projets", href: `/dashboard/projects`, description: "Suivi des chantiers", raccourci: "P", icone: FolderKanban, categorie: "metier", shortcut: "⌘+P" },
    ];

    if (estAdmin) {
      liens.push(
        { identifiant: "admin-requests", libelle: "Demandes", href: `/admin/requests`, description: "Formulaires reçus", raccourci: "R", icone: FileSpreadsheet, categorie: "admin", shortcut: "⌘+R" },
        { identifiant: "admin-projects", libelle: "Gestion Projets", href: `/admin/projects`, description: "Administration", raccourci: "A", icone: BriefcaseBusiness, categorie: "admin", shortcut: "⌘+A" },
        { identifiant: "admin-users", libelle: "Utilisateurs", href: `/admin/users`, description: "Droits d'accès", raccourci: "U", icone: Users, categorie: "admin", shortcut: "⌘+U" }
      );
    } else {
      liens.push(
        { identifiant: "client-support", libelle: "Support / Devis", href: `/dashboard/support`, description: "Nouvelle demande", raccourci: "S", icone: FileSpreadsheet, categorie: "client", shortcut: "⌘+S" }
      );
    }

    liens.push(
      { identifiant: "chat", libelle: "Messages", href: `/dashboard/chat`, description: "Messagerie directe", raccourci: "M", icone: MessageSquareDot, categorie: "communication", shortcut: "⌘+M" },
      { identifiant: "notifications", libelle: "Notifications", href: `/dashboard/notifications`, description: "Alertes", raccourci: "N", icone: Bell, categorie: "communication", shortcut: "⌘+N" },
      { identifiant: "settings", libelle: "Parametres", href: `/dashboard/settings`, description: "Configuration", raccourci: "S", icone: Settings, categorie: "systeme", shortcut: "⌘+," }
    );

    return liens;
  }

  static obtenirCartesStatistiques(role: "admin" | "client" = "client"): CarteStatistiqueTableauDeBord[] {
    if (role === "admin") {
      return [
        { identifiant: "revenu-total", libelle: "Revenu Global", valeur: "45.2M CFA", evolution: "+12%", resume: "Chiffre d'affaires", tendance: "hausse", icone: "BriefcaseBusiness" },
        { identifiant: "leads-nouveaux", libelle: "Nouveaux Leads", valeur: "8", evolution: "Semaine", resume: "Demandes à traiter", tendance: "hausse", icone: "FileSpreadsheet" },
        { identifiant: "projets-actifs", libelle: "Chantiers Actifs", valeur: "14", evolution: "Stable", resume: "Suivi en cours", tendance: "stable", icone: "FolderKanban" },
        { identifiant: "alertes", libelle: "Interventions", valeur: "3", evolution: "Urgent", resume: "Maintenance requise", tendance: "baisse", icone: "Bell" },
      ];
    }

    return [
      { identifiant: "mes-projets", libelle: "Mes Projets", valeur: "2", evolution: "En cours", resume: "Suivi chantier", tendance: "stable", icone: "FolderKanban" },
      { identifiant: "messages-non-lus", libelle: "Messages", valeur: "1", evolution: "Nouveau", resume: "Direct Expert", tendance: "hausse", icone: "MessageSquareDot" },
      { identifiant: "devis-attente", libelle: "Devis", valeur: "1", evolution: "À valider", resume: "Propositions", tendance: "stable", icone: "FileSpreadsheet" },
      { identifiant: "projets-finis", libelle: "Terminés", valeur: "5", evolution: "Historique", resume: "Livraisons Winall", tendance: "hausse", icone: "CheckCheck" },
    ];
  }
}
