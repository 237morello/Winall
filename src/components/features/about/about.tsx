"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import { Faqconstants } from "./about.constant";

export const FaqAboutRole = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Card className="flex w-full flex-col gap-3 p-4">
      {Faqconstants.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `mission-answer-${index}`;
        const questionId = `mission-question-${index}`;

        return (
          <article
            className={clsx(
              "w-full overflow-hidden rounded-lg border border-zinc-200",
              isOpen ? "bg-white" : "bg-zinc-50",
            )}
            key={item.question}
          >
            <button
              id={questionId}
              type="button"
              className="flex w-full items-center justify-between gap-4 p-4 text-left font-medium text-zinc-950"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              {item.question}
              <span className="text-[#204222]">
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
              <div className="border-t border-zinc-200 p-4 text-sm leading-7 text-zinc-600">
                {item.preview}
              </div>
            </div>
          </article>
        );
      })}
    </Card>
  );
};
