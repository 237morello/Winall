"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import type { AdminHeaderUser } from "./admin-header.types";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks/use-mobile";
import { BurgerIcon } from "./link-slider";

const NAV_LINKS = [
  { href: "/admin/systeme", label: "Tableau de bord" },
  { href: "/admin/systeme/publisher", label: "Catalogue" },
];

interface CrumbItem {
  label: string;
  href?: string;
}

const PUBLISHER_BASE = "/admin/systeme/publisher";

/** Fil d'ariane dérivé du chemin — les 5 routes admin sont connues à l'avance. */
function getBreadcrumb(pathname: string): CrumbItem[] {
  if (pathname === "/admin/systeme") {
    return [{ label: "Tableau de bord" }];
  }
  if (pathname === PUBLISHER_BASE) {
    return [{ label: "Catalogue" }];
  }
  if (pathname === `${PUBLISHER_BASE}/nouveau`) {
    return [{ label: "Catalogue", href: PUBLISHER_BASE }, { label: "Nouveau projet" }];
  }
  if (pathname.endsWith("/edition")) {
    return [{ label: "Catalogue", href: PUBLISHER_BASE }, { label: "Modifier le projet" }];
  }
  if (pathname.endsWith("/publication")) {
    return [{ label: "Catalogue", href: PUBLISHER_BASE }, { label: "Publication" }];
  }
  return [{ label: "Tableau de bord" }];
}

function getInitial(user: AdminHeaderUser): { source: string; source2: string } {
  const source = user.name?.trim() || user.email.trim();
  const source2 = user.email.trim().split("@")[0].split(" ")[0] as string;

  return {
    source: source.slice(0, 1).toUpperCase(),
    source2: source2,
  };
}

export function AdminHeaderClient({ user }: { user: AdminHeaderUser }) {
  const { sentinelRef, state } = useScrollHeader();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const width = useWindowSize();
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <>
      <div ref={sentinelRef} style={{ position: "absolute", top: 0, height: 1, width: 1 }} />
      <header
        className={`relative sm:sticky top-0 sm:z-50 border-b border-border bg-zinc-100/70 backdrop-blur ${
          state === "top" ? "sm:translate-y-0" : "sm:translate-y-4"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src={cn(width < 550 ? "/images/iconlogo.png" : "/images/logo.png")}
                alt="Winall Tech Sarl"
                width={200}
                height={200}
                priority
                className="size-10 sm:size-40 object-contain "
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation admin">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/admin/systeme"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="rounded-full border border-border bg-muted p-1"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {getInitial(user).source}
                </span>
              </button>

              {open ? (
                <div className="absolute right-0 mt-3 w-[20rem] overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
                  <div className="border-b border-border p-4">
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-zinc-100 p-4">
                      <div className="flex size-14 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {getInitial(user).source}
                      </div>
                      <div className="min-w-0 text-center">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {getInitial(user).source2}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/api/auth/logout"
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      Se déconnecter
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
            <BurgerIcon />
          </div>
        </div>
      </header>

      {/* Fil d'ariane — repère de navigation, absent de l'espace admin auparavant */}
      <div className="border-b border-border bg-background">
        <nav
          aria-label="Fil d'ariane"
          className="mx-auto flex h-10 max-w-[88rem] items-center gap-1.5 px-4 text-xs text-muted-foreground sm:px-6 lg:px-8"
        >
          <span className="font-medium text-foreground">Admin</span>
          {breadcrumb.map((item, index) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-zinc-400" aria-hidden="true" />
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    index === breadcrumb.length - 1 && "font-medium text-foreground",
                  )}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
