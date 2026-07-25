"use client";

import { useEffect, useRef, useState } from "react";

type HeaderState = "top" | "scroll-down" | "scroll-up" ;

export function useScrollHeader() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<HeaderState>("top");

  const isAtTop = useRef(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // (A) Intersection Observer : sait UNIQUEMENT si on est tout en haut
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isAtTop.current = entry.isIntersecting;
        if (entry.isIntersecting) setState("top");
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // (B) Scroll listener léger : sait la DIRECTION, utile seulement si on n'est plus en haut
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (!isAtTop.current) {
          const scrollingDown = currentY > lastScrollY.current;
          setState(scrollingDown ? "scroll-down" : "scroll-up");
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { sentinelRef, state };
}
