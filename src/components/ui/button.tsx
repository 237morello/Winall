import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline: "border border-border bg-background text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
  link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "size-11 p-0",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    buttonVariantClasses[variant],
    variant !== "link" && buttonSizeClasses[size],
    className
  );
}

function isReactElementWithClassName(
  child: React.ReactNode
): child is React.ReactElement<{ className?: string }> {
  return React.isValidElement(child);
}

export function Button({
  asChild = false,
  className,
  variant = "default",
  size = "default",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (asChild) {
    if (!isReactElementWithClassName(children)) {
      return null;
    }

    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
