import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardCheck, Network, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HERO_TRUST_LABELS } from "@/lib/about/about.constants"

const heroCapabilities = [
  { label: "Électricité", icon: ClipboardCheck },
  { label: "Sûreté", icon: ShieldCheck },
  { label: "Réseaux", icon: Network },
]

export function HeroSection() {
  return (
    <section className="px-6 pb-16 pt-10 md:px-7 md:pb-20 md:pt-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-7">
          <Badge variant="outline" className="rounded-md border-p/30 bg-p/10 px-3 py-1 font-medium text-primary">
            Partenaire technique B2B · Douala
          </Badge>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Des infrastructures fiables pour les sites qui doivent rester opérationnels
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Winall Tech Sarl accompagne entreprises, commerces et institutions dans la conception,
            l&apos;installation et la maintenance de systèmes électriques, sûreté, domotique et réseaux.
            Notre priorité: livrer des environnements maîtrisés, documentés et durables.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button asChild size="lg" className="rounded-md px-5 font-medium">
              <Link href="/dashboard/quotes">
                Demander un cadrage
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="rounded-md border-primary/20 px-5 font-medium">
              <Link href="/projets">Nos réalisations</Link>
            </Button>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
            {HERO_TRUST_LABELS.map((item) => (
              <div key={item.label} className="border-l border-border py-2 pl-4">
                <p className="text-lg font-medium text-foreground">{item.value}</p>
                <p className="text-xs leading-5 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-muted/40 px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase text-muted-foreground">Méthode Winall</p>
                <h2 className="mt-1 text-lg font-medium text-foreground">Audit, déploiement, maintenance</h2>
              </div>
              <span className="rounded-md bg-p/15 px-3 py-1 text-xs font-medium text-primary">SLA prêt</span>
            </div>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {heroCapabilities.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3">
                  <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon size={17} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Livrables projet</p>
                <CheckCircle2 className="text-p" size={18} />
              </div>
              <div className="space-y-3">
                {["Diagnostic site", "Planning de pose", "Tests de réception", "Support après mise en service"].map((step, index) => (
                  <div key={step} className="grid grid-cols-[2rem_1fr] items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-md border border-border text-xs font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-10 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
