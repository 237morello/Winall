"use client"

import { Bell } from "lucide-react"
import { EntityListCard } from "../_components/model/entity-list-card"
import { NOTIFICATIONS_DATA } from "../_components/model/mock-data"

export default function NotificationsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications</h1>
        <p className="text-muted-foreground">Alertes et mises à jour</p>
      </div>

      <EntityListCard
        title="Notifications Recentes"
        description="Consolide les notifications operationnelles et critiques."
        icon={Bell}
        rows={NOTIFICATIONS_DATA}
        searchPlaceholder="Rechercher une notification ou une source..."
        searchableText={(row) => `${row.id} ${row.title} ${row.source}`}
        statusAccessor={(row) => row.status}
        columns={[
          { key: "id", header: "ID", render: (row) => row.id },
          { key: "title", header: "Titre", render: (row) => row.title },
          { key: "source", header: "Source", render: (row) => row.source },
          { key: "createdAt", header: "Date", render: (row) => row.createdAt },
        ]}
      />
    </div>
  )
}
