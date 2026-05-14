"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardNavbar } from "./DashboardNavbar";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { playSound } from "@/lib/sounds";

interface DashboardLayoutProps {
  utilisateur: UtilisateurTableauDeBord;
  children: React.ReactNode;
}

export function DashboardLayout({ utilisateur, children }: DashboardLayoutProps) {
  const supabase = createClient();

  // --- ÉCOUTEUR GLOBAL DE NOTIFICATIONS ---
  useEffect(() => {
    const channel = supabase
      .channel(`notifs-${utilisateur.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notification",
          filter: `userId=eq.${utilisateur.id}`,
        },
        () => {
          playSound("notification");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [utilisateur.id, supabase]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background/95">
        {/* Sidebar flottante (Desktop) / Tiroir (Mobile) */}
        <AppSidebar utilisateur={utilisateur} />
        
        {/* Contenu principal décalé pour l'effet flottant */}
        <SidebarInset className="flex flex-col bg-transparent">
          <DashboardNavbar />
          <main className="flex-1 p-4 md:p-8 md:pt-4">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
