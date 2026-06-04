import { LucideIcon } from "lucide-react";

export interface AdminSidebarProps {
  className?: string;
}

export interface AdminSidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}
