import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 text-center text-zinc-950">
      <div className="max-w-md">
        <div className="mx-auto flex size-20 items-center justify-center rounded-md bg-zinc-100 text-[#204222]">
          <FileQuestion className="size-10" />
        </div>
        <h1 className="mt-8 text-3xl font-bold">Page introuvable</h1>
        <p className="mt-4 text-zinc-600">
          La ressource demandee n&apos;existe plus ou a ete deplacee.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-[#204222] px-5 text-sm font-bold text-white transition hover:bg-[#2b4b2d]"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
