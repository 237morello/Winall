"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FileSpreadsheet, Info, Send, Wrench } from "lucide-react";
import { submitContactRequest, submitInterventionRequest, submitQuoteRequest } from "@/actions/form.actions";
import { playSound } from "@/lib/sounds";
import { trackUsageEvent } from "@/lib/analytics/track-usage-event";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";

export type SupportProjectContext = {
  id: string;
  titre: string;
  domaine: ProjectDomain;
  localisation: string | null;
};

type SupportType = "DEVIS" | "INTERVENTION" | "CONTACT";
type ProjectDomain =
  | "BTP"
  | "RESEAU"
  | "VIDEOSURVEILLANCE"
  | "CONTROLE_ACCES"
  | "SECURITE_INCENDIE"
  | "TELEPHONIE_IP"
  | "IT";

const domains: Array<{ value: ProjectDomain; label: string }> = [
  { value: "BTP", label: "BTP" },
  { value: "RESEAU", label: "Réseau" },
  { value: "VIDEOSURVEILLANCE", label: "Vidéosurveillance" },
  { value: "CONTROLE_ACCES", label: "Contrôle d'accès" },
  { value: "SECURITE_INCENDIE", label: "Sécurité incendie" },
  { value: "TELEPHONIE_IP", label: "Téléphonie IP" },
  { value: "IT", label: "IT" },
];

const typeLabels: Record<SupportType, string> = {
  DEVIS: "Demande de devis complémentaire",
  INTERVENTION: "Demande d'intervention",
  CONTACT: "Question générale",
};

