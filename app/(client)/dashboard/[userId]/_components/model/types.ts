export type BusinessStatus =
  | "active"
  | "prospect"
  | "pending"
  | "approved"
  | "sent"
  | "paid"
  | "overdue"
  | "info"
  | "warning"
  | "critical";

export interface ClientEntity {
  id: string;
  name: string;
  contact: string;
  city: string;
  status: "active" | "prospect" | "pending";
  projects: number;
}

export interface QuoteEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "pending" | "approved" | "sent";
}

export interface InvoiceEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

export interface NotificationEntity {
  id: string;
  title: string;
  source: string;
  createdAt: string;
  status: "info" | "warning" | "critical";
}

export interface DashboardSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
