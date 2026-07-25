import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/features/container";
import { Card, CardContent } from "@/components/ui/card";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { MARKETING_CONTACT } from "../marketing.constants";

export function ContactCta() {
  return (
    <section
      id="contact"
      className="bg-primary py-20 text-primary-foreground sm:py-24"
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]" size="8xl">
        <div>
          <Eyebrow className="text-red-100">Contact</Eyebrow>
          <Heading level={2} className="mt-3 text-primary-foreground">
            Parlons de votre prochain projet.
          </Heading>
          <Lead className="mt-6 max-w-2xl text-green-50">
            Décrivez votre besoin, votre localisation et le délai souhaité.
            L’équipe Winall vous répond avec un cadrage clair et une solution
            adaptée au terrain.
          </Lead>
        </div>

        <Card className="bg-background text-foreground">
          <CardContent className="space-y-4 p-6">
            <a
              href={MARKETING_CONTACT.phoneHref}
              className="flex items-center gap-4 rounded-md border border-border p-4 transition-colors hover:bg-muted"
            >
              <Phone className="size-5 text-primary" aria-hidden="true" />
              <span className="font-medium">{MARKETING_CONTACT.phone}</span>
            </a>
            <a
              href={MARKETING_CONTACT.whatsappHref}
              className="flex items-center gap-4 rounded-md border border-border p-4 transition-colors hover:bg-muted"
            >
              <MessageCircle
                className="size-5 text-primary"
                aria-hidden="true"
              />
              <span className="font-medium">
                WhatsApp {MARKETING_CONTACT.whatsapp}
              </span>
            </a>
            <a
              href={MARKETING_CONTACT.emailHref}
              className="flex items-center gap-4 rounded-md border border-border p-4 transition-colors hover:bg-muted"
            >
              <Mail className="size-5 text-primary" aria-hidden="true" />
              <span className="font-medium">{MARKETING_CONTACT.email}</span>
            </a>
            <div className="flex items-start gap-4 rounded-md border border-border p-4">
              <MapPin className="mt-1 size-5 text-primary" aria-hidden="true" />
              <span className="font-medium">{MARKETING_CONTACT.address}</span>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
