import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/features/admin-projects/project-form";
import { ProjectStepper } from "@/components/features/admin-projects/project-stepper";
import { modifierProjet } from "@/components/features/admin-projects/project-actions";

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) notFound();

  const modifierAvecId = modifierProjet.bind(null, projectId);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-4">
        <Link
          href="/admin/systeme/publisher"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour au catalogue
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Modifier « {project.titre} »</h1>
          <p className="text-sm text-muted-foreground">
            Mettez à jour les informations du projet.
          </p>
        </div>
        <ProjectStepper mode="edit" projectId={project.id} current="info" />
      </div>

      <ProjectForm
        action={modifierAvecId}
        submitLabel="Enregistrer les modifications"
        initial={{
          id: project.id,
          titre: project.titre,
          description: project.description,
          domaine: project.domaine,
          statut: project.statut,
          budget: project.budget,
          progression: project.progression,
          imageUrl: project.imageUrl,
          images: project.images,
          localisation: project.localisation,
          dateDebut: project.dateDebut,
          dateFin: project.dateFin,
        }}
      />
    </div>
  );
}
