import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants, type ButtonVariant } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface HeroAction {
  label: string;
  href: string;
  variant?: ButtonVariant;
  withArrow?: boolean;
}

interface HeroStat {
  value: string;
  label: string;
}

interface PageHeroBandProps {
  eyebrow: string;
  /** Titre — accepte du JSX pour accentuer un mot (ex. <span className="text-destructive">). */
  title: ReactNode;
  lead: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
  /** Visuel latéral (ex. <ImageMosaic />). */
  media?: ReactNode;
  className?: string;
}

/**
 * Hero clair et élégant, réutilisé par /services et /projets :
 * fond dégradé clair, texte foncé, CTAs, chips de stats et collage latéral.
 */
export function PageHeroBand({
  eyebrow,
  title,
  lead,
  actions = [],
  stats = [],
  media,
  className,
}: PageHeroBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background",
        className,
      )}
    >
      <Container
        size="8xl"
        className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
      >
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading level={1} className="mt-4">
            {title}
          </Heading>
          <Lead className="mt-6">{lead}</Lead>

          {actions.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={buttonVariants({
                    variant: action.variant ?? "default",
                    size: "lg",
                    className: "w-fit",
                  })}
                >
                  {action.label}
                  {action.withArrow !== false && (
                    <ArrowRight className="size-4" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-semibold text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {media && <div className="hidden lg:block">{media}</div>}
      </Container>
    </section>
  );
}
