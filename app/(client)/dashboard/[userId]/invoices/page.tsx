"use client"

import { Receipt } from "lucide-react"
import { EntityListCard } from "../_components/model/entity-list-card"
import { formatCurrency } from "../_components/model/list-helpers"
import { INVOICES_DATA } from "../_components/model/mock-data"

export default function InvoicesPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Factures</h1>
        <p className="text-muted-foreground">Suivi des paiements et facturation</p>
      </div>

      <EntityListCard
        title="Factures"
        description="Suivi des paiements, des echeances et des retards."
        icon={Receipt}
        rows={INVOICES_DATA}
        searchPlaceholder="Rechercher une facture ou un client..."
        searchableText={(row) => `${row.id} ${row.client}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Facture", render: (row) => row.id },
          { key: "client", header: "Client", render: (row) => row.client },
          { key: "amount", header: "Montant", render: (row) => formatCurrency(row.amount) },
          { key: "dueDate", header: "Echeance", render: (row) => row.dueDate },
        ]}
      />
    </div>
  )
}
