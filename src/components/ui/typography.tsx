import * as React from "react"


import { cn } from "@/lib/utils"

type Variant = "h1" | "h2"|"h3" | "h4" | "h5" | "p" | "div" | "span" | "muted" | "small" | "lead" | "code"

export interface TypographyProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode
}

export function Typography({
  variant = "p",
  className = "",
  children
}: TypographyProps) {
  const tagByVariant: Record<Variant, keyof React.JSX.IntrinsicElements> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    p: "p",
    div: "div",
    span: "span",
    muted: "p",
    small: "small",
    lead: "p",
    code: "code",
  };

  const Component = tagByVariant[variant];

  const styles = {
    h1: "font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl",
    h2: "font-sans text-3xl font-semibold leading-snug text-foreground md:text-4xl",
    h3: "font-sans text-2xl font-semibold leading-snug text-foreground md:text-3xl",
    h4: "font-sans text-xl font-semibold leading-snug text-foreground md:text-2xl",
    h5: "font-sans text-lg font-medium leading-normal text-foreground",
    p: "font-sans text-base leading-relaxed text-muted-foreground",
    div: "font-sans leading-relaxed",
    span: "font-sans",
    muted: "font-sans text-sm leading-relaxed text-muted-foreground",
    small: "font-sans text-sm leading-normal text-muted-foreground",
    lead: "font-sans text-lg leading-relaxed text-muted-foreground",
    code: "font-mono text-sm bg-muted px-1.5 py-0.5 rounded-md text-foreground",
  }

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  )
}
