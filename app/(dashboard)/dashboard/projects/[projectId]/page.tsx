import { ProjectDetail } from "@/components/features/dashboard/projects/ProjectDetail";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  
  return <ProjectDetail projectId={projectId} />;
}
