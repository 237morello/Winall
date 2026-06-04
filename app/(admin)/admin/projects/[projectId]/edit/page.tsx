import { AdminProjectForm } from "@/components/features/admin/projects/AdminProjectForm";
import { getProjectById } from "@/actions/project.actions";
import { AdminService } from "@/services/admin.service";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [project, users] = await Promise.all([
    getProjectById(projectId),
    AdminService.getAllUsers(),
  ]);

  if (!project) {
    notFound();
  }

  const clientOptions = users.map((user) => ({ id: user.id, name: user.name }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Gestion des projets</p>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modifier le projet</h1>
          <p className="text-muted-foreground">
            Mettez à jour les informations, le client et la visibilité de &quot;{project.titre}&quot;.
          </p>
        </div>
      </div>

      <AdminProjectForm initialData={project} projectId={projectId} users={clientOptions} />
    </div>
  );
}
