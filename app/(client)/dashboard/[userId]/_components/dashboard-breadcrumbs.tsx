/**
 * Mission : Composant du dashboard : dashboard-breadcrumbs gère la navigation fil d'Ariane pour l'espace utilisateur.
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

// Mapping des segments URL vers des labels lisibles
const breadcrumbMap: Record<string, string> = {
  dashboard: "Tableau de bord",
  project: "Projets",
  clients: "Clients",
  quotes: "Devis",
  invoices: "Factures",
  chat: "Chat",
  notifications: "Notifications",
  settings: "Paramètres"
}

// Mapping des chemins complets vers des labels personnalisés
const pathMap: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/project": "Projets",
  "/dashboard/clients": "Clients",
  "/dashboard/quotes": "Devis",
  "/dashboard/invoices": "Factures",
  "/dashboard/chat": "Chat",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings": "Paramètres"
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname()
  
  // Ne pas afficher les breadcrumbs sur la page dashboard principale
  if (pathname === "/dashboard") {
    return (
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">Tableau de bord</h1>
      </div>
    )
  }

  // Générer les breadcrumbs à partir du pathname
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = []

  // Ajouter le segment "dashboard" comme racine
  breadcrumbs.push({
    label: "Tableau de bord",
    href: "/dashboard",
    isActive: false
  })

  // Ajouter les segments suivants
  let currentPath = "/dashboard"
  segments.slice(1).forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.slice(1).length - 1
    
    breadcrumbs.push({
      label: pathMap[currentPath] || breadcrumbMap[segment] || segment,
      href: currentPath,
      isActive: isLast
    })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        {breadcrumbs.map((crumb) => (
          <div key={crumb.href} className="flex items-center">
            <BreadcrumbItem>
              {crumb.isActive ? (
                <BreadcrumbPage className="font-medium">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isActive && (
              <BreadcrumbSeparator className="mx-2" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
