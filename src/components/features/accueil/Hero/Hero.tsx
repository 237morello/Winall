"use client";

/**
 * @file Hero.tsx
 * @description Section Hero premium B2B pour Winall Tech Sarl - Pattern Service + Composant
 */

import { motion } from "motion/react";
import {
  BADGE_TECHNIQUE,
  LIGNES_HEADLINE,
  SOUS_TITRE,
  BOUTON_ACTION,
} from "./Hero.constants";
import { ProprietesHero } from "./Hero.types";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * @class HeroLogique
 * @description Gère la logique métier et les transformations pour la section Hero.
 * Respecte le pattern Service + Composant défini dans GEMINI.md.
 */
class HeroLogique {
  /**
   * Retourne les variants d'animation pour le container principal.
   * @returns Variants Framer Motion pour stagger children.
   */
  static obtenirVariantsContainer() {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    };
  }

  /**
   * Retourne les variants d'animation pour le badge technique.
   * @returns Variants Framer Motion avec animation d'entrée.
   */
  static obtenirVariantsBadge() {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    };
  }

  /**
   * Retourne les variants d'animation pour la headline principale.
   * @returns Variants Framer Motion avec animation d'entrée.
   */
  static obtenirVariantsHeadline() {
    return {
      hidden: { opacity: 1, x: 0 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    };
  }

  /**
   * Retourne les variants d'animation pour les éléments simples.
   * @returns Variants Framer Motion avec fade in.
   */
  static obtenirVariantsElement() {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    };
  }

  /**
   * Retourne les variants d'animation pour le bouton CTA.
   * @returns Variants Framer Motion avec scale.
   */
  static obtenirVariantsBouton() {
    return {
      hidden: { opacity: 1, scale: 1 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    };
  }

  /**
   * Retourne les variants d'animation pour la ligne décorative.
   * @returns Variants Framer Motion avec scaleX.
   */
  static obtenirVariantsLigne() {
    return {
      hidden: { scaleX: 1 },
      visible: {
        scaleX: 1,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as const,
          origin: "left",
        },
      },
    };
  }
}

/**
 * @component SectionHero
 * @description Affiche la section Hero premium avec design sombre et accent vert.
 * Suit le pattern Service + Composant défini dans GEMINI.md.
 */
export const SectionHero = ({ className }: ProprietesHero) => {
  // Récupération des variants via la classe Service (pattern GEMINI.md)
  const variantsContainer = HeroLogique.obtenirVariantsContainer();
  const variantsBadge = HeroLogique.obtenirVariantsBadge();
  const variantsHeadline = HeroLogique.obtenirVariantsHeadline();
  const variantsElement = HeroLogique.obtenirVariantsElement();
  const variantsBouton = HeroLogique.obtenirVariantsBouton();

  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={variantsContainer}
        className={`relative min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden ${className}`}
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-noteSansJp)" }}
      >
        {/* ARRIÈRE-PLAN TEXTURÉ (Fond Cinématique avec plus de contraste) */}
        {/* 1. Glow Orange (Accent Winall) - Plus présent */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[85vw] h-[45vh] bg-orange-500/15 blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0" />
        
        {/* 2. Glow Gris/Noir (Profondeur) */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[60vw] h-[35vh] bg-black/10 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* 3. Grille Architecturale - Plus visible */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem] z-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

        {/* 4. Filigrane SVG Géant (Watermark) - Visible partout avec opacité faible */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none opacity-[0.1]">
          <div className="relative w-full h-full max-w-[1000px] max-h-[1000px] lg:translate-x-32 scale-110">
            <Image
              src="/images/main-hero-imgAcceuil.svg"
              alt="Background Texture"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* CONTENU PRINCIPAL (Visible et superposé) */}
        <div className="relative z-20 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          
            {/* 1. BADGE PREMIUM */}
            <motion.div
              variants={variantsBadge}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 lg:mb-10 border border-black/20 rounded-full bg-white/90 shadow-sm"
            >
              {BADGE_TECHNIQUE.avecPulse && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
              <Typography variant="span" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-black/90">
                {BADGE_TECHNIQUE.texte}
              </Typography>
            </motion.div>

            {/* 2. TITRE (Taille réduite pour plus d'élégance) */}
            <motion.h1
              variants={variantsHeadline}
              className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold tracking-tighter leading-[1.1] mb-8 px-4 text-black text-balance"
              style={{ fontFamily: "var(--font-noteSansJp)" }}
            >
              {LIGNES_HEADLINE.map((ligne, index) => (
                <span key={index} className="block">
                  {ligne.texte}
                </span>
              ))}
            </motion.h1>

            {/* 3. SOUS-TITRE (Même largeur que le titre) */}
            <motion.p
              variants={variantsElement}
              className="max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-black/80 font-medium mb-12 px-6 text-balance"
            >
              {SOUS_TITRE}
            </motion.p>

            {/* 4. APPELS À L'ACTION */}
            <motion.div
              variants={variantsBouton}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto px-2 sm:px-6"
            >
              {BOUTON_ACTION.map((button, index) => (
                <Button 
                  key={button.id} 
                  asChild 
                  size="lg" 
                  variant={index === 0 ? "p" : "ghost"}
                  className={`
                     sm:w-auto px-5 py-6 text-base font-bold transition-all duration-300 rounded-xl
                    ${index === 0 
                      ? "  shadow-xl shadow-black/20 hover:-translate-y-1 active:scale-95" 
                      : "border hover:border-p/25   hover:-translate-y-1 active:scale-95 text-gray-700"
                    }
                  `}
                >
                  <Link href={button.lien}>{button.texte}</Link>
                </Button>
              ))}
            </motion.div>

        </div>
      </motion.section>
    </>
  );
};

export default SectionHero;
