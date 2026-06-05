"use client";

import { useState, useMemo } from "react";
import { Typography } from "@/components/ui/typography";
import { LISTE_PROJETS } from './Projets.constants';
import { ProjetsProps } from "./Projets.types";
import { FiltreProjets } from "./FiltreProjets";
import { ImageTall } from "../../long-image";

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
        {/* Affichage des cartes */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {projetsFiltres.map((projet) => (
              <ImageTall 
                key={projet.id}
                image={projet.imageSrc}
                text={projet.titre}
                categorie={projet.categorie}
                description={projet.description}
              />
            ))}
          </div>
          {projetsFiltres.length === 0 && (
            <div className="text-center py-20">
              <Typography variant="p" className="text-muted-foreground">
                Aucun projet ne correspond aux filtres sélectionnés.
              </Typography>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};
