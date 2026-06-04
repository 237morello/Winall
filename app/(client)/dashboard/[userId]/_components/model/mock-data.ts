import type {
  ClientEntity,
  DashboardSetting,
  InvoiceEntity,
  NotificationEntity,
  QuoteEntity,
} from "./types";

export const CLIENTS_DATA: ClientEntity[] = [
  { id: "CLI-001", name: "Villa Horizon", contact: "Julie Lambert", city: "Lyon", status: "active", projects: 2 },
  { id: "CLI-002", name: "Immeuble Central", contact: "Marc Duret", city: "Paris", status: "pending", projects: 1 },
  { id: "CLI-003", name: "Hotel Azur", contact: "Sonia Perez", city: "Nice", status: "active", projects: 3 },
  { id: "CLI-004", name: "Mairie de Lyon", contact: "Service Urbanisme", city: "Lyon", status: "prospect", projects: 0 },
  { id: "CLI-005", name: "Sogeprom", contact: "Paul Martin", city: "Lille", status: "active", projects: 4 },
];

export const QUOTES_DATA: QuoteEntity[] = [
  { id: "DEV-2401", client: "Villa Horizon", amount: 12450, dueDate: "2026-05-03", status: "pending" },
  { id: "DEV-2402", client: "Hotel Azur", amount: 8600, dueDate: "2026-04-29", status: "approved" },
  { id: "DEV-2403", client: "Mairie de Lyon", amount: 22300, dueDate: "2026-05-15", status: "sent" },
  { id: "DEV-2404", client: "Immeuble Central", amount: 17350, dueDate: "2026-05-07", status: "pending" },
];

export const INVOICES_DATA: InvoiceEntity[] = [
  { id: "FAC-9101", client: "Sogeprom", amount: 5300, dueDate: "2026-04-18", status: "paid" },
  { id: "FAC-9102", client: "Villa Horizon", amount: 7400, dueDate: "2026-04-28", status: "pending" },
  { id: "FAC-9103", client: "Immeuble Central", amount: 9120, dueDate: "2026-04-11", status: "overdue" },
  { id: "FAC-9104", client: "Hotel Azur", amount: 6600, dueDate: "2026-05-02", status: "pending" },
];

export const NOTIFICATIONS_DATA: NotificationEntity[] = [
  { id: "NTF-01", title: "Nouveau ticket support", source: "Client #429", createdAt: "2026-04-15 09:14", status: "warning" },
  { id: "NTF-02", title: "Validation devis recue", source: "Sogeprom", createdAt: "2026-04-15 08:02", status: "info" },
  { id: "NTF-03", title: "Facture en retard", source: "Immeuble Central", createdAt: "2026-04-14 17:41", status: "critical" },
  { id: "NTF-04", title: "Intervention confirmee", source: "Hotel Azur", createdAt: "2026-04-14 13:27", status: "info" },
];

export const SETTINGS_DATA: DashboardSetting[] = [
  {
    id: "set-notif-email",
    title: "Notifications email",
    description: "Recevoir les alertes critiques et les validations devis par email.",
    enabled: true,
  },
  {
    id: "set-notif-push",
    title: "Notifications push",
    description: "Recevoir les notifications en temps reel dans le dashboard.",
    enabled: true,
  },
  {
    id: "set-two-factor",
    title: "Double authentification",
    description: "Renforcer la securite du compte administrateur.",
    enabled: false,
  },
  {
    id: "set-weekly-report",
    title: "Rapport hebdomadaire",
    description: "Generer automatiquement un resume metier chaque semaine.",
    enabled: false,
  },
];
