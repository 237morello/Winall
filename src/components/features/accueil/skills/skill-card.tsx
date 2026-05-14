"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { Skill } from "./types";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * @component SkillCard
 * @description Composant UI épuré sans bordures. Image en haut, texte en bas.
 * Image petite sur mobile, grandissant vers md.
 */
export const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center text-center space-y-6"
    >
      {/* Container de l'image : Croissance progressive */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-full md:aspect-square max-w-[280px]">
        <Image
          src={skill.image}
          alt={skill.label}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, (max-width: 1024px) 33vw, 280px"
        />
      </div>

      {/* Contenu textuel : Plus grand que l'image visuellement sur mobile */}
      <div className="flex flex-col space-y-3">
        <h3 className="text-2xl md:text-xl font-extrabold text-gray-900 leading-tight">
          {skill.label}
        </h3>
        <p className="text-gray-600 text-base md:text-sm max-w-[260px]">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
};
