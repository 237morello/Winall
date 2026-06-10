import { ReactNode } from "react";
import type { CurrentUser } from "@/lib/current-user";

export interface AdminLayoutProps {
  children: ReactNode;
  user: CurrentUser;
}
