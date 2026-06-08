import { CheckCircle2, Clock3, Send, Wallet } from "lucide-react";
import { DashboardEntityListCardClient } from "@/components/features/dashboard/shared/DashboardEntityListCardClient";
import { UsageEventTracker } from "@/components/features/analytics/UsageEventTracker";
import { DashboardService } from "@/services/dashboard.service";
import { getFormRequests } from "@/actions/form.actions";
import type { QuoteEntity } from "@/types/dashboard.types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ComponentType } from "react";

/**
 * MISSION : Contrôleur Dashboard/Quotes — Gère la récupération des devis.
 */
export default async function QuotesPage() {
  const rawQuotes = await getFormRequests({ type: "DEVIS" });

  // Mapping des données Prisma vers le type QuoteEntity attendu par l'UI
  const quotes: QuoteEntity[] = rawQuotes.map((q) => {
    const donnees = q.donnees as { budgetEstimatif?: string };
    return {
      id: q.id.slice(-8).toUpperCase(), // On prend une partie de l'ID pour le look "référence"
      client: q.nom || "Client Winall",
      amount: donnees.budgetEstimatif ? parseInt(donnees.budgetEstimatif.replace(/[^0-9]/g, "")) : 0,
      dueDate: q.createdAt.toLocaleDateString("fr-FR"),
      status: q.statut === "NON_LU" ? "pending" : q.statut === "EN_TRAITEMENT" ? "sent" : "approved",
    };
  });

  const pendingCount = quotes.filter((quote) => quote.status === "pending").length;
  const sentCount = quotes.filter((quote) => quote.status === "sent").length;
  const approvedCount = quotes.filter((quote) => quote.status === "approved").length;
  const totalEstimatedAmount = quotes.reduce((sum, quote) => sum + quote.amount, 0);

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      <UsageEventTracker eventName="quote_opened" route="/dashboard/quotes" />

      <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit rounded-lg border-primary/30 bg-primary/5 text-primary">
            Espace commercial
          </Badge>
          <h1 className="text-3xl font-medium tracking-tight text-foreground">Devis</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Suivez les demandes de chiffrage, leur statut de traitement et les montants estimatifs transmis.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {quotes.length} demande{quotes.length > 1 ? "s" : ""} enregistrée{quotes.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuoteMetric icon={Clock3} label="En attente" value={`${pendingCount}`} />
        <QuoteMetric icon={Send} label="En traitement" value={`${sentCount}`} />
        <QuoteMetric icon={CheckCircle2} label="Validés" value={`${approvedCount}`} />
        <QuoteMetric icon={Wallet} label="Montant estimé" value={DashboardService.formatCurrency(totalEstimatedAmount)} />
      </div>

      <DashboardEntityListCardClient variant="quotes" rows={quotes} />
    </div>
  );
}

function QuoteMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-lg border-border/70 p-4 shadow-none">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-2xl font-medium">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}
