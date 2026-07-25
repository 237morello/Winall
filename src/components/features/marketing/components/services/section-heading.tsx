import type { ReactNode } from "react";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  /** Titre — le JSX permet d'accentuer un mot avec <span className="text-primary">. */
  title: ReactNode;
  lead?: string;
  align?: "center" | "start";
  className?: string;
  id?: string;
}

/**
 * En-tête de section réutilisé par toutes les sections « catalogue » des
 * pages service (§4 → §9). Centré par défaut, aligné à gauche sur demande.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading id={id} level={2} className="mt-3">
        {title}
      </Heading>
      {lead && <Lead className={cn("mt-5", centered && "mx-auto")}>{lead}</Lead>}
    </div>
  );
}

/**
 * Découpe un titre en deux parties pour le rendu bicolore du hero :
 * la seconde partie (après la dernière virgule, ou la moitié des mots)
 * est destinée à recevoir la couleur primaire.
 */
export function splitAccentTitle(title: string): [string, string] {
  const commaIndex = title.lastIndexOf(",");
  if (commaIndex > 0 && commaIndex < title.length - 1) {
    return [title.slice(0, commaIndex + 1), title.slice(commaIndex + 1).trim()];
  }

  const words = title.split(" ");
  if (words.length < 4) {
    return [title, ""];
  }

  const cut = Math.ceil(words.length / 2);
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
}
