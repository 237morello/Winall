import { ABOUT_TEAM } from "@/lib/about/about.constants"
import { cn } from "@/lib/utils"

export function TeamSection() {
  return (
    <section className="border-y border-border bg-muted/25 px-6 py-16 md:px-7 md:py-20">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-4 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase text-p">Équipe</p>
            <h2 className="text-3xl font-medium text-foreground">Des référents par domaine, un seul pilotage projet</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:ml-auto">
            Les interlocuteurs changent selon la phase, mais le suivi reste centralisé:
            cadrage, installation, contrôle et support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ABOUT_TEAM.map((member) => (
            <article
              key={member.name}
              className="rounded-lg border border-border bg-background p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className={cn(
                      "mb-4 flex size-12 items-center justify-center rounded-md text-sm font-medium",
                      member.accent ? "bg-p/15 text-primary" : "bg-primary text-primary-foreground"
                    )}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-base font-medium text-foreground">{member.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                </div>
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium",
                    member.accent ? "bg-p/15 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  {member.tag}
                </span>
              </div>

              <p className="mt-6 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
                {member.focus}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
