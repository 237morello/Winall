"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { MARQUE_HEADER } from "../Header.constants";

/**
 * @component LogoSection
 * @description Affiche le logo Winall avec sa marque, optimisé pour le header.
 */
export function LogoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/" className="flex items-center gap-3 group">
        <motion.div
          className="rounded-2xl border border-border/70 bg-background p-2 shadow-sm"
          whileHover={{
            scale: 1.05,
            borderColor: "rgba(var(--foreground), 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src={MARQUE_HEADER.logo}
              alt={MARQUE_HEADER.altLogo}
              width={42}
              height={42}
              className="h-10 w-10 object-contain"
              priority
            />
          </motion.div>
        </motion.div>
        <div className="space-y-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Typography
              variant="span"
              className="block text-xs uppercase tracking-[0.35em] text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            >
              {MARQUE_HEADER.titre}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <Typography variant="h5" className="font-medium text-foreground">
              {MARQUE_HEADER.sousTitre}
            </Typography>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
