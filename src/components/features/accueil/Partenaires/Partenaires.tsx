"use client";

/**
 * @file Partenaires.tsx
 * @description Section affichant le carrousel infini des technologies partenaires.
 */

import { Typography } from "@/components/ui/typography";
import { motion, useAnimationControls } from "motion/react";
import Image from "next/image";
import { LISTE_PARTENAIRES } from "./Partenaires.constants";
import { PartenairesProps, PartenaireWinall } from "./Partenaires.types";

/**
 * @class PartenairesLogique
 * @description Gère l'animation et les données du carrousel de partenaires.
 */
class PartenairesLogique {
  /** Génère une piste étendue pour l'effet infini */
  static genererPiste(liste: PartenaireWinall[]): PartenaireWinall[] {
    return [...liste, ...liste, ...liste, ...liste];
  }
}

/**
 * @component Partenaires
 * @description Carrousel infini et épuré des partenaires technologiques.
 */
export const Partenaires = ({ partenaires }: PartenairesProps) => {
  const controls = useAnimationControls();
  const listeBase = partenaires || LISTE_PARTENAIRES;
  const piste = PartenairesLogique.genererPiste(listeBase);

  const demarrerAnimation = () =>
    controls.start({
      x: "-50%",
      transition: { repeat: Infinity, duration: 20, ease: "linear" },
    });

  const mettreEnPause = () => controls.stop();

  return (
    <section className="overflow-hidden py-24 bg-background">
      <div className="mb-16 space-y-4 px-4 text-center">
        <span className="inline-block rounded-full bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/10">
          Nos Technologies
        </span>
        <Typography
          variant="h2"
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Technologies Partenaires
        </Typography>
        <Typography
          variant="p"
          className="mx-auto max-w-xl text-muted-foreground text-lg"
        >
          Nous intégrons les solutions leaders mondiales pour garantir la
          performance et la fiabilité de vos systèmes.
        </Typography>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
        onMouseEnter={mettreEnPause}
        onMouseLeave={demarrerAnimation}
      >
        <motion.div
          className="flex w-max gap-8 py-4"
          initial={{ x: "0%" }}
          animate={controls}
          onViewportEnter={demarrerAnimation}
        >
          {piste.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ y: -5, scale: 1.02 }}
              className="
                relative min-w-[200px] h-32
                rounded-2xl border border-border/50 bg-card/50
                flex flex-col items-center justify-center gap-3 px-6
                shadow-sm hover:shadow-xl hover:border-primary/20
                transition-all duration-300 backdrop-blur-sm
              "
            >
              <div className="relative h-12 w-12 grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src={item.imageSrc}
                  alt={item.titre}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center space-y-1">
                <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {item.titre}
                </p>
                <p className="text-[10px] text-muted-foreground/70 px-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
