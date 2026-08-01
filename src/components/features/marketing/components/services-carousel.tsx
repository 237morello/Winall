"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "./service-card";
import type { ServiceSlug } from "../marketing.types";

interface ServicesCarouselProps {
  slugs: ServiceSlug[];
}

export function ServicesCarousel({ slugs }: ServicesCarouselProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - centerX);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateIndex();
        ticking = false;
      });
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [updateIndex]);

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slugs.length - 1, next));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    const target = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: target, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto w-full max-w-md">
      <ul
        ref={trackRef}
        className="flex list-none snap-x snap-mandatory overflow-x-auto scroll-smooth p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slugs.map((slug) => (
          <li key={slug} className="w-full flex-none snap-start px-1">
            <ServiceCard slug={slug} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        aria-label="Service précédent"
        className="absolute left-0 top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        disabled={index === slugs.length - 1}
        aria-label="Service suivant"
        className="absolute right-0 top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-35"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>

      <p className="mt-4 text-center text-xs font-semibold tracking-wide text-muted-foreground tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(slugs.length).padStart(2, "0")}
      </p>
    </div>
  );
}
