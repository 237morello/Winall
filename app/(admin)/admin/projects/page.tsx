import { AdminService } from "@/services/admin.service";
import { AdminProjectsTable } from "@/components/features/admin/projects/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await AdminService.getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            Gestion des projets
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Administrez les chantiers et le portfolio de Winall Tech.
          </p>
        </div>

        <Button asChild className="w-fit gap-2">
          <Link href="/admin/projects/new">
            <Plus className="size-4" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      <AdminProjectsTable projects={projects} />
    </div>
  );
}
