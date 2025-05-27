"use client"

import { Button } from "@/components/ui/button"
import { Shield, Heart, Lock, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FamilyVault
            </h1>
          </div>

          {/* Main headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Votre réseau social
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              familial privé
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            L'alternative sécurisée à WhatsApp et Instagram. Partagez vos moments précieux 
            en famille avec un chiffrement de bout en bout et un hébergement européen conforme RGPD.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              Commencer gratuitement
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Voir la démo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Chiffrement E2E
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-green-500" />
              RGPD Compliant
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-green-500" />
              Zéro Publicité
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-500" />
              Hébergement EU
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Protection Maximale</h3>
            <p className="text-slate-600">
              Vos données familiales sont chiffrées de bout en bout. Nous ne pouvons pas les lire, personne d'autre non plus.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intimité Familiale</h3>
            <p className="text-slate-600">
              Un espace privé pour votre famille. Partagez sans crainte, vos moments restent entre vous.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Générations</h3>
            <p className="text-slate-600">
              Connectez toute la famille, des grands-parents aux petits-enfants, dans un environnement sûr.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 