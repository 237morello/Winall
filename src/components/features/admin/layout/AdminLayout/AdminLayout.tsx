import { AdminLayoutProps } from "./AdminLayout.types";
import { AdminSidebar } from "../AdminSidebar";
import { DashboardNavbar } from "@/components/features/dashboard/layout/DashboardNavbar";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * AdminLayout - Layout spécifique pour l'espace d'administration Winall.
 * Intègre la sidebar flottante de 52px et une zone de contenu "Flat UI".
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50 dark:bg-background/95">
        <AdminSidebar />
        
        <SidebarInset className="flex flex-1 flex-col pl-[52px]">
          <DashboardNavbar />
          
          <main className={cn(
            "flex-1 p-4 md:p-8 transition-all duration-300",
            "m-2 md:m-4 rounded-2xl border border-border/50 bg-background overflow-auto"
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
