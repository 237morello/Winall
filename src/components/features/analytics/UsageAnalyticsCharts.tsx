"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import type { UsageAnalyticsData } from "@/services/usage-analytics.service";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roleColors = ["#2563eb", "#16a34a", "#f97316"];

export function UsageAnalyticsCharts({ data }: { data: UsageAnalyticsData }) {
  if (!data.hasEvents) {
    return (
      <Card className="rounded-lg border-dashed shadow-none">
        <CardHeader>
          <CardTitle>Aucune donnee analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Les graphiques apparaitront apres les premiers evenements suivis.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <UsageChartCard title="Activite sur 30 jours">
        <ChartContainer
          config={{
            events: { label: "Evenements", color: "#2563eb" },
            pageViews: { label: "Pages vues", color: "#16a34a" },
          }}
          className="h-72"
        >
          <AreaChart data={data.dailyUsage}>
            <defs>
              <linearGradient id="eventsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="pageViewsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="events"
              type="monotone"
              stroke="#2563eb"
              fill="url(#eventsFill)"
              strokeWidth={2}
            />
            <Area
              dataKey="pageViews"
              type="monotone"
              stroke="#16a34a"
              fill="url(#pageViewsFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </UsageChartCard>

      <UsageChartCard title="Routes les plus utilisees">
        <ChartContainer
          config={{ count: { label: "Evenements", color: "#2563eb" } }}
          className="h-72"
        >
          <BarChart data={data.topRoutes}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="route" tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={72} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </UsageChartCard>

      <UsageChartCard title="Repartition des visiteurs">
        <ChartContainer
          config={{ count: { label: "Sessions", color: "#2563eb" } }}
          className="h-72"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="role" />} />
            <Pie
              data={data.roleDistribution}
              dataKey="count"
              nameKey="role"
              innerRadius={58}
              outerRadius={94}
              paddingAngle={3}
            >
              {data.roleDistribution.map((entry, index) => (
                <Cell key={entry.role} fill={roleColors[index % roleColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </UsageChartCard>

      <UsageChartCard title="Evenements les plus frequents">
        <ChartContainer
          config={{ count: { label: "Occurrences", color: "#f97316" } }}
          className="h-72"
        >
          <BarChart data={data.topEvents} layout="vertical" margin={{ left: 36 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              dataKey="eventName"
              type="category"
              tickLine={false}
              axisLine={false}
              width={128}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#f97316" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartContainer>
      </UsageChartCard>
    </div>
  );
}

function UsageChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
