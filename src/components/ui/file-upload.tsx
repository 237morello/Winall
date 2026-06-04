"use client";

import { useCallback, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import { Upload, X, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { uploadFileAction, deleteFileAction } from "@/actions/storage.actions";
import { toast } from "sonner";
import Image from "next/image";

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadComplete?: (file: { url: string; path: string }) => void;
  onUploadError?: (error: Error) => void;
  folder?: string;
  accept?: Accept;
  maxSize?: number; // en octets
  label?: string;
  defaultValue?: string;
}

/**
 * @component FileUpload
 * @description Composant de glisser-déposer pour uploader des fichiers sur Supabase Storage.
 */
export function FileUpload({
  onUploadSuccess,
  onUploadComplete,
  onUploadError,
  folder = "general",
  accept = { "image/*": [] },
  maxSize = 5 * 1024 * 1024, // 5 Mo par défaut
  label = "Déposez votre fichier ici ou cliquez pour parcourir",
  defaultValue = "",
}: FileUploadProps) {
  const [fileUrl, setFileUrl] = useState<string>(defaultValue);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setIsUploading(true);
        
        // On utilise l'action serveur via FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await uploadFileAction(formData);
        
        if (result.success) {
          setFileUrl(result.url);
          setPreviewUrl(result.url);
          onUploadSuccess(result.url);
          onUploadComplete?.({ url: result.url, path: result.path });
          toast.success("Fichier uploadé avec succès !");
        } else {
          const err = new Error(result.message);
          toast.error(err.message);
          onUploadError?.(err);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        const err = error instanceof Error ? error : new Error("Upload échoué");
        toast.error(err.message);
        if (onUploadError) onUploadError(err);
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onUploadSuccess, onUploadComplete, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fileUrl) return;

    try {
      const result = await deleteFileAction(fileUrl);
      if (result.success) {
        setFileUrl("");
        setPreviewUrl("");
        onUploadSuccess("");
        toast.info("Fichier supprimé.");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  const isImage = previewUrl && (
    previewUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || 
    previewUrl.includes("image")
  );

  return (
    <div className="w-full space-y-4">
      {fileUrl ? (
        <div className="relative group rounded-xl border border-border bg-muted/30 overflow-hidden">
          {isImage ? (
            <div className="aspect-video relative">
              <Image 
                src={previewUrl || "/images/63966.jpg"} 
                alt="Upload preview" 
                fill 
                unoptimized={previewUrl.includes("/storage/v1/object/public/")}
                className="object-cover"
                onError={() => setPreviewUrl("/images/63966.jpg")}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4">
              <FileText className="size-8 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Fichier uploadé</p>
                <p className="text-xs text-muted-foreground truncate">{fileUrl.split('/').pop()}</p>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleRemove}
              className="rounded-full"
            >
              <X className="size-4 mr-2" />
              Supprimer
            </Button>
          </div>
          
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="size-5 text-green-500 fill-white" />
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center",
            isDragActive 
              ? "border-primary bg-primary/5 scale-[1.01]" 
              : "border-border hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          <input {...getInputProps()} />
          
          <div className="mb-4 rounded-full bg-primary/10 p-4 transition-transform group-hover:scale-110">
            {isUploading ? (
              <Loader2 className="size-8 text-primary animate-spin" />
            ) : isDragActive ? (
              <Upload className="size-8 text-primary animate-bounce" />
            ) : (
              <Upload className="size-8 text-muted-foreground" />
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              {isUploading ? "Upload en cours..." : label}
            </p>
            <p className="text-xs text-muted-foreground">
              Images, PDF, Vidéos (max. {Math.round(maxSize / (1024 * 1024))} Mo)
            </p>
          </div>

          {isDragActive && (
            <div className="absolute inset-0 rounded-xl bg-primary/5 flex items-center justify-center">
              <p className="text-primary font-bold">Lâchez pour uploader !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
