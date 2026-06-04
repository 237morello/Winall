import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/features/admin/layout/AdminLayout";
import { getCurrentUser } from "@/lib/current-user";

/**
 * Layout principal de l'espace Admin.
 * Gère la protection des routes et l'injection du layout "Business".
 */
export default async function AdminRootLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/log-in");
  }

  // Sécurité : Seul un admin peut accéder à cette route
  if (user.role !== "ADMIN") {
    // Si c'est un client, on le renvoie vers son dashboard
    redirect(`/dashboard/${user.id}`);
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
