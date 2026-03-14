"use client"
import React from 'react'
import {Button} from "@/components/ui/button"
import {Typography} from "@/components/ui/typography"


type Variant = "github" | "google"
interface ButtonProps {
  variant? : Variant
}

export const SocialButton = ({variant = "google"}:ButtonProps) => {

  return (
    <div>
      <Button variant="ghost">
        {variant === "google" ? (
          <div className="flex items-center gap-2">
           {/*<svg > </svg>*/}
           <Typography variant="span"> continuer avec google</Typography>
          </div>
        ) : 
        (
          <div className="flex items-center gap-2">
            {/*<svg > </svg>*/}
            <Typography variant="span"> continuer avec github</Typography>
            <div></div>
          </div>
        )
        }
      </Button>
    </div>
  )
}