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

  // Définition de l'action mobile selon l'état de connexion
  const actionMobile = session?.user 
    ? { libelle: "Tableau de Bord", href: "/dashboard" }
    : ACTION_PRINCIPALE_HEADER;

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
          className="w-[86vw] max-w-sm border-l border-border/60 px-0"
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SheetHeader className="border-b border-border/60">
              <SheetTitle className="text-left">Navigation Winall</SheetTitle>
              <SheetDescription className="text-left">
                Accédez rapidement aux expertises et aux points de contact de
                l&apos;équipe.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-8 px-4 py-6">
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                          aria-current={
                            EnTeteLogique.estLienActif(cheminActuel, lien.href)
                              ? "page"
                              : undefined
                          }
                        >
                          {EnTeteLogique.estLienActif(
                            cheminActuel,
                            lien.href,
                          ) && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                          )}
                          <span className="relative z-10">{lien.libelle}</span>
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>
            </div>

            <motion.div
              className="border-t border-border/60 px-4 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <SheetClose asChild>
                  <Link
                    href={actionMobile.href}
                    className={buttonVariants({
                      className:
                        "h-11 w-full rounded-full transition-all duration-300 relative overflow-hidden group",
                    })}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <span className="relative z-10 font-bold">
                      {actionMobile.libelle}
                    </span>
                  </Link>
                </SheetClose>
              </motion.div>
            </motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
