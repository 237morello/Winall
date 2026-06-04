import { Check, Eye, Gem, Target } from "lucide-react"
import { EXPERTISE_AREAS, MVV_DATA } from "@/lib/about/about.constants"

const mvvItems = [
  { title: "Mission", body: MVV_DATA.mission, icon: Target },
  { title: "Vision", body: MVV_DATA.vision, icon: Eye },
]

export function MvvSection() {
  return (
    <section id="expertise" className="border-y border-border bg-muted/25 px-6 py-16 md:px-7 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase text-p">Positionnement</p>
            <h2 className="max-w-xl text-3xl font-medium leading-tight text-foreground">
              Une équipe technique structurée pour des projets sensibles
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Nous intervenons quand l&apos;installation doit être fiable, compréhensible par vos équipes
              et maintenable dans la durée.
            </p>
          </div>

          <div className="grid gap-4">
            {mvvItems.map(({ title, body, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-border bg-background p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-base font-medium text-foreground">{title}</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            {EXPERTISE_AREAS.map((area) => (
              <article key={area.title} className="rounded-lg border border-border bg-background p-5">
                <Gem className="mb-5 text-p" size={20} />
                <h3 className="text-base font-medium text-foreground">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.description}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs font-medium leading-5 text-foreground">
                  {area.proof}
                </p>
              </article>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-background p-5">
            <p className="mb-4 text-sm font-medium text-foreground">Standards appliqués</p>
            <ul className="grid gap-3 sm:grid-cols-2">
            {MVV_DATA.values.map((value) => (
              <li key={value} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-p/15 text-primary">
                  <Check size={13} />
                </span>
                {value}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
