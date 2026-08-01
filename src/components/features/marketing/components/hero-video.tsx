"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // React ne pose pas toujours l'attribut `muted` dans le HTML rendu par le
  // serveur (seulement la propriété DOM après hydratation) : en prod, le
  // navigateur peut évaluer la politique d'autoplay avant l'hydratation et
  // bloquer la lecture d'une vidéo vue comme non muette. On force la
  // propriété et le lancement dès le montage.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => setIsPlaying(false));
  }, []);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section
      id="hero"
      className="relative isolate flex flex-col overflow-hidden border-b border-border bg-zinc-950 text-white"
    >
      <Link
        href="/projets"
        className="flex h-9 items-center justify-center gap-2 border-b border-white/10 bg-zinc-950 px-4 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-900 sm:h-10"
      >
        Plus de 200 projets réalisés
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>

      <div className="relative h-[26rem] w-full overflow-hidden sm:h-[30rem] lg:h-[calc(100dvh-8rem)] lg:min-h-[26rem] lg:max-h-[42rem]">
        <video
          ref={videoRef}
          src="/images/projets/montage_services_premium_20_secondes.mp4"
          poster="/images/projets/montage_services_premium_poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />

        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          {isPlaying ? (
            <Pause className="size-4" aria-hidden="true" />
          ) : (
            <Play className="size-4" aria-hidden="true" />
          )}
        </button>

        <div className="absolute bottom-6 left-4 z-20 flex flex-col items-start gap-2 sm:bottom-10 sm:left-8">
          <span className="bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-950 sm:text-sm">
            Winall Tech Sarl
          </span>
          <span className="hidden max-w-xs bg-white/95 px-3 py-1.5 text-sm text-zinc-800 sm:block sm:max-w-sm">
            Courant fort, courant faible : toute votre installation technique, un seul partenaire.
          </span>
          <Link href="/services" className={buttonVariants({ size: "sm" })}>
            Voir nos services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
