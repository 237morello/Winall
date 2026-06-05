"use client"

import { Users } from "lucide-react"
import { EntityListCard } from "../_components/model/entity-list-card"
import { CLIENTS_DATA } from "../_components/model/mock-data"

export default function ClientsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Clients</h1>
        <p className="text-muted-foreground">Gestion du portefeuille client et des contacts</p>
      </div>

      <EntityListCard
        title="Portefeuille Clients"
        description="Liste complete de vos clients avec recherche, filtres et pagination."
        icon={Users}
        rows={CLIENTS_DATA}
        searchPlaceholder="Rechercher un client, un contact ou une ville..."
        searchableText={(row) => `${row.id} ${row.name} ${row.contact} ${row.city}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "Reference", render: (row) => row.id },
          { key: "name", header: "Client", render: (row) => row.name },
          { key: "contact", header: "Contact", render: (row) => row.contact },
          { key: "city", header: "Ville", render: (row) => row.city },
          { key: "projects", header: "Projets", render: (row) => row.projects },
        ]}
      />
    </div>
  )
}
