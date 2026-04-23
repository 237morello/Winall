/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Shield, Sparkles, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FancyCardProps {
  title: string;
  description: string;
  image?: string;
  logo?: React.ReactNode;
  gradient?: "blue" | "purple" | "emerald" | "orange";
  jobDescription?: string;
  skills?: string[];
  benefits?: string[];
}

const gradients = {
  blue: "from-blue-500/20 via-cyan-400/10 to-transparent",
  purple: "from-violet-500/20 via-purple-400/10 to-transparent",
  emerald: "from-emerald-500/20 via-teal-400/10 to-transparent",
  orange: "from-orange-500/20 via-amber-400/10 to-transparent",
};

export const FancyCard = ({
  title,
  description,
  image,
  logo,
  gradient = "blue",
  jobDescription,
  skills = [],
  benefits = [],
}: FancyCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsHovering(false), 100);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setTimeout(() => {
        if (cardRef.current?.matches(":hover")) setIsHovering(true);
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="relative overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-500 ease-out hover:shadow-2xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-2xl bg-gradient-to-br from-muted to-transparent opacity-50 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-32 w-32 rounded-2xl bg-gradient-to-tr from-muted/80 to-transparent opacity-50 blur-xl" />

        <CardHeader className="relative z-10 pb-4">
          <div className="flex flex-col items-center gap-4">
            {logo ? (
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute inset-0 rotate-6 rounded-2xl bg-gradient-to-br from-muted to-background blur-sm" />
                <Button
                  size="icon-lg"
                  variant="outline"
                  className="relative shrink-0 border-border/60 bg-background/80 shadow-sm backdrop-blur-sm hover:border-border hover:bg-background"
                >
                  {logo}
                </Button>
              </motion.div>
            ) : null}

            <CardTitle className="text-center font-semibold tracking-tight text-foreground">
              {title}
            </CardTitle>
          </div>

          <CardDescription className="text-center leading-relaxed text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="h-2" />

        <AnimatePresence>
          {isHovering ? (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center bg-background/60"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative z-20"
              >
                <AlertDialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="lg"
                      className="group/btn bg-foreground text-background shadow-xl transition-all duration-300 hover:scale-105 hover:bg-foreground/90"
                    >
                      <span className="mr-2">DÃ©couvrir</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
                    <AlertDialogHeader className="sr-only">
                      <AlertDialogTitle>{title}</AlertDialogTitle>
                      <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="grid gap-0 lg:grid-cols-2">
                      <div className="relative h-64 bg-gradient-to-br from-muted/60 to-background lg:h-auto lg:min-h-[600px]">
                        {image ? (
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                          />
                        ) : null}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        <div className="absolute top-6 left-6 rounded-full border border-border/60 bg-background/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground/80">
                              Expertise
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 p-8 lg:p-12">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-muted to-background">
                              {logo}
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                {title}
                              </h2>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Profession spÃ©cialisÃ©e
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Zap className="h-5 w-5 text-muted-foreground" />
                            Mission principale
                          </h3>
                          <p className="leading-relaxed text-muted-foreground">
                            {jobDescription ||
                              "Cette profession joue un rÃ´le essentiel dans la rÃ©ussite des projets modernes, en combinant expertise technique et vision stratÃ©gique."}
                          </p>
                        </div>

                        {skills.length > 0 ? (
                          <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                              <Shield className="h-5 w-5 text-muted-foreground" />
                              CompÃ©tences clÃ©s
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {skills.map((skill, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm text-foreground/85"
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {benefits.length > 0 ? (
                          <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                              <TrendingUp className="h-5 w-5 text-muted-foreground" />
                              BÃ©nÃ©fices
                            </h3>
                            <div className="space-y-2">
                              {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/60" />
                                  <span className="text-sm text-muted-foreground">
                                    {benefit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <AlertDialogFooter className="border-t border-border/60 px-8 pt-6 pb-8 lg:px-12 lg:pb-12">
                      <AlertDialogCancel className="rounded-lg border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        Fermer
                      </AlertDialogCancel>
                      <AlertDialogAction className="rounded-lg bg-foreground text-background shadow-lg transition-all duration-200 hover:bg-foreground/90 hover:shadow-xl">
                        Postuler
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </div>
  );
};
