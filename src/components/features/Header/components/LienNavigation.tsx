"use client";

import Link from "next/link";
import { EnTeteLogique } from "../Header";
import type { LienNavigationHeader } from "../Header.types";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Typography } from "@/components/ui/typography";

/**
 * @description Affiche un lien de navigation stylisé de manière cohérente.
 *              Pour "Services" on affiche une HoverCard avec 3 blocs décrivant les services.
 */
export function LienNavigation({
  cheminActuel,
  lien,
}: {
  cheminActuel: string;
  lien: LienNavigationHeader;
}) {
  const estActif = EnTeteLogique.estLienActif(cheminActuel, lien.href);

  // Afficher une HoverCard pour le menu Services (3 blocs)
  if (lien.libelle === "Services") {
    const services = [
      {
        title: "Réseaux & Infrastructure",
        desc: "Conception, installation et maintenance des réseaux.",
        href: "/services/reseaux",
      },
      {
        title: "Sécurité & Vidéosurveillance",
        desc: "Solutions de vidéosurveillance et contrôle d'accès.",
        href: "/services/securite",
      },
      {
        title: "Électricité & BTP",
        desc: "Installations électriques et support BTP.",
        href: "/services/electricite",
      },
    ];

    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <span
            className={cn(EnTeteLogique.obtenirClassesLien(estActif), "cursor-pointer")}
            aria-current={estActif ? "page" : undefined}
          >
            {lien.libelle}
          </span>
        </HoverCardTrigger>

        <HoverCardContent side="bottom" align="start" sideOffset={12} className="w-[700px] p-2 bg-background/95 backdrop-blur-xl border-border/60 shadow-2xl rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-3 gap-2"
          >
            {services.map((s) => (
              <Link 
                key={s.href} 
                href={s.href}
                className="group relative flex flex-col justify-between rounded-xl p-4 transition-all duration-300 hover:bg-muted/50 border border-transparent hover:border-border/50"
              >
                <div className="space-y-2">
                  <Typography variant="h4" className="font-bold text-sm group-hover:text-primary transition-colors">
                    {s.title}
                  </Typography>
                  <Typography variant="p" className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {s.desc}
                  </Typography>
                </div>
                
                <div className="mt-4 flex items-center text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  En savoir plus
                  <motion.span
                    className="ml-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </Link>
            ))}
          </motion.div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Link
      href={lien.href}
      className={EnTeteLogique.obtenirClassesLien(estActif)}
      aria-current={estActif ? "page" : undefined}
    >
      {lien.libelle}
    </Link>
  );
}
