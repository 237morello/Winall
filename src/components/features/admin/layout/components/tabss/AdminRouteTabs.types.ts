export interface AdminRouteTabBadge {
  label: string;
  variant: "success" | "warning" | "neutral";
}

export interface AdminRouteTabItem {
  label: string;
  href: string;
  badge?: AdminRouteTabBadge;
}

export interface AdminRouteTabGroup {
  matchPrefix: string;
  items: AdminRouteTabItem[];
}