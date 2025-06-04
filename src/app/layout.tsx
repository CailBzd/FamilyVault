import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Treeb - Votre réseau social familial privé",
  description: "Préservez et partagez vos souvenirs familiaux en toute sécurité avec Treeb. Photos, vidéos, documents - tout en un seul endroit sécurisé.",
  keywords: "famille, photos, souvenirs, stockage, sécurisé, partage, généalogie, tribu, privé",
  authors: [{ name: "Treeb Team" }],
  icons: {
    icon: [
      { url: '/treeb-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/treeb-logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: { url: '/treeb-logo.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/treeb-logo.png'
  },
  openGraph: {
    title: "Treeb - Votre réseau social familial privé",
    description: "Préservez et partagez vos souvenirs familiaux en toute sécurité",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: '/treeb-logo.png',
        width: 800,
        height: 600,
        alt: 'Treeb - Réseau social familial privé'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Treeb - Votre réseau social familial privé",
    description: "Préservez et partagez vos souvenirs familiaux en toute sécurité",
    images: ['/treeb-logo.png']
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <AdSenseScript />
      </body>
    </html>
  );
}
