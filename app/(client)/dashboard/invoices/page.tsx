import { DashboardEntityListCardClient } from "@/components/features/dashboard/shared/DashboardEntityListCardClient";
import { getInvoices } from "@/actions/invoice.actions";
import type { InvoiceEntity } from "@/types/dashboard.types";

/**
 * MISSION : Contrôleur Dashboard/Invoices — Gère la récupération des factures.
 */
export default async function InvoicesPage() {
  const rawInvoices = await getInvoices();

  // Mapping des données Prisma vers le type InvoiceEntity attendu par l'UI
  const invoices: InvoiceEntity[] = rawInvoices.map((inv) => ({
    id: inv.numero,
    client: (inv as { user?: { name?: string | null } }).user?.name || "Client Winall",
    amount: inv.montant,
    dueDate: inv.dateEcheance.toLocaleDateString("fr-FR"),
    status: inv.statut === "PAYE" ? "paid" : inv.statut === "EN_RETARD" ? "overdue" : "pending",
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Factures</h1>
        <p className="text-muted-foreground">Suivi des paiements, des échéances et de la comptabilité Winall Tech.</p>
      </div>

      <DashboardEntityListCardClient variant="invoices" rows={invoices} />
    </div>
  );
}
