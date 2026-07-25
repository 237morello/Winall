import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "neutral"
  | "warning";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border bg-background text-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-accent text-accent-foreground",
  neutral: "bg-muted text-muted-foreground",
  warning: "bg-amber-50 text-amber-700",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md px-3 py-1 text-xs font-medium",
        badgeVariantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
