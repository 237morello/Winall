"use client";

import { useState } from "react";
import { Container } from "../../container";
import {Heading , Eyebrow, Lead } from "@/components/ui/typography";
import { MARKETING_SERVICES } from "../marketing.constants";
import { ServiceDetailPanel } from "./services/service-detail-panel";

export function ServicesSection({ services }: { services: typeof MARKETING_SERVICES }) {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const activeService = services.find((s) => s.slug === activeSlug) ?? services[0];

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-muted py-20 sm:py-24">
      <Container size="8xl">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <Heading id="services-heading" level={2} className="mt-3">
            Une offre structurée autour des projets réalisés par domaine.
          </Heading>
          <Lead className="mt-5">
            Sélectionnez un domaine pour voir ses livrables, ses points de
            contrôle et les réalisations associées.
          </Lead>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sélecteur de domaines - liste compacte, jamais de scroll */}
          <div
            role="tablist"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {services.map((service) => {
              const isActive = service.slug === activeSlug;
              return (
                <button
                  key={service.slug}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${service.slug}`}
                  id={`tab-${service.slug}`}
                  onClick={() => setActiveSlug(service.slug)}
                  className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors lg:shrink ${
                    isActive
                      ? "border-[#204222] bg-[#204222]/5 text-[#204222]"
                      : "border-[#e4e4e7] bg-white text-[#71717a] hover:border-[#204222]/30"
                  }`}
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          {/* Panneau de détail - un seul à la fois */}
          <div
            role="tabpanel"
            id={`panel-${activeService.slug}`}
            aria-labelledby={`tab-${activeService.slug}`}
            key={activeService.slug}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300"
          >
            <ServiceDetailPanel service={activeService} />
          </div>
        </div>
      </Container>
    </section>
  );
}