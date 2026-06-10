import { LucideIcon } from "lucide-react";
import type { CurrentUser } from "@/lib/current-user";

export interface AdminSidebarProps {
  className?: string;
  user: CurrentUser;
}

export interface AdminSidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}
