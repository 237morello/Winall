/**
 * MISSION : Composant Dashboard — DashboardNavbar gère l'en-tête mobile et les breadcrumbs.
 * Refonte : Minimaliste, laisse la place au design central.
 */
"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs"

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="flex h-16 items-center gap-4 px-4 md:px-8">
        <SidebarTrigger className="md:hidden" />
        <div className="hidden md:block">
          <DashboardBreadcrumbs />
        </div>
        <div className="flex-1" />
      </div>
    </header>
  )
}
