import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ProjectsList } from "@/components/features/dashboard/projects/ProjectsList";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { getProjects } from "@/actions/project.actions";
import { getDashboardStats } from "@/actions/dashboard.actions";
import { isProjectDomainValue } from "@/components/features/dashboard/domain-options";

type ProjectsPageProps = {
  searchParams?: Promise<{
    domaine?: string | string[];
    q?: string | string[];
  }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = (await searchParams) ?? {};
  const rawDomain = Array.isArray(params.domaine) ? params.domaine[0] : params.domaine;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const selectedDomain = isProjectDomainValue(rawDomain) ? rawDomain : null;
  const query = rawQuery?.trim() || "";

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
    getProjects({ q: query, domaine: selectedDomain }),
    getDashboardStats(),
  ]);

  return (
    <ProjectsList
      utilisateur={utilisateur}
      projets={projets}
      stats={stats}
      selectedDomain={selectedDomain}
      query={query}
    />
  );
}
