import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";

export const metadata: Metadata = {
  title: "FamilyVault - Coffre-fort numérique familial",
  description: "Protégez et partagez vos souvenirs familiaux en toute sécurité",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <AdSenseScript />
      </body>
    </html>
  );
}
