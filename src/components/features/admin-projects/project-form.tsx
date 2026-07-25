"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ProjectDomaine, ProjectStatut } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOMAINE_OPTIONS } from "@/lib/project-domaine";
import { ImageUploader } from "./image-uploader";
import type { ProjectActionState } from "./project-actions";

const STATUT_OPTIONS: Array<{ value: ProjectStatut; label: string }> = [
  { value: "BROUILLON", label: "Brouillon" },
  { value: "EN_COURS", label: "En cours" },
  { value: "TERMINE", label: "Terminé" },
  { value: "ARCHIVE", label: "Archivé" },
];

export interface ProjectFormInitial {
  id?: string;
  titre?: string;
  description?: string;
  domaine?: ProjectDomaine;
  statut?: ProjectStatut;
  budget?: number | null;
  progression?: number;
  imageUrl?: string | null;
  images?: string[];
  localisation?: string | null;
  dateDebut?: Date | null;
  dateFin?: Date | null;
}

interface ProjectFormProps {
  action: (
    prevState: ProjectActionState,
    formData: FormData,
  ) => Promise<ProjectActionState>;
  initial?: ProjectFormInitial;
  submitLabel: string;
}

function toDateInput(value: Date | null | undefined): string {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-destructive">{errors[0]}</p>;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="size-4 animate-spin" />}
      {label}
    </Button>
  );
}

const inputClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary";

export function ProjectForm({ action, initial, submitLabel }: ProjectFormProps) {
  const [state, formAction] = useActionState<ProjectActionState, FormData>(
    action,
    {},
  );
  const fe = state.fieldErrors ?? {};
  const projectId = initial?.id ?? "nouveau";

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div id="section-info" className="scroll-mt-28 space-y-6">
        <Card>
          <CardContent className="space-y-5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Identité
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Titre</label>
              <input
                name="titre"
                defaultValue={initial?.titre ?? ""}
                className={inputClass}
                placeholder="Nom du projet"
              />
              <FieldError errors={fe.titre} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={initial?.description ?? ""}
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Décrivez le projet..."
              />
              <FieldError errors={fe.description} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Classification
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Domaine / Service
                </label>
                <Select name="domaine" defaultValue={initial?.domaine ?? "AUTRES"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAINE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={fe.domaine} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Statut</label>
                <Select
                  name="statut"
                  defaultValue={initial?.statut ?? "BROUILLON"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={fe.statut} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Budget (FCFA)
                </label>
                <input
                  name="budget"
                  type="number"
                  min={0}
                  step="any"
                  defaultValue={initial?.budget ?? 0}
                  className={inputClass}
                />
                <FieldError errors={fe.budget} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Progression (%)
                </label>
                <input
                  name="progression"
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={initial?.progression ?? 0}
                  className={inputClass}
                />
                <FieldError errors={fe.progression} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Planning
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Localisation
              </label>
              <input
                name="localisation"
                defaultValue={initial?.localisation ?? ""}
                className={inputClass}
                placeholder="Ex : Douala, Cameroun"
              />
              <FieldError errors={fe.localisation} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Date de début
                </label>
                <input
                  name="dateDebut"
                  type="date"
                  defaultValue={toDateInput(initial?.dateDebut)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Date de fin
                </label>
                <input
                  name="dateFin"
                  type="date"
                  defaultValue={toDateInput(initial?.dateFin)}
                  className={inputClass}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card id="section-images" className="scroll-mt-28">
        <CardContent className="space-y-6 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Images
          </p>
          <ImageUploader
            mode="single"
            name="imageUrl"
            label="Image principale"
            projectId={projectId}
            initialUrls={initial?.imageUrl ? [initial.imageUrl] : []}
          />
          <ImageUploader
            mode="gallery"
            name="images"
            label="Galerie d'images"
            projectId={projectId}
            initialUrls={initial?.images ?? []}
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
