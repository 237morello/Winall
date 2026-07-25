import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";
import {
  ALLOWED_IMAGE_MIME,
  MAX_IMAGE_BYTES,
  PROJECT_IMAGES_BUCKET,
  PROJECT_IMAGES_PREFIX,
  extensionForMime,
} from "@/lib/supabase/storage";
import { slugify } from "@/lib/sub-service";

export const runtime = "nodejs";

type AllowedMime = (typeof ALLOWED_IMAGE_MIME)[number];

/** Upload d'une image de projet vers Supabase Storage. Retourne l'URL publique. */
export async function POST(request: Request): Promise<Response> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_MIME.includes(file.type as AllowedMime)) {
    return NextResponse.json(
      { error: "Format non supporté (jpeg, png, webp, gif, avif)." },
      { status: 415 },
    );
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (max 8 Mo)." },
      { status: 413 },
    );
  }

  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const ext = extensionForMime(file.type);
  // Unicité sans Date.now()/Math.random() : suffixe aléatoire via crypto.
  const unique = crypto.randomUUID().slice(0, 8);
  const path = `${PROJECT_IMAGES_PREFIX}/${baseName}-${unique}.${ext}`;

  const supabase = createAdminClient();
  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: `Échec de l'upload : ${uploadError.message}` },
      { status: 500 },
    );
  }

  const { data } = supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl, path });
}

/** Suppression d'une image du bucket (retrait depuis la galerie côté admin). */
export async function DELETE(request: Request): Promise<Response> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: { path?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body.path) {
    return NextResponse.json({ error: "Chemin manquant." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .remove([body.path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
