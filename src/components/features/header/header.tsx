"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LogoHeader,
  PAGE_NAV_HEADERS,
  ROUTE_INTERNAL_NAV_GROUPS,
} from "./header.constant";
import type { NavHeaderProps, RouteInternalNavGroup } from "./header.types";
import { useWindowSize } from "@/hooks/use-mobile";

function getHrefPath(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname;
  }

  const [path] = href.split("#");

  return path || "/";
}

function getHrefHash(href: string) {
  const hash =
    href.split("#")[1] ?? (href.startsWith("#") ? href.slice(1) : "");

  return hash ? `#${hash}` : "";
}

function isRouteGroupMatch(pathname: string, group: RouteInternalNavGroup) {
  if (group.match === "exact") {
    return pathname === group.route;
  }

  return pathname.startsWith(group.route);
}

function getInternalLinks(pathname: string): NavHeaderProps {
  return (
    ROUTE_INTERNAL_NAV_GROUPS.find((group) =>
      isRouteGroupMatch(pathname, group),
    )?.links ?? []
  );
}

function isRouteActive(pathname: string, href: string, activeHash: string) {
  const hrefPath = getHrefPath(href, pathname);
  const hrefHash = getHrefHash(href);

  if (hrefHash) {
    return pathname === hrefPath && activeHash === hrefHash;
  }

  if (hrefPath === "/") {
    return pathname === "/";
  }

  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

function navLinkClass(isActive: boolean) {
  return cn(
    "group/nav-link inline-flex h-10 items-center gap-1 px-3 text-sm font-medium transition-colors",
    isActive
      ? "text-destructive"
      : "text-muted-foreground hover:text-destructive",
  );
}

function navTextClass(isActive: boolean) {
  return cn(
    "border-b-[3px] pb-0.5 transition-colors",
    isActive
      ? "border-destructive"
      : "border-transparent group-hover/nav-link:border-destructive/70",
  );
}

export function Header() {
  const pathname = usePathname();
  const topMarkerRef = useRef<HTMLDivElement | null>(null);
  const [activeHash, setActiveHash] = useState("");
  const [isTopMarkerVisible, setIsTopMarkerVisible] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const internalLinks = getInternalLinks(pathname);
  const shouldShowInternalLinks =
    !isTopMarkerVisible && internalLinks.length > 0;
  const visibleNavLinks = shouldShowInternalLinks
    ? internalLinks
    : PAGE_NAV_HEADERS;
  const width = useWindowSize();
  const logoSrc = useMemo(() => {
    if (width === 0) return LogoHeader.path.logo2 as string;
    return width < 640
      ? (LogoHeader.path.logo1 as string)
      : (LogoHeader.path.logo2 as string);
  }, [width]);

  useEffect(() => {
    function syncActiveHash() {
      setActiveHash(window.location.hash);
    }

    syncActiveHash();
    window.addEventListener("hashchange", syncActiveHash);

    return () => window.removeEventListener("hashchange", syncActiveHash);
  }, [pathname]);

  // Ferme le tiroir mobile lors d'un changement de page.
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Ferme le tiroir mobile avec Échap.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileNavOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const marker = topMarkerRef.current;

    if (!marker) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry) {
          return;
        }

        setIsTopMarkerVisible(
          entry.isIntersecting && entry.intersectionRatio >= 0.01,
        );
      },
      { threshold: [0, 0.01] },
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={topMarkerRef}
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
        <Container
          className="flex h-16 items-center justify-between"
          size="8xl"
        >
          <Link
            href="/"
            className="flex items-center"
            aria-label="Accueil Winall Tech Sarl"
          >
            <Image
              src={logoSrc}
              alt={LogoHeader.alt}
              width={150}
              height={50}
              priority
              className="size-10 sm:size-50  object-contain"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navigation principale"
          >
            {visibleNavLinks.map((item) => {
              const isActive = isRouteActive(pathname, item.href, activeHash);
              const dropdownItems = shouldShowInternalLinks
                ? undefined
                : item.itemsLists;

              return (
                <div
                  key={`${shouldShowInternalLinks ? "internal" : "page"}-${item.id}`}
                  className="group relative"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      navLinkClass(isActive),
                      dropdownItems && "pr-2",
                    )}
                  >
                    <span className={navTextClass(isActive)}>
                      {item.libelle}
                    </span>
                    {dropdownItems ? (
                      <ChevronDown className="size-4" aria-hidden="true" />
                    ) : null}
                  </Link>

                  {dropdownItems ? (
                    <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-xl border border-border bg-card p-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {dropdownItems.map((subItem) => {
                        const isSubItemActive = isRouteActive(
                          pathname,
                          subItem.href,
                          activeHash,
                        );

                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              "group/sub-link block px-3 py-2 text-sm font-medium transition-colors",
                              isSubItemActive
                                ? "text-destructive"
                                : "text-muted-foreground hover:text-destructive",
                            )}
                          >
                            <span
                              className={cn(
                                "border-b-[3px] pb-0.5 transition-colors",
                                isSubItemActive
                                  ? "border-destructive"
                                  : "border-transparent group-hover/sub-link:border-destructive/70",
                              )}
                            >
                              {subItem.libelle}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`${pathname}#contact`}
              className={buttonVariants({ size: "sm" })}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav-panel"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "lg:hidden",
              })}
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {/* Tiroir de navigation mobile — remplace l'ancien bouton téléphone */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm transition-opacity lg:hidden",
          isMobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsMobileNavOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col overflow-y-auto border-l border-border bg-background shadow-2xl transition-transform duration-300 lg:hidden",
          isMobileNavOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Fermer le menu"
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4" aria-label="Navigation mobile">
          {PAGE_NAV_HEADERS.map((item) => (
            <div key={item.id}>
              <Link
                href={item.href}
                className="flex h-11 items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.libelle}
              </Link>
              {item.itemsLists ? (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                  {item.itemsLists.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className="flex h-9 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {subItem.libelle}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
