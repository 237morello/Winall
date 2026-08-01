import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const noteSansJp = localFont({
  src: "../public/fonts/NotoSansJP[wght].ttf",
  weight: "200 900",
  variable: "--font-noteSansJp",
});

const DEFAULT_TITLE =
  "Winall Tech Sarl | Électronique, génie civil, BTP, réseaux et sécurité à Douala";
const DEFAULT_DESCRIPTION =
  "Winall Tech Sarl accompagne entreprises et particuliers à Douala : électronique, génie civil, BTP, maintenance, infographie, sécurité incendie et réseaux.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Winall",
    "Winall Tech",
    "Winall Tech Sarl",
    "électronique Douala",
    "génie civil Cameroun",
    "BTP Douala",
    "maintenance industrielle Cameroun",
    "sécurité incendie Douala",
    "réseaux et vidéosurveillance Cameroun",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/images/63966.jpg",
        width: 667,
        height: 652,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/63966.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${noteSansJp.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
