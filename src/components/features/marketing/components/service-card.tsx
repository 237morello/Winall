"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getServiceBySlug } from "../marketing.constants";
import type { ServiceSlug } from "../marketing.types";

interface ServiceCardProps {
  slug: ServiceSlug;
}

export function ServiceCard({ slug }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const service = getServiceBySlug(slug);

  if (!service) return null;

  const Icon = service.icon;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--rx", `${((0.5 - py) * 8).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${((px - 0.5) * 10).toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "service-tilt-card group relative flex h-full flex-col overflow-hidden",
        "rounded-xl border border-border bg-card p-6",
        "transition-[border-color,box-shadow] duration-300 ease-out",
      )}
    >
      <span
        aria-hidden="true"
        className="service-tilt-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="relative inline-flex size-11 items-center justify-center rounded-[10px] bg-accent text-primary transition-[background-color,color,transform] duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-[22px]" aria-hidden="true" />
      </span>

      <h3 className="mt-4 text-[16.5px] font-semibold tracking-tight text-foreground">
        {service.title}
      </h3>
      <Text className="mt-2 text-[13.5px] leading-relaxed">{service.tagline}</Text>

      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-colors hover:text-primary-hover"
      >
        Voir les projets
        <ArrowRight
          className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>

      <span
        aria-hidden="true"
        className="service-tilt-underline absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-[#df0a17] transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </div>
  );
}
