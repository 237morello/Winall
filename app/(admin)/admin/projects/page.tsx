import { AdminService } from "@/services/admin.service";
import { AdminProjectsTable } from "@/components/features/admin/projects/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await AdminService.getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Projets</h1>
          <p className="text-muted-foreground">
            Administrez les chantiers et le portfolio de Winall Tech.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" /> Nouveau Projet
          </Link>
        </Button>
      </div>

      <AdminProjectsTable projects={projects} />
    </div>
  );
}
