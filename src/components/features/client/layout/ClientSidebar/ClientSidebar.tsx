"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, MoreHorizontal, Settings, SunMedium, User } from "lucide-react";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebarCompact,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { CLIENT_SIDEBAR_LINKS } from "./ClientSidebar.constants";
import { ClientSidebarProps } from "./ClientSidebar.types";

const FALLBACK_AVATAR = "/images/profile-avatar.png";

function initials(name?: string | null, email?: string | null) {
  const source = name || email || "Winall Tech";
  return source
    .split(/[.\s@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "WT";
}

export function ClientSidebar({ className, user, userId }: ClientSidebarProps) {
  const pathname = usePathname();
  const { isCompact, showText } = useSidebarCompact();
  const displayName = user?.name || "Client Winall";
  const email = user?.email || "contact@winall.tech";
  const avatarSrc = user?.image || FALLBACK_AVATAR;

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className={cn("z-50 [&_[data-sidebar=sidebar]]:bg-zinc-950 [&_[data-sidebar=sidebar]]:text-white [&_[data-sidebar=sidebar]]:border-white/10", className)}
    >
      <SidebarHeader className={cn(isCompact ? "items-center px-2 py-4" : "px-3 py-4")}>
        <Link
          href="/dashboard"
          aria-label="Accueil client Winall Tech"
          className={cn(
            "flex h-12 items-center rounded-lg outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary",
            isCompact ? "size-11 justify-center gap-0 px-0" : "w-full justify-start gap-3 px-2",
          )}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white">
            <Image
              src="/images/iconlogo.png"
              alt="Logo Winall"
              width={30}
              height={24}
              priority
              className="h-auto w-7 object-contain"
            />
          </span>
          {showText ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold leading-tight">Winall Tech</span>
              <span className="block truncate text-xs text-white/55">Espace client</span>
            </span>
          ) : null}
        </Link>
      </SidebarHeader>

      <SidebarContent className={cn(isCompact ? "items-center px-2" : "px-2")}>
        <SidebarGroup className={cn(isCompact && "items-center p-0")}>
          <SidebarGroupContent className={cn(isCompact && "w-auto")}>
            <SidebarMenu className="gap-1.5">
              {CLIENT_SIDEBAR_LINKS(userId).map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(`${link.href}/`));

                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      tooltip={link.label}
                      isActive={isActive}
                      className={cn(
                        "h-11 rounded-lg text-white/70 hover:bg-white/10 hover:text-white",
                        isCompact ? "size-11! justify-center gap-0 px-0! py-0!" : "w-full justify-start gap-3 px-2",
                        "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm data-[active=true]:shadow-primary/20",
                      )}
                    >
                      <Link href={link.href}>
                        <Icon className="size-[18px]" />
                        {showText ? <span>{link.label}</span> : null}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-white/10" />

      <SidebarFooter className={cn(isCompact ? "items-center p-2" : "p-3")}>
        <div className={cn("grid gap-1", isCompact ? "grid-cols-1 justify-items-center" : "grid-cols-3")}>
          <Button variant="ghost" size="icon" className="size-9 rounded-lg text-white/60 hover:bg-white/10 hover:text-white" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-9 rounded-lg text-white/60 hover:bg-white/10 hover:text-white" aria-label="Thème">
            <SunMedium className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-lg text-white/60 hover:bg-white/10 hover:text-white" aria-label="Plus">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" sideOffset={12} className="w-56 rounded-lg">
              <DropdownMenuLabel>Winall Tech SARL</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Settings className="size-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <User className="size-4" />
                Profil client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "mt-2 h-12 rounded-lg text-white/72 hover:bg-white/10 hover:text-white",
                isCompact ? "size-11 justify-center gap-0 p-0" : "w-full justify-start gap-3 px-2",
              )}
            >
              <Avatar className="size-8">
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback className="bg-primary/20 text-xs font-bold text-primary">
                  {initials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              {showText ? (
                <span className="min-w-0 text-left">
                  <span className="block truncate text-sm font-semibold">{displayName}</span>
                  <span className="block truncate text-xs text-white/45">{email}</span>
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" sideOffset={12} className="w-64 rounded-lg">
            <DropdownMenuLabel className="font-normal">
              <p className="truncate text-sm font-bold">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="size-4" />
              Profil client
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="size-4" />
              Paramètres
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
