import { ABOUT_PARTNERS } from "@/lib/about/about.constants"

export function PartnersSection() {
  return (
    <section className="border-y border-border bg-muted/25 px-6 py-14 md:px-7">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase text-p">Écosystème technique</p>
          <h2 className="text-2xl font-medium text-foreground">Des marques intégrées pour des installations maintenables</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Nous sélectionnons les équipements selon la disponibilité, la compatibilité et la qualité du support,
            pas seulement selon la fiche technique.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_PARTNERS.map((partner) => (
            <article
              key={partner.name}
              className="rounded-lg border border-border bg-background px-4 py-4"
            >
              <h3 className="text-sm font-medium text-foreground">{partner.name}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{partner.category}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
