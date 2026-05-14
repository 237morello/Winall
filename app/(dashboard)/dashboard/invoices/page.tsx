import { Receipt } from "lucide-react";
import { EntityListCard } from "@/components/features/dashboard";
import { DashboardService, INVOICES_DATA } from "@/services/dashboard.service";
import type { InvoiceEntity } from "@/types/dashboard.types";

/**
 * MISSION : Contrôleur Dashboard/Invoices — Gère la récupération des factures.
 */
export default async function InvoicesPage() {
  const invoices = INVOICES_DATA;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Factures</h1>
        <p className="text-muted-foreground">Suivi des paiements, des échéances et de la comptabilité Winall Tech.</p>
      </div>

      <EntityListCard<InvoiceEntity>
        title="Journal des Factures"
        description="Suivi des paiements, des échéances et des retards."
        icon={Receipt}
        rows={invoices}
        searchPlaceholder="Rechercher une facture ou un client..."
        searchableText={(row) => `${row.id} ${row.client}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Facture", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
          { key: "client", header: "Client", render: (row) => <span className="font-bold">{row.client}</span> },
          { key: "amount", header: "Montant", render: (row) => <span className="font-semibold text-p">{DashboardService.formatCurrency(row.amount)}</span> },
          { key: "dueDate", header: "Échéance", render: (row) => row.dueDate },
        ]}
      />
    </div>
  );
}
