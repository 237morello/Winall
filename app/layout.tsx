import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const noteSansJp = localFont({
  src: "../public/fonts/NotoSansJP[wght].ttf",
  weight: "200 900",
  variable: "--font-noteSansJp",
});

export const metadata: Metadata = {
  title: "Winall Tech Sarl",
  description: "Solutions techniques, reseaux, securite et BTP au Cameroun.",
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
