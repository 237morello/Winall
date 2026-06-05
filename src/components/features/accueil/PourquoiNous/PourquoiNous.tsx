"use client";

/**
 * @file PourquoiNous.tsx
 * @description Section "Pourquoi nous choisir" de la page d'accueil.
 * Suit le pattern Service + Composant défini dans GEMINI.md.
 */

import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { LISTE_AVANTAGES } from "./PourquoiNous.constants";
import { PourquoiNousProps, AvantageWinall } from "./PourquoiNous.types";
import { motion } from "motion/react";

/**
 * @class PourquoiNousLogique
 * @description Gère la logique métier de la section PourquoiNous.
 */
class PourquoiNousLogique {
  /**
   * Retourne la liste des avantages (fournie ou par défaut).
   */
  static obtenirAvantages(avantagesProposes?: AvantageWinall[]): AvantageWinall[] {
    return avantagesProposes || LISTE_AVANTAGES;
  }
}

/**
 * @component PourquoiNous
 * @description Affiche les points forts de Winall avec un design épuré et moderne.
 */
export const PourquoiNous = ({ avantages }: PourquoiNousProps) => {
  const listeAffiche = PourquoiNousLogique.obtenirAvantages(avantages);

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* En-tête de section */}
        <div className="mb-16 space-y-4 text-center">
          <Typography variant="h2" className="font-bold tracking-tight text-3xl md:text-4xl">
            Pourquoi nous choisir
          </Typography>
          <div className="mx-auto h-1 w-20 bg-primary/20 rounded-full" />
          <Typography variant="p" className="text-muted-foreground max-w-2xl mx-auto">
            Chez Winall Tech Sarl,{" "}
            <span className="font-semibold text-foreground">
              votre satisfaction est notre priorité
            </span>. Nous nous engageons à fournir une excellence technique sans compromis.
          </Typography>
        </div>

        {/* Grille des avantages */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {listeAffiche.map((item, index) => (
            <motion.div
              key={item.titre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-6 text-center"
            >
              <div className="relative flex h-48 w-full items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>

              <div className="space-y-2">
                <Typography variant="h4" className="text-xl font-bold">
                  {item.titre}
                </Typography>
                <Typography className="text-muted-foreground leading-relaxed">
                  {item.description}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
