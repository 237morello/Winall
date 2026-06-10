import { ReactNode } from "react";
import type { CurrentUser } from "@/lib/current-user";

export interface ClientLayoutProps {
  children: ReactNode;
  user: CurrentUser | null;
  userId: string;
}
