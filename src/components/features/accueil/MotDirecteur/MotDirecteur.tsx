"use client";

/**
 * @file MotDirecteur.tsx
 * @description Section "Mot du Directeur" pour humaniser la marque Winall Tech Sarl.
 */

import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { DIRECTEUR_INFO } from "./MotDirecteur.constants";
import { MotDirecteurProps } from "./MotDirecteur.types";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * @class MotDirecteurLogique
 * @description Gère la logique métier de la section MotDirecteur.
 */
class MotDirecteurLogique {
  /**
   * Retourne les informations du directeur (fournies ou par défaut).
   */
  static obtenirDirecteurInfo(): typeof DIRECTEUR_INFO {
    return DIRECTEUR_INFO;
  }
}

/**
 * @component MotDirecteur
 * @description Affiche le message du Directeur Général avec design moderne et professionnel.
 */
export const MotDirecteur = ({ className }: MotDirecteurProps) => {
  const directeur = MotDirecteurLogique.obtenirDirecteurInfo();

  return (
    <section className={cn("w-full py-20 bg-gradient-to-br from-primary/5 to-o/5", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
        >
          {/* Texte - Gauche */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Mot du Fondateur
              </div>
              
              <Typography variant="h2" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Notre Vision pour l&apos;Afrique Centrale
              </Typography>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 text-6xl text-primary/20">&quot;</div>
              <Typography variant="h3" className="text-xl md:text-2xl font-medium text-foreground italic pl-8 mb-6">
                {directeur.citation}
              </Typography>
              <div className="absolute -right-4 bottom-0 text-6xl text-primary/20">&quot;</div>
            </div>

            <Typography className="text-lg text-muted-foreground leading-relaxed">
              {directeur.vision}
            </Typography>

            <div className="space-y-2 pt-4 border-t border-border/50">
              <Typography className="font-bold text-foreground">
                {directeur.nom}
              </Typography>
              <Typography variant="muted" className="text-sm">
                {directeur.titre}
              </Typography>
              <Typography variant="muted" className="text-sm italic">
                {directeur.experience}
              </Typography>
            </div>
          </div>

          {/* Photo - Droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Effet de fond */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-o/10 to-transparent rounded-3xl transform -rotate-3"></div>
            
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <div className="aspect-[4/5] relative">
                <Image
                  src={directeur.photo}
                  alt={directeur.nom}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                
                {/* Badge sur la photo */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                    <Typography variant="muted" className="text-xs font-medium text-center">
                      {directeur.titre}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <Typography variant="muted" className="text-sm whitespace-pre-line italic">
                {directeur.signature}
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
