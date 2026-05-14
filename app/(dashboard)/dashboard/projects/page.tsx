import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectsList } from "@/components/features/dashboard/projects/ProjectsList";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const utilisateur: UtilisateurTableauDeBord = {
    id: session.user.id,
    nom: session.user.name || "Client Winall",
    email: session.user.email || "expert@winall.tech",
    role: (session.user as { role?: string })?.role?.toLowerCase() as "client" | "admin" || "client",
  };

  return <ProjectsList utilisateur={utilisateur} />;
}
