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
    <div className="h-svh overflow-hidden bg-[linear-gradient(135deg,#fffdf9,#f6f6f3)]">
      <div className="grid h-svh lg:grid-cols-[1fr_0.82fr]">
        <aside className="relative hidden overflow-hidden lg:block">
          <Image
            src="/images/main-hero-imgAcceuil.png"
            alt="Equipe Winall Tech en intervention terrain"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,10,10,0.18),rgba(10,10,10,0.78))]" />

          <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-white/20"
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
                Vos projets et interventions accessibles en quelques secondes.
              </h1>
              <p className="text-sm leading-6 text-white/75">
                Connexion sans mot de passe par OTP, Magic Link ou OAuth.
              </p>
            </div>

            <p className="text-xs text-white/60">
              OTP expire en 60 secondes • Session protegee
            </p>
          </div>
        </aside>

        <main className="flex h-svh items-center justify-center px-3 py-3 sm:px-5 lg:px-8">
          <div className="w-full max-w-[390px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
