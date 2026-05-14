import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/features/dashboard";
import { auth } from "@/lib/auth";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";

export default async function Layout({ 
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
    nom: session.user.name || "Client Winall",
    email: session.user.email || "expert@winall.tech",
    role: (session.user as { role?: string })?.role?.toLowerCase() as "client" | "admin" || "client",
  };

  return (
    <DashboardLayout utilisateur={utilisateur}>
      {children}
    </DashboardLayout>
  );
}
