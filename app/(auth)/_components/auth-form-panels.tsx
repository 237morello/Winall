"use client";

import { Loader2, Mail, Link2, RotateCcw, ShieldCheck } from "lucide-react";
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

interface PanneauOtpProps {
  emailActif: string;
  compteur: number;
  estVerificationVisible: boolean;
  estEnCours: boolean;
  formulaireEmail: UseFormReturn<EmailFormValues>;
  formulaireOtp: UseFormReturn<OTPFormValues>;
  onSoumettreEmail: () => void;
  onSoumettreOtp: () => void;
  onRenvoyerOtp: () => void;
}

/**
 * @component PanneauOtp
 * @description Parcours OTP compact avec verification automatique a 6 chiffres.
 */
export function PanneauOtp({
  emailActif,
  compteur,
  estVerificationVisible,
  estEnCours,
  formulaireEmail,
  formulaireOtp,
  onSoumettreEmail,
  onSoumettreOtp,
  onRenvoyerOtp,
}: PanneauOtpProps) {
  return estVerificationVisible ? (
    <Form {...formulaireOtp}>
      <form className="space-y-3" onSubmit={formulaireOtp.handleSubmit(onSoumettreOtp)}>
        <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-700">
          <ShieldCheck className="size-4 shrink-0" />
          <span className="truncate">Code envoye a {emailActif}</span>
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

        <Button type="submit" className="h-9 w-full" disabled={estEnCours}>
          {estEnCours ? <Loader2 className="size-4 animate-spin" /> : null}
          {estEnCours ? "Verification..." : "Valider le code"}
        </Button>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {compteur > 0 ? `Renvoi dans ${compteur}s` : "Code non recu ?"}
          </span>
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
          Envoyer le code
        </Button>
      </form>
    </Form>
  );
}

interface PanneauMagicLinkProps {
  estEnCours: boolean;
  formulaire: UseFormReturn<EmailFormValues>;
  onSoumettre: () => void;
}

/**
 * @component PanneauMagicLink
 * @description Demande compacte d'un lien de connexion magique.
 */
export function PanneauMagicLink({
  estEnCours,
  formulaire,
  onSoumettre,
}: PanneauMagicLinkProps) {
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
          Envoyer le lien
        </Button>

        <p className="text-center text-[11px] leading-snug text-muted-foreground">
          Lien unique envoye dans votre boite mail.
        </p>
      </form>
    </Form>
  );
}
