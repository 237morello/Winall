import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageMosaicProps {
  images: string[];
  className?: string;
}

/**
 * Collage décalé de 4 images pour les heros clairs (pages /services et /projets).
 * Robuste à un nombre variable d'images : complète en réutilisant les sources
 * disponibles pour toujours remplir les 4 tuiles.
 */
export function ImageMosaic({ images, className }: ImageMosaicProps) {
  const source = images.filter(Boolean);
  if (source.length === 0) return null;

  // Toujours 4 tuiles : on boucle sur les images disponibles.
  const tiles = Array.from({ length: 4 }, (_, i) => source[i % source.length]);

  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>
      {tiles.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={cn(
            "relative overflow-hidden rounded-2xl ring-1 ring-border shadow-sm",
            // Décalage vertical façon mosaïque + tuiles plus hautes en colonne 2
            index === 0 && "mt-6 aspect-[3/4]",
            index === 1 && "aspect-[3/4]",
            index === 2 && "aspect-[3/4]",
            index === 3 && "-mt-6 aspect-[3/4]",
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 240px, 40vw"
            className="object-cover"
            unoptimized={src.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        </div>
      ))}
    </div>
  );
}
