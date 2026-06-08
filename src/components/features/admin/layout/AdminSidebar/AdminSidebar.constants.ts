import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  MessageSquare, 
  Bell, 
  BarChart3,
  Settings 
} from "lucide-react";
import { AdminSidebarLink } from "./AdminSidebar.types";

export const ADMIN_SIDEBAR_LINKS: AdminSidebarLink[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/projects",
    label: "Projets",
    icon: Briefcase,
  },
  {
    href: "/admin/requests",
    label: "Demandes",
    icon: FileText,
  },
  {
    href: "/admin/users",
    label: "Utilisateurs",
    icon: Users,
  },
  {
    href: "/admin/chat",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    href: "/admin/usage",
    label: "Usage",
    icon: BarChart3,
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
  },
];
