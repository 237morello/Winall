"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Domain } from "./DomainGrid.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * MISSION : DomainCard — Composant premium affichant une expertise métier avec effets immersifs.
 */

interface DomainCardProps {
  domain: Domain;
  onClick?: () => void;
  className?: string;
  showDetails?: boolean;
  dialogContent?: React.ReactNode;
}

export const DomainCard = ({
  domain,
  onClick,
  className,
  showDetails = true,
  dialogContent,
}: DomainCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const CardContent = (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative h-full min-h-[380px] overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-8 transition-all duration-500",
        "hover:shadow-2xl hover:border-primary/20 cursor-pointer",
        domain.colors.glow,
        className
      )}
    >
      {/* Background Gradient Layer */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100",
          domain.colors.gradient
        )}
      />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] transition-all duration-500" />

      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 blur-3xl transition-all duration-700 group-hover:bg-primary/10" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header: Icon & Badge */}
        <div className="mb-8 flex items-start justify-start">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-100 group-hover:shadow-lg",
              domain.colors.iconBg,
              domain.colors.iconText
            )}
          >
            {domain.icon}
          </div>
          
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <Typography
            variant="h3"
            className="text-2xl font-black tracking-tighter transition-colors duration-300 group-hover:text-primary"
          >
            {domain.title}
          </Typography>
          
          <Typography
            variant="p"
            className="text-sm leading-relaxed text-muted-foreground/80 transition-colors duration-300 group-hover:text-foreground line-clamp-3"
          >
            {domain.description}
          </Typography>

          {/* Key Points (Revealed on Hover) */}
          <AnimatePresence>
            {(isHovered || !showDetails) && domain.keyPoints && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-6 space-y-2"
              >
                {domain.keyPoints.slice(0, 3).map((point) => (
                  <div key={point.id} className="flex items-center gap-2">
                    <CheckCircle2 className={cn("size-3.5", domain.colors.iconText)} />
                    <span className="text-xs font-bold text-muted-foreground">
                      {point.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer: CTA */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex -space-x-2">
             <div className="size-6 rounded-full border-2 border-background bg-primary/10" />
             <div className="size-6 rounded-full border-2 border-background bg-primary/20" />
          </div>

          <Button
            size="sm"
            className="group/btn h-10 rounded-lg px-5 font-bold shadow-xl transition-all hover:scale-105"
          >
            Explorer
            <ArrowUpRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  if (dialogContent) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {CardContent}
        </DialogTrigger>
        <DialogContent className="max-w-2xl rounded-[2rem] border-primary/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">{domain.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {dialogContent}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div onClick={onClick}>
      {CardContent}
    </div>
  );
};
