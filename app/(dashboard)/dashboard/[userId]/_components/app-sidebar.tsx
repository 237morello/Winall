/**
 * Mission : Composant du dashboard : app-sidebar structure la barre latérale de navigation pour l'espace utilisateur.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  LogOut,
  Building2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSidebarItems } from "./sidebar-items";
import { cn } from "@/lib/utils";
import { RichTooltip } from "./rich-tooltip";
import { Button } from "@/components/ui/button";

export function AppSidebar({ userId }: { userId: string }) {
  const pathname = usePathname();
  const sidebarItems = getSidebarItems(userId);

  return (
    <Sidebar collapsible="none" className="w-[70px] border-r border-border/40 bg-card/40 backdrop-blur-md">
      {/* Header avec logo Winall uniquement */}
      <SidebarHeader className="py-6 px-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-xl bg-p text-white shadow-lg shadow-p/20 h-10 w-10">
          <Building2 className="h-6 w-6" />
        </div>
      </SidebarHeader>

      {/* Navigation avec icônes uniquement + Tooltips */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <RichTooltip
                    title={item.label}
                    description={item.description}
                    shortcut={item.shortcut}
                    side="right"
                    align="center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-10 w-10 mx-auto transition-all duration-200 justify-center p-0",
                        isActive 
                          ? "bg-p text-white hover:bg-p/90 shadow-md shadow-p/10" 
                          : "hover:bg-p/5 text-muted-foreground hover:text-p"
                      )}
                    >
                      <Link href={item.href} className="flex items-center justify-center">
                        <item.icon className={cn("size-5", isActive ? "text-white" : "transition-colors")} />
                      </Link>
                    </SidebarMenuButton>
                  </RichTooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer avec profil simplifié (Avatar uniquement) */}
      <SidebarFooter className="p-2 pt-4 border-t border-border/40 flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 rounded-lg overflow-hidden border border-border/50">
              <Avatar className="h-full w-full rounded-none">
                <AvatarImage src="/avatars/user.jpg" alt="Admin" />
                <AvatarFallback className="bg-p/10 text-p font-bold">W</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl p-2 shadow-xl border-border/50"
            side="right"
            sideOffset={12}
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Session {userId.slice(0, 5)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 opacity-50" />
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 focus:bg-p/5 focus:text-p">
              <User className="h-4 w-4" />
              <span>Profil Expert</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 focus:bg-p/5 focus:text-p">
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 opacity-50" />
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
