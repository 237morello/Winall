/**
 * Mission : Composant du dashboard : list-helpers structure l'affichage et les interactions de l'espace utilisateur.
 */
/**
 * Mission : Composant d'authentification : $base gere une partie du parcours de connexion/inscription.
 */
"use client";

import { authClient } from "@/lib/auth-client";
import { Github, Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  provider: "google" | "github";
  disabled?: boolean;
  callbackURL?: string;
}

export const SocialButton = ({
  provider,
  disabled = false,
  callbackURL = "/dashboard",
}: SocialButtonProps) => {
  const [isProviderLoading, setIsProviderLoading] = React.useState(false);

  const handleSignIn = async () => {
    setIsProviderLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (error) {
        toast.error(
          error.message || `Erreur lors de la connexion avec ${provider}`,
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(`Une erreur inattendue est survenue avec ${provider}`);
    } finally {
      setIsProviderLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 font-medium"
      onClick={handleSignIn}
      disabled={disabled || isProviderLoading}
    >
      {isProviderLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : provider === "google" ? (
        <GoogleIcon />
      ) : (
        <Github className="size-4" />
      )}
      Continuer avec {provider === "google" ? "Google" : "GitHub"}
    </Button>
  );
};

const GoogleIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="size-4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);
 import type { AuthMode } from "./auth.types";

export const authContentByMode: Record<
  AuthMode,
  {
    title: string;
    description: string;
    cta: string;
    switchLabel: string;
    switchHref: string;
    switchAction: string;
  }
> = {
  login: {
    title: "Connexion",
    description: "Accedez a votre espace avec votre email et votre mot de passe.",
    cta: "Se connecter",
    switchLabel: "Pas encore de compte ?",
    switchHref: "/sign-up",
    switchAction: "Creer un compte",
  },
  register: {
    title: "Inscription",
    description:
      "Creez un compte rapidement pour acceder a toutes nos fonctionnalites.",
    cta: "Creer mon compte",
    switchLabel: "Vous avez deja un compte ?",
    switchHref: "/log-in",
    switchAction: "Se connecter",
  },
  "magic-link": {
    title: "Lien Magique",
    description: "Connectez-vous sans mot de passe via un lien envoye par email.",
    cta: "Envoyer le lien",
    switchLabel: "Utiliser un mot de passe ?",
    switchHref: "#",
    switchAction: "Connexion classique",
  },
};
 import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractÃ¨res"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractÃ¨res"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractÃ¨res"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const magicLinkSchema = z.object({
  email: z.string().email("Entrez une adresse email valide."),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractÃ¨res.")
    .max(80, "Le nom est trop long.")
    .optional()
    .or(z.literal("")),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type MagicLinkValues = z.infer<typeof magicLinkSchema>;
 "use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sanitizeRedirectPath } from "@/lib/auth-redirect";
import { cn } from "@/lib/utils";

import { SocialButton } from "../components/social-button";
import { authContentByMode } from "./auth-content";
import { getAuthResolver } from "./auth-schema";
import { submitAuthAction } from "./auth-service";
import type { AuthFormValues, AuthMode } from "./auth.types";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode: initialMode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = React.useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<AuthFormValues>({
    resolver: (values, context, options) =>
      getAuthResolver(mode)(values, context, options),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Reset form when mode changes to ensure correct default values and validation
  React.useEffect(() => {
    setServerError(null);
    form.reset(
      mode === "register"
        ? { name: "", email: "", password: "", confirmPassword: "" }
        : mode === "magic-link"
        ? { email: "", name: "" }
        : { email: "", password: "" }
    );
  }, [mode, form]);

  const metadata = authContentByMode[mode];
  const redirectTarget = sanitizeRedirectPath(searchParams.get("redirectTo"));

  const handleSubmit = (values: AuthFormValues) => {
    setServerError(null);

    startTransition(async () => {
      const response = await submitAuthAction(mode, values, redirectTarget);

      if (response.error) {
        const message = response.error.message || "Une erreur est survenue.";
        setServerError(message);
        toast.error(message);
        return;
      }

      if (mode === "magic-link") {
        toast.success("Lien magique envoyÃ© ! VÃ©rifiez votre boÃ®te mail.");
      } else {
        toast.success(mode === "register" ? "Compte crÃ©Ã© !" : "Connexion rÃ©ussie.");
        router.push(redirectTarget);
        router.refresh();
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="border-border/70 bg-card/95 py-0 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-3 border-b border-border/70 py-6">
          <CardTitle className="text-2xl">{metadata.title}</CardTitle>
          <CardDescription>{metadata.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            <SocialButton provider="google" disabled={isPending} callbackURL={redirectTarget} />
            <SocialButton provider="github" disabled={isPending} callbackURL={redirectTarget} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                console.error("Validation errors:", errors);
              })}
              className="space-y-4"
              noValidate
            >
              {mode === "register" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="nom@entreprise.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {mode !== "magic-link" && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <PasswordInput
                            field={{ ...field, value: field.value ?? "" }}
                            visible={showPassword}
                            onToggleVisibility={() => setShowPassword(!showPassword)}
                            autoComplete={mode === "register" ? "new-password" : "current-password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {mode === "register" && (
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <PasswordInput
                              field={{ ...field, value: field.value ?? "" }}
                              visible={showConfirmPassword}
                              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                              autoComplete="new-password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              {serverError && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {serverError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
                {metadata.cta}
              </Button>
            </form>
          </Form>

          <div className="flex flex-col gap-2">
            <p className="text-center text-sm text-muted-foreground">
              {metadata.switchLabel}{" "}
              {mode === "magic-link" ? (
                <button
                  onClick={() => setMode("login")}
                  className="font-medium text-foreground underline-offset-4 transition hover:underline"
                >
                  {metadata.switchAction}
                </button>
              ) : (
                <Link
                  href={metadata.switchHref}
                  className="font-medium text-foreground underline-offset-4 transition hover:underline"
                >
                  {metadata.switchAction}
                </Link>
              )}
            </p>

            {mode !== "magic-link" && (
              <button
                onClick={() => setMode("magic-link")}
                className="text-center text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Se connecter avec un lien magique
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface PasswordInputProps {
  autoComplete: string;
  field: {
    name: string;
    value: string;
    onBlur: () => void;
    onChange: (...event: unknown[]) => void;
    ref: React.Ref<HTMLInputElement>;
  };
  visible: boolean;
  onToggleVisibility: () => void;
}

function PasswordInput({
  autoComplete,
  field,
  visible,
  onToggleVisibility,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        {...field}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        className="pr-11"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
        )}
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
 "use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { Cpu, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Connexion instantanÃ©e",
    description: "Connectez-vous via Google, GitHub ou un lien magique sans mot de passe.",
    icon: LockKeyhole,
  },
  {
    title: "SÃ©curitÃ© & Robustesse",
    description: "PropulsÃ© par Better Auth avec une persistance Prisma sur Supabase.",
    icon: ShieldCheck,
  },
  {
    title: "ExpÃ©rience fluide",
    description: "Interface rÃ©active avec TanStack Query pour une gestion d'Ã©tat optimale.",
    icon: Cpu,
  },
];

interface AuthHeroProps {
  mode: "login" | "register";
}

export function AuthHero({ mode }: AuthHeroProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.24),_transparent_34%),linear-gradient(160deg,color-mix(in_oklab,var(--card)_88%,white),color-mix(in_oklab,var(--muted)_78%,var(--card))_42%,color-mix(in_oklab,var(--background)_80%,var(--chart-2)))] p-8 text-foreground shadow-xl"
    >
      <div className="absolute inset-y-0 right-0 w-40 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent)]" />

      <Badge variant="outline" className="mb-5 border-current/20 bg-background/50">
        <Sparkles className="size-3.5" />
        Winall Auth Surface
      </Badge>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {mode === "login"
            ? "Connectez-vous a votre espace Winall."
            : "Creez un acces propre et pret pour le backend."}
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Cette interface d&apos;authentification est concue comme une brique
          isolee: experience frontend terminee maintenant, raccord serveur deja
          prepare pour la validation reelle via Prisma et Supabase.
        </p>
      </div>

      <Separator className="my-7 bg-current/10" />

      <div className="space-y-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 * index, ease: "easeOut" }}
              className="rounded-2xl border border-border/60 bg-background/35 p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-foreground text-background">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.aside>
  );
}
 import { zodResolver } from "@hookform/resolvers/zod";
import { magicLinkSchema, signInSchema, signUpSchema } from "./auth-form.schema";
import type { AuthMode } from "./auth.types";

export function getAuthResolver(mode: AuthMode) {
  const schema =
    mode === "register"
      ? signUpSchema
      : mode === "magic-link"
        ? magicLinkSchema
        : signInSchema;

  return zodResolver(schema);
}
 "use client";

import { authClient } from "@/lib/auth-client";
import type { AuthFormValues, AuthMode } from "./auth.types";

export async function submitAuthAction(
  mode: AuthMode,
  values: AuthFormValues,
  callbackURL: string,
) {
  if (mode === "register") {
    return authClient.signUp.email({
      name: values.name ?? "",
      email: values.email,
      password: values.password ?? "",
      callbackURL,
    });
  }

  if (mode === "magic-link") {
    return authClient.signIn.magicLink({
      email: values.email,
      callbackURL,
    });
  }

  return authClient.signIn.email({
    email: values.email,
    password: values.password ?? "",
    callbackURL,
  });
}
 import Link from "next/link";
import { AuthHero } from "./auth-hero";

interface AuthShellProps {
  children: React.ReactNode;
  mode: "login" | "register";
}

export function AuthShell({ children, mode }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--background),color-mix(in_oklab,var(--background)_78%,var(--muted)))] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_minmax(360px,480px)]">
        <AuthHero mode={mode} />
        <section className="flex items-center justify-center">{children}</section>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between text-xs text-muted-foreground">
        <span>Winall Tech Auth UI</span>
        <Link href="/" className="transition hover:text-foreground">
          Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
 export type AuthMode = "login" | "register" | "magic-link";

export type AuthFormValues = {
  name?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};
 "use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { normalizeSearch, statusLabel, statusVariant } from "./list-helpers";
import type { BusinessStatus } from "./types";

export interface ListColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface EntityListCardProps<T> {
  title: string;
  description: string;
  icon: LucideIcon;
  rows: T[];
  columns: Array<ListColumn<T>>;
  searchPlaceholder: string;
  searchableText: (row: T) => string;
  statusAccessor: (row: T) => BusinessStatus;
}

const PAGE_SIZE = 4;

export function EntityListCard<T>({
  title,
  description,
  icon: Icon,
  rows,
  columns,
  searchPlaceholder,
  searchableText,
  statusAccessor,
}: EntityListCardProps<T>) {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatus | "all">("all");
  const [page, setPage] = useState(1);

  const availableStatuses = useMemo(() => {
    return Array.from(new Set(rows.map(statusAccessor)));
  }, [rows, statusAccessor]);

  const filteredRows = useMemo(() => {
    const normalized = normalizeSearch(query);
    return rows.filter((row) => {
      const matchesQuery = searchableText(row).toLowerCase().includes(normalized);
      const matchesStatus = selectedStatus === "all" || statusAccessor(row) === selectedStatus;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, selectedStatus, searchableText, statusAccessor]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

  const paginatedRows = useMemo(() => {
    // Contexte sensible: quand un filtre rÃ©duit la liste, la page courante peut devenir invalide.
    // On calcule toujours une fenetre sur la base de totalPages pour eviter les tableaux vides incoherents.
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page, totalPages]);

  const currentPage = Math.min(page, totalPages);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="pl-9"
              placeholder={searchPlaceholder}
            />
          </div>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value as BusinessStatus | "all");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[190px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-8 text-center text-muted-foreground">
                  Aucun resultat pour les filtres actuels.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, index) => (
                <TableRow key={`${searchableText(row)}-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{column.render(row)}</TableCell>
                  ))}
                  <TableCell>
                    <Badge variant={statusVariant(statusAccessor(row))}>
                      {statusLabel(statusAccessor(row))}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filteredRows.length} element(s) - page {currentPage}/{totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Precedent
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
 import type { BusinessStatus } from "./types";

export function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function statusLabel(status: BusinessStatus): string {
  const labels: Record<BusinessStatus, string> = {
    active: "Actif",
    prospect: "Prospect",
    pending: "En attente",
    approved: "Approuve",
    sent: "Envoye",
    paid: "Paye",
    overdue: "En retard",
    info: "Info",
    warning: "Alerte",
    critical: "Critique",
  };
  return labels[status];
}

export function statusVariant(status: BusinessStatus): "default" | "secondary" | "destructive" | "outline" {
  if (status === "critical" || status === "overdue") return "destructive";
  if (status === "pending" || status === "warning") return "secondary";
  if (status === "active" || status === "approved" || status === "paid") return "default";
  return "outline";
}
 import type {
  ClientEntity,
  DashboardSetting,
  InvoiceEntity,
  NotificationEntity,
  QuoteEntity,
} from "./types";

export const CLIENTS_DATA: ClientEntity[] = [
  { id: "CLI-001", name: "Villa Horizon", contact: "Julie Lambert", city: "Lyon", status: "active", projects: 2 },
  { id: "CLI-002", name: "Immeuble Central", contact: "Marc Duret", city: "Paris", status: "pending", projects: 1 },
  { id: "CLI-003", name: "Hotel Azur", contact: "Sonia Perez", city: "Nice", status: "active", projects: 3 },
  { id: "CLI-004", name: "Mairie de Lyon", contact: "Service Urbanisme", city: "Lyon", status: "prospect", projects: 0 },
  { id: "CLI-005", name: "Sogeprom", contact: "Paul Martin", city: "Lille", status: "active", projects: 4 },
];

export const QUOTES_DATA: QuoteEntity[] = [
  { id: "DEV-2401", client: "Villa Horizon", amount: 12450, dueDate: "2026-05-03", status: "pending" },
  { id: "DEV-2402", client: "Hotel Azur", amount: 8600, dueDate: "2026-04-29", status: "approved" },
  { id: "DEV-2403", client: "Mairie de Lyon", amount: 22300, dueDate: "2026-05-15", status: "sent" },
  { id: "DEV-2404", client: "Immeuble Central", amount: 17350, dueDate: "2026-05-07", status: "pending" },
];

export const INVOICES_DATA: InvoiceEntity[] = [
  { id: "FAC-9101", client: "Sogeprom", amount: 5300, dueDate: "2026-04-18", status: "paid" },
  { id: "FAC-9102", client: "Villa Horizon", amount: 7400, dueDate: "2026-04-28", status: "pending" },
  { id: "FAC-9103", client: "Immeuble Central", amount: 9120, dueDate: "2026-04-11", status: "overdue" },
  { id: "FAC-9104", client: "Hotel Azur", amount: 6600, dueDate: "2026-05-02", status: "pending" },
];

export const NOTIFICATIONS_DATA: NotificationEntity[] = [
  { id: "NTF-01", title: "Nouveau ticket support", source: "Client #429", createdAt: "2026-04-15 09:14", status: "warning" },
  { id: "NTF-02", title: "Validation devis recue", source: "Sogeprom", createdAt: "2026-04-15 08:02", status: "info" },
  { id: "NTF-03", title: "Facture en retard", source: "Immeuble Central", createdAt: "2026-04-14 17:41", status: "critical" },
  { id: "NTF-04", title: "Intervention confirmee", source: "Hotel Azur", createdAt: "2026-04-14 13:27", status: "info" },
];

export const SETTINGS_DATA: DashboardSetting[] = [
  {
    id: "set-notif-email",
    title: "Notifications email",
    description: "Recevoir les alertes critiques et les validations devis par email.",
    enabled: true,
  },
  {
    id: "set-notif-push",
    title: "Notifications push",
    description: "Recevoir les notifications en temps reel dans le dashboard.",
    enabled: true,
  },
  {
    id: "set-two-factor",
    title: "Double authentification",
    description: "Renforcer la securite du compte administrateur.",
    enabled: false,
  },
  {
    id: "set-weekly-report",
    title: "Rapport hebdomadaire",
    description: "Generer automatiquement un resume metier chaque semaine.",
    enabled: false,
  },
];
 export type BusinessStatus =
  | "active"
  | "prospect"
  | "pending"
  | "approved"
  | "sent"
  | "paid"
  | "overdue"
  | "info"
  | "warning"
  | "critical";

export interface ClientEntity {
  id: string;
  name: string;
  contact: string;
  city: string;
  status: "active" | "prospect" | "pending";
  projects: number;
}

export interface QuoteEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "pending" | "approved" | "sent";
}

export interface InvoiceEntity {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

export interface NotificationEntity {
  id: string;
  title: string;
  source: string;
  createdAt: string;
  status: "info" | "warning" | "critical";
}

export interface DashboardSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  User,
  LogOut,
  Building2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSidebarItems } from "./sidebar-items";
import { cn } from "@/lib/utils";
import { RichTooltip } from "./rich-tooltip";
import { Button } from "@/components/ui/button";

export function AppSidebar({ userId }: { userId: string }) {
  const pathname = usePathname();
  const sidebarItems = getSidebarItems(userId);

  return (
    <Sidebar collapsible="none" className="w-[70px] border-r border-border/40 bg-card/40 backdrop-blur-md">
      {/* Header avec logo Winall uniquement */}
      <SidebarHeader className="py-6 px-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-xl bg-p text-white shadow-lg shadow-p/20 h-10 w-10">
          <Building2 className="h-6 w-6" />
        </div>
      </SidebarHeader>

      {/* Navigation avec icÃ´nes uniquement + Tooltips */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <RichTooltip
                    title={item.label}
                    description={item.description}
                    shortcut={item.shortcut}
                    side="right"
                    align="center"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-10 w-10 mx-auto transition-all duration-200 justify-center p-0",
                        isActive 
                          ? "bg-p text-white hover:bg-p/90 shadow-md shadow-p/10" 
                          : "hover:bg-p/5 text-muted-foreground hover:text-p"
                      )}
                    >
                      <Link href={item.href} className="flex items-center justify-center">
                        <item.icon className={cn("size-5", isActive ? "text-white" : "transition-colors")} />
                      </Link>
                    </SidebarMenuButton>
                  </RichTooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer avec profil simplifiÃ© (Avatar uniquement) */}
      <SidebarFooter className="p-2 pt-4 border-t border-border/40 flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 rounded-lg overflow-hidden border border-border/50">
              <Avatar className="h-full w-full rounded-none">
                <AvatarImage src="/avatars/user.jpg" alt="Admin" />
                <AvatarFallback className="bg-p/10 text-p font-bold">W</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl p-2 shadow-xl border-border/50"
            side="right"
            sideOffset={12}
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Session {userId.slice(0, 5)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 opacity-50" />
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 focus:bg-p/5 focus:text-p">
              <User className="h-4 w-4" />
              <span>Profil Expert</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 focus:bg-p/5 focus:text-p">
              <Settings className="h-4 w-4" />
              <span>ParamÃ¨tres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 opacity-50" />
            <DropdownMenuItem className="rounded-md cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="h-4 w-4" />
              <span>Se dÃ©connecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
 "use client"

import { usePathname } from "next/navigation"
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"

// Mapping des segments URL vers des labels lisibles
const breadcrumbMap: Record<string, string> = {
  dashboard: "Tableau de bord",
  project: "Projets",
  clients: "Clients",
  quotes: "Devis",
  invoices: "Factures",
  chat: "Chat",
  notifications: "Notifications",
  settings: "ParamÃ¨tres"
}

// Mapping des chemins complets vers des labels personnalisÃ©s
const pathMap: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/project": "Projets",
  "/dashboard/clients": "Clients",
  "/dashboard/quotes": "Devis",
  "/dashboard/invoices": "Factures",
  "/dashboard/chat": "Chat",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings": "ParamÃ¨tres"
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname()
  
  // Ne pas afficher les breadcrumbs sur la page dashboard principale
  if (pathname === "/dashboard") {
    return (
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">Tableau de bord</h1>
      </div>
    )
  }

  // GÃ©nÃ©rer les breadcrumbs Ã  partir du pathname
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = []

  // Ajouter le segment "dashboard" comme racine
  breadcrumbs.push({
    label: "Tableau de bord",
    href: "/dashboard",
    isActive: false
  })

  // Ajouter les segments suivants
  let currentPath = "/dashboard"
  segments.slice(1).forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.slice(1).length - 1
    
    breadcrumbs.push({
      label: pathMap[currentPath] || breadcrumbMap[segment] || segment,
      href: currentPath,
      isActive: isLast
    })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm">
        {breadcrumbs.map((crumb) => (
          <div key={crumb.href} className="flex items-center">
            <BreadcrumbItem>
              {crumb.isActive ? (
                <BreadcrumbPage className="font-medium">
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isActive && (
              <BreadcrumbSeparator className="mx-2" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
 "use client"

import { Search, Bell, User, Settings, LogOut, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs"
import { cn } from "@/lib/utils"

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <DashboardBreadcrumbs />
        </div>

        <div className="flex-1" />

        {/* Action Bar */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Senior Style */}
          <div className="hidden lg:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              placeholder="Recherche rapide..."
              className="pl-10 w-[240px] lg:w-[320px] bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/50 transition-all rounded-full"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground select-none pointer-events-none">
              <Command className="h-2.5 w-2.5" /> K
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-p/10 hover:text-p transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-p opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-p"></span>
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50 p-0 hover:ring-2 hover:ring-p/20 transition-all">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="/avatars/user.jpg" alt="Admin" />
                    <AvatarFallback className="bg-p/10 text-p text-xs font-bold">AW</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 rounded-xl shadow-2xl border-border/50" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-bold leading-none">Admin Winall</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@winall.tech
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 focus:bg-p/5 focus:text-p">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Mon Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 focus:bg-p/5 focus:text-p">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">ParamÃ¨tres</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="rounded-lg py-2 cursor-pointer gap-3 text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">DÃ©connexion</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
 "use client"

import * as React from "react"
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RichTooltipProps {
  children: React.ReactNode
  title: string
  description?: string
  shortcut?: string
  action?: {
    label: string
    onClick: () => void
  }
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function RichTooltip({
  children,
  title,
  description,
  shortcut,
  action,
  side = "top",
  align = "center"
}: RichTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent 
        side={side} 
        align={align}
        className="max-w-xs p-0"
      >
        <div className="space-y-2 p-3">
          {/* Titre */}
          <div className="font-medium text-sm">
            {title}
          </div>
          
          {/* Description */}
          {description && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </div>
          )}
          
          {/* Raccourci clavier */}
          {shortcut && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Raccourci</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">{shortcut}</span>
              </kbd>
            </div>
          )}
          
          {/* Action */}
          {action && (
            <div className="pt-1 border-t">
              <button
                onClick={action.onClick}
                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// Hook pour crÃ©er des tooltips riches pour les items de sidebar
export function useSidebarTooltip(item: {
  label: string
  description?: string
  shortcut?: string
}) {
  return {
    tooltip: (children: React.ReactNode) => (
      <RichTooltip
        title={item.label}
        description={item.description}
        shortcut={item.shortcut}
        side="right"
        align="start"
      >
        {children}
      </RichTooltip>
    )
  }
}
 // sidebar-items.ts
import {
    Bell,
    Briefcase,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Receipt,
    Settings,
    Users
} from "lucide-react";

export const getSidebarItems = (userId: string) => [
  {
    label: "Tableau de bord",
    href: `/dashboard/${userId}`,
    icon: LayoutDashboard,
    description: "Vue d'ensemble et statistiques clÃ©s",
    shortcut: "âŒ˜+D",
  },
  {
    label: "Projets",
    href: `/dashboard/${userId}/project`,
    icon: Briefcase,
    description: "Suivi des installations Ã©lectriques",
    shortcut: "âŒ˜+P",
  },
  {
    label: "Clients",
    href: `/dashboard/${userId}/clients`,
    icon: Users,
    description: "Gestion du portefeuille client",
    shortcut: "âŒ˜+U",
  },
  {
    label: "Devis",
    href: `/dashboard/${userId}/quotes`,
    icon: FileText,
    description: "Gestion des propositions commerciales",
    shortcut: "âŒ˜+Q",
  },
  {
    label: "Factures",
    href: `/dashboard/${userId}/invoices`,
    icon: Receipt,
    description: "Suivi des paiements et facturation",
    shortcut: "âŒ˜+I",
  },
  {
    label: "Messages",
    href: `/dashboard/${userId}/chat`,
    icon: MessageSquare,
    description: "Communication avec les clients",
    shortcut: "âŒ˜+M",
  },
  {
    label: "Notifications",
    href: `/dashboard/${userId}/notifications`,
    icon: Bell,
    description: "Alertes et mises Ã  jour",
    shortcut: "âŒ˜+N",
  },
  {
    label: "ParamÃ¨tres",
    href: `/dashboard/${userId}/settings`,
    icon: Settings,
    description: "Configuration du compte",
    shortcut: "âŒ˜+,",
  },
];
 "use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";

const faqs = [
  {
    question: "Comment planifiez-vous les interventions critiques ?",
    answer:
      "Chaque projet reÃ§oit un dossier digital de suivi, une Ã©quipe terrain et un centre de supervision pour garantir la traÃ§abilitÃ© 24h/24.",
  },
  {
    question: "Offrez-vous des contrats de maintenance ?",
    answer:
      "Oui, nos contrats intÃ¨grent la maintenance prÃ©ventive, la gestion de stock de piÃ¨ces et un support tÃ©lÃ©phonique multilingue.",
  },
  {
    question: "Peut-on collaborer via vos outils digitaux ?",
    answer:
      "Absolument, notre plate-forme interne partage les tableaux de bord, les plannings et les rapports de chantier en temps rÃ©el.",
  },
];

export const FaqSection = () => (
    <section className="space-y-6 py-16">
    <div className="flex items-center justify-between">
      <Typography variant="h3" className="font-semibold text-foreground">
        FAQ
      </Typography>
      <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">RÃ©ponses rapides</span>
    </div>
    <Accordion type="single" collapsible className="w-full rounded-3xl bg-background/80">
      {faqs.map((faq) => (
        <AccordionItem value={faq.question} key={faq.question} className="border-b border-border/30 last:border-b-0">
          <AccordionTrigger className="text-left text-foreground">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
 "use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const HeroAbout = () => (
  <section className="relative overflow-hidden rounded-[2.5rem] bg-background/95 p-6">
    <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
      <div className="space-y-4">
        <Typography variant="h2" className="text-4xl font-bold leading-tight lg:text-5xl">
          Winall Tech, alliance verte, orange et carbone pour vos infrastructures critiques.
        </Typography>
        <Typography variant="p">
          Depuis 2015, nous rÃ©pondons aux enjeux Ã©nergÃ©tiques, digitaux et dâ€™efficacitÃ© opÃ©rationnelle
          avec un engagement inscrit dans lâ€™innovation responsable. Notre Ã©quipe opÃ¨re comme une
          suite de studios techniques, mÃªlant ingÃ©nierie, data et design de service.
        </Typography>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" className="bg-p text-background hover:bg-p-400">
            DÃ©couvrir nos offres
          </Button>
          <Button variant="outline">Rencontrer lâ€™Ã©quipe dirigeante</Button>
        </div>
      </div>
      <div className="rounded-3xl bg-p/10 p-6 text-sm text-p">
        <p className="font-semibold uppercase tracking-[0.3em] text-p-300">Impact</p>
        <p className="mt-3 text-lg font-semibold text-foreground">
          200+ projets livrÃ©s en Afrique & Europe, 24h/7 support, couvertures multisectorielles.
        </p>
        <p className="mt-2 text-muted-foreground">
          Nous accompagnons administrations, industriels et acteurs privÃ©s avec une approche systÃ©mique
          : infrastructure, data, sÃ©curitÃ© et maintenance prÃ©dictive.
        </p>
      </div>
    </div>
  </section>
);
 "use client";

import { Typography } from "@/components/ui/typography";

const timeline = [
  { year: "2015", detail: "Fondation avec expertise Ã©lectrique industrielle pour PME et groupes miniers." },
  { year: "2018", detail: "IntÃ©gration des solutions digitales et dÃ©ploiement dâ€™un accompagnement 24/7." },
  { year: "2020", detail: "Ouverture dâ€™un centre de maintenance Ã  Dakar et lancement des offres Ã©nergie renouvelable." },
  { year: "2023", detail: "Plateforme de services Winall Platform avec monitoring IoT et support prÃ©dictif." },
  { year: "2026", detail: "Vision 2030 : prÃ©sences renforcÃ©es sur lâ€™Afrique francophone et hubs de formation internes." },
];

export const HistoryTimeline = () => (
  <section className="space-y-6 p-0">
    <div className="mb-6 flex items-center justify-between">
      <Typography variant="h3" className="font-semibold text-foreground">
        Histoire & trajectoire
      </Typography>
      <span className="text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground">
        2015 â†’ Aujourdâ€™hui
      </span>
    </div>
    <div className="space-y-4">
      {timeline.map((entry) => (
        <div key={entry.year} className="flex flex-col gap-2 border-b border-border/20 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-start">
          <div className="min-w-[4rem] text-lg font-semibold text-p">{entry.year}</div>
          <Typography variant="p" className="text-muted-foreground">
            {entry.detail}
          </Typography>
        </div>
      ))}
    </div>
  </section>
);
 "use client";

import { Typography } from "@/components/ui/typography";

const leaders = [
  {
    name: "Melvyn KÃ©bÃ©",
    title: "Directeur GÃ©nÃ©ral",
    quote:
      "CrÃ©er un socle dâ€™ingÃ©nierie qui respecte les communautÃ©s, anticipe les ruptures Ã©nergÃ©tiques et valorise les Ã©quipes sur le terrain.",
  },
  {
    name: "Audrey Barre",
    title: "Responsable Innovation & Data",
    quote:
      "Nous traduisons les contraintes industrielles en expÃ©riences numÃ©riques simples, en gardant le mÃªme niveau dâ€™exigence que sur un chantier.",
  },
];

export const LeadersSection = () => (
  <section className="space-y-6 py-16">
    <Typography variant="h3" className="font-semibold text-foreground">
      Nos leaders
    </Typography>
    <div className="grid gap-6 md:grid-cols-2">
      {leaders.map((leader) => (
        <article key={leader.name} className="space-y-2 rounded-2xl bg-background/80 p-5 shadow-none">
          <div className="flex items-baseline justify-between gap-3">
            <Typography variant="h4" className="text-xl font-bold text-foreground">
              {leader.name}
            </Typography>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-p">
              {leader.title}
            </span>
          </div>
          <Typography variant="p" className="text-muted-foreground">
            â€œ{leader.quote}â€
          </Typography>
        </article>
      ))}
    </div>
  </section>
);
 "use client";

import { Typography } from "@/components/ui/typography";

const cards = [
  {
    title: "Mission",
    body: "CrÃ©er des infrastructures Ã©lectriques et digitales rÃ©silientes qui amplifient la productivitÃ© et rÃ©duisent les risques opÃ©rationnels, avec un focus sur la transition Ã©nergÃ©tique.",
    accent: "bg-p/20 text-p border-p/30",
  },
  {
    title: "Valeurs",
    body: "Ã‰coute client, transparence chantier, sÃ©curitÃ© des Ã©quipes et innovation collaborative. Nous mesurons la satisfaction par la rapiditÃ©, la qualitÃ© et lâ€™impact social.",
    accent: "bg-amber-100/80 text-amber-700 border-amber-200",
  },
  {
    title: "Vision",
    body: "ÃŠtre la plateforme technique de rÃ©fÃ©rence pour les industries Ã©mergentes, combinant intelligence terrain et services numÃ©riques anticipatifs.",
    accent: "bg-muted/70 text-foreground border-border/70",
  },
];

export const MissionValues = () => (
  <section className="space-y-6 py-16">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <Typography variant="h3" className="font-semibold text-foreground">
        Mission â€¢ Valeurs â€¢ Vision
      </Typography>
      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        Timeline continue
      </span>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className={`rounded-2xl ${card.accent} p-5 text-sm leading-relaxed ${card.title === "Valeurs" ? "text-muted-foreground" : "text-foreground"}`}
        >
          <Typography variant="h4" className="text-lg font-semibold uppercase tracking-[0.3em]">
            {card.title}
          </Typography>
          <Typography variant="p" className="mt-3 text-sm text-muted-foreground">
            {card.body}
          </Typography>
        </article>
      ))}
    </div>
  </section>
);
 import { HeaderC } from "@/components/features/header-c";


export default function HeaderS() {
  return (
    <section className='w-full relative'>
      <HeaderC  className="
      fixe inset-0
      xl:max-w-6xl w-full mx-auto xl:rounded-full
      "/>
    </section>
  )
}
 import { HeroC } from "@/components/features/hero-c";

export default function HeroS (){

  return(
    <>
      <HeroC />
    </>
  )
} import { Typography } from "@/components/ui/typography"
import Image from "next/image"

export const NextStep1S = () => {
  return (
    <section className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 space-y-3 text-center">
          <Typography variant="h2" className="font-bold capitalize">
            Pourquoi nous choisir
          </Typography>

          <Typography variant="p" className="text-muted-foreground">
            Avec Winall Tech SARL,
            <span className="ml-1 font-semibold text-p-400">
              votre satisfaction est notre priorite
            </span>
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-sm backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative aspect-square w-full max-w-[90px] sm:max-w-[150px] md:max-w-[250px]">
              <Image
                src="/images/Group 24.png"
                alt="expertise"
                fill
                className="object-contain"
              />
            </div>

            <Typography variant="muted" className="font-semibold">
              100% Expertise
            </Typography>

            <Typography className="text-muted-foreground">
              Des techniciens certifies et experimentes dans toutes nos
              solutions
            </Typography>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative aspect-square w-full max-w-[90px] sm:max-w-[150px] md:max-w-[250px]">
              <Image
                src="/images/Group 25.png"
                alt="qualite"
                fill
                className="object-contain"
              />
            </div>

            <Typography variant="muted" className="font-semibold">
              Qualite Garantie
            </Typography>

            <Typography className="text-muted-foreground">
              Materiaux de qualite avec garantie complete sur nos prestations
            </Typography>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative aspect-square w-full max-w-[90px] sm:max-w-[150px] md:max-w-[250px]">
              <Image
                src="/images/Group 26.png"
                alt="urgence"
                fill
                className="object-contain"
              />
            </div>

            <Typography variant="muted" className="font-semibold">
              Service d&apos;urgence
            </Typography>

            <Typography className="text-muted-foreground">
              Intervention rapide 24h/24 et 7j/7 pour tous vos besoins
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}
 import { CoverflowMobile } from "@/components/features/coverflow-mobile"
import { FancyCard } from "@/components/features/card-hover-light";
import { ImageTall } from "@/components/features/long-image";
import { Typography } from "@/components/ui/typography";
import { Zap } from "lucide-react";

interface JobDescribProps {
  job?: {
    id: number;
    simpleExplication: string;
    accroche: string;
    skills: string[];
    footerDes: string;
  }[];
}

const data = [
  {
    title: "Electricite & Batiment",
    description: "De la construction a la realisation",
    logo: Zap,
    jobDescrib: [
      {
        id: 0,
        simpleExplication:
          "Chez nous, nous concevons et realisons des installations electriques fiables et adaptees a vos besoins : maisons, bureaux ou chantiers.",
        accroche:
          "L'electricite est au coeur de tout batiment moderne. Elle permet d'alimenter vos equipements, d'assurer votre confort et votre securite au quotidien.",
        skills: [
          "Installation complete",
          "Mise aux normes",
          "Eclairage moderne",
          "Depannage rapide",
        ],
        footerDes:
          "Profitez d'un systeme securise, economique et durable pour votre espace.",
      },
    ],
  },
  {
    title: "Informatique",
    description: "Solutions digitales modernes",
    logo: Zap,
  },
  {
    title: "Maintenance",
    description: "Support technique avance",
    logo: Zap,
  },
  {
    title: "Electricite & Batiment",
    description: "De la construction a la realisation",
    logo: Zap,
  },
  {
    title: "Informatique",
    description: "Solutions digitales modernes",
    logo: Zap,
  },
  {
    title: "Maintenance",
    description: "Support technique avance",
    logo: Zap,
  },
];

export const NextStep2S = () => {
  return (
    <section className="w-full rounded-[2rem] border border-border/60 bg-muted/35 py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 space-y-3 text-center">
          <Typography variant="h2" className="font-bold capitalize">
            Nos Services
          </Typography>

          <Typography variant="p" className="text-muted-foreground">
            Une gamme complete de solutions professionnelles pour repondre a
            tous vos besoins technologiques
          </Typography>
        </div>

        <div className="flex w-full items-center gap-4">
          <div className="w-full md:hidden">
            <CoverflowMobile
              items={data.map((item) => ({
                title: item.title,
                description: item.description,
                logo: <item.logo className="h-5 w-5" />,
                dialogContent: <JobDescrib job={item.jobDescrib} />,
              }))}
            />
          </div>

          <div className="hidden w-full items-center gap-4 md:flex">
            <div className="hidden lg:block">
              <ImageTall image="63966.jpg" />
            </div>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((item, index) => (
                <FancyCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  logo={<item.logo className="h-6 w-6" />}
                  dialogContent={<JobDescrib job={item.jobDescrib} />}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JobDescrib = ({ job }: JobDescribProps) => {
  if (!job) return null;

  return (
    <div className="flex items-center">
      {job.map((ele) => (
        <div
          key={ele.id}
          className="relative max-h-[40vh] space-y-2 rounded-xl border border-border/60 bg-card p-4 pr-2 shadow-sm lg:max-h-none lg:overflow-visible"
        >
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded bg-primary"></div>
            <Typography variant="h5">{ele.accroche}</Typography>
          </div>

          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded bg-primary/40"></div>
            <Typography variant="p">{ele.simpleExplication}</Typography>
          </div>

          <div className="space-y-1 pl-4">
            {ele.skills.map((skill, index) => (
              <div key={index} className="text-sm text-foreground/80">
                âœ“ {skill}
              </div>
            ))}
          </div>

          <Typography variant="p" className="text-sm italic text-muted-foreground">
            {ele.footerDes}
          </Typography>
        </div>
      ))}
    </div>
  );
};
 "use client"

import { Typography } from "@/components/ui/typography"
import { motion, useAnimationControls } from "motion/react"
import Image from "next/image"

const data = [
  { id: 1, title: "Controleur biometrique", image: "pngwing.com (1).png" },
  { id: 2, title: "Lecteur d'empreinte", image: "pngwing.com (2).png" },
  { id: 3, title: "Acces RFID avance", image: "pngwing.com.png" },
]

const track = [...data, ...data, ...data, ...data]

export const TechItems = () => {
  const controls = useAnimationControls()

  const play = () =>
    controls.start({
      x: "-50%",
      transition: { repeat: Infinity, duration: 14, ease: "linear" },
    })
  const pause = () => controls.stop()

  return (
    <section className="overflow-hidden py-16">
      <div className="mb-12 space-y-3 px-4 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
          Nos partenaires
        </span>
        <Typography variant="h2" className="font-bold capitalize">
          Technologies partenaires
        </Typography>
        <Typography variant="p" className="mx-auto max-w-md text-muted-foreground">
          Nous travaillons avec les meilleures solutions du marche
        </Typography>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        onMouseEnter={pause}
        onMouseLeave={play}
      >
        <motion.div
          className="flex w-max gap-5"
          initial={{ x: "0%" }}
          animate={controls}
          onViewportEnter={play}
        >
          {track.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="
                group/card relative min-w-[160px] h-24
                rounded-2xl border border-border/60 bg-card
                flex flex-col items-center justify-center gap-2 px-4
                shadow-sm hover:shadow-md
                cursor-pointer select-none
                transition-shadow duration-300
              "
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

              <div className="relative z-10 h-10 w-10 shrink-0">
                <Image
                  src={`/images/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>

              <p className="relative z-10 line-clamp-2 px-1 text-center text-[11px] font-medium leading-tight text-muted-foreground">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


