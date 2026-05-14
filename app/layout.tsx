import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/features/query-provider";
import { ThemeProvider } from "@/components/features/theme-provider";
import localFont from "next/font/local";
import "./globals.css";

const noteSansJp = localFont({
  src: "../public/fonts/NotoSansJP[wght].ttf",
  weight: "200 500 700",
  variable: "--font-noteSansJp",
});

export const metadata: Metadata = {
  title: "Winall Tech Sarl",
  description: "Expert en solutions technologiques et BTP au Cameroun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${noteSansJp.className} antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors closeButton position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
