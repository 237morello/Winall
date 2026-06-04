/**
 * MISSION : Composant UI : rich-tooltip fournit des info-bulles enrichies pour le dashboard.
 */
"use client"

import * as React from "react"
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RichTooltipProps {
  children: React.ReactNode
  title: string
  description?: string
  shortcut?: string
  action?: {
    label: string
    onClick: () => void
  }
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function RichTooltip({
  children,
  title,
  description,
  shortcut,
  action,
  side = "top",
  align = "center"
}: RichTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent 
        side={side} 
        align={align}
        className="max-w-xs p-0 border border-border/50 bg-card/95 backdrop-blur"
      >
        <div className="space-y-2 p-3">
          <div className="font-bold text-sm text-foreground">
            {title}
          </div>
          
          {description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </div>
          )}
          
          {shortcut && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold">Raccourci</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-[10px]">{shortcut}</span>
              </kbd>
            </div>
          )}
          
          {action && (
            <div className="pt-2 border-t border-border/30">
              <button
                onClick={action.onClick}
                className="text-xs text-p hover:text-p/80 transition-colors font-bold"
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
