"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/log-in", label: "Connexion" },
  { href: "/inscription", label: "Inscription" },
] as const;

/** Bascule visuelle Connexion / Inscription (deux routes distinctes). */
export function AuthTabs() {
  const pathname = usePathname();

  return (
    <div
      role="tablist"
      aria-label="Choisir une action"
      className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            className={cn(
              "rounded-md py-2 text-center text-sm font-medium transition-colors",
              active
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
