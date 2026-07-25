"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/features/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MarketingProjectWithService } from "../marketing.types";

interface ProjectsShowcaseProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: MarketingProjectWithService[];
  exploreHref?: string;
  exploreLabel?: string;
  className?: string;
}

export function ProjectsShowcase({
  id,
  eyebrow,
  title,
  description,
  projects,
  exploreHref = "/projets",
  exploreLabel = "Explorer tout",
  className,
}: ProjectsShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  function scrollToProject(index: number) {
    const nextIndex = (index + projects.length) % projects.length;
    setActiveIndex(nextIndex);
    cardRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function showPreviousProject() {
    scrollToProject(activeIndex - 1);
  }

  function showNextProject() {
    scrollToProject(activeIndex + 1);
  }

  return (
    <section
      id={id}
      className={cn("bg-zinc-50 py-20 text-foreground sm:py-24", className)}
    >
      <Container size="8xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-destructive">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          <Link
            href={exploreHref}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit",
            })}
          >
            {exploreLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative left-1/2 mt-12 grid w-screen -translate-x-1/2 auto-cols-[calc(100vw-2rem)] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:left-auto sm:w-auto sm:translate-x-0 sm:auto-cols-[minmax(360px,520px)] sm:gap-6 sm:px-0 md:auto-cols-[minmax(460px,540px)] [&::-webkit-scrollbar]:hidden">
          {projects.map((project, index) => (
            <article
              key={`${project.serviceSlug}-${project.title}`}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="relative min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
                priority={index === 0}
                unoptimized={project.image.startsWith("http")}
              />
              <div className="absolute inset-0 bg-zinc-950/50" />

              <div className="relative z-10 flex min-h-64 flex-col justify-between p-4 sm:p-5">
                <div className="flex w-fit items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {project.serviceTitle}
                </div>

                <div className="max-w-xs">
                  <h3 className="text-xl font-medium leading-tight tracking-tight text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-200">
                    {project.description}
                  </p>
                  <Link
                    href={`/services/${project.serviceSlug}`}
                    className="mt-5 inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
                  >
                    Voir le service
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="hidden flex-1 sm:block" />

          <div className="flex flex-1 items-center justify-center gap-2">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${project.serviceSlug}-${project.title}-indicator`}
                  type="button"
                  aria-label={`Afficher le projet ${index + 1}`}
                  onClick={() => scrollToProject(index)}
                  className={cn(
                    "rounded-full transition-all",
                    isActive
                      ? "h-2 w-7 bg-primary"
                      : "size-2 bg-primary/25 hover:bg-primary/60",
                  )}
                />
              );
            })}
          </div>

          <div className="flex flex-1 justify-end gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={showPreviousProject}
              aria-label="Projet précédent"
              className="rounded-full bg-muted text-foreground hover:bg-secondary-hover"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={showNextProject}
              aria-label="Projet suivant"
              className="rounded-full bg-muted text-foreground hover:bg-secondary-hover"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
