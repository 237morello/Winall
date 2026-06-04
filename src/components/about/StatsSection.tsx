import { ABOUT_STATS } from "@/lib/about/about.constants"

export function StatsSection() {
  return (
    <section className="px-6 py-10 md:px-7">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 border-y border-border md:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <article key={stat.label} className="border-b border-border py-6 md:border-b-0 md:border-r md:px-6 last:md:border-r-0">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium tracking-tight text-foreground">{stat.value}</span>
                {stat.accent && <span className="h-2 w-2 rounded-full bg-p" />}
              </div>
              <h3 className="mt-3 text-sm font-medium text-foreground">{stat.label}</h3>
              {stat.detail && <p className="mt-2 text-xs leading-5 text-muted-foreground">{stat.detail}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
