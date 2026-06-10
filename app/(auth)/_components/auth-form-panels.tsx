"use client";

import { AlertCircle, CheckCircle2, Loader2, Mail, Link2, Pencil, RotateCcw, ShieldCheck, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { AuthEmailFormValues, MagicLinkFormValues, OTPFormValues } from "@/schemas/auth.schema";
import type { AuthIntent, OtpEtape } from "./auth-form";

interface PanneauOtpProps {
  intent: AuthIntent;
  emailActif: string;
  compteur: number;
  etape: OtpEtape;
  estEnCours: boolean;
  messageErreur: string | null;
  formulaireEmail: UseFormReturn<AuthEmailFormValues>;
  formulaireOtp: UseFormReturn<OTPFormValues>;
  onSoumettreEmail: () => void;
  onSoumettreOtp: () => void;
  onRenvoyerOtp: () => void;
  onChangerEmail: () => void;
}

/**
 * @component PanneauOtp
 * @description Parcours OTP compact avec verification automatique a 6 chiffres.
 */
export function PanneauOtp({
  intent,
  emailActif,
  compteur,
  etape,
  estEnCours,
  messageErreur,
  formulaireEmail,
  formulaireOtp,
  onSoumettreEmail,
  onSoumettreOtp,
  onRenvoyerOtp,
  onChangerEmail,
}: PanneauOtpProps) {
  const estVerificationVisible = etape !== "email-entry" && etape !== "sending-code";
  const libelleEnvoi = intent === "signup" ? "Creer mon acces" : "Recevoir mon code";
  const libelleValidation = intent === "signup" ? "Valider mon acces" : "Se connecter";
  const libelleEnCours =
    etape === "authenticated" ? "Connexion en cours..." : etape === "redirecting" ? "Redirection..." : "Verification...";
  const afficherNom = intent === "signup" || formulaireEmail.watch("name") !== undefined;

  return estVerificationVisible ? (
    <Form {...formulaireOtp}>
      <form className="space-y-3" onSubmit={formulaireOtp.handleSubmit(onSoumettreOtp)}>
        <div className="flex items-start justify-between gap-2 rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-xs text-white">
          <div className="flex min-w-0 items-center gap-2">
            <ShieldCheck className="size-4 shrink-0" />
            <span className="truncate">Code OTP envoye a {emailActif}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="-mr-1 h-6 shrink-0 text-white hover:bg-white/10 hover:text-white"
            disabled={estEnCours}
            onClick={onChangerEmail}
          >
            <Pencil className="size-3" />
            Changer
          </Button>
        </div>

        <FormField
          control={formulaireOtp.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs text-white/75">Code OTP</FormLabel>
              <FormControl>
                <Input
                  aria-label="Code OTP a 6 chiffres"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  className="h-12 border-white/15 bg-white/8 text-center text-lg font-semibold tracking-[0.35em] text-white placeholder:text-white/25 focus-visible:ring-white/25"
                  value={field.value}
                  onChange={(event) => {
                    const chiffres = event.target.value.replace(/\D/g, "").slice(0, 6);
                    field.onChange(chiffres);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {messageErreur ? (
          <div className="flex items-start gap-2 rounded-md border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs leading-snug text-red-100">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>{messageErreur}</span>
          </div>
        ) : null}

        <Button type="submit" className="h-11 w-full bg-white text-black hover:bg-white/90" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : null}
          {estEnCours ? libelleEnCours : libelleValidation}
        </Button>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-white/45">
              {compteur > 0 ? `Renvoi dans ${compteur}s` : "Code non recu ?"}
            </span>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="xs" className="text-white/70 hover:bg-white/10 hover:text-white" disabled={estEnCours} onClick={onChangerEmail}>
                <Pencil className="size-3" />
                Modifier l&apos;email
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                className="text-white/70 hover:bg-white/10 hover:text-white"
                disabled={compteur > 0 || estEnCours}
                onClick={onRenvoyerOtp}
              >
                <RotateCcw className="size-3" />
                Renvoyer
              </Button>
            </div>
          </div>
          <p className="text-[11px] leading-snug text-white/45">
            Le code expire rapidement. Vous pouvez corriger l&apos;email ou demander un nouveau code sans recommencer.
          </p>
        </div>
      </form>
    </Form>
  ) : (
    <Form {...formulaireEmail}>
      <form className="space-y-3" onSubmit={formulaireEmail.handleSubmit(onSoumettreEmail)}>
        {afficherNom ? (
          <FormField
            control={formulaireEmail.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs text-white/75">
                  {intent === "signup" ? "Nom complet" : "Nom complet (optionnel)"}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                    <Input
                      aria-label="Nom complet pour le code OTP"
                      placeholder="Votre nom"
                      className="h-11 border-white/15 bg-white/8 pl-10 text-sm text-white placeholder:text-white/35 focus-visible:ring-white/25"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ) : null}

        <FormField
          control={formulaireEmail.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs text-white/75">Email professionnel</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                  <Input
                    aria-label="Email pour recevoir un code OTP"
                    placeholder="nom@entreprise.com"
                    className="h-11 border-white/15 bg-white/8 pl-10 text-sm text-white placeholder:text-white/35 focus-visible:ring-white/25"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-11 w-full bg-white text-black hover:bg-white/90" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
          {estEnCours ? "Envoi du code..." : libelleEnvoi}
        </Button>
      </form>
    </Form>
  );
}

interface PanneauMagicLinkProps {
  intent: AuthIntent;
  estEnCours: boolean;
  lienEnvoye: boolean;
  emailActif: string;
  formulaire: UseFormReturn<MagicLinkFormValues>;
  onSoumettre: () => void;
  onChangerEmail: () => void;
  onRenvoyerLien: () => void;
}

/**
 * @component PanneauMagicLink
 * @description Demande compacte d'un lien de connexion magique.
 */
export function PanneauMagicLink({
  intent,
  estEnCours,
  lienEnvoye,
  emailActif,
  formulaire,
  onSoumettre,
  onChangerEmail,
  onRenvoyerLien,
}: PanneauMagicLinkProps) {
  const libelle = intent === "signup" ? "Recevoir mon lien d'acces" : "Recevoir mon lien";
  const afficherNom = intent === "signup" || formulaire.watch("name") !== undefined;

  if (lienEnvoye) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 rounded-lg border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <div className="min-w-0 space-y-0.5">
            <p className="font-medium">Lien envoye</p>
            <p className="truncate text-emerald-100/75">{emailActif}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className="h-11 border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white" disabled={estEnCours} onClick={onChangerEmail}>
            <Pencil className="size-4" />
            Changer
          </Button>
          <Button type="button" className="h-11 bg-white text-black hover:bg-white/90" disabled={estEnCours} onClick={onRenvoyerLien}>
            {estEnCours ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
            Renvoyer
          </Button>
        </div>

        <p className="text-center text-[11px] leading-snug text-white/45">
          Ouvrez le lien depuis cette boite mail pour continuer vers votre espace.
        </p>
      </div>
    );
  }

  return (
    <Form {...formulaire}>
      <form className="space-y-3" onSubmit={formulaire.handleSubmit(onSoumettre)}>
        {afficherNom ? (
          <FormField
            control={formulaire.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs text-white/75">
                  {intent === "signup" ? "Nom complet" : "Nom complet (optionnel)"}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                    <Input
                      aria-label="Nom complet pour le magic link"
                      placeholder="Votre nom"
                      className="h-11 border-white/15 bg-white/8 pl-10 text-sm text-white placeholder:text-white/35 focus-visible:ring-white/25"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ) : null}

        <FormField
          control={formulaire.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs text-white/75">Email professionnel</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                  <Input
                    aria-label="Email pour recevoir un magic link"
                    placeholder="nom@entreprise.com"
                    className="h-11 border-white/15 bg-white/8 pl-10 text-sm text-white placeholder:text-white/35 focus-visible:ring-white/25"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-11 w-full bg-white text-black hover:bg-white/90" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : <Link2 className="size-4" />}
          {estEnCours ? "Envoi du lien..." : libelle}
        </Button>

        <p className="text-center text-[11px] leading-snug text-white/45">
          Nous envoyons un lien unique dans votre boite mail.
        </p>
      </form>
    </Form>
  );
}
