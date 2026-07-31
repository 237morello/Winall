import Image from "next/image";
import { Container } from "@/components/features/container";
import type { MarketingService } from "../../marketing.types";
import { getToolLogo } from "../../tool-logos";
import { SectionHeading } from "./section-heading";

interface ServiceToolsProps {
  service: MarketingService;
}

function ToolItem({ tool }: { tool: string }) {
  const brand = getToolLogo(tool);

  if (brand) {
    return (
      <li className="flex shrink-0 items-center" title={brand.label}>
        <Image
          src={brand.logo}
          alt={brand.label}
          width={40}
          height={40}
          className="h-9 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
        />
      </li>
    );
  }

  return (
    <li className="shrink-0 whitespace-nowrap text-sm font-medium text-foreground">
      {tool}
    </li>
  );
}

/**
 * §8 — Outils & équipements : `tools` en bandeau défilant vers la gauche,
 * sans bordure ni fond coloré. Section masquée si le service ne déclare
 * aucun outil.
 */
export function ServiceTools({ service }: ServiceToolsProps) {
  if (service.tools.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="outils-heading" className="py-20 sm:py-24">
      <Container size="8xl">
        <SectionHeading
          id="outils-heading"
          eyebrow="Nos moyens"
          title={
            <>
              Les <span className="text-primary">outils</span> que nous mettons en
              œuvre
            </>
          }
          lead="Des moyens standards du métier, pour des livrables fiables et repris sans dépendance."
        />
      </Container>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee-left items-center gap-14 hover:[animation-play-state:paused]">
          {[...service.tools, ...service.tools].map((tool, index) => (
            <ToolItem key={`${tool}-${index}`} tool={tool} />
          ))}
        </ul>
      </div>
    </section>
  );
}
