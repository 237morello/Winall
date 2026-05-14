"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { AuthForm } from "../_components/auth-form";

/**
 * @page LogInPage
 * @description Page de connexion compacte et lisible sans scroll.
 */
export default function LogInPage() {
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
            Connexion securisee
          </p>
          <h2 className="font-noteSansJp text-xl font-semibold leading-tight text-foreground sm:text-2xl">
            Accedez a votre espace client.
          </h2>
        </div>
      </div>

      <AuthForm />

      <p className="text-center text-xs text-muted-foreground lg:text-left">
        Besoin d&apos;aide ?{" "}
        <Link
          href="/"
          className="font-medium text-foreground underline-offset-4 transition-colors hover:text-orange-600 hover:underline"
        >
          Retour accueil
        </Link>
      </p>
    </motion.div>
  );
}
