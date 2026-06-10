"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const dataRevenue = [
  { mois: "Jan", total: 4.2 },
  { mois: "Fév", total: 3.8 },
  { mois: "Mar", total: 5.1 },
  { mois: "Avr", total: 4.5 },
  { mois: "Mai", total: 6.2 },
  { mois: "Juin", total: 5.8 },
];

const dataDomaines = [
  { name: "BTP", value: 45 },
  { name: "Sécurité", value: 30 },
  { name: "IT", value: 25 },
];

const COLORS = ["var(--primary)", "var(--foreground)", "var(--muted-foreground)"];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      {/* Graphique de Croissance (Revenus) */}
      <Card className="lg:col-span-2 border border-border/50 rounded-3xl bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-lg font-bold">Croissance du Chiffre d&apos;Affaires (M CFA)</CardTitle>
          <p className="text-xs text-muted-foreground italic">Évolution sur les 6 derniers mois</p>
        </CardHeader>
        <CardContent className="h-[300px] p-6 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataRevenue}>
              <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: "bold"}} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: "16px", border: "1px solid var(--border)", backgroundColor: "var(--background)", fontSize: "12px", fontWeight: "bold" }}
              />
              <Area type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={4} fillOpacity={0.1} fill="var(--primary)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Répartition par Domaine (Pie) */}
      <Card className="border border-border/50 rounded-3xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-6">
          <CardTitle className="text-lg font-bold">Répartition Activités</CardTitle>
          <p className="text-xs text-muted-foreground italic">Par volume de projets</p>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataDomaines}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {dataDomaines.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-p">100%</span>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Global</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
