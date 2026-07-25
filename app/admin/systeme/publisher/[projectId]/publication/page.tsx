import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PublicationPanel } from "@/components/features/admin-projects/publication-panel";
import { ProjectStepper } from "@/components/features/admin-projects/project-stepper";

export default async function ProjectPublicationPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      titre: true,
      isPublished: true,
      publishedAt: true,
      placements: {
        select: { zone: true, subServiceSlug: true, ordre: true },
      },
    },
  });

  if (!project) notFound();

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
        <h1 className="text-2xl font-semibold">
          Publication — « {project.titre} »
        </h1>
        <ProjectStepper mode="edit" projectId={project.id} current="publication" />
      </div>

      <PublicationPanel
        projectId={project.id}
        isPublished={project.isPublished}
        publishedAt={project.publishedAt?.toISOString() ?? null}
        placements={project.placements}
      />
    </div>
  );
}
