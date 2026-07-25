"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

const AUTO_DISMISS_MS = 4500;

let items: ToastItem[] = [];
let counter = 0;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ToastItem[] {
  return items;
}

function dismiss(id: number): void {
  items = items.filter((item) => item.id !== id);
  emit();
}

function push(type: ToastType, message: string): void {
  const id = (counter += 1);
  items = [...items, { id, type, message }];
  emit();
  setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
}

/** API impérative : toast.success("…") / toast.error("…"). */
export const toast = {
  success: (message: string) => push("success", message),
  error: (message: string) => push("error", message),
};

const EMPTY: ToastItem[] = [];

/** Conteneur des toasts. À monter une fois par arbre (ex. layout). */
export function Toaster() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4"
    >
      {current.map((item) => (
        <div
          key={item.id}
          role="status"
          className={cn(
            "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-background p-4 shadow-lg",
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2",
            item.type === "success" ? "border-primary/30" : "border-destructive/30",
          )}
        >
          {item.type === "success" ? (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          ) : (
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
          )}
          <p className="flex-1 text-sm leading-6 text-foreground">{item.message}</p>
          <button
            type="button"
            onClick={() => dismiss(item.id)}
            aria-label="Fermer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ))}
    </div>
  );
}