export function SupportRequestForm({
  initialType,
  project,
  user,
}: {
  initialType: SupportType;
  project: SupportProjectContext | null;
  user: { nom: string; email: string };
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [type, setType] = React.useState<SupportType>(initialType);
  const [domain, setDomain] = React.useState<ProjectDomain>(project?.domaine ?? "IT");
  const [urgency, setUrgency] = React.useState<"FAIBLE" | "MOYEN" | "CRITIQUE">("MOYEN");
  const [loading, setLoading] = React.useState(false);
  const [lastSuccessType, setLastSuccessType] = React.useState<SupportType | null>(null);

  const needsProject = type === "INTERVENTION";
  const canSubmit = !needsProject || Boolean(project);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      toast.error("Sélectionnez un projet client avant de demander une intervention.");
      return;
    }

    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const baseData = {
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      telephone: (formData.get("telephone") as string) || undefined,
    };

    try {
      const result =
        type === "INTERVENTION"
          ? await submitInterventionRequest({
              ...baseData,
              type,
              projectId: project?.id,
              donnees: {
                niveauUrgence: urgency,
                descriptionProbleme: formData.get("descriptionProbleme") as string,
              },
            })
          : type === "DEVIS"
            ? await submitQuoteRequest({
                ...baseData,
                type,
                projectId: project?.id,
                donnees: {
                  domaineInteret: domain,
                  budgetEstimatif: (formData.get("budgetEstimatif") as string) || undefined,
                  descriptionBesoin: formData.get("descriptionBesoin") as string,
                  localisation: formData.get("localisation") as string,
                  imageReferenceUrl: (formData.get("imageReferenceUrl") as string) || undefined,
                },
              })
            : await submitContactRequest({
                ...baseData,
                type,
                donnees: {
                  sujet: formData.get("sujet") as string,
                  messageContenu: formData.get("messageContenu") as string,
                },
              });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      playSound("success");
      void trackUsageEvent("support_request_sent", {
        metadata: {
          type,
          projectId: project?.id ?? null,
          domain: type === "DEVIS" ? domain : null,
        },
      });
      toast.success("Votre demande a été envoyée avec succès.");
      setLastSuccessType(type);
      formRef.current?.reset();
      setDomain(project?.domaine ?? "IT");
      setUrgency("MOYEN");
    } catch {
      toast.error("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <Typography variant="h1" className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Support et demandes projet
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Transmettez une intervention, un devis complémentaire ou une question à l&apos;équipe Winall Tech.
        </Typography>
      </div>

      <Card className="overflow-hidden rounded-lg border-border/50 bg-card/80 shadow-sm">
        <CardHeader className="border-b border-border/20 bg-muted/30 p-6">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            {type === "INTERVENTION" ? <Wrench className="size-6 text-primary" /> : <FileSpreadsheet className="size-6 text-primary" />}
            {typeLabels[type]}
          </CardTitle>
          {project ? (
            <p className="text-sm text-muted-foreground">
              Projet lié : <span className="font-semibold text-foreground">{project.titre}</span>
            </p>
          ) : null}
        </CardHeader>
        <CardContent className="p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Type de demande" htmlFor="type">
                <Select value={type} onValueChange={(value) => setType(value as SupportType)}>
                  <SelectTrigger id="type" className="h-12 w-full rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INTERVENTION">Intervention technique</SelectItem>
                    <SelectItem value="DEVIS">Devis complémentaire</SelectItem>
                    <SelectItem value="CONTACT">Question générale</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Téléphone" htmlFor="telephone">
                <Input id="telephone" name="telephone" className="h-12 rounded-lg" />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Votre nom" htmlFor="nom">
                <Input id="nom" name="nom" defaultValue={user.nom} required className="h-12 rounded-lg" />
              </Field>
              <Field label="Email de contact" htmlFor="email">
                <Input id="email" name="email" type="email" defaultValue={user.email} required className="h-12 rounded-lg" />
              </Field>
            </div>

            {type === "INTERVENTION" ? (
              <InterventionFields project={project} urgency={urgency} setUrgency={setUrgency} />
            ) : type === "DEVIS" ? (
              <QuoteFields project={project} domain={domain} setDomain={setDomain} />
            ) : (
              <ContactFields />
            )}

            <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-700">
              <Info className="mt-0.5 size-5 shrink-0" />
              <p className="font-medium">
                Votre demande sera transmise à l&apos;équipe administrative et visible dans le suivi client.
              </p>
            </div>

            {lastSuccessType ? (
              <div className="flex flex-wrap gap-3 text-sm">
                {project ? (
                  <Button asChild variant="outline" className="rounded-lg">
                    <Link href={`/dashboard/projects/${project.id}`}>Retour au projet</Link>
                  </Button>
                ) : null}
                {lastSuccessType === "DEVIS" ? (
                  <Button asChild variant="outline" className="rounded-lg">
                    <Link href="/dashboard/quotes">Voir mes devis</Link>
                  </Button>
                ) : null}
              </div>
            ) : null}

            <Button type="submit" disabled={loading || !canSubmit} className="h-14 w-full rounded-lg text-base font-bold">
              {loading ? "Envoi en cours..." : (
                <>
                  Envoyer la demande <Send className="ml-2 size-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function InterventionFields({
  project,
  urgency,
  setUrgency,
}: {
  project: SupportProjectContext | null;
  urgency: "FAIBLE" | "MOYEN" | "CRITIQUE";
  setUrgency: (value: "FAIBLE" | "MOYEN" | "CRITIQUE") => void;
}) {
  return (
    <div className="space-y-6">
      <Field label="Projet concerné" htmlFor="project">
        <Input
          id="project"
          value={project?.titre ?? "Aucun projet client sélectionné"}
          readOnly
          className="h-12 rounded-lg bg-muted"
        />
      </Field>
      <Field label="Niveau d'urgence" htmlFor="niveauUrgence">
        <Select value={urgency} onValueChange={(value) => setUrgency(value as "FAIBLE" | "MOYEN" | "CRITIQUE")}>
          <SelectTrigger id="niveauUrgence" className="h-12 w-full rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FAIBLE">Faible</SelectItem>
            <SelectItem value="MOYEN">Moyen</SelectItem>
            <SelectItem value="CRITIQUE">Critique</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Description du problème" htmlFor="descriptionProbleme">
        <Textarea
          id="descriptionProbleme"
          name="descriptionProbleme"
          placeholder="Décrivez le problème, l'incident ou la maintenance attendue."
          required
          className="min-h-36 rounded-lg"
        />
      </Field>
    </div>
  );
}

function QuoteFields({
  project,
  domain,
  setDomain,
}: {
  project: SupportProjectContext | null;
  domain: ProjectDomain;
  setDomain: (value: ProjectDomain) => void;
}) {
  return (
    <div className="space-y-6">
      {project ? (
        <Field label="Projet de référence" htmlFor="projectReference">
          <Input id="projectReference" value={project.titre} readOnly className="h-12 rounded-lg bg-muted" />
        </Field>
      ) : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Domaine" htmlFor="domaineInteret">
          <Select value={domain} onValueChange={(value) => setDomain(value as ProjectDomain)}>
            <SelectTrigger id="domaineInteret" className="h-12 w-full rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {domains.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Localisation" htmlFor="localisation">
          <Input
            id="localisation"
            name="localisation"
            defaultValue={project?.localisation ?? ""}
            required
            className="h-12 rounded-lg"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Budget estimatif" htmlFor="budgetEstimatif">
          <Input id="budgetEstimatif" name="budgetEstimatif" placeholder="Ex: 5 000 000 FCFA" className="h-12 rounded-lg" />
        </Field>
        <Field label="Image de référence" htmlFor="imageReferenceUrl">
          <Input id="imageReferenceUrl" name="imageReferenceUrl" type="url" placeholder="https://..." className="h-12 rounded-lg" />
        </Field>
      </div>
      <Field label="Description du besoin" htmlFor="descriptionBesoin">
        <Textarea
          id="descriptionBesoin"
          name="descriptionBesoin"
          placeholder="Décrivez l'évolution, l'extension ou la prestation complémentaire souhaitée."
          required
          className="min-h-36 rounded-lg"
        />
      </Field>
    </div>
  );
}

function ContactFields() {
  return (
    <div className="space-y-6">
      <Field label="Sujet" htmlFor="sujet">
        <Input id="sujet" name="sujet" required className="h-12 rounded-lg" />
      </Field>
      <Field label="Message" htmlFor="messageContenu">
        <Textarea
          id="messageContenu"
          name="messageContenu"
          placeholder="Dites-nous comment nous pouvons vous aider."
          required
          className="min-h-36 rounded-lg"
        />
      </Field>
    </div>
  );
}
