import { LucideIcon } from "lucide-react";

export interface ClientSidebarProps {
  className?: string;
  userId: string;
}

export interface ClientSidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}
