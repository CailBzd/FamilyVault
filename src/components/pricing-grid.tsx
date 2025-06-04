"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Users, Crown, Zap, TreePine, Camera, Archive } from "lucide-react"
import { useStripe } from "@/hooks/use-stripe"
import { PlanType, BillingInterval, STRIPE_PLANS } from "@/lib/stripe"
import { FreeSignup } from "./free-signup"

export function PricingGrid() {
  const { createCheckoutSession, loading, error } = useStripe()
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [showFreeSignup, setShowFreeSignup] = useState(false)

  const handleSubscribe = async (planType: PlanType) => {
    if (planType === 'free') {
      setShowFreeSignup(true)
      return
    }

    // TODO: Récupérer les informations utilisateur depuis l'authentification
    // Pour l'instant, on utilise des données de test
    const mockUser = {
      userId: "user_test_123",
      userEmail: "test@familyvault.eu",
      userName: "Test User"
    }

    await createCheckoutSession({
      planType,
      ...mockUser
    })
  }

  const handleFreeSuccess = (userData: any) => {
    // Rediriger vers le dashboard après inscription réussie
    window.location.href = '/dashboard'
  }

  if (showFreeSignup) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <FreeSignup onSuccess={handleFreeSuccess} />
          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              onClick={() => setShowFreeSignup(false)}
            >
              ← Retour aux tarifs
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const plans = [
    {
      id: "free" as PlanType,
      name: "Découverte",
      price: "0€",
      period: "/toujours",
      description: "Découvrez Triib en toute sécurité",
      icon: Zap,
      features: [
        "500 Mo de stockage",
        "1 crédit de groupe (créer 1 groupe OU rejoindre 3 groupes)",
        "Photos compressées (qualité réduite)",
        "Arbre généalogique flouté (teaser)",
        "Historique 6 mois maximum",
        "Support communautaire",
        "Publicité non intrusive (respect de la vie privée)"
      ],
      popular: false,
      color: "from-blue-500 to-cyan-600",
      isFree: true
    },
    {
      id: "personal" as PlanType,
      name: "Petits Groupes",
      price: billingInterval === 'monthly' ? "9€" : "90€",
      period: billingInterval === 'monthly' ? "/mois" : "/an",
      originalPrice: billingInterval === 'yearly' ? "108€" : undefined,
      description: "Parfait pour amis proches et petites familles",
      icon: Users,
      features: [
        "2 Go de stockage",
        "3 crédits de groupes (créer 3 groupes OU rejoindre 10 groupes)",
        "Photos haute qualité",
        "Arbre généalogique complet + export PDF",
        "Historique illimité",
        "Albums collaboratifs",
        "Support prioritaire"
      ],
      popular: false,
      color: "from-green-500 to-green-600"
    },
    {
      id: "family" as PlanType,
      name: "Grands Groupes",
      price: billingInterval === 'monthly' ? "19€" : "190€",
      period: billingInterval === 'monthly' ? "/mois" : "/an",
      originalPrice: billingInterval === 'yearly' ? "228€" : undefined,
      description: "Idéal pour familles étendues et communautés",
      icon: TreePine,
      features: [
        "50 Go de stockage",
        "10 crédits de groupes (créer 10 groupes OU rejoindre illimité)",
        "Photos & vidéos haute qualité",
        "Arbre généalogique avancé + export GEDCOM",
        "Auto-suppression conversations configurables",
        "Recherche intelligente dans les médias",
        "Modération de groupes avancée"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "clan" as PlanType,
      name: "Clans",
      price: billingInterval === 'monthly' ? "49€" : "490€",
      period: billingInterval === 'monthly' ? "/mois" : "/an",
      originalPrice: billingInterval === 'yearly' ? "588€" : undefined,
      description: "Associations, entreprises, grandes communautés",
      icon: Crown,
      features: [
        "500 Go de stockage",
        "Crédits illimités (créer et rejoindre sans limite)",
        "Qualité originale préservée",
        "Arbres généalogiques multi-familles",
        "Administration avancée des groupes",
        "Statistiques et rapports détaillés",
        "Support dédié 24/7",
        "API d'intégration disponible"
      ],
      popular: false,
      color: "from-amber-500 to-amber-600"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            Un plan pour chaque besoin familial
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Du couple aux grandes associations : découvrez notre système de crédits unique.
            <strong> Vous possédez vos données, nous protégeons votre intimité.</strong>
          </p>

          {/* Toggle mensuel/annuel */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingInterval === 'monthly' ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingInterval === 'yearly' ? 'bg-purple-400' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingInterval === 'yearly' ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
              Annuel
            </span>
            {billingInterval === 'yearly' && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                -17% 🎉
              </span>
            )}
          </div>

          {/* Explication du système de crédits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">🎯 Comment fonctionnent les crédits de groupes ?</h3>
            <p className="text-sm text-slate-600">
              <strong>1 crédit = 1 groupe créé</strong> OU <strong>rejoindre plusieurs groupes existants.</strong>
              <br />
              Exemple : Avec 3 crédits, créez "Famille", "Amis du tennis" et "Voisins" OU rejoignez 10 groupes créés par d'autres.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              Erreur : {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card 
                key={plan.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 bg-white border-slate-200 ${
                  plan.popular ? 'ring-2 ring-purple-300 shadow-lg' : 'hover:shadow-lg'
                } ${(plan as any).isFree ? 'border-2 border-blue-300' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-400 to-purple-500 text-white text-center py-2 text-sm font-medium">
                    ⭐ Plus populaire
                  </div>
                )}

                {(plan as any).isFree && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-center py-2 text-sm font-medium">
                    ⚡ Gratuit à vie
                  </div>
                )}
                
                <CardHeader className={plan.popular || (plan as any).isFree ? 'pt-12' : ''}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-slate-600">{plan.description}</CardDescription>
                  <div className="flex items-baseline mt-4">
                    <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-slate-500 ml-1 text-sm">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-xs text-slate-500">
                      <span className="line-through">{plan.originalPrice}</span>
                      <span className="ml-2 text-green-600 font-medium">Économisez 17%</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading}
                  >
                    {loading ? "Chargement..." : (plan as any).isFree ? "Commencer gratuitement" : "Choisir ce plan"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Section FAQ pricing */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Questions fréquentes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Puis-je changer de plan à tout moment ?</h4>
              <p className="text-sm text-slate-600">Oui, upgrader est instantané. Downgrader prend effet au prochain cycle de facturation.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Que se passe-t-il si je dépasse mon stockage ?</h4>
              <p className="text-sm text-slate-600">Vous recevez une notification et pouvez upgrader ou supprimer du contenu. Aucune suppression automatique.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Les crédits de groupes se cumulent-ils ?</h4>
              <p className="text-sm text-slate-600">Non, mais vous pouvez répartir vos crédits comme vous voulez : créer des groupes OU en rejoindre.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Mes données sont-elles vraiment privées ?</h4>
              <p className="text-sm text-slate-600">100% privées. Chiffrement bout-à-bout, hébergement EU, zéro analyse de contenu. Vous êtes propriétaire.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 