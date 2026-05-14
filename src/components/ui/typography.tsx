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
    h1: "font-noteSansJp text-4xl md:text-5xl font-semibold tracking-tight leading-tight",
    h2: "font-noteSansJp text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
    h3: "font-noteSansJp text-2xl md:text-3xl font-semibold  leading-snug",
    h4: "font-noteSansJp text-xl md:text-2xl font-semibold  leading-snug",
    h5: "font-noteSansJp text-lg  font-medium  leading-normal",
    p: "font-noteSansJp text-base    leading-relaxed text-g-300",
    div: "font-noteSansJp  leading-relaxed",
    span: "font-noteSansJp  ",
    muted: "font-noteSansJp text-sm text-g  leading-relaxed",
    small: "font-noteSansJp text-sm text-g-200  leading-normal",
    lead: "font-noteSansJp text-lg text-g  leading-relaxed",
    code: "font-noteSansJp text-sm  bg-gray-100 px-1 py-0.5 rounded",
  }

  return (
    <Component className={cn(styles[variant], className)}>
      {children}
    </Component>
  )
}
