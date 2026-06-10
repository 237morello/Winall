"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Erreur Winall:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-zinc-950">
      <div className="max-w-lg">
        <div className="mx-auto flex size-20 items-center justify-center rounded-md bg-red-50 text-[#df0a17]">
          <AlertCircle className="size-10" />
        </div>
        <h1 className="mt-8 text-3xl font-bold">Une erreur est survenue</h1>
        <p className="mt-4 text-zinc-600">
          La page n&apos;a pas pu etre affichee correctement. Vous pouvez reessayer
          ou revenir a l&apos;accueil.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#204222] px-5 text-sm font-bold text-white transition hover:bg-[#2b4b2d]"
        >
          <RefreshCcw className="size-4" />
          Reessayer
        </button>
      </div>
    </main>
  );
}
