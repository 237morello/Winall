"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ActionButtonHeader } from "./ActionButtonHeader";
import { LienNavigation } from "./LienNavigation";
import { LIENS_NAVIGATION_HEADER } from "../Header.constants";

/**
 * @component NavigationActions
 * @description Conteneur pour la navigation et les actions du côté droit du header.
 */
export function NavigationActions() {
  const cheminActuel = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="hidden items-center gap-4 lg:flex"
    >
      <motion.nav
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {LIENS_NAVIGATION_HEADER.map((lien, index) => (
          <motion.div
            key={lien.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.4 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LienNavigation cheminActuel={cheminActuel} lien={lien} />
          </motion.div>
        ))}
      </motion.nav>

      <motion.div
        className="h-6 w-px bg-border/60"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
      />

      <ActionButtonHeader />
    </motion.div>
  );
}
