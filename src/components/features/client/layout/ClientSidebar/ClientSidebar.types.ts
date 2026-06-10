import { LucideIcon } from "lucide-react";
import type { CurrentUser } from "@/lib/current-user";

export interface ClientSidebarProps {
  className?: string;
  user: CurrentUser | null;
  userId: string;
}

export interface ClientSidebarLink {
  href: string;
  label: string;
  icon: LucideIcon;
}
