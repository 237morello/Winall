import { Users } from "lucide-react";
import { EntityListCard } from "@/components/features/dashboard";
import { CLIENTS_DATA } from "@/services/dashboard.service";
import type { ClientEntity } from "@/types/dashboard.types";

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

      <EntityListCard<ClientEntity>
        title="Portefeuille Clients"
        description="Liste complète de vos clients avec recherche, filtres et pagination."
        icon={Users}
        rows={clients}
        searchPlaceholder="Rechercher un client, un contact ou une ville..."
        searchableText={(row) => `${row.id} ${row.name} ${row.contact} ${row.city}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Référence", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
          { key: "name", header: "Client", render: (row) => <span className="font-bold">{row.name}</span> },
          { key: "contact", header: "Contact", render: (row) => row.contact },
          { key: "city", header: "Ville", render: (row) => row.city },
          { key: "projects", header: "Projets", render: (row) => <span className="flex h-6 w-6 items-center justify-center rounded-full bg-p/10 text-p text-[10px] font-bold">{row.projects}</span> },
        ]}
      />
    </div>
  );
}
