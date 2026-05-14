"use client";

import { useState, useMemo } from "react";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { LISTE_PROJETS } from "./Projets.constants";
import { ProjetsProps } from "./Projets.types";
import { motion } from "motion/react";
import { FiltreProjets } from "./FiltreProjets";

export const Projets = ({ projets = LISTE_PROJETS }: ProjetsProps) => {
  const [categoriesSelectionnees, setCategoriesSelectionnees] = useState<
    string[]
  >([]);

  // Extraire les catégories uniques
  const categoriesDisponibles = useMemo(() => {
    const categories = [...new Set(projets.map((p) => p.categorie))];
    return categories.sort();
  }, [projets]);

  // Filtrer les projets selon les catégories sélectionnées
  const projetsFiltres = useMemo(() => {
    if (categoriesSelectionnees.length === 0) {
      return projets;
    }
    return projets.filter((projet) =>
      categoriesSelectionnees.includes(projet.categorie),
    );
  }, [projets, categoriesSelectionnees]);

  return (
    <section className="w-full py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-16 space-y-4">
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Nos Projets Récents
          </Typography>
          <Typography
            variant="p"
            className="text-muted-foreground max-w-2xl text-lg"
          >
            Découvrez comment nous transformons les infrastructures avec nos
            solutions innovantes.
          </Typography>
        </div>

        {/* Filtre interactif */}
        <div className="mb-12">
          <FiltreProjets
            categories={categoriesDisponibles}
            categoriesSelectionnees={categoriesSelectionnees}
            onCategoriesChange={setCategoriesSelectionnees}
          />
        </div>

        {/* Résultats du filtrage */}
        {categoriesSelectionnees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-sm text-muted-foreground"
          >
            {projetsFiltres.length} projet{projetsFiltres.length > 1 ? "s" : ""}{" "}
            trouvé{projetsFiltres.length > 1 ? "s" : ""}
          </motion.div>
        )}

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projetsFiltres.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card/30"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={projet.imageSrc}
                  alt={projet.titre}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary font-bold text-sm uppercase tracking-widest">
                    {projet.categorie}
                  </span>
                  <div className="flex gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {projet.duree}
                    </span>
                    <span className="bg-o/10 text-o px-2 py-1 rounded-full text-xs font-medium">
                      {projet.budget}
                    </span>
                  </div>
                </div>
                <Typography variant="h3" className="text-2xl font-bold mb-2">
                  {projet.titre}
                </Typography>
                <Typography className="text-muted-foreground line-clamp-2 mb-3">
                  {projet.description}
                </Typography>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-500 font-medium">✓</span>
                  <span className="text-green-600 font-medium">
                    {projet.resultats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
