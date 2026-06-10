import { ClientLayoutProps } from "./ClientLayout.types";
import { ClientSidebar } from "../ClientSidebar";
import { DashboardNavbar } from "../../../dashboard/layout/DashboardNavbar";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * ClientLayout - Layout spécifique pour l'espace client.
 * Priorise l'expérience utilisateur et la fluidité.
 */
export function ClientLayout({ children, user, userId }: ClientLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-100 dark:bg-background/95">
        <ClientSidebar user={user} userId={userId} />
        
        <SidebarInset className="flex flex-1 flex-col">
          <DashboardNavbar user={user} siteName="Winall Tech SARL" area="client" />
          
          <main className={cn(
            "flex-1 p-4 md:p-8 transition-all duration-300",
            "m-2 md:m-4 rounded-xl border border-border/50 bg-background overflow-auto"
          )}>
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
