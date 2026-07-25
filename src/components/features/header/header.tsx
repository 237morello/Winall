"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { MARKETING_CONTACT } from "@/components/features/marketing/marketing.constants";
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
            <a
              href={MARKETING_CONTACT.phoneHref}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "hidden sm:inline-flex",
              })}
            >
              <Phone className="size-4" aria-hidden="true" />
              {MARKETING_CONTACT.phone}
            </a>
            <Link
              href={`${pathname}#contact`}
              className={buttonVariants({ size: "sm" })}
            >
              Contact
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
}
