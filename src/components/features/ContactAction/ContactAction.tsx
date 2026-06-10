import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";

export const ContactAction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
          {/* Image Technicienne */}
          <div className="relative h-[400px] md:h-[600px] w-full">
            <Image
              src="/images/tech-winall.jpg" // À remplacer par l'image réelle ou générée
              alt="Technicienne Winall Tech"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Boutons Flottants */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold px-8 py-7 rounded-2xl shadow-xl transition-all hover:-translate-y-1"
            >
              <Mail className="mr-2 h-6 w-6" />
              mail
            </Button>
            <Button 
              size="lg" 
              className="bg-destructive hover:bg-destructive-hover text-destructive-foreground font-bold px-8 py-7 rounded-2xl shadow-xl transition-all hover:-translate-y-1"
            >
              <FileText className="mr-2 h-6 w-6" />
              Devis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
