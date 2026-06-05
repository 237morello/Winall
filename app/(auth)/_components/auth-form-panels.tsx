"use client";

import { AlertCircle, CheckCircle2, Loader2, Mail, Link2, Pencil, RotateCcw, ShieldCheck } from "lucide-react";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { UseFormReturn } from "react-hook-form";
import type { EmailFormValues, OTPFormValues } from "@/schemas/auth.schema";
import type { AuthIntent, OtpEtape } from "./auth-form";

interface PanneauOtpProps {
  intent: AuthIntent;
  emailActif: string;
  compteur: number;
  etape: OtpEtape;
  estEnCours: boolean;
  messageErreur: string | null;
  formulaireEmail: UseFormReturn<EmailFormValues>;
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

  return estVerificationVisible ? (
    <Form {...formulaireOtp}>
      <form className="space-y-3" onSubmit={formulaireOtp.handleSubmit(onSoumettreOtp)}>
        <div className="flex items-start justify-between gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-xs text-orange-700">
          <div className="flex min-w-0 items-center gap-2">
            <ShieldCheck className="size-4 shrink-0" />
            <span className="truncate">Code OTP envoye a {emailActif}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="-mr-1 h-6 shrink-0 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
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
            <FormItem className="flex flex-col items-center gap-1">
              <FormControl>
                <InputOTP maxLength={6} aria-label="Code OTP a 6 chiffres" {...field}>
                  <InputOTPGroup className="gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="size-10 rounded-lg border border-input text-sm font-semibold shadow-sm focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200 sm:size-11"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {messageErreur ? (
          <div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs leading-snug text-destructive">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            <span>{messageErreur}</span>
          </div>
        ) : null}

        <Button type="submit" className="h-9 w-full" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : null}
          {estEnCours ? libelleEnCours : libelleValidation}
        </Button>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground">
              {compteur > 0 ? `Renvoi dans ${compteur}s` : "Code non recu ?"}
            </span>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="xs" disabled={estEnCours} onClick={onChangerEmail}>
                <Pencil className="size-3" />
                Modifier l'email
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                disabled={compteur > 0 || estEnCours}
                onClick={onRenvoyerOtp}
              >
                <RotateCcw className="size-3" />
                Renvoyer
              </Button>
            </div>
          </div>
          <p className="text-[11px] leading-snug text-muted-foreground">
            Le code expire rapidement. Vous pouvez corriger l'email ou demander un nouveau code sans recommencer.
          </p>
        </div>
      </form>
    </Form>
  ) : (
    <Form {...formulaireEmail}>
      <form className="space-y-3" onSubmit={formulaireEmail.handleSubmit(onSoumettreEmail)}>
        <FormField
          control={formulaireEmail.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Email professionnel</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label="Email pour recevoir un code OTP"
                    placeholder="nom@entreprise.com"
                    className="h-9 pl-10 text-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-9 w-full" disabled={estEnCours}>
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
  formulaire: UseFormReturn<EmailFormValues>;
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

  if (lienEnvoye) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <div className="min-w-0 space-y-0.5">
            <p className="font-medium">Lien envoye</p>
            <p className="truncate text-emerald-700">{emailActif}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className="h-9" disabled={estEnCours} onClick={onChangerEmail}>
            <Pencil className="size-4" />
            Changer
          </Button>
          <Button type="button" className="h-9" disabled={estEnCours} onClick={onRenvoyerLien}>
            {estEnCours ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
            Renvoyer
          </Button>
        </div>

        <p className="text-center text-[11px] leading-snug text-muted-foreground">
          Ouvrez le lien depuis cette boite mail pour continuer vers votre espace.
        </p>
      </div>
    );
  }

  return (
    <Form {...formulaire}>
      <form className="space-y-3" onSubmit={formulaire.handleSubmit(onSoumettre)}>
        <FormField
          control={formulaire.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Email professionnel</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    aria-label="Email pour recevoir un magic link"
                    placeholder="nom@entreprise.com"
                    className="h-9 pl-10 text-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-9 w-full" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : <Link2 className="size-4" />}
          {estEnCours ? "Envoi du lien..." : libelle}
        </Button>

        <p className="text-center text-[11px] leading-snug text-muted-foreground">
          Nous envoyons un lien unique dans votre boite mail.
        </p>
      </form>
    </Form>
  );
}
