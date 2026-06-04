"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  DeleteFileResult,
  StoragePath,
  StoragePublicUrl,
  UploadFileResult,
} from "@/types/storage.types";

const BUCKET_NAME = "winall-storage";
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const SAFE_FOLDER_PATTERN = /^[a-z0-9][a-z0-9/_-]{0,80}$/i;

function normalizeStorageFolder(folder: string) {
  const normalized = folder.trim().replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/|\/$/g, "");

  if (!normalized || normalized.includes("..") || !SAFE_FOLDER_PATTERN.test(normalized)) {
    return "general";
  }

  return normalized;
}

function getSafeFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return extension ? `.${extension}` : "";
}

function toStoragePath(path: string): StoragePath {
  return path as StoragePath;
}

function toStoragePublicUrl(url: string): StoragePublicUrl {
  return url as StoragePublicUrl;
}

function extractStoragePath(value: string): StoragePath | null {
  const normalized = value.trim();
  if (!normalized) return null;

  try {
    const url = new URL(normalized);
    const publicPrefix = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const pathname = decodeURIComponent(url.pathname);

    if (pathname.startsWith(publicPrefix)) {
      return toStoragePath(pathname.slice(publicPrefix.length));
    }
  } catch {
    // Not an absolute URL. Treat it as a storage path below.
  }

  const fallbackParts = normalized.split(`${BUCKET_NAME}/`);
  const candidate = fallbackParts.length > 1 ? fallbackParts[1] : normalized;
  const path = candidate.replace(/^\/+/, "");

  if (!path || path.includes("..") || path.startsWith("http://") || path.startsWith("https://")) {
    return null;
  }

  return toStoragePath(path);
}

/**
 * Action Serveur pour uploader un fichier sur Supabase en contournant RLS.
 * Réservé aux administrateurs.
 */
export async function uploadFileAction(formData: FormData): Promise<UploadFileResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();

  // Sécurité : Vérification du rôle admin
  if (role !== "ADMIN") {
    return {
      success: false,
      error: "ACCESS_DENIED",
      message: "Droits administrateur requis pour l'upload.",
    };
  }

  const file = formData.get("file");
  const folder = normalizeStorageFolder((formData.get("folder") as string) || "general");

  if (!(file instanceof File)) {
    return {
      success: false,
      error: "FILE_MISSING",
      message: "Aucun fichier n'a été fourni.",
    };
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    return {
      success: false,
      error: "FILE_TOO_LARGE",
      message: "Le fichier dépasse la taille maximale autorisée de 5 Mo.",
    };
  }

  const supabase = createAdminClient();

  // Génération du nom de fichier unique
  const fileExt = getSafeFileExtension(file.name);
  const fileName = `${crypto.randomUUID()}${fileExt}`;
  const filePath = toStoragePath(`${folder}/${fileName}`);

  // Conversion du fichier en Buffer pour l'upload côté serveur
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })
    .catch((error: unknown) => {
      console.error("[Storage Action] Erreur reseau upload:", error);
      return { error: new Error("Connexion Supabase Storage indisponible.") };
    });

  if (uploadError) {
    console.error("[Storage Action] Erreur upload:", uploadError);
    return {
      success: false,
      error: "UPLOAD_FAILED",
      message: "L'upload a échoué. Réessayez dans quelques instants.",
    };
  }

  // Récupération de l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return { success: true, url: toStoragePublicUrl(publicUrl), path: filePath };
}

/**
 * Action Serveur pour supprimer un fichier (Admin only).
 */
export async function deleteFileAction(storagePathOrPublicUrl: string): Promise<DeleteFileResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role?.toUpperCase();
  if (role !== "ADMIN") {
    return {
      success: false,
      error: "ACCESS_DENIED",
      message: "Droits administrateur requis pour la suppression.",
    };
  }

  const supabase = createAdminClient();
  const filePath = extractStoragePath(storagePathOrPublicUrl);

  if (!filePath) {
    return {
      success: false,
      error: "INVALID_STORAGE_PATH",
      message: "Chemin de fichier invalide.",
    };
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath])
    .catch((networkError: unknown) => {
      console.error("[Storage Action] Erreur reseau suppression:", networkError);
      return { error: new Error("Connexion Supabase Storage indisponible.") };
    });

  if (error) {
    console.error("[Storage Action] Erreur suppression:", error);
    return {
      success: false,
      error: "DELETE_FAILED",
      message: "La suppression a échoué. Réessayez dans quelques instants.",
    };
  }

  return { success: true, path: filePath };
}
