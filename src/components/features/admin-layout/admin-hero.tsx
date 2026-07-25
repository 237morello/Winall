import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminHeroProps } from "./admin-layout.types";
import { Heading, Text } from "@/components/ui/typography";

const CHANGE_COLORS: Record<"positive" | "negative" | "neutral", string> = {
  positive: "text-primary",
  negative: "text-destructive",
  neutral: "text-muted-foreground",
};

export function AdminHero({
  titlePrimary,
  titleSecondary,
  icon: Icon,
  badges = [],
  actions = [],
  tabs = [],
  stats = [],
}: AdminHeroProps) {
  return (
    <div className="space-y-6">
      {/* Header section (Titre, Badges, Boutons) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-5 text-primary" aria-hidden="true" />
            </div>
          )}
          <div className="">
            <div className="flex flex-col items-start p-0  "
            >
              <Heading level={3}>{titlePrimary}</Heading>
              <Text>{titleSecondary}</Text>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
          {badges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <Badge key={idx} variant={badge.variant || "outline"} className={cn("shrink-0 gap-1", badge.className)}>
                {badge.dotColor && <span className={cn("size-1.5 rounded-full", badge.dotColor)} />}
                {BadgeIcon && <BadgeIcon className="size-3" />}
                {badge.label}
              </Badge>
            );
          })}
          {actions.map((action, idx) => {
            const ActionIcon = action.icon;
            if (action.href) {
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={buttonVariants({ variant: action.variant || "default", size: "sm", className: "shrink-0" })}
                >
                  {action.label}
                  {ActionIcon && <ActionIcon className="ml-1.5 size-3.5" />}
                </Link>
              );
            }
            return (
              <button
                key={idx}
                onClick={action.onClick}
                className={buttonVariants({ variant: action.variant || "default", size: "sm", className: "shrink-0" })}
              >
                {action.label}
                {ActionIcon && <ActionIcon className="ml-1.5 size-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs horizontaux */}
      {tabs.length > 0 && (
        <div className="flex items-center gap-6 overflow-x-auto border-b border-border text-sm font-medium">
          {tabs.map((tab, idx) => {
            const className = cn(
              "whitespace-nowrap border-b-2 pb-3 transition-colors",
              tab.isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            );
            return tab.href ? (
              <Link key={idx} href={tab.href} className={className}>
                {tab.label}
              </Link>
            ) : (
              <button key={idx} className={className}>
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Stat Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                    {StatIcon && (
                      <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <StatIcon className="size-4" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-3xl font-medium tracking-tight text-foreground">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <div
                      className={cn(
                        "mt-3 flex items-center gap-1.5 text-xs font-medium",
                        CHANGE_COLORS[stat.changeType ?? "neutral"],
                      )}
                    >
                      {stat.changeType === "positive" && <TrendingUp className="size-3" />}
                      {stat.changeType === "negative" && <TrendingDown className="size-3" />}
                      {(!stat.changeType || stat.changeType === "neutral") && (
                        <Minus className="size-3" />
                      )}
                      {stat.change}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
