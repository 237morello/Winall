"use client";

import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay global pour assurer la lisibilité */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Top Section: CTA */}
        <div className="container mx-auto px-4 py-16 text-center border-b border-white/10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Un projet en tête ? Parlons-en dès maintenant.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-teal-100/70 mb-10 text-lg md:text-xl font-light"
          >
            Nos experts vous accompagnent de l&apos;étude à la réalisation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              href="/contact"
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium py-4 px-10 rounded-sm transition-all duration-300 shadow-lg"
            >
              Faire un devis gratuit
            </Link>
            <Link
              href="/projets"
              className="bg-[#1a1a1a] hover:bg-black text-white font-medium py-4 px-10 rounded-sm transition-all duration-300 border border-white/5 shadow-lg"
            >
              Nos Réalisations
            </Link>
          </motion.div>
        </div>

        {/* Main Grid Section */}
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10">

            {/* Column 1: Winall (Fond Noir) */}
            <div className="bg-black/40 p-10 lg:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-4xl font-bold mb-8">Winall</h3>
              <p className="text-gray-300/80 text-sm leading-relaxed max-w-xs">
                Spécialisés en ingénierie électrique et solutions technologique, nous transformons vos défis techniques en réalisations durables.
              </p>
            </div>

            {/* Column 2: Services */}
            <div className="p-10 lg:p-12 border-b md:border-b-0 lg:border-r border-white/10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-[#0d9488] text-xs font-bold mb-8 tracking-wide uppercase">Services</h3>
              <ul className="space-y-4 text-gray-300/80 text-sm">
                <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">Électricité & Habilitation</Link></li>
                <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">Réseaux & Télécoms</Link></li>
                <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">Sécurité électronique</Link></li>
                <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">Énergie solaire</Link></li>
                <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">BTP</Link></li>
              </ul>
            </div>

            {/* Column 3: Liens rapides (Fond Noir) */}
            <div className="bg-black/40 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-[#0d9488] text-xs font-bold mb-8 tracking-wide uppercase">Liens rapides</h3>
              <ul className="space-y-4 text-gray-300/80 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/projets" className="hover:text-white transition-colors">Projets</Link></li>
                <li>
                  <Link href="/about" className="text-white border-b border-[#0d9488] pb-1 font-medium">
                    about
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Nous contacter */}
            <div className="p-10 lg:p-12 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-[#0d9488] text-xs font-bold mb-8 tracking-wide uppercase">Nous contacter</h3>
              <ul className="space-y-5 text-gray-300/80 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-white font-medium text-xs">Cameroun - Douala</span>
                  <span>Akwa derrière MTN Dubai (Face BFI Bank)</span>
                </li>
                <li>
                  <a href="mailto:Winalltechsarl@gmail.com" className="hover:text-white transition-colors">
                    Winalltechsarl@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <div className="flex gap-6 mb-12">
            <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0d9488] hover:bg-[#0d9488] hover:text-white transition-all duration-300">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#0d9488] hover:bg-[#0d9488] hover:text-white transition-all duration-300">
              <MessageCircle size={20} />
            </Link>
          </div>
          <p className="text-[10px] md:text-xs text-gray-500 font-light tracking-widest text-center uppercase">
            © 2026 Winall Tech Sarl - Universal Digital Solutions. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Barre noire de fin */}
      <div className="h-2 bg-black w-full"></div>
    </footer>
  );
}
