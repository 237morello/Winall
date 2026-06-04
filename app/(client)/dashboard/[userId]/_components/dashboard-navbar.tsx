/**
 * Mission : Composant du dashboard : dashboard-navbar structure l'affichage et les interactions de l'espace utilisateur.
 */
"use client"

import { Search, Bell, User, Settings, LogOut, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs"
import { ThemeToggle } from "@/components/features/theme-toggle"

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <DashboardBreadcrumbs />
        </div>

        <div className="flex-1" />

        {/* Action Bar */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Senior Style */}
          <div className="hidden lg:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              placeholder="Recherche rapide..."
              className="pl-10 w-[240px] lg:w-[320px] bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/50 transition-all rounded-full"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground select-none pointer-events-none">
              <Command className="h-2.5 w-2.5" /> K
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-p/10 hover:text-p transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-p opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-p"></span>
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50 p-0 hover:ring-2 hover:ring-p/20 transition-all">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="/avatars/user.jpg" alt="Admin" />
                    <AvatarFallback className="bg-p/10 text-p text-xs font-bold">AW</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 rounded-xl shadow-2xl border-border/50" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-bold leading-none">Admin Winall</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@winall.tech
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 focus:bg-p/5 focus:text-p">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Mon Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 focus:bg-p/5 focus:text-p">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Paramètres</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Déconnexion</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
