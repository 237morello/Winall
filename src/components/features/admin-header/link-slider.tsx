"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const BurgerIcon = () => {
  const [openDiv, setOpenDiv] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        mainRef.current &&
        !mainRef.current.contains(event.target as Node)
      ) {
        setOpenDiv(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      {openDiv && (
        <div
          className="absolute inset-0 z-40 min-h-screen bg-gray-100/50 backdrop-blur-lg   backdrop-brightness-200"
          onClick={() => setOpenDiv(false)}
        />
      )}

      {/* Bouton + Sidebar */}
      <div ref={mainRef}>
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => setOpenDiv((value) => !value)}
          className="block md:hidden"
        >
          ☰
        </Button>

        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-90 bg-white shadow-xl transition-transform duration-300 ${
            openDiv ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 w-full">
            <div className="mb-8 space-y-3">
              <div className="flex justify-between items-center gap-3">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/iconlogo.png"
                    alt="Winall Tech Sarl"
                    width={200}
                    height={200}
                    priority
                    className="size-10 sm:size-40 object-contain "
                  />
                </Link>
                <Button 
                  onClick={()=> setOpenDiv(false)}
                  size="sm" variant="outline" className="text-[1rem] text-center">
                  x
                </Button>
              </div>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              <a href="/admin/systeme" className="rounded-md px-3 py-2 hover:bg-slate-100">Tableau de bord</a>
              <a href="/admin/systeme/publisher" className="rounded-md px-3 py-2 hover:bg-slate-100">Catalogue</a>
              <a href="/api/auth/logout" className="rounded-md px-3 py-2 text-destructive hover:bg-slate-100">Déconnexion</a>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};
