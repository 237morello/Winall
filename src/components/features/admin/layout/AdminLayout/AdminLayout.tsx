import { AdminLayoutProps } from "./AdminLayout.types";
import { AdminSidebar } from "../AdminSidebar";
import { DashboardNavbar } from "@/components/features/dashboard/layout/DashboardNavbar";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminRouteTabs } from "../components/tabss/AdminRouteTabs";

/**
 * AdminLayout - Layout spécifique pour l'espace d'administration Winall.
 * Intègre la sidebar flottante de 52px et une zone de contenu "Flat UI".
 */
export function AdminLayout({ children, user }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-100 dark:bg-background/95">
        <AdminSidebar user={user} />

        <SidebarInset className="flex flex-1 flex-col">
          <DashboardNavbar user={user} siteName="Winall Tech SARL" area="admin" />

          <div className="max-w-8xl max-auto">
            <main
              className={cn(
                "flex-1 p-4 md:p-6 transition-all duration-300",
                "m-2 md:m-2 bg-background overflow-auto",
              )}
            >
              <div className="space-y-6">
                 <AdminRouteTabs />
                {children}
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
