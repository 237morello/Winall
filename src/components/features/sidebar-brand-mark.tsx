import Image from "next/image";
import { cn } from "@/lib/utils";

interface SidebarBrandMarkProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function SidebarBrandMark({
  className,
  imageClassName,
  priority = false,
}: SidebarBrandMarkProps) {
  return (
    <div
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-lg",
        "border border-primary/20 bg-white shadow-sm shadow-primary/10 ring-1 ring-black/5",
        "transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/35 group-hover:shadow-md group-hover:shadow-primary/15",
        "dark:border-white/10 dark:bg-white dark:ring-white/10",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-primary/5" />
      <Image
        src="/images/iconlogo.png"
        alt="Logo Winall Tech"
        width={42}
        height={34}
        priority={priority}
        className={cn(
          "relative z-10 h-auto w-[35px] object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]",
          imageClassName,
        )}
      />
    </div>
  );
}
