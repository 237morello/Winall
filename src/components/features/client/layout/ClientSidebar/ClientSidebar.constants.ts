import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  Bell, 
  Settings 
} from "lucide-react";
import { ClientSidebarLink } from "./ClientSidebar.types";

export const CLIENT_SIDEBAR_LINKS = (userId: string): ClientSidebarLink[] => [
  {
    href: `/dashboard`,
    label: "Accueil",
    icon: Home,
  },
  {
    href: `/dashboard/projects`,
    label: "Mes Projets",
    icon: Briefcase,
  },
  {
    href: `/dashboard/chat`,
    label: "Messages",
    icon: MessageSquare,
  },
  {
    href: `/dashboard/quotes`,
    label: "Devis & Factures",
    icon: FileText,
  },
  {
    href: `/dashboard/notifications`,
    label: "Notifications",
    icon: Bell,
  },
  {
    href: `/dashboard/settings`,
    label: "Paramètres",
    icon: Settings,
  },
];
