import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { DashboardNavbar } from "./_components/dashboard-navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Layout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <SidebarProvider defaultOpen={false}>
      <TooltipProvider delayDuration={300}>
        <div className="flex min-h-screen w-full bg-p/5">
          <AppSidebar userId={userId} />
          <SidebarInset className="bg-transparent">
            <DashboardNavbar />
            <main className="flex-1 space-y-4 p-4 pt-0">
              {children}
            </main>
          </SidebarInset>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}
