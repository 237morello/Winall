"use client";

/**
 * @file HeroCarousel.tsx
 * @description Section Hero premium en carousel pour Winall Tech Sarl.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ARCHITECTURE — Pattern MVC (Service + Vue)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HeroCarouselService (Modèle / Service)
 *   └─ Logique métier pure, sans état React, testable isolément.
 *      Responsabilités : calcul d'index, variants Framer Motion, formatage.
 *
 * SectionHeroCarousel (Vue / Composant)
 *   └─ Présentation uniquement. Consomme le service, gère l'état UI.
 *      Responsabilités : rendu, gestion des events, auto-play.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ANIMATION CUBE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * "suivant"   → slide active sort par le BAS   | nouvelle slide entre par le HAUT
 * "precedent" → slide active sort par le HAUT  | nouvelle slide entre par le BAS
 *
 * Implémentation : AnimatePresence (mode="popLayout") + custom prop pour
 * transmettre la direction aux variants dynamiquement.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DÉPENDANCES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * - motion/react (Framer Motion v11+)
 * - next/image  (Next.js App Router)
 * - Design system Winall : variables CSS --color-p, --color-p-100,
 *   --color-g-300, --color-g-200, --background, --font-noteSansJp
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMAGES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Placer dans /public/images/hero/ — voir HeroCarousel.constants.ts pour
 * le tableau complet des noms de fichiers et termes de recherche.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  SLIDES_HERO,
  DUREE_AUTO_PLAY,
  DUREE_TRANSITION,
} from "./HeroCarousel.constants";
import type {
  ProprietesHeroCarousel,
  DirectionTransition,
  EtatCarousel,
} from "./HeroCarousel.types";

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE — Logique métier pure (Modèle)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @class HeroCarouselService
 * @description Encapsule toute la logique métier du carousel.
 * Aucun import React — peut être testé en isolation (Jest/Vitest).
 */
class HeroCarouselService {
  /**
   * Calcule l'index de la slide suivante en bouclant circulairement.
   * @example indexSuivant(4, 5) → 0
   */
  static indexSuivant(actuel: number, total: number): number {
    return (actuel + 1) % total;
  }

  /**
   * Calcule l'index de la slide précédente en bouclant circulairement.
   * @example indexPrecedent(0, 5) → 4
   */
  static indexPrecedent(actuel: number, total: number): number {
    return (actuel - 1 + total) % total;
  }

  /**
   * Détermine la direction lors d'un saut direct vers un index cible.
   * Utilisé pour les dots de navigation.
   */
  static directionVersIndex(
    actuel: number,
    cible: number
  ): DirectionTransition {
    return cible > actuel ? "suivant" : "precedent";
  }

  /**
   * Formate le compteur de slides pour l'affichage UI.
   * @example formatterCompteur(0, 5) → "01 / 05"
   */
  static formatterCompteur(actuel: number, total: number): string {
    const pad = (n: number): string => String(n).padStart(2, "0");
    return `${pad(actuel + 1)} / ${pad(total)}`;
  }

  /**
   * Retourne les variants Framer Motion pour l'effet cube.
   *
   * Ces variants utilisent la prop `custom` d'AnimatePresence pour recevoir
   * la direction dynamiquement à chaque transition. La fonction retournée
   * par `entree` et `sortie` reçoit la valeur de `custom` en argument.
   *
   * Animation cube :
   *   - "suivant"   : nouvelle slide entre par le haut  (y: -100% → 0%)
   *                   slide active sort par le bas       (y: 0% → +100%)
   *   - "precedent" : nouvelle slide entre par le bas   (y: +100% → 0%)
   *                   slide active sort par le haut      (y: 0% → -100%)
   */
  static obtenirVariantsCube() {
    const duree = DUREE_TRANSITION / 1000;
    const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    return {
      /**
       * État initial de la slide entrante.
       * Reçoit la direction via la prop `custom` d'AnimatePresence.
       */
      entree: (direction: DirectionTransition) => ({
        y: direction === "suivant" ? "-100%" : "100%",
        opacity: 0,
        scale: 0.96,
      }),

      /** État final — slide visible et centrée. */
      centre: {
        y: "0%",
        opacity: 1,
        scale: 1,
        transition: { duration: duree, ease: easing },
      },

      /**
       * État de sortie de la slide active.
       * Reçoit la direction via la prop `custom` d'AnimatePresence.
       */
      sortie: (direction: DirectionTransition) => ({
        y: direction === "suivant" ? "100%" : "-100%",
        opacity: 0,
        scale: 0.96,
        transition: { duration: duree, ease: easing },
      }),
    };
  }

