import type { ReactNode } from "react";
import { Headphones, Package, Star, Trophy, type LucideIcon } from "lucide-react";
import { Container } from "@/components/features/container";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type {
  ServiceBusinessBenefit,
  ServiceKeyStat,
} from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceWhyProps {
  stats: ServiceKeyStat[];
  benefits: ServiceBusinessBenefit[];
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  tint?: boolean;
}

const WHY_ICONS: LucideIcon[] = [Trophy, Star, Headphones, Package];

/**
 * §6 — Pourquoi Winall : quatre stat-cards appariant un chiffre clé (keyStats)
 * et un bénéfice business (businessBenefits). Réutilisé par la page /services.
 */
export function ServiceWhy({
  stats,
  benefits,
  eyebrow = "Pourquoi nous",
  title = (
    <>
      Pourquoi choisir <span className="text-primary">Winall Tech</span> ?
    </>
  ),
  lead = "Des engagements chiffrés, pas des promesses.",
  tint = false,
}: ServiceWhyProps) {
  const cards = benefits.slice(0, 4).map((benefit, index) => ({
    value: stats[index]?.value,
    category: benefit.category,
    description: benefit.description,
    Icon: WHY_ICONS[index % WHY_ICONS.length],
  }));

  return (
    <section
      aria-labelledby="pourquoi-heading"
      className={tint ? "bg-zinc-50 py-20 sm:py-24" : "py-20 sm:py-24"}
    >
      <Container size="8xl">
        <SectionHeading
          id="pourquoi-heading"
          eyebrow={eyebrow}
          title={title}
          lead={lead}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.category} className="text-center">
              <CardContent className="flex flex-col items-center gap-2.5 p-6">
                {card.value && (
                  <span className="text-3xl font-semibold tabular-nums tracking-tight text-primary">
                    {card.value}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 font-medium text-foreground">
                  <card.Icon className="size-4 text-primary" aria-hidden="true" />
                  {card.category}
                </span>
                <Text>{card.description}</Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
