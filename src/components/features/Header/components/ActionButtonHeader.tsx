"use client";

import { motion } from "motion/react";
import { MoveRight, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ACTION_PRINCIPALE_HEADER } from "../Header.constants";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/**
 * @component ActionButtonHeader
 * @description Bouton d'action principal du header avec gestion d'authentification.
 */
export function ActionButtonHeader() {
  const { data: session, isLoading } = useSession();

  // 1. État de chargement (subtil)
  if (isLoading) {
    return (
      <div className="size-9 rounded-full bg-muted animate-pulse" />
    );
  }

  // 2. Utilisateur connecté : Affichage de l'Avatar + Dropdown Menu
  if (session?.user) {
    const initiales = session.user.name?.substring(0, 2).toUpperCase() || "U";

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-10 rounded-full p-0 overflow-hidden hover:bg-transparent">
              <Avatar className="size-10 border border-border/50 transition-transform hover:scale-105">
                <AvatarFallback className="bg-orange-500 text-white font-bold text-xs">
                  {initiales}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 mt-2">
            <div className="px-2 py-1.5 mb-2">
              <p className="text-sm font-bold truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-2 w-full">
                <LayoutDashboard className="size-4" />
                <span>Tableau de Bord</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 flex items-center gap-2"
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
            >
              <LogOut className="size-4" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  // 3. Utilisateur non connecté : Boutons Connexion et Inscription
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="flex items-center gap-3"
    >
      {ACTION_PRINCIPALE_HEADER.map((action) => (
        <motion.div
          key={action.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Button
            asChild
            variant={action.id === 0 ? "outline" : "p"}
            className={cn(
              "rounded-full px-5 group relative overflow-hidden",
              action.id === 1 && "shadow-lg shadow-primary/20"
            )}
          >
            <Link href={action.href}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className="relative z-10 font-medium">
                {action.libelle}
              </span>
              {action.id === 1 && (
                <motion.div
                  className="inline-flex ml-2"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <MoveRight className="size-4" />
                </motion.div>
              )}
            </Link>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
