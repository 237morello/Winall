/**
 * MISSION : Composant Dashboard — DashboardBreadcrumbs gère le fil d'Ariane.
 */
"use client"

import { usePathname } from "next/navigation"
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  project: "Projets",
  clients: "Clients",
  quotes: "Devis",
  invoices: "Factures",
  chat: "Messages",
  notifications: "Notifications",
  settings: "Paramètres"
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname()
  
  // Extraire les segments et ignorer l'ID utilisateur pour le fil d'ariane
  const segments = pathname.split("/").filter(Boolean)
  const items = []

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // On saute l'ID utilisateur (souvent un UUID ou un slug)
    const isUserId = index === 1 && segments[0] === "dashboard"
    if (isUserId) return

    const label = breadcrumbMap[segment] || segment
    const isLast = index === segments.length - 1

    items.push({
      label,
      href: currentPath,
      isLast
    })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs md:text-sm font-medium">
        {items.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="text-foreground font-bold">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={item.href}
                  className="text-muted-foreground hover:text-p transition-colors"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator className="opacity-40" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

import React from "react"
