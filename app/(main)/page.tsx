import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CircuitBoard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Videosurveillance",
    description:
      "Etude, installation et maintenance de systemes camera pour sites commerciaux, banques et residences.",
    icon: Camera,
  },
  {
    title: "Reseaux et telecoms",
    description:
      "Cablage structure, interconnexion, Wi-Fi professionnel et infrastructure informatique fiable.",
    icon: CircuitBoard,
  },
  {
    title: "Electricite et energie",
    description:
      "Installations electriques, tableaux, maintenance et solutions d'energie pour batiments modernes.",
    icon: Zap,
  },
  {
    title: "BTP technique",
    description:
      "Coordination de chantiers, amenagements techniques et integration des lots courants faibles.",
    icon: Building2,
  },
];

const projects = [
  {
    title: "Installation camera bancaire",
    location: "Akwa, Douala",
    image: "/images/projets/akwa installation camera bank 1.jpeg",
  },
  {
    title: "Controle et supervision",
    location: "Site professionnel",
    image: "/images/projets/akwa installation camera bank 3.jpeg",
  },
  {
    title: "Infrastructure securisee",
    location: "Cameroun",
    image: "/images/projets/akwa installation camera bank 5.jpeg",
  },
];

const strengths = [
  "Equipe terrain pluridisciplinaire",
  "Accompagnement de l'etude a la maintenance",
  "Materiel adapte aux contraintes locales",
  "Interventions planifiees et documentees",
];

export const metadata = {
  title: "Winall Tech Sarl | Solutions techniques au Cameroun",
  description:
    "Winall Tech Sarl accompagne les entreprises et particuliers en videosurveillance, reseaux, electricite, energie et BTP technique.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Winall Tech">
            <Image
              src="/images/logo.png"
              alt="Winall Tech"
              width={132}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex">
            <a href="#services" className="hover:text-zinc-950">
              Services
            </a>
            <a href="#realisations" className="hover:text-zinc-950">
              Realisations
            </a>
            <a href="#contact" className="hover:text-zinc-950">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#204222] px-4 text-sm font-semibold text-white transition hover:bg-[#2b4b2d]"
          >
            Demander un devis
          </a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/1.JPG"
            alt="Equipe Winall Tech sur site"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
              <ShieldCheck className="size-4" />
              Solutions techniques pour entreprises et particuliers
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Winall Tech Sarl
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100 sm:text-xl">
              Nous concevons et deployons des installations fiables en
              videosurveillance, reseaux, electricite, energie et BTP technique
              au Cameroun.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
              >
                Lancer votre projet
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#realisations"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 px-5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Voir nos realisations
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#df0a17]">
              Expertises
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Des services terrain, du diagnostic a la maintenance.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <service.icon className="size-8 text-[#204222]" />
                <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#df0a17]">
              Methode
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Une execution propre pour des installations durables.
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-600">
              Chaque mission part d&apos;une visite technique, d&apos;un dimensionnement
              clair et d&apos;un planning d&apos;intervention. L&apos;objectif est simple :
              livrer des solutions faciles a exploiter et faciles a maintenir.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {strengths.map((strength) => (
                <div key={strength} className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 size-5 shrink-0 text-[#204222]" />
                  <span className="text-sm font-semibold text-zinc-800">
                    {strength}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-md">
            <Image
              src="/images/here about.jpeg"
              alt="Intervention technique Winall"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section id="realisations" className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-[#f19197]">
                Realisations
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                Des projets visibles, installes et suivis.
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"
            >
              Discuter d&apos;un besoin
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-md border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{project.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#204222] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#f5b6b9]">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Parlons de votre prochain chantier.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-green-50">
              Envoyez votre besoin, votre localisation et le delai souhaite.
              L&apos;equipe Winall vous recontacte pour cadrer la solution adaptee.
            </p>
          </div>
          <div className="rounded-md bg-white p-6 text-zinc-950 shadow-xl">
            <div className="space-y-5">
              <a
                href="tel:+237000000000"
                className="flex items-center gap-4 rounded-md border border-zinc-200 p-4 transition hover:bg-zinc-50"
              >
                <Phone className="size-5 text-[#204222]" />
                <span className="font-semibold">+237 000 000 000</span>
              </a>
              <a
                href="mailto:Winalltechsarl@gmail.com"
                className="flex items-center gap-4 rounded-md border border-zinc-200 p-4 transition hover:bg-zinc-50"
              >
                <Mail className="size-5 text-[#204222]" />
                <span className="font-semibold">Winalltechsarl@gmail.com</span>
              </a>
              <div className="flex items-start gap-4 rounded-md border border-zinc-200 p-4">
                <MapPin className="mt-1 size-5 text-[#204222]" />
                <span className="font-semibold">
                  Akwa, derriere MTN Dubai, face BFI Bank, Douala
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-zinc-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Winall Tech Sarl. Tous droits reserves.</p>
          <div className="flex gap-5">
            <a href="#services" className="hover:text-zinc-950">
              Services
            </a>
            <a href="#realisations" className="hover:text-zinc-950">
              Realisations
            </a>
            <a href="#contact" className="hover:text-zinc-950">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