  /**
   * Variants pour le container du contenu textuel.
   * Déclenche un stagger sur ses enfants à chaque changement de slide.
   */
  static obtenirVariantsContenu() {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.25 },
      },
    };
  }

  /**
   * Variants partagés pour chaque élément enfant du contenu (badge, titre,
   * sous-titre, CTA). Animation d'entrée avec slide-up.
   */
  static obtenirVariantsEnfant() {
    return {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
      },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// VUE — Composant de présentation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @component SectionHeroCarousel
 * @description Hero carousel pleine hauteur avec 5 slides par domaine d'expertise.
 *
 * Fonctionnalités :
 * - Auto-play configurable (pause au survol)
 * - Navigation clavier (← →)
 * - Dots de navigation cliquables
 * - Compteur de slides accessible (aria-live)
 * - Barre de progression auto-play animée
 * - Verrou de transition (anti double-clic)
 *
 * @param autoPlayInterval - Intervalle d'auto-play en ms. Défaut : 6000.
 */
export const SectionHeroCarousel = ({
  className = "",
  autoPlayInterval = DUREE_AUTO_PLAY,
}: ProprietesHeroCarousel) => {
  // ── État ──────────────────────────────────────────────────────────────────

  const [etat, setEtat] = useState<EtatCarousel>({
    indexActuel: 0,
    direction: "suivant",
    estEnTransition: false,
  });

  /** Pause l'auto-play quand l'utilisateur interagit avec le carousel. */
  const [estEnPause, setEstEnPause] = useState(false);

  // ── Variants (instanciés une seule fois au montage) ───────────────────────

  const variantsCube = HeroCarouselService.obtenirVariantsCube();
  const variantsContenu = HeroCarouselService.obtenirVariantsContenu();
  const variantsEnfant = HeroCarouselService.obtenirVariantsEnfant();

  // ── Helpers de navigation ─────────────────────────────────────────────────

  /**
   * Déclenche une transition vers une slide cible.
   * Lève le verrou de transition après la durée d'animation.
   */
  const naviguerVers = useCallback(
    (indexCible: number, direction: DirectionTransition) => {
      setEtat((prev) => {
        if (prev.estEnTransition || indexCible === prev.indexActuel)
          return prev;
        return { indexActuel: indexCible, direction, estEnTransition: true };
      });
      setTimeout(() => {
        setEtat((prev) => ({ ...prev, estEnTransition: false }));
      }, DUREE_TRANSITION + 50); // +50ms de marge de sécurité
    },
    []
  );

  /** Navigation vers la slide suivante. */
  const allerSuivant = useCallback(() => {
    const indexCible = HeroCarouselService.indexSuivant(
      etat.indexActuel,
      SLIDES_HERO.length
    );
    naviguerVers(indexCible, "suivant");
  }, [etat.indexActuel, naviguerVers]);

  /** Navigation vers la slide précédente. */
  const allerPrecedent = useCallback(() => {
    const indexCible = HeroCarouselService.indexPrecedent(
      etat.indexActuel,
      SLIDES_HERO.length
    );
    naviguerVers(indexCible, "precedent");
  }, [etat.indexActuel, naviguerVers]);

  /** Navigation directe par dot ou autre contrôle externe. */
  const allerVersIndex = useCallback(
    (index: number) => {
      const direction = HeroCarouselService.directionVersIndex(
        etat.indexActuel,
        index
      );
      naviguerVers(index, direction);
    },
    [etat.indexActuel, naviguerVers]
  );

  // ── Auto-play ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (estEnPause) return;
    const timer = setTimeout(allerSuivant, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [etat.indexActuel, estEnPause, autoPlayInterval, allerSuivant]);

  // ── Navigation clavier ────────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") allerSuivant();
      if (e.key === "ArrowLeft") allerPrecedent();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allerSuivant, allerPrecedent]);

  // ── Données de la slide active ────────────────────────────────────────────

  const slideActive = SLIDES_HERO[etat.indexActuel];

  // ─────────────────────────────────────────────────────────────────────────
  // RENDU
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: "100svh", minHeight: "620px" }}
      onMouseEnter={() => setEstEnPause(true)}
      onMouseLeave={() => setEstEnPause(false)}
      aria-label="Présentation des domaines d'expertise Winall Tech"
      aria-roledescription="carousel"
    >
      {/* ────────────────────────────────────────────────────────────────────
          SLIDES — AnimatePresence avec animation cube
          ────────────────────────────────────────────────────────────────── */}
      <AnimatePresence
        initial={false}
        custom={etat.direction}
        mode="popLayout"
      >
        <motion.div
          key={slideActive.id}
          custom={etat.direction}
          variants={variantsCube}
          initial="entree"
          animate="centre"
          exit="sortie"
          className="absolute inset-0"
          aria-roledescription="slide"
          aria-label={`${slideActive.metier} — ${etat.indexActuel + 1} sur ${SLIDES_HERO.length}`}
        >
          {/* ── IMAGE DE FOND ─────────────────────────────────────────────── */}
          {/*
           * next/image avec fill requiert un parent en position relative.
           * sizes="100vw" évite le téléchargement d'une résolution trop haute.
           * priority=true uniquement sur la première slide pour le LCP.
           */}
          <div className="absolute inset-0">
            <Image
              src={slideActive.image}
              alt={slideActive.imageAlt}
              fill
              priority={etat.indexActuel === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* ── OVERLAY DÉGRADÉ ───────────────────────────────────────────── */}
          {/*
           * Dégradé latéral : sombre à gauche (zone texte) → transparent à droite.
           * Assure le contraste texte/image sans trop assombrir l'image.
           */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.10) 100%)",
            }}
          />

          {/* ── CONTENU TEXTUEL ───────────────────────────────────────────── */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24">
              {/*
               * Nouveau key à chaque changement de slide pour que AnimatePresence
               * redéclenche le staggerChildren du contenu textuel.
               */}
              <motion.div
                key={`content-${slideActive.id}`}
                variants={variantsContenu}
                initial="hidden"
                animate="visible"
                className="max-w-[600px] space-y-6"
              >
                {/* BADGE MÉTIER */}
                <motion.span
                  variants={variantsEnfant}
                  className="inline-block text-xs font-medium uppercase tracking-[0.2em] px-4 py-2 rounded-full"
                  style={{
                    border: "1px solid var(--color-p)",
                    color: "var(--color-p)",
                    fontFamily: "var(--font-noteSansJp)",
                  }}
                >
                  {slideActive.metier}
                </motion.span>

                {/* HEADLINE */}
                {/*
                 * clamp() assure une taille fluide entre mobile et desktop.
                 * white-space: pre-line respecte les "\n" dans les données.
                 */}
                <motion.h1
                  variants={variantsEnfant}
                  style={{
                    fontFamily: "var(--font-noteSansJp)",
                    fontWeight: "700",
                    fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                    lineHeight: "1.1",
                    color: "#ffffff",
                    whiteSpace: "pre-line",
                  }}
                >
                  {slideActive.accroche}
                </motion.h1>

                {/* SOUS-TITRE */}
                <motion.p
                  variants={variantsEnfant}
                  className="max-w-[460px] text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-noteSansJp)",
                    color: "rgba(255, 255, 255, 0.72)",
                  }}
                >
                  {slideActive.sousAccroche}
                </motion.p>

                {/* CTA */}
                <motion.a
                  variants={variantsEnfant}
                  href={slideActive.ctaLien}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 28px var(--color-p-100)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-8 py-4 rounded-[6px] font-medium text-sm"
                  style={{
                    backgroundColor: "var(--color-p)",
                    color: "var(--color-g-300)",
                    fontFamily: "var(--font-noteSansJp)",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {slideActive.ctaTexte}
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ────────────────────────────────────────────────────────────────────
          BOUTONS DE NAVIGATION ← →
          ────────────────────────────────────────────────────────────────── */}

      {/* Bouton précédent */}
      <motion.button
        onClick={allerPrecedent}
        disabled={etat.estEnTransition}
        whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.18)" }}
        whileTap={{ scale: 0.94 }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center rounded-full
                   disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
          fontSize: "18px",
        }}
        aria-label="Slide précédente"
      >
        ←
      </motion.button>

      {/* Bouton suivant */}
      <motion.button
        onClick={allerSuivant}
        disabled={etat.estEnTransition}
        whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.18)" }}
        whileTap={{ scale: 0.94 }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 flex items-center justify-center rounded-full
                   disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
          fontSize: "18px",
        }}
        aria-label="Slide suivante"
      >
        →
      </motion.button>

      {/* ────────────────────────────────────────────────────────────────────
          DOTS DE NAVIGATION
          ────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                   flex items-center gap-2"
        role="tablist"
        aria-label="Navigation entre les slides"
      >
        {SLIDES_HERO.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={() => allerVersIndex(index)}
            role="tab"
            aria-selected={index === etat.indexActuel}
            aria-label={`Aller à la slide ${slide.metier}`}
            animate={{
              width: index === etat.indexActuel ? "28px" : "8px",
              backgroundColor:
                index === etat.indexActuel
                  ? "var(--color-p)"
                  : "rgba(255,255,255,0.38)",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[8px] rounded-full cursor-pointer"
            style={{ minWidth: "8px" }}
          />
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          COMPTEUR DE SLIDES
          Accessible via aria-live : annoncé aux lecteurs d'écran à chaque
          changement de slide.
          ────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-6 md:right-12 z-20 text-sm font-medium tabular-nums"
        style={{
          color: "rgba(255,255,255,0.55)",
          fontFamily: "var(--font-noteSansJp)",
          letterSpacing: "0.05em",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {HeroCarouselService.formatterCompteur(
          etat.indexActuel,
          SLIDES_HERO.length
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          BARRE DE PROGRESSION AUTO-PLAY
          Réinitialisée à chaque changement de slide grâce au key.
          Masquée quand l'auto-play est en pause.
          ────────────────────────────────────────────────────────────────── */}
      {!estEnPause && (
        <motion.div
          key={`progress-${etat.indexActuel}`}
          className="absolute bottom-0 left-0 h-[3px] z-20"
          style={{ backgroundColor: "var(--color-p)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: autoPlayInterval / 1000,
            ease: "linear",
          }}
        />
      )}
    </section>
  );
};

export default SectionHeroCarousel;
