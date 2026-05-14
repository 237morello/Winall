import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    id: "faq-1",
    question: "Comment garantissez-vous la fiabilité du matériel ?",
    reponse: "Nous travaillons exclusivement avec des leaders mondiaux comme Hikvision, Dahua et ZKTeco. Chaque équipement est testé avant la mise en service et bénéficie d'une garantie constructeur intégrée.",
  },
  {
    id: "faq-2",
    question: "Quels sont vos délais d'intervention ?",
    reponse: "Pour les urgences critiques, nous intervenons sous 4 à 12 heures. Pour les installations standards, nous planifions ensemble selon vos disponibilités.",
  },
  {
    id: "faq-3",
    question: "Proposez-vous des contrats de maintenance ?",
    reponse: "Oui, nous proposons des contrats de maintenance préventive et curative pour garantir la pérennité de vos installations réseaux et sécurité.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-12 text-center text-black">
          Questions Fréquentes
        </Typography>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-none">
              <AccordionTrigger className="flex items-center justify-between p-6 bg-gray-100 rounded-xl font-bold text-gray-800 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="text-left text-lg">{faq.question}</span>
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-white border border-gray-100 rounded-b-xl -mt-2 text-lg text-gray-600 leading-relaxed shadow-sm">
                {faq.reponse}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
