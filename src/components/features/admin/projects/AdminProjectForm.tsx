/**
 * MISSION : AdminProjectForm — Formulaire complet pour créer/modifier un projet.
 * Utilise React Hook Form + Zod + Server Actions.
 */
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Eye,
  ImageIcon,
  ImagePlus,
  Images,
  Loader2,
  MapPin,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";
import { createProject, updateProject, type ProjectInput } from "@/actions/project.actions";
import { deleteFileAction, uploadFileAction } from "@/actions/storage.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const DOMAIN_OPTIONS = [
  { value: "BTP", label: "BTP" },
  { value: "RESEAU", label: "Réseau" },
  { value: "VIDEOSURVEILLANCE", label: "Vidéosurveillance" },
  { value: "CONTROLE_ACCES", label: "Contrôle d'accès" },
  { value: "SECURITE_INCENDIE", label: "Sécurité incendie" },
  { value: "TELEPHONIE_IP", label: "Téléphonie IP" },
  { value: "IT", label: "IT" },
] as const;

const STATUS_OPTIONS = [
  { value: "BROUILLON", label: "Brouillon" },
  { value: "EN_COURS", label: "En cours" },
  { value: "TERMINE", label: "Terminé" },
  { value: "ARCHIVE", label: "Archivé" },
] as const;

