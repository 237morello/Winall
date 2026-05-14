import { FileText } from "lucide-react";
import { EntityListCard } from "@/components/features/dashboard";
import { DashboardService, QUOTES_DATA } from "@/services/dashboard.service";
import type { QuoteEntity } from "@/types/dashboard.types";

/**
 * MISSION : Contrôleur Dashboard/Quotes — Gère la récupération des devis.
 */
export default async function QuotesPage() {
  const quotes = QUOTES_DATA;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Devis</h1>
        <p className="text-muted-foreground">Gestion des propositions commerciales et chiffrages Winall Tech.</p>
      </div>

      <EntityListCard<QuoteEntity>
        title="Devis Actifs"
        description="Suivi des devis en cours avec statut de validation."
        icon={FileText}
        rows={quotes}
        searchPlaceholder="Rechercher un devis ou un client..."
        searchableText={(row) => `${row.id} ${row.client}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Référence", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
          { key: "client", header: "Client", render: (row) => <span className="font-bold">{row.client}</span> },
          { key: "amount", header: "Montant", render: (row) => <span className="font-semibold text-p">{DashboardService.formatCurrency(row.amount)}</span> },
          { key: "dueDate", header: "Échéance", render: (row) => row.dueDate },
        ]}
      />
    </div>
  );
}
