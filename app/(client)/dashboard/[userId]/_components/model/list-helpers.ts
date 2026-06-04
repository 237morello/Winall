import type { BusinessStatus } from "./types";

export function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(value);
}

export function statusLabel(status: BusinessStatus): string {
  const labels: Record<BusinessStatus, string> = {
    active: "Actif",
    prospect: "Prospect",
    pending: "En attente",
    approved: "Approuvé",
    sent: "Envoyé",
    paid: "Payé",
    overdue: "En retard",
    info: "Info",
    warning: "Alerte",
    critical: "Critique",
  };
  return labels[status];
}

export function statusVariant(status: BusinessStatus): "default" | "secondary" | "destructive" | "outline" {
  if (status === "critical" || status === "overdue") return "destructive";
  if (status === "pending" || status === "warning") return "secondary";
  if (status === "active" || status === "approved" || status === "paid") return "default";
  return "outline";
}
