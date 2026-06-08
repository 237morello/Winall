"use client";

import * as React from "react";
import {
  trackUsageEvent,
  type UsageEventMetadata,
  type UsageEventName,
} from "@/lib/analytics/track-usage-event";

export function UsageEventTracker({
  eventName,
  route,
  metadata,
}: {
  eventName: UsageEventName;
  route?: string;
  metadata?: UsageEventMetadata;
}) {
  React.useEffect(() => {
    void trackUsageEvent(eventName, { route, metadata });
  }, [eventName, route, metadata]);

  return null;
}
