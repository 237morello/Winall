"use client";

import Clarity from "@microsoft/clarity";

export type UsageEventMetadata = Record<
  string,
  string | number | boolean | null | undefined
>;

export type UsageEventName =
  | "page_view"
  | "login_started"
  | "login_success"
  | "signup_started"
  | "quote_opened"
  | "support_request_sent"
  | "project_viewed"
  | "admin_page_viewed"
  | "admin_usage_viewed"
  | (string & {});

type TrackUsageEventOptions = {
  route?: string;
  metadata?: UsageEventMetadata;
};

function getCurrentRoute(route?: string) {
  if (route) return route;
  if (typeof window === "undefined") return undefined;
  return `${window.location.pathname}${window.location.search}`;
}

function setClarityTags(metadata: UsageEventMetadata | undefined) {
  if (!metadata) return;

  for (const [key, value] of Object.entries(metadata)) {
    if (value === null || value === undefined) continue;
    Clarity.setTag(key, String(value));
  }
}

export async function trackUsageEvent(
  eventName: UsageEventName,
  options: TrackUsageEventOptions = {},
) {
  const route = getCurrentRoute(options.route);

  try {
    Clarity.event(eventName);
    setClarityTags(options.metadata);
  } catch {
    // Clarity is optional and must never block product flows.
  }

  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        route,
        metadata: options.metadata ?? {},
      }),
      keepalive: true,
    });
  } catch {
    // Analytics ingestion is best-effort on the client.
  }
}
