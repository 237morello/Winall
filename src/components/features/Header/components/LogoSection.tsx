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
      
        
            <Image
              src={MARQUE_HEADER.logo}
              alt={MARQUE_HEADER.altLogo}
              width={200}
              height={200}
              className=""
              priority
            />
          
     
      
      </Link>
    </motion.div>
  );
}
