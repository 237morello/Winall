"use client";

import { motion } from "motion/react";
import { SkillCard } from "./skill-card";
import { Skill } from "./types";

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/**
 * @component SkillGrid
 * @description Client Component pour l'animation de la grille des compétences.
 */
export const SkillGrid = ({ skills }: { skills: Skill[] }) => {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-12"
    >
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </motion.div>
  );
};
