"use client"

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { motion } from "motion/react";

/**
 * @component BanniereCTA
 * @description Bannière d'appel à l'action finale.
 */
export const BanniereCTA = () => {
  return (
    <section className="w-full py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-5xl rounded-[3rem] bg-primary p-12 md:p-20 text-center text-primary-foreground shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 space-y-8">
          <Typography variant="h2" className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Prêt à sécuriser votre avenir technologique ?
          </Typography>
          <Typography className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour étudier vos besoins et vous proposer des solutions sur mesure.
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-full px-8 font-bold text-lg h-14">
              Demander un devis gratuit
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 font-bold text-lg h-14 border-primary-foreground/20 hover:bg-white/10 text-primary-foreground">
              Nous contacter
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
