/**
 * Mission : Composant UI réutilisable : theme-toggle permet de basculer entre le mode clair et sombre.
 * Note : Utilise uniquement Tailwind CSS pour les animations, pas de motion/react.
 */
"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/90 px-3 py-2 text-foreground shadow-sm shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-card/80 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <SunMedium className="size-4 text-amber-500" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Basculer entre le mode clair et sombre"
      />
      <MoonStar className="size-4 text-sky-600 dark:text-sky-400" />
    </div>
  );
}
