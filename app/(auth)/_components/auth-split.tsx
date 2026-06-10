"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthSplitProps {
  children: React.ReactNode;
}

const imagesAuth = [
  "/images/1.JPG",
  "/images/2.JPG",
  "/images/3.JPG",
  "/images/main-hero-imgAcceuil.png",
] as const;

/**
 * @component AuthSplit
 * @description Layout d'authentification inspire d'un split image/panneau sombre.
 */
export function AuthSplit({ children }: AuthSplitProps) {
  const pathname = usePathname();
  const [imageActive, setImageActive] = React.useState<(typeof imagesAuth)[number]>(imagesAuth[0]);

  React.useEffect(() => {
    const index = Math.floor(Math.random() * imagesAuth.length);
    setImageActive(imagesAuth[index]);
  }, [pathname]);

  return (
    <div className="min-h-svh overflow-hidden bg-black text-white">
      <div className="grid min-h-svh lg:grid-cols-[1.42fr_0.74fr]">
        <aside className="relative hidden min-h-svh overflow-hidden lg:block">
          <Image
            src={imageActive}
            alt="Equipe Winall Tech en intervention terrain"
            fill
            priority
            sizes="60vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-black/35" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <div className="max-w-lg space-y-3">
              <p className="text-xs font-semibold uppercase text-white/75">
                Winall Tech Sarl
              </p>
              <h1 className="font-noteSansJp text-4xl font-semibold leading-tight">
                Vos acces projets, devis et interventions au meme endroit.
              </h1>
            </div>
          </div>
        </aside>

        <main className="relative flex min-h-svh items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 lg:px-10">
          <div className="absolute inset-0 lg:hidden">
            <Image
              src={imageActive}
              alt="Equipe Winall Tech en intervention terrain"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/82" />
          </div>

          <div className="relative z-10 flex min-h-[calc(100svh-4rem)] w-full max-w-[360px] flex-col justify-center">
            <Link
              href="/"
              className="mb-14 inline-flex w-fit items-center gap-3 text-white transition-opacity hover:opacity-85"
            >
              <Image
                src="/images/logo.png"
                alt="Logo Winall Tech"
                width={44}
                height={44}
                className="rounded-full bg-white p-1"
              />
              <span className="font-noteSansJp text-xl font-semibold">Winall Tech</span>
            </Link>

            {children}

            <p className="mt-12 text-center text-[11px] text-white/45">
              Connexion securisee Winall Tech Sarl
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
