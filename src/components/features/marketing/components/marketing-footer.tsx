import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/features/container";
import { MARKETING_CONTACT, MARKETING_SERVICES } from "../marketing.constants";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <Container
        className="grid gap-8 text-sm text-muted-foreground md:grid-cols-[1.2fr_1fr_1fr]"
        size="8xl"
      >
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/iconlogo.png"
              alt="Logo Winall Tech Sarl"
              width={36}
              height={36}
              className="size-9 rounded-md object-contain"
            />
            <span className="font-medium uppercase tracking-[0.18em] text-foreground">
              Winall Tech Sarl
            </span>
          </Link>
          <p className="mt-4 max-w-sm leading-7">
            Prestations techniques, projets terrain et maintenance pour
            entreprises et particuliers au Cameroun.
          </p>
        </div>

        <div>
          <p className="font-medium text-foreground">Services</p>
          <div className="mt-4 grid gap-2">
            {MARKETING_SERVICES.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="hover:text-foreground"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium text-foreground">Contact</p>
          <div className="mt-4 grid gap-2">
            <a
              href={MARKETING_CONTACT.phoneHref}
              className="hover:text-foreground"
            >
              {MARKETING_CONTACT.phone}
            </a>
            <a
              href={MARKETING_CONTACT.emailHref}
              className="hover:text-foreground"
            >
              {MARKETING_CONTACT.email}
            </a>
            <p>{MARKETING_CONTACT.address}</p>
          </div>
        </div>
      </Container>

      <Container
        className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"
        size="8xl"
      >
        <p>© 2026 Winall Tech Sarl. Tous droits réservés.</p>
        <div className="flex gap-5">
          <Link href="/log-in" className="hover:text-foreground">
            Contrôle accès
          </Link>
          <Link href="/services" className="hover:text-foreground">
            Services
          </Link>
          <Link href="/about" className="hover:text-foreground">
            À propos
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
