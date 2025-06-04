import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero" className="bg-blue-100">
        <HeroSection />
      </section>
      
      <section id="features" className="py-16 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Vos souvenirs familiaux, votre intimité protégée
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              L'alternative privée aux réseaux sociaux classiques. Zéro publicité, 100% de vos données vous appartiennent.
              Redécouvrez le plaisir de partager sans être espionné.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Arbre Généalogique Intelligent
              </h3>
              <p className="text-slate-600">
                Construisez votre arbre familial privé. L'IA suggère les connexions basées sur vos photos et contacts partagés.
              </p>
              <div className="mt-3 text-sm text-purple-600 font-medium">
                ✨ Teaser gratuit • Complet en version payante
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Groupes Multi-Contextes
              </h3>
              <p className="text-slate-600">
                Famille, amis, voisins, associations... Créez autant de groupes privés que vous voulez selon votre plan.
              </p>
              <div className="mt-3 text-sm text-blue-600 font-medium">
                🎯 Système de crédits innovant
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L8.121 8.121M5.636 5.636l12.728 12.728" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Zéro Tracking, Zéro Pub
              </h3>
              <p className="text-slate-600">
                Vos photos ne sont jamais analysées pour vous vendre quoi que ce soit. Vous êtes le client, pas le produit.
              </p>
              <div className="mt-3 text-sm text-green-600 font-medium">
                🛡️ Hébergement européen RGPD
              </div>
            </div>
          </div>

          {/* Nouvelle section différenciation */}
          <div className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
              Pourquoi choisir Triib plutôt que...
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-700 mb-2">📱 Messageries classiques</div>
                <p className="text-sm text-slate-600">Messages éphémères vs <strong>Stockage permanent organisé</strong></p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-700 mb-2">📘 Réseaux sociaux</div>
                <p className="text-sm text-slate-600">Vos données vendues vs <strong>Vos données vous appartiennent</strong></p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-700 mb-2">📸 Plateformes publiques</div>
                <p className="text-sm text-slate-600">Public et algorithmes vs <strong>100% privé et familial</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="pricing" className="bg-purple-100">
        <PricingGrid />
      </section>
    </main>
  )
}
