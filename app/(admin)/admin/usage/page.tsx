import { Activity, MousePointerClick, Route, Users } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { UsageAnalyticsCharts } from "@/components/features/analytics/UsageAnalyticsCharts";
import { UsageAnalyticsPageTracker } from "@/components/features/analytics/UsageAnalyticsPageTracker";
import { UsageAnalyticsService } from "@/services/usage-analytics.service";

export default async function AdminUsagePage() {
  const analytics = await UsageAnalyticsService.getUsageAnalytics();

  return (
    <div className="space-y-6 pb-8">
      <UsageAnalyticsPageTracker />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Usage</h1>
        <p className="text-sm text-muted-foreground">
          Suivi des pages, evenements et roles utilisateurs depuis l&apos;analytics interne.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <UsageKpiCard
          icon={Activity}
          label="Evenements"
          value={analytics.kpis.totalEvents.toLocaleString("fr-FR")}
        />
        <UsageKpiCard
          icon={Users}
          label="Utilisateurs actifs"
          value={analytics.kpis.activeUsers.toLocaleString("fr-FR")}
        />
        <UsageKpiCard
          icon={Route}
          label="Pages suivies"
          value={analytics.kpis.trackedPages.toLocaleString("fr-FR")}
        />
        <UsageKpiCard
          icon={MousePointerClick}
          label="Actions / utilisateur"
          value={analytics.kpis.actionRate.toLocaleString("fr-FR")}
        />
      </div>

      <UsageAnalyticsCharts data={analytics} />
    </div>
  );
}

function UsageKpiCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-lg border-border/70 p-4 shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-medium">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}
