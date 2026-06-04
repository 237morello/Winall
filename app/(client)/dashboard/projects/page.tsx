import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ProjectsList } from "@/components/features/dashboard/projects/ProjectsList";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { getProjects } from "@/actions/project.actions";
import { getDashboardStats } from "@/actions/dashboard.actions";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const utilisateur: UtilisateurTableauDeBord = {
    id: session?.user?.id || "guest-dev",
    nom: session?.user?.name || "Expert Winall",
    email: session?.user?.email || "expert@winall.tech",
    role: (session?.user as { role?: string })?.role?.toLowerCase() as "client" | "admin" || "client",
  };

  const [projets, stats] = await Promise.all([
    getProjects(),
    getDashboardStats(),
  ]);

  return <ProjectsList utilisateur={utilisateur} projets={projets} stats={stats} />;
}
