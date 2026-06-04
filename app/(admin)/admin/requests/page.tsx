import { AdminService } from "@/services/admin.service";
import { AdminRequestsTable } from "@/components/features/admin/requests/AdminRequestsTable";

export default async function AdminRequestsPage() {
  const requests = await AdminService.getAllRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Traitement des Demandes</h1>
        <p className="text-muted-foreground">
          Gérez les devis, interventions et prises de contact des clients.
        </p>
      </div>

      <AdminRequestsTable requests={requests} />
    </div>
  );
}
