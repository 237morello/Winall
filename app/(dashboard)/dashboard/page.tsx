import { headers } from "next/headers";
import { DashboardOverview } from "@/components/features/dashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

export default async function DashboardPage() {
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

  if (utilisateur.role === "admin") {
    redirect(`/admin`);
  }

  return <DashboardOverview utilisateur={utilisateur} />;
}
