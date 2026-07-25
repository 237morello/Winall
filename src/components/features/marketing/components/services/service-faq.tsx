import { ChevronDown } from "lucide-react";
import { Container } from "@/components/features/container";
import { Text } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceFaqProps {
  service: MarketingService;
}

/**
 * §11 — FAQ en accordéon, une seule colonne pour éviter les sauts de mise en
 * page à l'ouverture d'un panneau.
 */
export function ServiceFaq({ service }: ServiceFaqProps) {
  if (service.faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-24">
      <Container size="8xl">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions fréquentes"
          title={
            <>
              Vos questions, <span className="text-primary">nos réponses</span>
            </>
          }
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-4">
          {service.faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-border bg-card open:border-primary/30"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 marker:content-none">
                <p className="font-medium text-foreground">{faq.question}</p>
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-6 pb-6">
                <Text className="leading-7">{faq.answer}</Text>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
