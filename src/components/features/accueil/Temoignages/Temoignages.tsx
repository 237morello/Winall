"use client";

import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { LISTE_TEMOIGNAGES } from "./Temoignages.constants";
import { TemoignagesProps } from "./Temoignages.types";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { CarouselTemoignages } from "./CarouselTemoignages";

export const Temoignages = ({
  temoignages = LISTE_TEMOIGNAGES,
}: TemoignagesProps) => {
  return (
    <section className="w-full py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Ce que nos clients disent
          </Typography>
          <div className="mx-auto h-1 w-16 bg-primary/30 rounded-full" />
        </div>

        {/* Mobile View - Grille */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {temoignages.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-3xl border border-border/40 shadow-sm relative overflow-hidden"
            >
              <Quote className="absolute -top-2 -right-2 h-24 w-24 text-muted/5 -rotate-12" />
              <Typography className="text-lg italic mb-6 relative z-10">
                &quot;{t.contenu}&quot;
              </Typography>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={t.photo}
                      alt={t.auteur}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Typography className="font-bold text-foreground">
                      {t.auteur}
                    </Typography>
                    <Typography variant="muted" className="text-sm">
                      {t.poste}
                    </Typography>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="relative h-5 w-5 overflow-hidden rounded">
                        <Image
                          src={t.logo}
                          alt={t.entreprise}
                          fill
                          className="object-contain grayscale"
                        />
                      </div>
                      <Typography
                        variant="muted"
                        className="text-xs font-medium"
                      >
                        {t.entreprise}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      📊 Résultats:
                    </span>
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      {t.resultats}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground border-t pt-2">
                  <span className="font-medium">Projet:</span> {t.projet}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View - Carrousel interactif */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CarouselTemoignages temoignages={temoignages} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
