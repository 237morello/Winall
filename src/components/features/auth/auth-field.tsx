"use client";

import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFieldProps {
  id: string;
  name: string;
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon: LucideIcon;
  /** Style « code d'accès » (accent rouge) pour le pass partagé. */
  accent?: boolean;
}

/**
 * Champ de formulaire d'auth : icône à gauche, et bouton œil pour les
 * champs mot de passe / pass. Partagé par la connexion et l'inscription.
 */
export function AuthField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  icon: Icon,
  accent = false,
}: AuthFieldProps) {
  const isSecret = type === "password";
  const [revealed, setRevealed] = useState(false);
  const inputType = isSecret && revealed ? "text" : type;

  return (
    <div className="grid gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <Icon
          className={cn(
            "pointer-events-none absolute left-3 size-4",
            accent ? "text-destructive" : "text-muted-foreground",
          )}
          aria-hidden
        />
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-label={label ? undefined : placeholder}
          className={cn(
            "h-11 w-full rounded-md border bg-background pl-10 text-sm outline-none transition placeholder:text-muted-foreground/70",
            isSecret ? "pr-11" : "pr-4",
            accent
              ? "border-destructive/25 tracking-[0.14em] focus:border-destructive focus:ring-2 focus:ring-destructive/15"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/15",
          )}
        />
        {isSecret && (
          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            aria-label={revealed ? "Masquer" : "Afficher"}
            className="absolute right-2 flex size-8 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
          >
            {revealed ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
