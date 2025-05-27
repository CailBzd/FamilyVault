import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { Header } from "@/components/header";
import { AdminSetupProvider, AdminSetupStatus } from "@/components/admin-setup-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FamilyVault - Votre coffre-fort familial numérique",
  description: "Préservez et partagez vos souvenirs familiaux en toute sécurité avec FamilyVault. Photos, vidéos, documents - tout en un seul endroit sécurisé.",
  keywords: "famille, photos, souvenirs, stockage, sécurisé, partage, généalogie",
  authors: [{ name: "FamilyVault Team" }],
  openGraph: {
    title: "FamilyVault - Votre coffre-fort familial numérique",
    description: "Préservez et partagez vos souvenirs familiaux en toute sécurité",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FamilyVault - Votre coffre-fort familial numérique",
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
        <AdminSetupProvider>
          <Header />
          <main>
            {children}
          </main>
          <AdminSetupStatus />
        </AdminSetupProvider>
        <AdSenseScript />
      </body>
    </html>
  );
}
