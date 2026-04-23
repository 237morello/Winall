/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";

export const HeroC = () => {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-20">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 md:flex-row md:gap-12 md:px-6 lg:px-0">
        <div className="w-full space-y-6 lg:w-1/2">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-p">
            Winall Tech
          </div>
          <Typography variant="h1" className="w-full font-bold leading-tight lg:text-5xl">
            Structure dâ€™ingÃ©nieurs pour vos flux courant fort et faible.
          </Typography>
          <Typography variant="p" className="max-w-xl text-muted-foreground">
            Nous concevons, installons et maintenons des infrastructures Ã©lectriques,
            digitales et industrielles robustes. Chaque projet reÃ§oit un pilote technique
            dÃ©diÃ©, des outils digitaux modernes et une supervision 24/7.
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" className="bg-p text-background hover:bg-p/90 shadow-xl">
              Nos services
            </Button>
            <Button variant="outline">Nous contacter</Button>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {["ElectricitÃ©", "Informatique", "Maintenance"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-p/40 bg-p/10 px-3 py-1 text-p"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <span className="block text-xs uppercase text-muted-foreground/70">
                DisponibilitÃ©
              </span>
              <strong className="text-foreground">24/7</strong>
            </div>
            <div>
              <span className="block text-xs uppercase text-muted-foreground/70">
                Garantie
              </span>
              <strong className="text-foreground">10 ans</strong>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2">
          <div className="hidden rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-background via-muted to-background/60 p-4 shadow-2xl dark:hidden lg:block">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] bg-muted">
              <Image
                src="/images/main-hero-imgAcceuil.png"
                alt="Illustration Winall Tech"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="lg:hidden dark:hidden">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem] border border-border/50 bg-muted">
              <Image
                src="/images/main-hero-imgAcceuil.png"
                alt="Illustration Winall Tech"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
