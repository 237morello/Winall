import { AdminService } from "@/services/admin.service";
import { AdminProjectForm } from "@/components/features/admin/projects/AdminProjectForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default async function NewProjectPage() {
  const users = await AdminService.getAllUsers();
  
  // On ne garde que les infos nécessaires pour le select
  const clientOptions = users.map((user) => ({ id: user.id, name: user.name }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm" className="w-fit px-0 text-muted-foreground hover:bg-transparent">
            <Link href="/admin/projects">
              <ArrowLeft className="size-4" />
              Retour aux projets
            </Link>
          </Button>
          <div className="space-y-1">
            <p className="flex items-center gap-2 text-sm font-medium text-primary">
              <Plus className="size-4" />
              Nouveau projet
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Créer un projet</h1>
            <p className="max-w-2xl text-muted-foreground">
              Enregistrez un chantier client ou une réalisation destinée au portfolio public de Winall Tech.
            </p>
          </div>
        </div>
      </div>

      <AdminProjectForm users={clientOptions} />
    </div>
  );
}
