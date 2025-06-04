"use client"

import { Button } from "@/components/ui/button"
import { Shield, Heart, Lock, Users, TreePine, Camera } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl transform scale-110"></div>
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/50 backdrop-blur-sm">
                <Image
                  src="/treeb-logo.png"
                  alt="Treeb Logo"
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-30 md:h-30"
                />
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Treeb
              </h1>
              <p className="text-slate-500 text-lg mt-2">Votre tribu connectée</p>
            </div>
          </div>

          {/* Main headline */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Votre feed familial
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              qui respecte votre intimité
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Feed privé + arbre généalogique intelligent + groupes multi-contextes. 
            <strong>Zéro pub, 100% vos données.</strong> L'alternative familiale que vous attendiez.
            <br />
            <span className="text-emerald-600 font-medium">🌳 Chaque abonnement plante des arbres réels</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              Créer mon feed familial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              🌳 Voir l'impact écologique
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Vos données vous appartiennent
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-green-500" />
              Zéro tracking, zéro pub
            </div>
            <div className="flex items-center">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              Arbre généalogique inclus
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-500" />
              Groupes multi-contextes
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Feed + Arbre Généalogique</h3>
            <p className="text-slate-600">
              Un feed comme Instagram, mais privé + votre arbre familial qui se construit automatiquement avec l'IA.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Groupes Multi-Contextes</h3>
            <p className="text-slate-600">
              Famille, amis, voisins, sport... Organisez votre vie sociale sans mélanger les contextes.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vous Êtes le Client</h3>
            <p className="text-slate-600">
              Pas de pub, pas de tracking. Vous payez pour le service, vos données restent privées.
            </p>
          </div>
        </div>

        {/* Social proof / Comparaison */}
        <div className="mt-20 bg-gradient-to-r from-slate-100 to-blue-100 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-6">
            Enfin une alternative respectueuse de votre intimité
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-lg font-semibold text-red-600 mb-2">❌ Réseaux classiques</div>
              <p className="text-sm text-slate-600">Vos photos analysées pour vous vendre des publicités</p>
            </div>
            <div className="p-4">
              <div className="text-lg font-semibold text-red-600 mb-2">❌ Messageries classiques</div>
              <p className="text-sm text-slate-600">Messages éphémères, aucune organisation long terme</p>
            </div>
            <div className="p-4">
              <div className="text-lg font-semibold text-green-600 mb-2">✅ Treeb</div>
              <p className="text-sm text-slate-600">Vos souvenirs organisés, votre intimité protégée</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 