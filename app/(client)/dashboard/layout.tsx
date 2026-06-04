import { ClientLayout } from "@/components/features/client/layout/ClientLayout";
import { getCurrentUser } from "@/lib/current-user";

/**
 * Layout principal de l'espace Client.
 * Gère la protection des routes et l'injection du layout "Expérience".
 */
export default async function ClientRootLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Pour le développement : on permet l'accès sans session
  const userId = user?.id || "guest-dev";

  // On injecte le layout client avec l'ID de l'utilisateur pour la sidebar
  return (
    <ClientLayout userId={userId}>
      {children}
    </ClientLayout>
  );
}
