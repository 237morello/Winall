"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { FaqAboutConstant } from "./faqAbout.constant";

export const FaqAbout = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <Eyebrow>Questions frequentes</Eyebrow>
        <Heading level={2} className="mt-3">
          Des reponses claires avant de lancer un projet.
        </Heading>
      </div>

      <Card className="overflow-hidden rounded-lg border-zinc-200 bg-white">
        {FaqAboutConstant.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `about-faq-answer-${index}`;
          const questionId = `about-faq-question-${index}`;

          return (
            <article key={item.question} className="border-b border-zinc-200 last:border-b-0">
              <button
                id={questionId}
                type="button"
                className="flex w-full items-start justify-between gap-5 p-5 text-left transition-colors hover:bg-zinc-50 sm:p-6"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="space-y-2">
                  <Eyebrow className="text-xs">{item.service}</Eyebrow>
                  <span className="block text-lg font-medium leading-7 text-zinc-950">
                    {item.question}
                  </span>
                </span>
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-[#204222]">
                  {isOpen ? (
                    <Minus className="size-5" aria-hidden="true" />
                  ) : (
                    <Plus className="size-5" aria-hidden="true" />
                  )}
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="space-y-4 px-5 pb-6 sm:px-6">
                  <Text className="max-w-4xl text-base text-zinc-600">{item.preview.text}</Text>
                  {item.preview.libelle ? (
                    <div className="flex flex-wrap gap-2">
                      {item.preview.libelle.map((label) => (
                        <span
                          key={label}
                          className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#204222]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </Card>
    </div>
  );
};
