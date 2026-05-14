/**
 * MISSION : Composant Dashboard — AppSidebar structure la navigation latérale.
 * Design Premium : Compact, aligné à gauche, pied de sidebar avec Switch Admin.
 */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Settings,
  User,
  LogOut,
  Building2,
  Bell,
  MoonStar,
  SunMedium,
  MoreHorizontal,
  ShieldCheck,
  UserCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardService } from "@/services/dashboard.service";
import type { UtilisateurTableauDeBord } from "@/types/dashboard.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AppSidebar({ utilisateur }: { utilisateur: UtilisateurTableauDeBord }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = DashboardService.obtenirNavigation(utilisateur);
  const isDark = mounted && resolvedTheme === "dark";
  const estAdmin = utilisateur.role === "admin";
  const estEnVueAdmin = pathname.startsWith("/admin");

  return (
    <Sidebar 
      collapsible="none" 
      className={cn(
        "z-50 transition-all duration-300 border-r border-border/50 bg-background h-screen",
        !isMobile && "w-64"
      )}
    >
      {/* Header : Logo Winall */}
      <SidebarHeader className="py-6 px-4">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground h-10 w-10 shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            <Building2 className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg tracking-tight">Winall Tech</span>
        </Link>
      </SidebarHeader>

      {/* Navigation Principale */}
      <SidebarContent className="px-3 py-2">
        <SidebarMenu className="gap-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.identifiant}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "transition-all duration-200 h-11 px-3 rounded-lg flex items-center gap-3",
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <Link href={item.href}>
                    <item.icone className={cn("shrink-0 size-5")} />
                    <span className="text-sm">{item.libelle}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer : Notifications, Thème et Menu Utilisateur */}
      <SidebarFooter className="p-4 border-t border-border/20">
        <div className="flex items-center justify-between gap-2">
          {/* Groupe de gauche : Notifs et Thème */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-primary"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </Button>
          </div>

          {/* Groupe de droite : Menu Utilisateur (3 points) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-muted-foreground hover:text-primary">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 rounded-xl p-2 shadow-2xl border-border/50 bg-card/95 backdrop-blur-xl"
              side={isMobile ? "bottom" : "right"}
              sideOffset={12}
              align="end"
            >
              <DropdownMenuLabel className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border/50">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {DashboardService.obtenirInitiales(utilisateur)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-bold leading-none truncate max-w-[150px]">{utilisateur.nom}</p>
                    <p className="text-[10px] leading-none text-muted-foreground truncate max-w-[150px]">{utilisateur.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator className="opacity-50" />
              
              {/* SWITCH ADMIN / CLIENT */}
              {estAdmin && (
                <>
                  <DropdownMenuItem 
                    className={cn(
                      "rounded-lg py-2.5 cursor-pointer gap-3 focus:bg-primary/10 focus:text-primary",
                      estEnVueAdmin && "bg-primary/5 text-primary font-medium"
                    )}
                    onClick={() => router.push(estEnVueAdmin ? "/dashboard" : "/admin")}
                  >
                    {estEnVueAdmin ? (
                      <>
                        <UserCircle className="h-4 w-4" />
                        <span className="text-sm">Retour Vue Client</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-semibold">Passer en Vue Admin</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="opacity-50" />
                </>
              )}

              <DropdownMenuItem className="rounded-lg py-2.5 cursor-pointer gap-3 focus:bg-primary/10 focus:text-primary" onClick={() => router.push("/dashboard/settings")}>
                <User className="h-4 w-4" />
                <span className="font-medium text-sm">Mon Profil</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="opacity-50" />
              
              <DropdownMenuItem className="rounded-lg py-2.5 cursor-pointer gap-3 text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut className="h-4 w-4" />
                <span className="font-medium text-sm">Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
