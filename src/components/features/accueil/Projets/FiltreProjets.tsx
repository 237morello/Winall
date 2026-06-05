"use client";

/**
 * @file FiltreProjets.tsx
 * @description Composant interactif pour filtrer les projets par catégorie et technologie.
 */

import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

/**
 * @interface FiltreProjetsProps
 * @description Propriétés pour le composant FiltreProjets.
 */
export interface FiltreProjetsProps {
  categories: string[];
  categoriesSelectionnees: string[];
  onCategoriesChange: (categories: string[]) => void;
  className?: string;
}

/**
 * @component FiltreProjets
 * @description Filtre interactif pour les projets avec animations.
 */
export const FiltreProjets = ({ 
  categories, 
  categoriesSelectionnees, 
  onCategoriesChange, 
  className 
}: FiltreProjetsProps) => {
  const handleToggleCategorie = (categorie: string) => {
    const nouvellesCategories = categoriesSelectionnees.includes(categorie)
      ? categoriesSelectionnees.filter(c => c !== categorie)
      : [...categoriesSelectionnees, categorie];
    onCategoriesChange(nouvellesCategories);
  };

  const handleReset = () => {
    onCategoriesChange([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-4", className)}
    >
      {/* Titre */}
      <div className="flex items-center justify-between">
        <Typography variant="h3" className="text-lg font-semibold">
          Filtrer par catégorie
        </Typography>
        {categoriesSelectionnees.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs"
          >
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Boutons de filtre */}
      <div className="flex flex-wrap gap-2">
        {categories.map((categorie, index) => {
          const isSelected = categoriesSelectionnees.includes(categorie);
          
          return (
            <motion.div
              key={categorie}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleToggleCategorie(categorie)}
                className={cn(
                  "rounded-full text-xs font-medium transition-all duration-300",
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "hover:bg-primary/10 hover:border-primary/50"
                )}
              >
                {categorie}
                {isSelected && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-1"
                  >
                    ×
                  </motion.span>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Indicateur de filtres actifs */}
      {categoriesSelectionnees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-sm text-muted-foreground"
        >
          {categoriesSelectionnees.length} filtre{categoriesSelectionnees.length > 1 ? "s" : ""} actif{categoriesSelectionnees.length > 1 ? "s" : ""}
        </motion.div>
      )}
    </motion.div>
  );
};
