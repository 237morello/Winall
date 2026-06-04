import Image from "next/image";
import Link from "next/link";

interface AuthSplitProps {
  children: React.ReactNode;
}

/**
 * @component AuthSplit
 * @description Layout d'authentification compact.
 * Mobile/tablette : formulaire seul, sans image.
 * Desktop : image + formulaire visibles, sans scroll vertical.
 */
export function AuthSplit({ children }: AuthSplitProps) {
  return (
    <div className="h-svh overflow-hidden bg-[#f7f5f0]">
      <div className="grid h-svh lg:grid-cols-[1fr_0.82fr]">
        <aside className="relative hidden overflow-hidden lg:block">
          <Image
            src="/images/main-hero-imgAcceuil.png"
            alt="Equipe Winall Tech en intervention terrain"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-white/25"
            >
              <Image
                src="/images/logo_v2.png"
                alt="Logo Winall Tech"
                width={28}
                height={28}
                className="rounded-full bg-white/90 p-0.5"
              />
              <span>Winall Tech Sarl</span>
            </Link>

            <div className="max-w-md space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
                Espace client securise
              </p>
              <h1 className="font-noteSansJp text-3xl font-semibold leading-tight">
                Un acces clair a vos projets, devis et interventions.
              </h1>
              <p className="text-sm leading-6 text-white/75">
                Connexion sans mot de passe par OTP, Magic Link ou OAuth, avec retour rapide vers votre espace.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
              <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                <p className="font-medium text-white">OTP</p>
                <p className="mt-1">Code court</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                <p className="font-medium text-white">Magic Link</p>
                <p className="mt-1">Lien unique</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                <p className="font-medium text-white">OAuth</p>
                <p className="mt-1">Google/GitHub</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex h-svh items-center justify-center px-3 py-3 sm:px-5 lg:px-8">
          <div className="w-full max-w-[390px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
