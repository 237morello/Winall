"use client";

import * as React from "react";
import { trackUsageEvent } from "@/lib/analytics/track-usage-event";

export function UsageAnalyticsPageTracker() {
  React.useEffect(() => {
    void trackUsageEvent("admin_usage_viewed", {
      route: "/admin/usage",
      metadata: { dashboard_area: "admin" },
    });
  }, []);

  return null;
}
