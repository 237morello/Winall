"use client";

import { AdminSidebarProps } from "./AdminSidebar.types";
import { ADMIN_SIDEBAR_LINKS } from "./AdminSidebar.constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * AdminSidebar - Sidebar flottante 52px icon-only pour le pilotage business.
 * @param {AdminSidebarProps} props - Les propriétés du composant.
 */
export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-[52px] flex-col items-center",
        "border-r border-border/50 bg-background/80 backdrop-blur-md transition-all duration-300",
        className
      )}
    >
      <div className="flex h-16 items-center justify-center">
        <Link href="/admin">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            W
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-4 py-4">
        {ADMIN_SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={20} />
              
              {/* Tooltip simple en CSS plat */}
              <span className="absolute left-14 hidden rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block whitespace-nowrap">
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="py-4">
        {/* Actions de bas de sidebar (ex: Profil, Settings) */}
      </div>
    </aside>
  );
}
