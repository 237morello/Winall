"use client";

import * as React from "react";
import Clarity from "@microsoft/clarity";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { trackUsageEvent } from "@/lib/analytics/track-usage-event";

const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function getDashboardArea(pathname: string) {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/dashboard")) return "client";
  if (pathname === "/log-in" || pathname === "/sign-up") return "auth";
  return "public";
}

export function ClarityProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (!clarityProjectId || initializedRef.current) return;

    Clarity.init(clarityProjectId);
    initializedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (isPending) return;

    const route = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const user = session?.user;
    const role = (user as { role?: string } | undefined)?.role?.toUpperCase();
    const dashboardArea = getDashboardArea(pathname);

    try {
      if (user?.id) {
        Clarity.identify(user.id, undefined, route, user.name ?? undefined);
      }

      Clarity.setTag("route", route);
      Clarity.setTag("auth_state", user?.id ? "authenticated" : "anonymous");
      Clarity.setTag("dashboard_area", dashboardArea);
      if (role) Clarity.setTag("role", role);
    } catch {
      // Clarity is disabled when the project id is absent or the script is not ready.
    }

    void trackUsageEvent("page_view", {
      route,
      metadata: {
        auth_state: user?.id ? "authenticated" : "anonymous",
        dashboard_area: dashboardArea,
      },
    });

    if (pathname.startsWith("/admin")) {
      void trackUsageEvent("admin_page_viewed", {
        route,
        metadata: { dashboard_area: "admin" },
      });
    }
  }, [isPending, pathname, searchParams, session?.user]);

  return <>{children}</>;
}
