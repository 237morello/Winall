import { DashboardOverview } from "@/components/features/dashboard";
import { getCurrentUser } from "@/lib/current-user";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { getProjects } from "@/actions/project.actions";
import { getDashboardStats } from "@/actions/dashboard.actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const utilisateur: UtilisateurTableauDeBord = {
    id: user?.id || "guest-dev",
    nom: user?.name || "Expert Winall",
    email: user?.email || "expert@winall.tech",
    role: user?.role === "ADMIN" ? "admin" : "client",
  };

  /*if (utilisateur.role === "admin") {
    redirect(`/admin`);
  }*/

  // Récupération des données réelles synchronisées avec la DB
  const [projets, stats] = await Promise.all([
    getProjects(),
    getDashboardStats(),
  ]);

  return (
    <DashboardOverview 
      utilisateur={utilisateur} 
      projetsRecents={projets.slice(0, 12)} 
      stats={stats}
    />
  );
}
