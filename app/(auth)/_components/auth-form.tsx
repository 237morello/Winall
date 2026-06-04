"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyRound, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SocialButton } from "../components/social-button";
import { emailSchema, otpSchema, type EmailFormValues, type OTPFormValues } from "@/schemas/auth.schema";
import { PanneauMagicLink, PanneauOtp } from "./auth-form-panels";
import { ServiceAuth } from "@/services/auth.service";

export type AuthIntent = "login" | "signup";
export type OtpEtape =
  | "email-entry"
  | "sending-code"
  | "code-sent"
  | "verifying-code"
  | "verification-failed"
  | "authenticated"
  | "redirecting";

interface AuthFormProps {
  intent?: AuthIntent;
}

class ServiceFormulaireAuth {
  static readonly dureeRenvoiOtp = 60;
  static obtenirCallbackUrl(callbackUrl: string | null): string {
    return callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
  }
  static focaliser(selecteur: string, racine: HTMLDivElement | null): void {
    const element = racine?.querySelector(selecteur);
    if (element instanceof HTMLInputElement) element.focus();
  }
}

/**
 * @component AuthForm
 * @description Orchestre les parcours OTP et Magic Link via des onglets (Tabs).
 * Inclut les connexions OAuth Google et GitHub, et un separateur visuel "OU".
 */
