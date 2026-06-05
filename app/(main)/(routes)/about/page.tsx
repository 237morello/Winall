import type { Metadata } from 'next'
import {
  HeroSection,
  MvvSection,
  StatsSection,
  TimelineSection,
  PartnersSection,
  QuoteSection,
  TeamSection,
  FaqSection,
} from '@/components/about'

export const metadata: Metadata = {
  title: 'À Propos · Winall Tech Sarl',
  description:
    "Découvrez Winall Tech Sarl, partenaire B2B en génie électrique, surveillance, domotique et réseaux à Douala, Cameroun. Depuis 2015.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-16 md:pt-24 overflow-x-hidden">
      <HeroSection />
      <MvvSection />
      <StatsSection />
      <TimelineSection />
      <PartnersSection />
      <QuoteSection />
      <TeamSection />
      <FaqSection />
    </main>
  )
}
