"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound, Lock, Mail } from "lucide-react";
import { AuthTabs } from "@/components/features/auth/auth-tabs";
import { AuthField } from "@/components/features/auth/auth-field";
import { toast } from "@/components/ui/toast";

export default function LogInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    formData.set("callbackUrl", callbackUrl);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    if (response.redirected) {
      toast.success("Connexion réussie. Redirection…");
      router.push(response.url);
      router.refresh();
      return;
    }

    setPending(false);
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    toast.error(payload?.error || "Connexion impossible.");
  }

  return (
    <div className="flex flex-col">
      <AuthTabs />

      <div className="mt-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
          Contrôle d&apos;accès
        </p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
          Connexion administrateur
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="admin@winall.local"
          autoComplete="email"
          icon={Mail}
        />
        <AuthField
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          icon={Lock}
        />

        <div className="rounded-lg border border-destructive/15 bg-destructive/[0.04] p-3">
          <p className="flex items-center gap-2 text-xs font-semibold text-destructive">
            <KeyRound className="size-3.5" aria-hidden />
            Pass d&apos;accès Winall
          </p>
          <p className="mb-2 ml-[1.45rem] text-[0.7rem] leading-snug text-destructive/80">
            Clé partagée de l&apos;équipe. Sans elle, la connexion est refusée.
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
          {pending ? "Vérification…" : "Ouvrir l'accès"}
          {!pending && <ArrowRight className="size-4" aria-hidden />}
        </button>
      </form>
    </div>
  );
}
