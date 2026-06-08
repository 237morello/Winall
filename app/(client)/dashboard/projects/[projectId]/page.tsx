import {
  ProjectDetail,
  type ProjectDetailData,
  type RelatedProjectData,
} from "@/components/features/dashboard/projects/ProjectDetail";
import { getFormRequests } from "@/actions/form.actions";
import { getProjectById, getRelatedProjectsByDomain } from "@/actions/project.actions";
import { UsageEventTracker } from "@/components/features/analytics/UsageEventTracker";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [project, relatedProjects, formRequests] = await Promise.all([
    getProjectById(projectId),
    getRelatedProjectsByDomain(projectId),
    getFormRequests().catch(() => []),
  ]);

  if (!project) {
    notFound();
  }

  const projectDetail: ProjectDetailData = {
    id: project.id,
    titre: project.titre,
    description: project.description,
    domaine: project.domaine,
    statut: project.statut,
    imageUrl: project.imageUrl,
    images: project.images,
    localisation: project.localisation,
    progression: project.progression,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    clientName: project.user?.name ?? null,
    commentsCount: project.comments.length,
    requests: formRequests
      .filter((request) => request.projectId === project.id)
      .map((request) => ({
        id: request.id,
        type: request.type,
        statut: request.statut,
        createdAt: request.createdAt.toISOString(),
      })),
  };

  const relatedProjectCards: RelatedProjectData[] = relatedProjects.map((relatedProject) => ({
    id: relatedProject.id,
    titre: relatedProject.titre,
    description: relatedProject.description,
    domaine: relatedProject.domaine,
    imageUrl: relatedProject.imageUrl,
  }));

  return (
    <>
      <UsageEventTracker
        eventName="project_viewed"
        route={`/dashboard/projects/${project.id}`}
        metadata={{ projectId: project.id, domaine: project.domaine }}
      />
      <ProjectDetail project={projectDetail} relatedProjects={relatedProjectCards} />
    </>
  );
}
