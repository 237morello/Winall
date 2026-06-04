"use client";

import { motion, AnimatePresence } from "motion/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ACTION_PRINCIPALE_HEADER,
  LIENS_NAVIGATION_HEADER,
} from "../Header.constants";
import { EnTeteLogique } from "../Header";
import { useSession } from "@/hooks/use-session";

/**
 * @component MobileMenuSheet
 * @description Menu mobile optimisé avec navigation et actions intégrées.
 */
export function MobileMenuSheet() {
  const cheminActuel = usePathname();
  const { data: session } = useSession();

  // Définition des actions mobiles selon l'état de connexion
  const actionsMobiles = session?.user 
    ? [{ id: 99, libelle: "Tableau de Bord", href: "/dashboard", variant: "default" as const }]
    : ACTION_PRINCIPALE_HEADER.map((a, i) => ({ 
        ...a, 
        variant: (i === 0 ? "outline" : "default") as "outline" | "default" 
      }));

  return (
    <motion.div
      className="flex items-center gap-2 lg:hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ThemeToggle />
      </motion.div>

      <Sheet>
        <SheetTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300"
              aria-label="Ouvrir le menu principal"
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Menu className="size-5" />
              </motion.div>
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[86vw] max-w-sm border-l border-border/60 px-0 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            <SheetHeader className="border-b border-border/60 px-4">
              <SheetTitle className="text-left">Navigation Winall</SheetTitle>
              <SheetDescription className="text-left">
                Accédez rapidement aux expertises et aux points de contact de
                l&apos;équipe.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                <AnimatePresence>
                  {LIENS_NAVIGATION_HEADER.map((lien, index) => (
                    <motion.div
                      key={lien.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={lien.href}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm transition-all duration-300 block relative overflow-hidden",
                            EnTeteLogique.estLienActif(cheminActuel, lien.href)
                              ? "border-foreground bg-foreground text-background"
                              : "border-border/70 bg-background text-foreground hover:bg-muted",
                          )}
                        >
                          <span className="relative z-10">{lien.libelle}</span>
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>
            </div>

            <motion.div
              className="border-t border-border/60 px-4 py-6 mt-auto flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
            >
              {actionsMobiles.map((action) => (
                <motion.div
                  key={action.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <SheetClose asChild>
                    <Link
                      href={action.href}
                      className={buttonVariants({
                        variant: action.variant,
                        className:
                          "h-11 w-full rounded-full transition-all duration-300 relative overflow-hidden group",
                      })}
                    >
                      <span className="relative z-10 font-bold">
                        {action.libelle}
                      </span>
                    </Link>
                  </SheetClose>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
