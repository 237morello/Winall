import { 
  Users, 
  FolderKanban, 
  FileSpreadsheet, 
  TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminStatsCardsProps {
  stats: {
    userCount: number;
    activeProjectCount: number;
    unreadFormCount: number;
    totalRevenue: number;
  };
}

export function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  const cards = [
    {
      title: "Utilisateurs",
      value: stats.userCount.toString(),
      description: "Inscrits sur la plateforme",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Projets Actifs",
      value: stats.activeProjectCount.toString(),
      description: "Chantiers en cours",
      icon: FolderKanban,
      color: "text-emerald-500",
    },
    {
      title: "Nouvelles Demandes",
      value: stats.unreadFormCount.toString(),
      description: "Formulaires non lus",
      icon: FileSpreadsheet,
      color: "text-amber-500",
    },
    {
      title: "Revenu Estimé",
      value: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(stats.totalRevenue),
      description: "Basé sur les devis clos",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-none shadow-sm bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
