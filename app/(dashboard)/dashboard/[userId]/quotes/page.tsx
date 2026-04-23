"use client"

import { FileText } from "lucide-react"
import { EntityListCard } from "../_components/model/entity-list-card"
import { formatCurrency } from "../_components/model/list-helpers"
import { QUOTES_DATA } from "../_components/model/mock-data"

export default function QuotesPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Devis</h1>
        <p className="text-muted-foreground">Gestion des propositions commerciales</p>
      </div>

      <EntityListCard
        title="Devis Actifs"
        description="Suivi des devis en cours avec statut de validation."
        icon={FileText}
        rows={QUOTES_DATA}
        searchPlaceholder="Rechercher un devis ou un client..."
        searchableText={(row) => `${row.id} ${row.client}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Devis", render: (row) => row.id },
          { key: "client", header: "Client", render: (row) => row.client },
          { key: "amount", header: "Montant", render: (row) => formatCurrency(row.amount) },
          { key: "dueDate", header: "Echeance", render: (row) => row.dueDate },
        ]}
      />
    </div>
  )
}
