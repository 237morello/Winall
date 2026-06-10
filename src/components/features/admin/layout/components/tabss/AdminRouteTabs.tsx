"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ADMIN_ROUTE_TABS } from "./AdminRouteTabs.constants";
import type {
  AdminRouteTabBadge,
  AdminRouteTabGroup,
} from "./AdminRouteTabs.types";

const BADGE_CLASS_NAMES = {
  success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  warning: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  neutral: "bg-muted text-muted-foreground hover:bg-muted",
} satisfies Record<AdminRouteTabBadge["variant"], string>;

function isRouteMatch(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getActiveTabGroup(pathname: string): AdminRouteTabGroup | undefined {
  return ADMIN_ROUTE_TABS.find((group) =>
    isRouteMatch(pathname, group.matchPrefix),
  );
}

function getActiveTabHref(group: AdminRouteTabGroup, pathname: string): string {
  const exactMatch = group.items.find((item) => pathname === item.href);

  if (exactMatch) {
    return exactMatch.href;
  }

  const parentMatch = group.items
    .filter(
      (item) => item.href !== "/admin" && pathname.startsWith(`${item.href}/`),
    )
    .sort(
      (firstItem, secondItem) => secondItem.href.length - firstItem.href.length,
    )
    .at(0);

  return parentMatch?.href ?? group.items[0].href;
}

export function AdminRouteTabs() {
  const pathname = usePathname();
  const activeGroup = getActiveTabGroup(pathname);

  if (!activeGroup || activeGroup.items.length === 0) {
    console.log("No active group");
    return null;
  }

  const activeTabHref = getActiveTabHref(activeGroup, pathname);

  return (
    <nav
      aria-label="Navigation secondaire admin"
      className="border-b border-border/80"
    >
      <ul className="flex min-h-12 items-center gap-6 overflow-x-auto">
        {activeGroup.items.map((item) => {
          const isActive = item.href === activeTabHref;

          return (
            <li key={item.href} className="flex min-h-12 shrink-0 items-center">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center gap-2  whitespace-nowrap border-b-3 px-0.5 text-sm font-bold transition-colors",
                  isActive
                    ? "border-p-900 text-p-900"
                    : "border-transparent text-muted-foreground hover:text-p-900",
                )}
              >
                <span>{item.label}</span>

                {item.badge ? (
                  <Badge
                    className={cn(
                      "rounded-full px-1.5 py-0 text-[10px] font-medium uppercase tracking-wide",
                      BADGE_CLASS_NAMES[item.badge.variant],
                    )}
                  >
                    {item.badge.label}
                  </Badge>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
