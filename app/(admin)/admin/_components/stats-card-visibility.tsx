"use client";

import { usePathname } from "next/navigation";

interface StatsCardVisibilityProps {
  children: React.ReactNode;
}

const routesAvecStats = [
  "/admin",
  "/admin/stats",
  "/admin/Usage",
  "/admini/Usage",
];

export function StatsCardVisibility({ children }: StatsCardVisibilityProps) {
  const pathname = usePathname();
  const visible = routesAvecStats.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (!visible) return null;

  return <>{children}</>;
}
