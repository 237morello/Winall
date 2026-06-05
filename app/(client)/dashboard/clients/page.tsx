import { DashboardEntityListCardClient } from "@/components/features/dashboard/shared/DashboardEntityListCardClient";
import { CLIENTS_DATA } from "@/services/dashboard.service";

/**
 * MISSION : Contrôleur Dashboard/Clients — Gère la récupération des données clients.
 */
export default async function ClientsPage() {
  // Simulation de récupération de données (Prisma/Supabase plus tard)
  const clients = CLIENTS_DATA;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Clients</h1>
        <p className="text-muted-foreground">Gestion du portefeuille client et des contacts de Winall Tech.</p>
      </div>

      <DashboardEntityListCardClient variant="clients" rows={clients} />
    </div>
  );
}
