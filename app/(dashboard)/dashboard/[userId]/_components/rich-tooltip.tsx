/**
 * Mission : Composant UI : rich-tooltip fournit des info-bulles enrichies pour améliorer l'expérience utilisateur dans le dashboard.
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
        className="max-w-xs p-0"
      >
        <div className="space-y-2 p-3">
          {/* Titre */}
          <div className="font-medium text-sm">
            {title}
          </div>
          
          {/* Description */}
          {description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </div>
          )}
          
          {/* Raccourci clavier */}
          {shortcut && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Raccourci</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">{shortcut}</span>
              </kbd>
            </div>
          )}
          
          {/* Action */}
          {action && (
            <div className="pt-1 border-t">
              <button
                onClick={action.onClick}
                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
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

// Hook pour créer des tooltips riches pour les items de sidebar
export function useSidebarTooltip(item: {
  label: string
  description?: string
  shortcut?: string
}) {
  return {
    tooltip: (children: React.ReactNode) => (
      <RichTooltip
        title={item.label}
        description={item.description}
        shortcut={item.shortcut}
        side="right"
        align="start"
      >
        {children}
      </RichTooltip>
    )
  }
}
