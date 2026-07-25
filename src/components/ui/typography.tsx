import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
}

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const classes = cn(
    "font-medium tracking-tight text-foreground",
    level === 1 && "text-4xl leading-tight sm:text-5xl lg:text-6xl",
    level === 2 && "text-3xl leading-tight sm:text-4xl",
    level === 3 && "text-xl leading-8",
    className
  );

  if (level === 1) {
    return <h1 className={classes} {...props} />;
  }

  if (level === 3) {
    return <h3 className={classes} {...props} />;
  }

  return <h2 className={classes} {...props} />;
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base leading-8 text-muted-foreground sm:text-lg", className)} {...props} />;
}

export function Text({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-7 text-muted-foreground", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-[0.24em] text-destructive",
        className
      )}
      {...props}
    />
  );
}
