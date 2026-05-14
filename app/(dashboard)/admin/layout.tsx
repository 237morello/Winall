import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/features/dashboard";
import { auth } from "@/lib/auth";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

export default async function AdminLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const utilisateur: UtilisateurTableauDeBord = {
    id: session.user.id,
    nom: session.user.name || "Admin Winall",
    email: session.user.email || "admin@winall.tech",
    role: (session.user as { role?: string })?.role?.toLowerCase() as "client" | "admin" || "client",
  };

  // Sécurité : Seul un admin peut accéder à cette route
  if (utilisateur.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout utilisateur={utilisateur}>
      {children}
    </DashboardLayout>
  );
}
