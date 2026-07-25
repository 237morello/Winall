"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, Lock, Mail, User } from "lucide-react";
import { AuthTabs } from "@/components/features/auth/auth-tabs";
import { AuthField } from "@/components/features/auth/auth-field";
import { toast } from "@/components/ui/toast";

export default function InscriptionPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; redirect?: string; error?: string }
      | null;

    if (response.ok && payload?.ok) {
      toast.success("Compte créé. Bienvenue !");
      router.push(payload.redirect || "/admin");
      router.refresh();
      return;
    }

    setPending(false);
    toast.error(payload?.error || "Inscription impossible.");
  }

  return (
    <div className="flex flex-col">
      <AuthTabs />

      <div className="mt-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
          Nouvel accès
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
          Inscription administrateur
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <AuthField
          id="name"
          name="name"
          label="Nom complet"
          type="text"
          placeholder="Prénom Nom"
          autoComplete="name"
          icon={User}
        />
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="vous@winall.local"
          autoComplete="email"
          icon={Mail}
        />
        <AuthField
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="8 caractères minimum"
          autoComplete="new-password"
          icon={Lock}
        />

        <div className="rounded-lg border border-destructive/15 bg-destructive/[0.04] p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-destructive">
            <KeyRound className="size-3.5" aria-hidden />
            Pass d&apos;accès Winall
          </p>
          <p className="mb-2 ml-[1.45rem] text-[0.7rem] leading-snug text-destructive/80">
            Obligatoire pour créer un compte administrateur.
          </p>
          <AuthField
            id="pass"
            name="pass"
            type="password"
            placeholder="Code d'accès"
            autoComplete="off"
            icon={KeyRound}
            accent
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Création…" : "Créer l'accès"}
          {!pending && <ArrowRight className="size-4" aria-hidden />}
        </button>
      </form>
    </div>
  );
}