const projectFormSchema = z.object({
  titre: z.string().min(3, "Le titre doit avoir au moins 3 caractères"),
  description: z.string().min(10, "La description est trop courte"),
  domaine: z.enum([
    "BTP",
    "RESEAU",
    "VIDEOSURVEILLANCE",
    "CONTROLE_ACCES",
    "SECURITE_INCENDIE",
    "TELEPHONIE_IP",
    "IT",
  ]),
  statut: z.enum(["BROUILLON", "EN_COURS", "TERMINE", "ARCHIVE"]),
  isPublic: z.boolean(),
  localisation: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  imageUrl: z.string().optional().or(z.literal("")).nullable(),
  images: z.array(z.string().url()),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface AdminProjectFormProps {
  initialData?: ProjectFormValues;
  projectId?: string;
  users: { id: string; name: string }[];
}

function getOptionLabel<T extends readonly { value: string; label: string }[]>(options: T, value?: string | null) {
  return options.find((option) => option.value === value)?.label ?? "Non défini";
}

export function AdminProjectForm({ initialData, projectId, users }: AdminProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData
      ? {
          titre: initialData.titre,
          description: initialData.description,
          domaine: initialData.domaine,
          statut: initialData.statut,
          isPublic: initialData.isPublic,
          localisation: initialData.localisation || "",
          userId: initialData.userId || "none",
          imageUrl: initialData.imageUrl || "",
          images: initialData.images || [],
        }
      : {
          titre: "",
          description: "",
          domaine: "IT",
          statut: "EN_COURS",
          isPublic: false,
          localisation: "",
          userId: "none",
          imageUrl: "",
          images: [],
        },
  });

  const watchedValues = form.watch();
  const isLoading = form.formState.isSubmitting;

  const selectedClientName = useMemo(() => {
    if (!watchedValues.userId || watchedValues.userId === "none") {
      return "Projet vitrine";
    }

    return users.find((user) => user.id === watchedValues.userId)?.name ?? "Client sélectionné";
  }, [users, watchedValues.userId]);

  async function onSubmit(values: ProjectFormValues) {
    try {
      if (projectId) {
        await updateProject(projectId, values as Partial<ProjectInput>);
        toast.success("Projet mis à jour avec succès");
      } else {
        await createProject(values as ProjectInput);
        toast.success("Projet créé avec succès");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card className="rounded-lg border-border/70 shadow-none">
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BriefcaseBusiness className="size-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Informations du projet</CardTitle>
                  <CardDescription>
                    Définissez les données visibles dans le dashboard et le portfolio.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du projet</FormLabel>
                      <FormControl>
                        <Input placeholder="Installation vidéosurveillance Villa X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="domaine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domaine</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un domaine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DOMAIN_OPTIONS.map((domain) => (
                            <SelectItem key={domain.value} value={domain.value}>
                              {domain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description détaillée</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez le contexte, les objectifs et les réalisations du projet..."
                        className="min-h-36 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="statut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Statut du projet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="localisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input className="pl-9" placeholder="Yaoundé" {...field} value={field.value ?? ""} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border/70 shadow-none">
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Building2 className="size-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Client et publication</CardTitle>
                  <CardDescription>
                    Associez le projet à un client ou publiez-le comme réalisation vitrine.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 pt-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client assigné</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value ?? "none"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Aucun client</SelectItem>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex min-h-20 items-center justify-between gap-4 rounded-lg border bg-muted/20 px-4 py-3">
                    <div className="space-y-1">
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Eye className="size-4 text-muted-foreground" />
                        Visibilité publique
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Affiche le projet dans le portfolio public.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border/70 shadow-none">
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Images className="size-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle>Galerie secondaire</CardTitle>
                  <CardDescription>
                    Ajoutez jusqu&apos;à 8 images complémentaires du même projet.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ProjectGalleryUpload
                        value={field.value}
                        onChange={(images) => field.onChange(images)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <Card className="rounded-lg border-border/70 shadow-none">
            <CardHeader className="border-b">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ImageIcon className="size-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base">Image de couverture</CardTitle>
                  <CardDescription>Format paysage recommandé, 5 Mo maximum.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <FileUpload
                folder="projects"
                defaultValue={form.getValues("imageUrl") ?? ""}
                onUploadSuccess={(url) => form.setValue("imageUrl", url, { shouldDirty: true })}
                label="Ajouter une image"
              />
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border/70 shadow-none">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-primary" />
                Résumé
              </CardTitle>
              <CardDescription>Contrôle rapide avant enregistrement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Mode</span>
                <Badge variant={isEditing ? "secondary" : "default"}>
                  {isEditing ? "Modification" : "Création"}
                </Badge>
              </div>
              <SummaryRow label="Domaine" value={getOptionLabel(DOMAIN_OPTIONS, watchedValues.domaine)} />
              <SummaryRow label="Statut" value={getOptionLabel(STATUS_OPTIONS, watchedValues.statut)} />
              <SummaryRow label="Client" value={selectedClientName} />
              <SummaryRow label="Portfolio" value={watchedValues.isPublic ? "Public" : "Privé"} />
              <SummaryRow label="Galerie" value={`${watchedValues.images.length} image${watchedValues.images.length > 1 ? "s" : ""}`} />
            </CardContent>
          </Card>

          <div className="rounded-lg border bg-background/95 p-3 shadow-sm backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                <ArrowLeft className="size-4" />
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {isEditing ? "Enregistrer" : "Créer"}
              </Button>
            </div>
          </div>
        </aside>
      </form>
    </Form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("max-w-44 text-right font-medium", !value && "text-muted-foreground")}>
        {value || "Non défini"}
      </span>
    </div>
  );
}

function ProjectGalleryUpload({
  value,
  onChange,
}: {
  value: string[];
  onChange: (images: string[]) => void;
}) {
  const maxImages = 8;
  const [isUploading, setIsUploading] = useState(false);
  const canUploadMore = value.length < maxImages;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxImages - value.length;
      const files = acceptedFiles.slice(0, remainingSlots);
      if (!files.length) return;

      try {
        setIsUploading(true);
        const uploadedUrls: string[] = [];

        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "projects/gallery");

          const result = await uploadFileAction(formData);
          if (!result.success) {
            toast.error(result.message);
            continue;
          }

          uploadedUrls.push(result.url);
        }

        if (uploadedUrls.length) {
          onChange([...value, ...uploadedUrls].slice(0, maxImages));
          toast.success(
            `${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} ajoutée${uploadedUrls.length > 1 ? "s" : ""}`,
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'upload de la galerie.");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, value],
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    disabled: isUploading || !canUploadMore,
  });

  async function removeImage(url: string) {
    onChange(value.filter((image) => image !== url));

    const result = await deleteFileAction(url);
    if (!result.success) {
      toast.error(result.message);
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/20 p-6 text-center transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          (!canUploadMore || isUploading) && "pointer-events-none opacity-60",
        )}
      >
        <input {...getInputProps()} />
        <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {isUploading ? <Loader2 className="size-5 animate-spin" /> : <ImagePlus className="size-5" />}
        </div>
        <p className="text-sm font-semibold">
          {isUploading ? "Upload en cours..." : canUploadMore ? "Ajouter des images secondaires" : "Limite atteinte"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {value.length}/{maxImages} images, 5 Mo maximum par fichier.
        </p>
      </div>

      {value.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative aspect-video overflow-hidden rounded-lg border bg-muted">
              <Image
                src={url}
                alt={`Image secondaire ${index + 1}`}
                fill
                unoptimized={url.includes("/storage/v1/object/public/")}
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 size-8 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(url)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
