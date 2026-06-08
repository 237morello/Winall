import "server-only";

import prisma from "@/lib/prisma";

export type UsageAnalyticsData = Awaited<
  ReturnType<typeof UsageAnalyticsService.getUsageAnalytics>
>;

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatRouteLabel(route: string | null) {
  if (!route) return "Non renseignee";
  return route.split("?")[0] || "/";
}

export class UsageAnalyticsService {
  static async getUsageAnalytics() {
    const now = new Date();
    const firstDay = startOfDay(now);
    firstDay.setDate(firstDay.getDate() - 29);

    const [events, totalEvents, activeUsers, trackedPages] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where: {
          createdAt: {
            gte: firstDay,
          },
        },
        select: {
          eventName: true,
          route: true,
          role: true,
          userId: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
      prisma.analyticsEvent.count(),
      prisma.analyticsEvent.findMany({
        where: {
          userId: {
            not: null,
          },
        },
        select: {
          userId: true,
        },
        distinct: ["userId"],
      }),
      prisma.analyticsEvent.findMany({
        where: {
          route: {
            not: null,
          },
        },
        select: {
          route: true,
        },
        distinct: ["route"],
      }),
    ]);

    const days = Array.from({ length: 30 }, (_, index) => {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + index);
      const date = formatDayKey(day);
      return { date, events: 0, pageViews: 0 };
    });

    const dayMap = new Map(days.map((day) => [day.date, day]));
    const routeCounts = new Map<string, number>();
    const eventCounts = new Map<string, number>();
    const roleCounts = new Map<string, number>([
      ["Anonymes", 0],
      ["Clients", 0],
      ["Admins", 0],
    ]);

    for (const event of events) {
      const day = dayMap.get(formatDayKey(event.createdAt));
      if (day) {
        day.events += 1;
        if (event.eventName === "page_view") day.pageViews += 1;
      }

      const routeLabel = formatRouteLabel(event.route);
      routeCounts.set(routeLabel, (routeCounts.get(routeLabel) ?? 0) + 1);
      eventCounts.set(event.eventName, (eventCounts.get(event.eventName) ?? 0) + 1);

      if (event.role === "ADMIN") {
        roleCounts.set("Admins", (roleCounts.get("Admins") ?? 0) + 1);
      } else if (event.role === "CLIENT") {
        roleCounts.set("Clients", (roleCounts.get("Clients") ?? 0) + 1);
      } else {
        roleCounts.set("Anonymes", (roleCounts.get("Anonymes") ?? 0) + 1);
      }
    }

    const topRoutes = [...routeCounts.entries()]
      .map(([route, count]) => ({ route, count }))
      .sort((first, second) => second.count - first.count)
      .slice(0, 8);

    const topEvents = [...eventCounts.entries()]
      .map(([eventName, count]) => ({ eventName, count }))
      .sort((first, second) => second.count - first.count)
      .slice(0, 8);

    const roleDistribution = [...roleCounts.entries()]
      .filter(([, count]) => count > 0)
      .map(([role, count]) => ({ role, count }));

    const actionRate =
      activeUsers.length > 0 ? Number((totalEvents / activeUsers.length).toFixed(1)) : 0;

    return {
      kpis: {
        totalEvents,
        activeUsers: activeUsers.length,
        trackedPages: trackedPages.length,
        actionRate,
      },
      dailyUsage: days,
      topRoutes,
      roleDistribution,
      topEvents,
      hasEvents: events.length > 0 || totalEvents > 0,
    };
  }
}
