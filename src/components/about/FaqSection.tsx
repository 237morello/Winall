"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { ABOUT_FAQ } from "@/lib/about"
import { cn } from "@/lib/utils"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-6 py-16 md:px-7 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase text-p">FAQ</p>
          <h2 className="text-3xl font-medium text-foreground">Les questions qui reviennent avant un projet</h2>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Des réponses directes sur le cadrage, les garanties, la maintenance et les délais.
          </p>
        </div>

        <div className="space-y-3">
          {ABOUT_FAQ.map((item, i) => {
            const isOpen = openIndex === i
            const answerId = `about-faq-answer-${i}`

            return (
              <article
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-lg border bg-background transition-colors",
                  isOpen ? "border-p/40" : "border-border hover:border-primary/20"
                )}
              >
                <button
                  className="w-full px-5 py-5 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "text-sm font-medium leading-6 transition-colors",
                        isOpen ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isOpen ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </div>
                  {!isOpen && (
                    <p className="mt-2 pr-10 text-xs leading-5 text-muted-foreground">
                      {item.preview}
                    </p>
                  )}
                </button>

                <div
                  id={answerId}
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
