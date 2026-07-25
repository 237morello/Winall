"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/features/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { MARKETING_SERVICES } from "../marketing.constants";

type SlideState = "active" | "next" | "previous" | "idle";

export interface HeroSlide {
  key: string;
  image: string;
  title: string;
  tagline: string;
  href: string;
}

/** Fallback statique : slides construites à partir des services (comportement historique). */
const FALLBACK_SLIDES: HeroSlide[] = MARKETING_SERVICES.map((service) => ({
  key: service.slug,
  image: service.image,
  title: service.title,
  tagline: service.tagline,
  href: `/services/${service.slug}`,
}));

const autoplayDelay = 5200;

function getSlideState(
  index: number,
  activeIndex: number,
  total: number,
): SlideState {
  const nextIndex = (activeIndex + 1) % total;
  const previousIndex = (activeIndex - 1 + total) % total;

  if (index === activeIndex) {
    return "active";
  }

  if (index === nextIndex) {
    return "next";
  }

  if (index === previousIndex) {
    return "previous";
  }

  return "idle";
}

export function HeroCubeCarousel({ slides }: { slides?: HeroSlide[] }) {
  const activeSlides = slides && slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = activeSlides.length;
  const activeService = activeSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % total);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [total]);

  function goToPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }

  function goToNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % total);
  }

  return (
    <section
      id="hero"
      className="hero-cube relative isolate h-[calc(100vh-4rem)] min-h-[28rem] max-h-[46rem] overflow-hidden border-b border-border bg-zinc-950 text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        {activeSlides.map((slide, index) => (
          <article
            key={slide.key}
            className="hero-cube-slide absolute inset-0"
            data-state={getSlideState(index, activeIndex, total)}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              unoptimized={slide.image.startsWith("http")}
            />
            <div className="absolute inset-0 bg-zinc-950/45" />
          </article>
        ))}
      </div>

      <Container
        className="relative z-10 flex h-full items-end py-16"
        size="8xl"
      >
        <div className="max-w-2xl">
          <h1 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-red-200">{activeService.title}</span> pour vos
            projets.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-100 sm:text-base">
            {activeService.tagline}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={activeService.href}
              className={buttonVariants({ size: "sm" })}
            >
              Voir ce service
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "border-white/50 bg-white/10 text-white hover:bg-white/20",
              })}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </Container>

      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        aria-label="Service précédent"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 border-transparent bg-white/10 text-white hover:bg-white/20 sm:left-6 lg:left-8"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        aria-label="Service suivant"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 border-transparent bg-white/10 text-white hover:bg-white/20 sm:right-6 lg:right-8"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </section>
  );
}
