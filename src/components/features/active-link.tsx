/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { Typography } from "../ui/typography"

interface ActiveLinkProps {
  href : string ,
  children : React.ReactNode
}

export const ActiveLink = ({href="/" , children}:ActiveLinkProps)=>{

  const pathname = usePathname()
  const isActive = useMemo(()=>{
      const active =   pathname === href ?  true : false

        return active
  },[href , pathname]) 
  
  return (
    <Link href={href}>
    <Typography variant="h5" className={cn(
      "font-normal transition-colors",
      isActive
        ? "font-medium text-foreground hover:text-foreground"
        : "text-muted-foreground hover:text-foreground"
    )}>{children}</Typography>
    </Link>
  )

} 
