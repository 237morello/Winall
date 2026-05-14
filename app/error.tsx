"use client";

/**
 * @file error.tsx
 * @description Gestionnaire d'erreurs global de l'application.
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { AlertCircle, RefreshCcw } from "lucide-react";

/**
 * @interface ErrorProps
 * @description Propriétés reçues par le composant Error de Next.js.
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log de l'erreur pour le monitoring
    console.error("Détails de l'erreur Winall:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 rounded-full bg-destructive/10 p-6 text-destructive">
        <AlertCircle size={64} />
      </div>

      <div className="max-w-xl space-y-6">
        <Typography variant="h2" className="text-3xl font-bold tracking-tight">
          Une erreur est survenue
        </Typography>

        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-left">
          <Typography variant="p" className="mb-2 font-bold text-destructive">
            Diagnostic technique :
          </Typography>
          <code className="block overflow-x-auto text-sm text-muted-foreground whitespace-pre-wrap">
            {error.message || "Erreur inconnue dans l'exécution de l'application."}
            {error.stack && (
              <span className="mt-4 block text-[10px] border-t border-destructive/10 pt-4">
                Origine probable : {error.stack.split("\n")[0]}
              </span>
            )}
          </code>
        </div>

        <Typography variant="p" className="text-muted-foreground">
          Nos techniciens ont été notifiés. Vous pouvez essayer de rafraîchir la section ou revenir à l&apos;accueil.
        </Typography>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => reset()}
            className="rounded-full px-8 gap-2"
          >
            <RefreshCcw size={18} />
            Réessayer
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/")}
            className="rounded-full px-8"
          >
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
