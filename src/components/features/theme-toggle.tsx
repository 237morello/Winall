/**
 * Mission : Composant UI réutilisable : theme-toggle permet de basculer entre le mode clair et sombre.
 */
"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/90 px-3 py-2 shadow-sm backdrop-blur"
    >
      <SunMedium className="size-4 text-amber-500" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Basculer entre le mode clair et sombre"
      />
      <MoonStar className="size-4 text-sky-600 dark:text-sky-400" />
    </motion.div>
  );
}
