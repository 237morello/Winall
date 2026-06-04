import { CheckCircle2, MapPin } from "lucide-react"
import { ABOUT_TIMELINE } from "@/lib/about/about.constants"
import { cn } from "@/lib/utils"

export function TimelineSection() {
  return (
    <section className="px-6 py-16 md:px-7 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-4 md:grid-cols-[0.7fr_1fr] md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase text-p">Progression</p>
            <h2 className="text-3xl font-medium text-foreground">Une évolution guidée par le terrain</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:ml-auto">
            Winall a progressivement élargi son périmètre autour d&apos;un même principe:
            rendre les installations plus lisibles, plus sûres et plus faciles à maintenir.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:block" />

          <div className="grid gap-5">
            {ABOUT_TIMELINE.map((item, index) => (
              <article
                key={item.year}
                className={cn(
                  "relative grid gap-4 rounded-lg border bg-background p-5 md:grid-cols-[9rem_1fr] md:pl-12",
                  item.isCurrent ? "border-p/40 shadow-sm" : "border-border"
                )}
              >
                <span
                  className={cn(
                    "absolute left-4 top-6 hidden size-8 -translate-x-1/2 items-center justify-center rounded-md border bg-background md:flex",
                    item.isCurrent ? "border-p text-primary" : "border-border text-muted-foreground"
                  )}
                >
                  {item.isCurrent ? <MapPin size={15} /> : <CheckCircle2 size={15} />}
                </span>
                <div>
                  <p className={cn("text-sm font-medium", item.isCurrent ? "text-primary" : "text-muted-foreground")}>
                    {item.year}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Étape {index + 1}</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
