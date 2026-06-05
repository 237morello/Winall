/**
 * @file not-found.tsx
 * @description Page 404 personnalisée pour Winall Tech.
 */

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center p-6 text-center bg-background">
      <div className="mb-8 rounded-full bg-primary/5 p-8 text-primary/40">
        <FileQuestion size={80} strokeWidth={1.5} />
      </div>

      <div className="max-w-md space-y-6">
        <Typography variant="h1" className="text-4xl font-extrabold tracking-tight">
          Page introuvable
        </Typography>

        <Typography variant="p" className="text-muted-foreground text-lg">
          Désolé, la ressource que vous recherchez semble avoir été déplacée ou n&apos;existe plus.
        </Typography>

        <div className="pt-6">
          <Button asChild size="lg" className="rounded-full px-10 h-14 font-bold shadow-lg shadow-primary/20">
            <Link href="/">
              Retourner à l&apos;accueil
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Accent design discret */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
