import { AdminService } from "@/services/admin.service";
import { 
  Users, 
  FolderKanban, 
  FileSpreadsheet, 
  TrendingUp,
  LucideIcon
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await AdminService.getDashboardStats();
  const recentRequests = await AdminService.getRecentFormRequests();
  const projectDistribution = await AdminService.getProjectsDistribution();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Espace Administration</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de l&apos;activité de Winall Tech Sarl.
        </p>
      </div>
      
      {/* Statistiques Globales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Distribution des Projets */}
        <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Répartition des Projets</h3>
          <div className="space-y-4">
            {projectDistribution.length > 0 ? projectDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(item.value / stats.activeProjectCount || 1) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.value}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground italic text-center py-8">
                Aucune donnée de projet disponible.
              </p>
            )}
          </div>
        </div>

        {/* Dernières Demandes */}
        <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Demandes Récentes</h3>
          <div className="space-y-4">
            {recentRequests.length > 0 ? recentRequests.map((req) => (
              <div key={req.id} className="flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold">{req.nom}</span>
                  <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {req.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{req.email}</p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">
                  {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground italic text-center py-8">
                Aucune demande récente.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
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
