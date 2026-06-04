import Link from "next/link"
import { ArrowRight, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuoteSection() {
  return (
    <section className="px-6 py-16 md:px-7 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase text-p">Engagement</p>
            <p className="max-w-3xl text-2xl font-medium leading-snug text-foreground md:text-3xl">
              Nous ne vendons pas seulement du matériel. Nous cadrons des infrastructures qui doivent
              rester utiles, lisibles et fiables après la livraison.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Chaque projet est traité avec un niveau de documentation et de contrôle adapté à son impact:
              sécurité du site, continuité électrique, accès aux données ou confort d&apos;exploitation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Audit exploitable", "Installation testée", "Maintenance suivie"].map((label) => (
              <div key={label} className="rounded-lg border border-border bg-background p-4">
                <ShieldCheck className="text-p" size={18} />
                <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-md border-primary/20 px-5">
              <Link href="/dashboard/support">
                <Mail size={16} />
                Nous écrire
              </Link>
            </Button>
            <Button asChild className="rounded-md px-5">
              <Link href="/dashboard/quotes">
                Préparer un devis
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-primary p-6 text-primary-foreground">
          <p className="text-xs font-medium uppercase text-primary-foreground/60">Cadre de mission</p>
          <div className="mt-8 space-y-5">
            <div>
              <p className="text-4xl font-medium">01</p>
              <h3 className="mt-3 text-lg font-medium">Comprendre l&apos;environnement</h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                Site, contraintes, risques, priorités d&apos;exploitation et attentes de maintenance.
              </p>
            </div>
            <div className="border-t border-primary-foreground/15 pt-5">
              <p className="text-4xl font-medium">02</p>
              <h3 className="mt-3 text-lg font-medium">Livrer une solution maîtrisée</h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                Matériel, pose, paramétrage, tests et transfert aux utilisateurs finaux.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-lg border border-primary-foreground/15 p-4">
            <p className="text-sm font-medium">Management Winall Tech</p>
            <p className="mt-1 text-xs text-primary-foreground/60">Expertise, méthode et engagement terrain</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
