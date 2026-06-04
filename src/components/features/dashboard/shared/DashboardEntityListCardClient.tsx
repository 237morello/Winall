/**
 * MISSION : Wrapper client pour configurer les listes dashboard sans props non sérialisables côté serveur.
 */
"use client";

import { FileText, Receipt, Users } from "lucide-react";

import { EntityListCard, type ListColumn } from "./EntityListCard";
import { DashboardService } from "@/services/dashboard.service";
import type {
  ClientEntity,
  InvoiceEntity,
  QuoteEntity,
} from "@/types/dashboard.types";

type DashboardEntityListCardClientProps =
  | {
      variant: "clients";
      rows: ClientEntity[];
    }
  | {
      variant: "invoices";
      rows: InvoiceEntity[];
    }
  | {
      variant: "quotes";
      rows: QuoteEntity[];
    };

export function DashboardEntityListCardClient({
  variant,
  rows,
}: DashboardEntityListCardClientProps) {
  if (variant === "clients") {
    const columns: Array<ListColumn<ClientEntity>> = [
      { key: "id", header: "Référence", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
      { key: "name", header: "Client", render: (row) => <span className="font-bold">{row.name}</span> },
      { key: "contact", header: "Contact", render: (row) => row.contact },
      { key: "city", header: "Ville", render: (row) => row.city },
      {
        key: "projects",
        header: "Projets",
        render: (row) => (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-p/10 text-p text-[10px] font-bold">
            {row.projects}
          </span>
        ),
      },
    ];

    return (
      <EntityListCard<ClientEntity>
        title="Portefeuille Clients"
        description="Liste complète de vos clients avec recherche, filtres et pagination."
        icon={Users}
        rows={rows}
        searchPlaceholder="Rechercher un client, un contact ou une ville..."
        searchableText={(row) => `${row.id} ${row.name} ${row.contact} ${row.city}`}
        statusAccessor={(row) => row.status}
        columns={columns}
      />
    );
  }

  if (variant === "invoices") {
    const columns: Array<ListColumn<InvoiceEntity>> = [
      { key: "id", header: "Facture", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
      { key: "client", header: "Client", render: (row) => <span className="font-bold">{row.client}</span> },
      {
        key: "amount",
        header: "Montant",
        render: (row) => <span className="font-semibold text-p">{DashboardService.formatCurrency(row.amount)}</span>,
      },
      { key: "dueDate", header: "Échéance", render: (row) => row.dueDate },
    ];

    return (
      <EntityListCard<InvoiceEntity>
        title="Journal des Factures"
        description="Suivi des paiements, des échéances et des retards."
        icon={Receipt}
        rows={rows}
        searchPlaceholder="Rechercher une facture ou un client..."
        searchableText={(row) => `${row.id} ${row.client}`}
        statusAccessor={(row) => row.status}
        columns={columns}
      />
    );
  }

  const columns: Array<ListColumn<QuoteEntity>> = [
    { key: "id", header: "Référence", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
    { key: "client", header: "Client", render: (row) => <span className="font-bold">{row.client}</span> },
    {
      key: "amount",
      header: "Montant",
      render: (row) => <span className="font-semibold text-p">{DashboardService.formatCurrency(row.amount)}</span>,
    },
    { key: "dueDate", header: "Échéance", render: (row) => row.dueDate },
  ];

  return (
    <EntityListCard<QuoteEntity>
      title="Devis Actifs"
      description="Suivi des devis en cours avec statut de validation."
      icon={FileText}
      rows={rows}
      searchPlaceholder="Rechercher un devis ou un client..."
      searchableText={(row) => `${row.id} ${row.client}`}
      statusAccessor={(row) => row.status}
      columns={columns}
    />
  );
}
