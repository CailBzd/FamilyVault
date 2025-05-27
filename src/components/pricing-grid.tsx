"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Users, Archive, Crown } from "lucide-react"

const plans = [
  {
    name: "Personnel",
    price: "9€",
    period: "/mois",
    description: "Parfait pour débuter votre coffre-fort familial",
    icon: Shield,
    features: [
      "1 utilisateur",
      "50 GB de stockage",
      "Partage avec 5 membres famille",
      "Historique 1 an",
      "Chiffrement de bout en bout",
      "Support par email"
    ],
    popular: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Famille",
    price: "19€",
    period: "/mois",
    description: "Idéal pour une famille nucléaire",
    icon: Users,
    features: [
      "Jusqu'à 8 membres",
      "200 GB de stockage partagé",
      "Albums photos illimités",
      "Historique 3 ans",
      "Sauvegarde automatique mobile",
      "Support prioritaire"
    ],
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Clan",
    price: "39€",
    period: "/mois",
    description: "Pour la famille élargie et multi-générations",
    icon: Crown,
    features: [
      "Jusqu'à 20 membres",
      "500 GB de stockage",
      "Gestion multi-générations",
      "Historique illimité",
      "Support prioritaire",
      "Gestionnaire de famille dédié"
    ],
    popular: false,
    color: "from-amber-500 to-amber-600"
  },
  {
    name: "Legacy",
    price: "99€",
    period: "/an",
    description: "Transmission et archivage permanent",
    icon: Archive,
    features: [
      "Archivage permanent",
      "Transmission aux héritiers",
      "Coffre-fort numérique testamentaire",
      "Stockage illimité",
      "Support juridique",
      "Garantie à vie"
    ],
    popular: false,
    color: "from-emerald-500 to-emerald-600"
  }
]

export function PricingGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Choisissez votre plan FamilyVault
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protection des données, intimité familiale et sécurité européenne. 
            Zéro tracking, zéro publicité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card 
                key={plan.name} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-purple-500 shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    ⭐ Plus populaire
                  </div>
                )}
                
                <CardHeader className={plan.popular ? 'pt-12' : ''}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Commencer maintenant
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            🇪🇺 Hébergement européen • 🔒 Conforme RGPD • 🛡️ Chiffrement de bout en bout
          </p>
        </div>
      </div>
    </section>
  )
} 