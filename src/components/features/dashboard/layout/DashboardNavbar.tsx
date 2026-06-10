"use client";

import {
  Bell,
  CreditCard,
  HelpCircle,
  Languages,
  LogOut,
  MoonStar,
  Settings,
  ShieldCheck,
  SunMedium,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { CurrentUser } from "@/lib/current-user";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { DashboardGlobalSearch } from "../overview/DashboardGlobalSearch";

interface DashboardNavbarProps {
  user?: CurrentUser | null;
  siteName?: string;
  area?: "admin" | "client";
}

const FALLBACK_AVATAR = "/images/profile-avatar.png";

function getInitials(user?: CurrentUser | null) {
  const source = user?.name || user?.email || "Winall Tech";
  return source
    .split(/[.\s@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "WT";
}

export function DashboardNavbar({
  user,
  siteName = "Winall Tech SARL",
  area = "client",
}: DashboardNavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const displayName = user?.name || (area === "admin" ? "Admin Winall" : "Client Winall");
  const email = user?.email || "contact@winall.tech";
  const avatarSrc = user?.image || FALLBACK_AVATAR;
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="relative flex h-16 items-center gap-3 px-4 md:h-20 md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <SidebarTrigger className="size-9 rounded-lg border border-border/60 md:size-8" />

          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-none text-foreground md:text-base">
              {siteName}
            </p>
            <div className="mt-1 hidden md:block">
              <DashboardBreadcrumbs />
            </div>
          </div>
        </div>

        {area === "client" ? (
          <DashboardGlobalSearch
            variant="navbar"
            placeholder="Rechercher un projet..."
            className="absolute left-1/2 top-1/2 mx-0 hidden w-[min(38vw,520px)] -translate-x-1/2 -translate-y-1/2 md:block"
          />
        ) : null}

        <div className="flex flex-1 shrink-0 items-center justify-end gap-1.5 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative size-9 rounded-lg border border-border/60 hover:bg-primary/10 hover:text-primary"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg border border-border/60 hover:bg-primary/10 hover:text-primary"
            aria-label="Basculer le thème"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-lg border border-border/60 px-2 hover:bg-primary/10"
                aria-label="Menu profil"
              >
                <Avatar className="size-7">
                  <AvatarImage src={avatarSrc} alt={displayName} />
                  <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                    {getInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm font-medium md:block">
                  {displayName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-72 rounded-lg border-border/60 p-2 shadow-xl"
            >
              <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={avatarSrc} alt={displayName} />
                    <AvatarFallback className="bg-primary/10 font-bold text-primary">
                      {getInitials(user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{displayName}</p>
                    <p className="truncate text-xs text-muted-foreground">{email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-1">
                <DropdownMenuItem className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary">
                  <ShieldCheck className="size-4" />
                  <span>{area === "admin" ? "Console administrateur" : "Espace client"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary">
                  <Settings className="size-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary">
                  {area === "admin" ? <User className="size-4" /> : <CreditCard className="size-4" />}
                  <span>{area === "admin" ? "Profil" : "Facturation"}</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <DropdownMenuItem className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary">
                  <Languages className="size-4" />
                  <span>Langue</span>
                  <span className="ml-auto text-xs text-muted-foreground">FR</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
                  <span>Thème</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {isDark ? "Sombre" : "Clair"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-md gap-3 py-2 focus:bg-primary/10 focus:text-primary">
                  <HelpCircle className="size-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-1">
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer rounded-md gap-3 py-2"
                >
                  <LogOut className="size-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
