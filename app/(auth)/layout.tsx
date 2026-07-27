import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Accès administrateur",
  robots: { index: false, follow: false, nocache: true },
};

const BRAND_POINTS = [
  { icon: KeyRound, label: "Pass d'accès obligatoire" },
  { icon: Lock, label: "Mots de passe chiffrés" },
  { icon: ShieldCheck, label: "Session signée, 12 h" },
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-[100dvh] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(32,66,34,0.12),_transparent_34%),linear-gradient(180deg,_#fafafa_0%,_#ffffff_54%,_#f4f4f5_100%)] p-4 sm:p-6">
      <Toaster />
      <div className="grid max-h-full w-full max-w-5xl overflow-hidden rounded-3xl border border-border/70 bg-background/90 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.22)] backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        {/* Panneau de marque — masqué sur mobile pour tenir dans la hauteur */}
        <aside className="relative hidden min-h-0 flex-col overflow-hidden bg-[linear-gradient(165deg,_#204222,_#1b381d_88%)] p-8 text-white md:flex lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:2.75rem_2.75rem] [mask-image:radial-gradient(ellipse_at_20%_15%,#000_8%,transparent_70%)]"
          />

          <div className="relative flex flex-col">
            <span className="inline-flex w-fit items-center rounded-lg bg-white px-3 py-2 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="Winall Tech Sarl — Universal Digital Solutions"
                width={841}
                height={219}
                priority
                className="h-8 w-auto"
              />
            </span>

            <p className="mt-9 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/50">
              Accès restreint
            </p>
            <h1 className="mt-3 max-w-[15ch] text-3xl font-semibold leading-tight tracking-tight lg:text-[2.4rem]">
              Portail sécurisé de l&apos;administration.
            </h1>
            <p className="mt-4 hidden max-w-[34ch] text-sm leading-7 text-white/70 [@media(min-height:720px)]:block">
              L&apos;accueil public reste visible, mais l&apos;espace de pilotage
              est protégé : email, mot de passe et pass d&apos;accès Winall.
            </p>

            <ul className="mt-8 hidden flex-col gap-3.5 [@media(min-height:640px)]:flex">
              {BRAND_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex size-6 items-center justify-center rounded-full bg-white/10">
                    <Icon className="size-3.5 text-green-200" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative mt-auto pt-8 text-xs text-white/45">
            Winall Tech Sarl — Douala, Cameroun
          </p>
        </aside>

        {/* Zone formulaire */}
        <section className="flex min-h-0 flex-col overflow-y-auto p-6 sm:p-7 lg:p-9">
          {/* Logo compact affiché uniquement sur mobile (panneau de marque masqué) */}
          <span className="mb-6 inline-flex w-fit md:hidden">
            <Image
              src="/images/logo.png"
              alt="Winall Tech Sarl — Universal Digital Solutions"
              width={841}
              height={219}
              priority
              className="h-8 w-auto"
            />
          </span>
          {children}
        </section>
      </div>
    </div>
  );
}
