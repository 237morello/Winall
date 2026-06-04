import { AdminService } from "@/services/admin.service";
import { AdminUsersTable } from "@/components/features/admin/users/AdminUsersTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await AdminService.getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes clients et les accès administrateurs.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/users/new">
            <Plus className="h-4 w-4" /> Nouvel Utilisateur
          </Link>
        </Button>
      </div>

      <AdminUsersTable users={users} />
    </div>
  );
}

