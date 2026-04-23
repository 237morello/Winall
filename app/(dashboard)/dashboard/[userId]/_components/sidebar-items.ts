/**
 * Mission : Configuration du dashboard : sidebar-items définit la liste des liens et icônes de la navigation latérale.
 */
import {
    Bell,
    Briefcase,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Receipt,
    Settings,
    Users
} from "lucide-react";

export const getSidebarItems = (userId: string) => [
  {
    label: "Tableau de bord",
    href: `/dashboard/${userId}`,
    icon: LayoutDashboard,
    description: "Vue d'ensemble et statistiques clés",
    shortcut: "⌘+D",
  },
  {
    label: "Projets",
    href: `/dashboard/${userId}/project`,
    icon: Briefcase,
    description: "Suivi des installations électriques",
    shortcut: "⌘+P",
  },
  {
    label: "Clients",
    href: `/dashboard/${userId}/clients`,
    icon: Users,
    description: "Gestion du portefeuille client",
    shortcut: "⌘+U",
  },
  {
    label: "Devis",
    href: `/dashboard/${userId}/quotes`,
    icon: FileText,
    description: "Gestion des propositions commerciales",
    shortcut: "⌘+Q",
  },
  {
    label: "Factures",
    href: `/dashboard/${userId}/invoices`,
    icon: Receipt,
    description: "Suivi des paiements et facturation",
    shortcut: "⌘+I",
  },
  {
    label: "Messages",
    href: `/dashboard/${userId}/chat`,
    icon: MessageSquare,
    description: "Communication avec les clients",
    shortcut: "⌘+M",
  },
  {
    label: "Notifications",
    href: `/dashboard/${userId}/notifications`,
    icon: Bell,
    description: "Alertes et mises à jour",
    shortcut: "⌘+N",
  },
  {
    label: "Paramètres",
    href: `/dashboard/${userId}/settings`,
    icon: Settings,
    description: "Configuration du compte",
    shortcut: "⌘+,",
  },
];
