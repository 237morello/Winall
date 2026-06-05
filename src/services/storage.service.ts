import { deleteFileAction, uploadFileAction } from "@/actions/storage.actions";
import type { StoragePath, StoragePublicUrl } from "@/types/storage.types";

/**
 * MISSION : StorageService — Centralise la gestion des fichiers sur Supabase Storage.
 */
export class StorageService {
  /**
   * Upload un fichier dans le bucket Supabase.
   * @param file Le fichier à uploader.
   * @param path Le chemin/dossier dans le bucket (ex: 'projects', 'invoices').
   * @returns L'URL publique du fichier uploadé.
   */
  static async uploadFile(file: File, path: string = "general"): Promise<StoragePublicUrl> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", path);

    const result = await uploadFileAction(formData);
    if (!result.success) {
      throw new Error(result.message);
    }

    return result.url;
  }

  static async uploadFileWithPath(
    file: File,
    path: string = "general",
  ): Promise<{ url: StoragePublicUrl; path: StoragePath }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", path);

    const result = await uploadFileAction(formData);
    if (!result.success) {
      throw new Error(result.message);
    }

    return { url: result.url, path: result.path };
  }

  /**
   * Supprime un fichier du bucket Supabase à partir de son URL publique.
   * @param publicUrl L'URL complète du fichier.
   */
  static async deleteFile(storagePathOrPublicUrl: string): Promise<void> {
    const result = await deleteFileAction(storagePathOrPublicUrl);
    if (!result.success) {
      throw new Error(result.message);
    }
  }
}
