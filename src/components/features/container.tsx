import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "7xl" | "8xl";
}

const containerSizeClasses: Record<
  NonNullable<ContainerProps["size"]>,
  string
> = {
  "7xl": "max-w-7xl",
  "8xl": "max-w-[88rem]",
};

export function Container({
  children,
  className,
  size = "7xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
