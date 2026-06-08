"use client";

import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ChevronDown, KeyRound, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialButton, type Provider } from "../components/social-button";
import {
  authEmailSchema,
  authEmailSignUpSchema,
  magicLinkSchema,
  magicLinkSignUpSchema,
  otpSchema,
  type AuthEmailFormValues,
  type MagicLinkFormValues,
  type OTPFormValues,
} from "@/schemas/auth.schema";
import { PanneauMagicLink, PanneauOtp } from "./auth-form-panels";
import { ServiceAuth } from "@/services/auth.service";
import { trackUsageEvent } from "@/lib/analytics/track-usage-event";

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

const libellesProvider: Record<Provider, string> = {
  google: "Google",
  github: "GitHub",
};

/**
 * @component AuthForm
 * @description Orchestre les parcours OAuth, OTP et Magic Link dans le panneau auth sombre.
 */
export function AuthForm({ intent = "login" }: AuthFormProps) {
  const routeur = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const callbackUrl = ServiceFormulaireAuth.obtenirCallbackUrl(searchParams.get("callbackUrl"));
  const [modeOuvert, setModeOuvert] = React.useState("otp");
  const [providerRecent, setProviderRecent] = React.useState<Provider | null>(null);
  const [emailOuvert, setEmailOuvert] = React.useState(intent === "signup");
  const [emailOtp, setEmailOtp] = React.useState("");
  const [nomOtp, setNomOtp] = React.useState("");
  const [emailMagic, setEmailMagic] = React.useState("");
  const [nomMagic, setNomMagic] = React.useState("");
  const [compteur, setCompteur] = React.useState(0);
  const [etapeOtp, setEtapeOtp] = React.useState<OtpEtape>("email-entry");
  const [erreurOtp, setErreurOtp] = React.useState<string | null>(null);
  const [lienMagiqueEnvoye, setLienMagiqueEnvoye] = React.useState(false);
  const refFormulaire = React.useRef<HTMLDivElement | null>(null);
  const dernierOtpAutoSoumis = React.useRef("");

  const formulaireOtpEmail = useForm<AuthEmailFormValues>({
    resolver: zodResolver(intent === "signup" ? authEmailSignUpSchema : authEmailSchema),
    defaultValues: { email: "", name: "" },
  });
  const formulaireOtpCode = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const formulaireMagic = useForm<MagicLinkFormValues>({
    resolver: zodResolver(intent === "signup" ? magicLinkSignUpSchema : magicLinkSchema),
    defaultValues: { email: "", name: "" },
  });

  React.useEffect(() => {
    const provider = window.localStorage.getItem("winall:last-auth-provider");
    if (provider === "google" || provider === "github") {
      setProviderRecent(provider);
      if (intent === "login") setEmailOuvert(false);
      return;
    }
    setEmailOuvert(true);
  }, [intent]);

  React.useEffect(() => {
    if (compteur <= 0) return;
    const timer = window.setTimeout(() => setCompteur((v) => v - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [compteur]);

  React.useEffect(() => {
    const racine = refFormulaire.current;
    if (!racine || !emailOuvert) return;
    if (modeOuvert === "magic-link" && !lienMagiqueEnvoye) {
      ServiceFormulaireAuth.focaliser(
        intent === "signup" ? 'input[aria-label="Nom complet pour le magic link"]' : 'input[aria-label="Email pour recevoir un magic link"]',
        racine,
      );
    }
    if (modeOuvert === "otp" && (etapeOtp === "email-entry" || etapeOtp === "sending-code")) {
      ServiceFormulaireAuth.focaliser(
        intent === "signup" ? 'input[aria-label="Nom complet pour le code OTP"]' : 'input[aria-label="Email pour recevoir un code OTP"]',
        racine,
      );
    }
    if (modeOuvert === "otp" && etapeOtp !== "email-entry" && etapeOtp !== "sending-code") {
      ServiceFormulaireAuth.focaliser('input[aria-label="Code OTP a 6 chiffres"]', racine);
    }
  }, [emailOuvert, modeOuvert, etapeOtp, lienMagiqueEnvoye, intent]);

  const mutationEnvoiOtp = useMutation({
    mutationFn: (valeurs: AuthEmailFormValues) => ServiceAuth.envoyerOtp(valeurs.email),
    onMutate: () => {
      void trackUsageEvent(intent === "signup" ? "signup_started" : "login_started", {
        metadata: { method: "otp" },
      });
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
      setNomOtp(valeurs.name?.trim() || "");
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
    mutationFn: (valeurs: OTPFormValues) => ServiceAuth.verifierOtp(emailOtp, valeurs.otp, nomOtp),
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
      void trackUsageEvent("login_success", {
        metadata: { method: "otp" },
      });
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
    mutationFn: (valeurs: MagicLinkFormValues) =>
      ServiceAuth.envoyerLienMagique(valeurs.email, callbackUrl, valeurs.name),
    onMutate: () => {
      void trackUsageEvent(intent === "signup" ? "signup_started" : "login_started", {
        metadata: { method: "magic_link" },
      });
    },
    onSuccess: ({ error }, valeurs) => {
      if (error) return toast.error(ServiceAuth.normaliserMessageErreur(error, "Impossible d'envoyer le lien."));
      setEmailMagic(valeurs.email);
      setNomMagic(valeurs.name?.trim() || "");
      setLienMagiqueEnvoye(true);
      toast.success("Lien magique envoye.");
    },
    onError: (erreur: { message?: string } | null) =>
      toast.error(ServiceAuth.normaliserMessageErreur(erreur, "Envoi du magic link impossible.")),
  });

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
  const autreProvider = providerRecent === "google" ? "github" : "google";
  const contenu = {
    login: {
      titre: "Se connecter",
      description: "Accedez a votre espace client Winall.",
      lienSecondaire: "Inscrivez-vous",
      prefixeSecondaire: "Vous n'avez pas de compte ?",
      hrefSecondaire: "/sign-up",
      emailAction: "Poursuivre par courriel",
    },
    signup: {
      titre: "Creer un acces",
      description: "Demarrez votre espace client securise.",
      lienSecondaire: "Connectez-vous",
      prefixeSecondaire: "Vous avez deja un compte ?",
      hrefSecondaire: "/log-in",
      emailAction: "Creer un acces par courriel",
    },
  }[intent];

  const changerEmailOtp = () => {
    setEtapeOtp("email-entry");
    setErreurOtp(null);
    setCompteur(0);
    dernierOtpAutoSoumis.current = "";
    formulaireOtpCode.reset();
    if (emailOtp) formulaireOtpEmail.setValue("email", emailOtp);
    if (nomOtp) formulaireOtpEmail.setValue("name", nomOtp);
  };

  const changerEmailMagic = () => {
    setLienMagiqueEnvoye(false);
    if (emailMagic) formulaireMagic.setValue("email", emailMagic);
    if (nomMagic) formulaireMagic.setValue("name", nomMagic);
  };

  return (
    <div ref={refFormulaire} className="space-y-7">
      <div className="space-y-2">
        <h2 className="font-noteSansJp text-2xl font-semibold leading-tight text-white">
          {contenu.titre}
        </h2>
        <p className="text-sm leading-6 text-white/55">{contenu.description}</p>
      </div>

      <div className="space-y-3">
        {providerRecent ? (
          <SocialButton
            provider={providerRecent}
            disabled={isBusy}
            callbackURL={callbackUrl}
            label={`Continuer avec ${libellesProvider[providerRecent]}`}
            className="border-white/20 bg-white/12"
          />
        ) : null}

        <SocialButton
          provider={providerRecent ? autreProvider : "google"}
          disabled={isBusy}
          callbackURL={callbackUrl}
          label={providerRecent ? `Continuer avec ${libellesProvider[autreProvider]}` : "Continuer avec Google"}
        />

        {!providerRecent ? (
          <SocialButton
            provider="github"
            disabled={isBusy}
            callbackURL={callbackUrl}
            label="Continuer avec GitHub"
          />
        ) : null}

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full justify-between border-white/15 bg-transparent px-4 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10 hover:text-white"
          onClick={() => setEmailOuvert((valeur) => !valeur)}
        >
          <span className="inline-flex items-center gap-3">
            <Mail className="size-4" />
            {contenu.emailAction}
          </span>
          <ChevronDown className={`size-4 transition-transform ${emailOuvert ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {emailOuvert ? (
        <div className="space-y-4">
          <div className="relative flex items-center gap-3">
            <Separator className="flex-1 bg-white/15" />
            <span className="text-[10px] font-medium uppercase text-white/35">email</span>
            <Separator className="flex-1 bg-white/15" />
          </div>

          <Tabs value={modeOuvert} onValueChange={setModeOuvert} className="w-full gap-0">
            <TabsList className="mb-4 grid h-10 w-full grid-cols-2 rounded-md border border-white/10 bg-white/6 p-1">
              <TabsTrigger
                value="otp"
                className="flex items-center gap-2 text-xs text-white/65 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <KeyRound className="size-3.5" />
                OTP
              </TabsTrigger>
              <TabsTrigger
                value="magic-link"
                className="flex items-center gap-2 text-xs text-white/65 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <Link2 className="size-3.5" />
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
                onRenvoyerLien={() =>
                  mutationMagicLink.mutate({ email: emailMagic, name: nomMagic })
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : null}

      <p className="text-center text-xs text-white/55">
        {contenu.prefixeSecondaire}{" "}
        <Link
          href={contenu.hrefSecondaire}
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          {contenu.lienSecondaire}
        </Link>
      </p>
    </div>
  );
}
