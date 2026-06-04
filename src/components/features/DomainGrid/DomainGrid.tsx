"use client";

import { DomainCard } from "./DomainCard";
import { DOMAINS } from "./DomainGrid.constants";
import { DomainKey } from "./DomainGrid.types";
import { cn } from "@/lib/utils";

/**
 * MISSION : DomainGrid — Affiche la grille des domaines d'expertise Winall.
 */

interface DomainGridProps {
  className?: string;
  limit?: number;
  filter?: DomainKey[];
}

export const DomainGrid = ({ className, limit, filter }: DomainGridProps) => {
  let domains = Object.values(DOMAINS);

  if (filter) {
    domains = domains.filter((d) => filter.includes(d.id as DomainKey));
  }

  if (limit) {
    domains = domains.slice(0, limit);
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
};
