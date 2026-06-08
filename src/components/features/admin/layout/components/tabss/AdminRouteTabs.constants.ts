import type { AdminRouteTabGroup } from "./AdminRouteTabs.types";

export const ADMIN_ROUTE_TABS = [
  {
    matchPrefix: "/admin/projects",
    items: [
      {
        label: "Détails",
        href: "/admin/projects",
      },
      {
        label: "Nouveau projet",
        href: "/admin/projects/new",
        badge: {
          label: "NOUVEAU",
          variant: "success",
        },
      },
    ],
  },
  {
    matchPrefix: "/admin/users",
    items: [
      {
        label: "Détails",
        href: "/admin/users",
      },
      {
        label: "Nouvel utilisateur",
        href: "/admin/users/new",
      },
    ],
  },
  {
    matchPrefix: "/admin/requests",
    items: [
      {
        label: "Détails",
        href: "/admin/requests",
      },
    ],
  },
  {
    matchPrefix: "/admin/chat",
    items: [
      {
        label: "Conversations",
        href: "/admin/chat",
      },
    ],
  },
  {
    matchPrefix: "/admin/stats",
    items: [
      {
        label: "detail",
        href: "/admin",
      },
      {
        label: "stats",
        href: "/admin/stats",
      },
      {
        label: "Usage",
        href: "/admin/usage",
      },
      {
        label: "Demandes",
        href: "/admin/requests",
      },
      {
        label: "Messagerie",
        href: "/admin/chat",
      },
    ],
  },
  {
    matchPrefix: "/admin",
    items: [
      {
        label: "detail",
        href: "/admin",
      },
      {
        label: "stats",
        href: "/admin/stats",
      },
      {
        label: "Usage",
        href: "/admin/usage",
      },
      {
        label: "Demandes",
        href: "/admin/requests",
      },
      {
        label: "Messagerie",
        href: "/admin/chat",
      },
    ],
  },
] satisfies AdminRouteTabGroup[];
