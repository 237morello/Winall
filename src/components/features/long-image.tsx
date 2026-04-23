/**
 * Mission : Composant UI reutilisable : $base pour construire l'interface de facon coherente.
 */
"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageProps {
  image: string;
  size?: {
    width: number;
    height: number;
  };
  text?: string;
  className?: string
}

export const ImageTall = ({
  image,
  size = { width: 350, height: 450 },
  text = "Plus Detail",
  className
}: ImageProps) => {
  return (
    <section
      className={cn(
        "group relative mb-4 overflow-hidden rounded-lg border border-g-100 mx-auto md:mx-none", className
      )}
      style={{
        width: `${size.width}px`, 
        minHeight: `${size.height}px`,
      }}
    >
      <Image src={`/images/${image}`} fill alt="text" className=" w-full" />
      <div
        className="
      absolute inset-0 flex items-end bg-black/0 p-3 transition-all duration-300 
      group-hover:bg-black/50
      "
      >
        <span
          className="
        text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100
        "
        >
          {text}
        </span>
      </div>
    </section>
  );
};
