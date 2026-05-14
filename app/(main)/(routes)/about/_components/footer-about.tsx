/**
 * @file footer-about.tsx
 * @description Footer de la page À Propos — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → footer-about.types.ts + footer-about.constants.ts
 * - View   → Ce fichier
 * - Controller → Pas de logique complexe ici, rendu direct.
 *
 * SOLID : SRP (rendu), OCP (ajout de colonne/lien via constants).
 * Design : Fond gris anthracite avec colonnes multi-liens conforme à la maquette.
 */

import Link from "next/link";
import Image from "next/image";
import { DESCRIPTION_FOOTER, COLONNES_FOOTER, TEXTE_COPYRIGHT } from "./footer-about.constants";
import type { ProprietesFooter } from "./footer-about.types";

/**
 * @component FooterAbout
 * @description Vue — Footer multi-colonnes avec logo, liens et copyright.
 */
export const FooterAbout = ({ className }: ProprietesFooter) => (
  <footer className={`w-full bg-[#1a1a1a] text-white/80 ${className ?? ""}`}>
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* ── Colonne 1 : Logo + Description ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo_v2.png"
              alt="Logo Winall Tech"
              width={36}
              height={36}
              className="rounded-sm"
            />
            <span className="text-xl font-bold text-white">Winall</span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            {DESCRIPTION_FOOTER}
          </p>
        </div>

        {/* ── Colonnes dynamiques (Services, Liens rapides, Contact) ── */}
        {COLONNES_FOOTER.map((colonne) => (
          <div key={colonne.id} className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">
              {colonne.titre}
            </h4>
            <ul className="space-y-2.5">
              {colonne.liens.map((lien) => (
                <li key={lien.id}>
                  <Link
                    href={lien.lien}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {lien.texte}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* ── Copyright ── */}
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <p className="text-xs text-center text-white/30">
          {TEXTE_COPYRIGHT}
        </p>
      </div>
    </div>
  </footer>
);
