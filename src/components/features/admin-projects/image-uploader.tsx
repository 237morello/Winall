"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedImage {
  url: string;
  path?: string;
}

interface ImageUploaderProps {
  mode: "single" | "gallery";
  /** Nom du champ caché soumis avec le formulaire ("imageUrl" ou "images"). */
  name: string;
  /** Valeurs initiales (URLs). */
  initialUrls?: string[];
  /** Id du projet pour ranger les fichiers (défaut "nouveau"). */
  projectId?: string;
  label?: string;
}

const UPLOAD_URL = "/api/admin/projects/upload";

export function ImageUploader({
  mode,
  name,
  initialUrls = [],
  projectId = "nouveau",
  label,
}: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    initialUrls.filter(Boolean).map((url) => ({ url })),
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;
      setError(null);
      setIsUploading(true);

      const toProcess = mode === "single" ? list.slice(0, 1) : list;
      const uploaded: UploadedImage[] = [];

      for (const file of toProcess) {
        const body = new FormData();
        body.append("file", file);
        body.append("projectId", projectId);
        try {
          const res = await fetch(UPLOAD_URL, { method: "POST", body });
          const json = await res.json();
          if (!res.ok) {
            setError(json.error ?? "Échec de l'upload.");
            continue;
          }
          uploaded.push({ url: json.url, path: json.path });
        } catch {
          setError("Erreur réseau pendant l'upload.");
        }
      }

      setImages((current) =>
        mode === "single" ? uploaded.slice(0, 1) : [...current, ...uploaded],
      );
      setIsUploading(false);
    },
    [mode, projectId],
  );

  const removeImage = useCallback(async (target: UploadedImage) => {
    setImages((current) => current.filter((img) => img.url !== target.url));
    if (target.path) {
      // Retrait best-effort du bucket (ne bloque pas l'UI en cas d'échec).
      try {
        await fetch(UPLOAD_URL, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: target.path }),
        });
      } catch {
        /* ignore */
      }
    }
  }, []);

  const hiddenValue =
    mode === "single"
      ? (images[0]?.url ?? "")
      : JSON.stringify(images.map((img) => img.url));

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}

      {/* Champ caché soumis avec le formulaire */}
      <input type="hidden" name={name} value={hiddenValue} readOnly />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-8 text-center transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
        )}
      >
        {isUploading ? (
          <Loader2 className="size-6 animate-spin text-primary" />
        ) : (
          <ImagePlus className="size-6 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          Glissez une image ici ou cliquez pour choisir
          {mode === "gallery" ? " (plusieurs possibles)" : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={mode === "gallery"}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img) => (
            <div
              key={img.url}
              className="relative size-24 overflow-hidden rounded-md border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt="Aperçu"
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Retirer l'image"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
