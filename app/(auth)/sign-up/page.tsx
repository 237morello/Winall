import React from 'react'
import Image from "next/image";
import Link from 'next/link'
import {SocialButton} from "../components/social-button.tsx"
import {Typography} from "@/components/ui/typography.tsx"

export default function SignUp() {

  return (
    <div className="w-full" >
      <div className="min-h-screen flex flex-col justify-center items-center space-y-4">
        <div>
           {/* logo */}
           <Image src="/images/logo_v2.png" width={100} height={100} alt="logo-site" />
        </div>
        {/* tete */}
        <div> </div>
        {/* provider */}
        <div className="flex flex-col justify-center items-center gap-2">
          <SocialButton />
          <SocialButton variant="github"/>
        </div>
        {/* sign up */}
        <div className="mt-3">
          <Typography variant="muted">
            vous avez-deja un compte ? | 
            <Typography variant="muted" className="font-medium">
              <Link href="/log-in">log-in</Link>
            </Typography>
          </Typography>
        </div>
      </div>
    </div>
  )
}
