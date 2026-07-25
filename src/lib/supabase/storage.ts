/**
 * Bucket Supabase Storage des images de projets (existant, public).
 * Les images sont rangées sous le préfixe `projects/`, comme les données
 * déjà en base (URLs .../object/public/winall-storage/projects/...).
 * L'écriture passe toujours par le service-role côté serveur (route
 * app/api/admin/projects/upload) : aucune policy d'INSERT publique n'est nécessaire.
 */
export const PROJECT_IMAGES_BUCKET = "winall-storage";

/** Préfixe (dossier) où sont rangées les images de projets dans le bucket. */
export const PROJECT_IMAGES_PREFIX = "projects";

/** Types MIME d'images autorisés à l'upload. */
export const ALLOWED_IMAGE_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
] as const;

/** Taille maximale d'un fichier uploadé (8 Mo). */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/** Extension de fichier à partir d'un type MIME. */
export function extensionForMime(mime: string): string {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/avif":
      return "avif";
    default:
      return "bin";
  }
}
