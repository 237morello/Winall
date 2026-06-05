"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { AuthForm } from "../_components/auth-form";

/**
 * @page SignUpPage
 * @description Creation d'acces sans mot de passe.
 */
export default function SignUpPage() {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="space-y-2 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/95 px-3 py-1.5 shadow-sm">
          <Image
            src="/images/logo_v2.png"
            alt="Logo Winall Tech"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-xs font-medium text-foreground">Portail Winall Tech</span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-600">
            Creation d'acces
          </p>
          <h2 className="font-noteSansJp text-xl font-semibold leading-tight text-foreground sm:text-2xl">
            Creez votre acces client securise.
          </h2>
        </div>
      </div>

      <AuthForm intent="signup" />

      <p className="text-center text-xs text-muted-foreground lg:text-left">
        Vous avez deja un acces ?{" "}
        <Link
          href="/log-in"
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-orange-600 hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </motion.div>
  );
}