export function AuthForm({ intent = "login" }: AuthFormProps) {
  const routeur = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const callbackUrl = ServiceFormulaireAuth.obtenirCallbackUrl(searchParams.get("callbackUrl"));
  const [modeOuvert, setModeOuvert] = React.useState("otp");
  const [emailOtp, setEmailOtp] = React.useState("");
  const [emailMagic, setEmailMagic] = React.useState("");
  const [compteur, setCompteur] = React.useState(0);
  const [etapeOtp, setEtapeOtp] = React.useState<OtpEtape>("email-entry");
  const [erreurOtp, setErreurOtp] = React.useState<string | null>(null);
  const [lienMagiqueEnvoye, setLienMagiqueEnvoye] = React.useState(false);
  const refFormulaire = React.useRef<HTMLDivElement | null>(null);
  const dernierOtpAutoSoumis = React.useRef("");

  const formulaireOtpEmail = useForm<EmailFormValues>({ resolver: zodResolver(emailSchema), defaultValues: { email: "" } });
  const formulaireOtpCode = useForm<OTPFormValues>({ resolver: zodResolver(otpSchema), defaultValues: { otp: "" } });
  const formulaireMagic = useForm<EmailFormValues>({ resolver: zodResolver(emailSchema), defaultValues: { email: "" } });

  /* Décompte pour le renvoi OTP */
  React.useEffect(() => {
    if (compteur <= 0) return;
    const timer = window.setTimeout(() => setCompteur((v) => v - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [compteur]);

  /* Focalisation automatique selon le mode actif */
  React.useEffect(() => {
    const racine = refFormulaire.current;
    if (!racine) return;
    if (modeOuvert === "magic-link" && !lienMagiqueEnvoye) ServiceFormulaireAuth.focaliser('input[aria-label="Email pour recevoir un magic link"]', racine);
    if (modeOuvert === "otp" && (etapeOtp === "email-entry" || etapeOtp === "sending-code")) ServiceFormulaireAuth.focaliser('input[aria-label="Email pour recevoir un code OTP"]', racine);
    if (modeOuvert === "otp" && etapeOtp !== "email-entry" && etapeOtp !== "sending-code") ServiceFormulaireAuth.focaliser('input[aria-label="Code OTP a 6 chiffres"]', racine);
  }, [modeOuvert, etapeOtp, lienMagiqueEnvoye]);

  const mutationEnvoiOtp = useMutation({
    mutationFn: (valeurs: EmailFormValues) => ServiceAuth.envoyerOtp(valeurs.email),
    onMutate: () => {
      setEtapeOtp("sending-code");
      setErreurOtp(null);
    },
    onSuccess: ({ error }, valeurs) => {
      if (error) {
        setEtapeOtp(emailOtp ? "verification-failed" : "email-entry");
        const message = ServiceAuth.normaliserMessageErreur(error, "Impossible d'envoyer le code.");
        setErreurOtp(message);
        return toast.error(message);
      }
      setEmailOtp(valeurs.email);
      setEtapeOtp("code-sent");
      setCompteur(ServiceFormulaireAuth.dureeRenvoiOtp);
      dernierOtpAutoSoumis.current = "";
      formulaireOtpCode.reset();
      toast.success("Code OTP envoye.");
    },
    onError: (erreur: { message?: string } | null) => {
      setEtapeOtp(emailOtp ? "verification-failed" : "email-entry");
      const message = ServiceAuth.normaliserMessageErreur(erreur, "Impossible d'envoyer le code.");
      setErreurOtp(message);
      toast.error(message);
    },
  });

  const mutationVerificationOtp = useMutation({
    mutationFn: (valeurs: OTPFormValues) => ServiceAuth.verifierOtp(emailOtp, valeurs.otp),
    onMutate: () => {
      setEtapeOtp("verifying-code");
      setErreurOtp(null);
    },
    onSuccess: async ({ error }) => {
      if (error) {
        setEtapeOtp("verification-failed");
        dernierOtpAutoSoumis.current = "";
        const message = ServiceAuth.normaliserMessageErreur(error, "Code invalide.");
        setErreurOtp(message);
        return toast.error(message);
      }
      setEtapeOtp("authenticated");
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Connexion reussie.");
      setEtapeOtp("redirecting");
      routeur.push(callbackUrl);
      routeur.refresh();
    },
    onError: (erreur: { message?: string } | null) => {
      setEtapeOtp("verification-failed");
      dernierOtpAutoSoumis.current = "";
      const message = ServiceAuth.normaliserMessageErreur(erreur, "Verification OTP impossible.");
      setErreurOtp(message);
      toast.error(message);
    },
  });

  const mutationMagicLink = useMutation({
    mutationFn: (valeurs: EmailFormValues) => ServiceAuth.envoyerLienMagique(valeurs.email, callbackUrl),
    onSuccess: ({ error }, valeurs) => {
      if (error) return toast.error(ServiceAuth.normaliserMessageErreur(error, "Impossible d'envoyer le lien."));
      setEmailMagic(valeurs.email);
      setLienMagiqueEnvoye(true);
      toast.success("Lien magique envoye.");
    },
    onError: (erreur: { message?: string } | null) =>
      toast.error(ServiceAuth.normaliserMessageErreur(erreur, "Envoi du magic link impossible.")),
  });

  /* Auto-soumission OTP quand les 6 chiffres sont saisis */
  const otpValeur = formulaireOtpCode.watch("otp");
  React.useEffect(() => {
    if (
      otpValeur?.length === 6 &&
      etapeOtp !== "authenticated" &&
      etapeOtp !== "redirecting" &&
      !mutationVerificationOtp.isPending &&
      dernierOtpAutoSoumis.current !== otpValeur
    ) {
      dernierOtpAutoSoumis.current = otpValeur;
      mutationVerificationOtp.mutate({ otp: otpValeur });
    }
  }, [otpValeur, etapeOtp, mutationVerificationOtp]);

  const isBusy = mutationEnvoiOtp.isPending || mutationVerificationOtp.isPending || mutationMagicLink.isPending;
  const contenu = {
    login: {
      titre: "Connexion",
      description: "Choisissez Google, GitHub, OTP ou Magic Link.",
      lienSecondaire: "Creer un acces",
      hrefSecondaire: "/sign-up",
    },
    signup: {
      titre: "Creation d'acces",
      description: "Creez un acces sans mot de passe avec votre email professionnel.",
      lienSecondaire: "J'ai deja un acces",
      hrefSecondaire: "/log-in",
    },
  }[intent];

  const libelleBadge =
    etapeOtp === "sending-code"
      ? "Envoi"
      : etapeOtp === "code-sent" || lienMagiqueEnvoye
        ? "Code envoye"
        : etapeOtp === "verifying-code"
          ? "Verification"
          : etapeOtp === "authenticated"
            ? "Connexion"
            : etapeOtp === "redirecting"
              ? "Redirection"
              : "Sans mot de passe";

  const changerEmailOtp = () => {
    setEtapeOtp("email-entry");
    setErreurOtp(null);
    setCompteur(0);
    dernierOtpAutoSoumis.current = "";
    formulaireOtpCode.reset();
    if (emailOtp) formulaireOtpEmail.setValue("email", emailOtp);
  };

  const changerEmailMagic = () => {
    setLienMagiqueEnvoye(false);
    if (emailMagic) formulaireMagic.setValue("email", emailMagic);
  };

  return (
    <div ref={refFormulaire}>
      <Card className="gap-0 overflow-hidden border-black/8 bg-white/95 py-0 shadow-xl shadow-black/6 backdrop-blur-sm">
        {/* En-tete de la carte */}
        <CardHeader className="space-y-1 border-b border-black/5 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{contenu.titre}</CardTitle>
            <Badge
              variant="secondary"
              className="border-orange-100 bg-orange-50 px-2 text-[10px] font-medium text-orange-600 hover:bg-orange-50"
            >
              {libelleBadge}
            </Badge>
          </div>
          <CardDescription className="text-xs leading-snug">
            {contenu.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 px-4 py-4">
          {/* Boutons OAuth : Google et GitHub */}
          <div className="grid grid-cols-2 gap-2">
            <SocialButton provider="google" disabled={isBusy} callbackURL={callbackUrl} />
            <SocialButton provider="github" disabled={isBusy} callbackURL={callbackUrl} />
          </div>

          {/* Separateur "ou par email" */}
          <div className="relative flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              ou
            </span>
            <Separator className="flex-1" />
          </div>

          {/* Onglets OTP / Magic Link */}
          <Tabs value={modeOuvert} onValueChange={setModeOuvert} className="w-full gap-0">
            <TabsList className="mb-3 grid h-8 w-full grid-cols-2 bg-muted/60">
              <TabsTrigger
                value="otp"
                className="flex items-center gap-1.5 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <KeyRound className="size-3" />
                OTP
              </TabsTrigger>
              <TabsTrigger
                value="magic-link"
                className="flex items-center gap-1.5 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Link2 className="size-3" />
                Magic Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="otp" className="mt-0">
              <PanneauOtp
                intent={intent}
                emailActif={emailOtp}
                compteur={compteur}
                etape={etapeOtp}
                estEnCours={mutationEnvoiOtp.isPending || mutationVerificationOtp.isPending}
                messageErreur={erreurOtp}
                formulaireEmail={formulaireOtpEmail}
                formulaireOtp={formulaireOtpCode}
                onSoumettreEmail={() => mutationEnvoiOtp.mutate(formulaireOtpEmail.getValues())}
                onSoumettreOtp={() => mutationVerificationOtp.mutate(formulaireOtpCode.getValues())}
                onRenvoyerOtp={() => mutationEnvoiOtp.mutate({ email: emailOtp })}
                onChangerEmail={changerEmailOtp}
              />
            </TabsContent>

            <TabsContent value="magic-link" className="mt-0">
              <PanneauMagicLink
                intent={intent}
                estEnCours={mutationMagicLink.isPending}
                lienEnvoye={lienMagiqueEnvoye}
                emailActif={emailMagic}
                formulaire={formulaireMagic}
                onSoumettre={() => mutationMagicLink.mutate(formulaireMagic.getValues())}
                onChangerEmail={changerEmailMagic}
                onRenvoyerLien={() => mutationMagicLink.mutate({ email: emailMagic })}
              />
            </TabsContent>
          </Tabs>

          <div className="text-center text-xs text-muted-foreground">
            <Link
              href={contenu.hrefSecondaire}
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-orange-600 hover:underline"
            >
              {contenu.lienSecondaire}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
