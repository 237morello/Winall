
import { AdminService } from "@/services/admin.service";
import { Users, FolderKanban, FileSpreadsheet, TrendingUp, LucideIcon } from "lucide-react";

export const AdminStatsCardsPage =  async () => {

      const stats = await AdminService.getDashboardStats();
  return (
    <>
    {/* Statistiques Globales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-zinc-100 p-4 rounded-2xl dark:bg-zinc-800">
        <StatCard 
          title="Utilisateurs" 
          value={stats.userCount.toString()} 
          icon={Users}
          description="Total inscrits"
        />
        <StatCard 
          title="Projets actifs" 
          value={stats.activeProjectCount.toString()} 
          icon={FolderKanban}
          description="En cours de réalisation"
        />
        <StatCard 
          title="Nouvelles demandes" 
          value={stats.unreadFormCount.toString()} 
          icon={FileSpreadsheet}
          description="À traiter"
        />
        <StatCard 
          title="Revenu Estimé" 
          value={`${stats.totalRevenue.toLocaleString()} FCFA`} 
          icon={TrendingUp}
          description="Basé sur les devis"
        />
      </div>
    </>
  );
}

function StatCard({ title, value, icon: Icon, description }: { 
  title: string; 
  value: string; 
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}