import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Triib - Votre réseau social familial privé",
  description: "Préservez et partagez vos souvenirs familiaux en toute sécurité avec Triib. Photos, vidéos, documents - tout en un seul endroit sécurisé.",
  keywords: "famille, photos, souvenirs, stockage, sécurisé, partage, généalogie, tribu, privé",
  authors: [{ name: "Triib Team" }],
  openGraph: {
    title: "Triib - Votre réseau social familial privé",
    description: "Préservez et partagez vos souvenirs familiaux en toute sécurité",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triib - Votre réseau social familial privé",
    description: "Préservez et partagez vos souvenirs familiaux en toute sécurité",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <AdSenseScript />
      </body>
    </html>
  );
}
