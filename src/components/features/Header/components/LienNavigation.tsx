"use client";

import Link from "next/link";
import { EnTeteLogique } from "../Header";
import type { LienNavigationHeader } from "../Header.types";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "motion/react";

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
      <HoverCard>
        <HoverCardTrigger>
          <span
            className={EnTeteLogique.obtenirClassesLien(estActif)}
            aria-current={estActif ? "page" : undefined}
          >
            {lien.libelle}
          </span>
        </HoverCardTrigger>

        <HoverCardContent side="bottom" align="start" sideOffset={8} className="!w-auto p-2">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {services.map((s) => (
              <Card key={s.href} className="w-64 hover:shadow-lg transition-shadow">
                <CardContent className="px-4 py-3">
                  <CardTitle className="font-semibold text-sm">{s.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{s.desc}</CardDescription>
                  <Link href={s.href} className="mt-3 inline-block text-sm text-foreground underline">
                    Voir
                  </Link>
                </CardContent>
              </Card>
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
