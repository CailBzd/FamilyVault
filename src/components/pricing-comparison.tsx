"use client"

import { Check, X, Crown, Users, TreePine, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PricingComparison() {
  const features = [
    {
      category: "Stockage & Médias",
      items: [
        { name: "Espace de stockage", discovery: "500 Mo", personal: "2 Go", family: "50 Go", clan: "500 Go" },
        { name: "Qualité des photos", discovery: "Compressées", personal: "Haute qualité", family: "Haute qualité", clan: "Originale" },
        { name: "Vidéos", discovery: false, personal: false, family: true, clan: true },
        { name: "Historique", discovery: "6 mois", personal: "Illimité", family: "Illimité", clan: "Illimité" }
      ]
    },
    {
      category: "Groupes & Collaboration",
      items: [
        { name: "Crédits de groupes", discovery: "1", personal: "3", family: "10", clan: "Illimités" },
        { name: "Membres par groupe", discovery: "10", personal: "25", family: "100", clan: "Illimité" },
        { name: "Modération avancée", discovery: false, personal: false, family: true, clan: true },
        { name: "Albums collaboratifs", discovery: false, personal: true, family: true, clan: true }
      ]
    },
    {
      category: "Arbre Généalogique",
      items: [
        { name: "Visualisation", discovery: "Flouté (teaser)", personal: "Complet", family: "Avancé", clan: "Multi-familles" },
        { name: "Export PDF", discovery: false, personal: true, family: true, clan: true },
        { name: "Export GEDCOM", discovery: false, personal: false, family: true, clan: true },
        { name: "API d'intégration", discovery: false, personal: false, family: false, clan: true }
      ]
    },
    {
      category: "Impact Écologique",
      items: [
        { name: "Arbres plantés par an", discovery: "0", personal: "🌳*", family: "🌳🌳🌳*", clan: "🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳*" },
        { name: "Certificat géolocalisé", discovery: false, personal: true, family: true, clan: true },
        { name: "Photos de croissance", discovery: false, personal: true, family: true, clan: true },
        { name: "Invitation plantation", discovery: false, personal: false, family: false, clan: true }
      ]
    },
    {
      category: "Support & Services",
      items: [
        { name: "Support", discovery: "Communautaire", personal: "Email", family: "Prioritaire", clan: "Prioritaire" },
        { name: "Recherche intelligente", discovery: false, personal: false, family: true, clan: true },
        { name: "Statistiques détaillées", discovery: false, personal: false, family: false, clan: true },
        { name: "Backup géolocalisé", discovery: false, personal: false, family: false, clan: true }
      ]
    }
  ]

  const plans = [
    { 
      id: "discovery", 
      name: "Découverte", 
      icon: Zap, 
      price: "0€", 
      period: "/toujours",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    { 
      id: "personal", 
      name: "Petits Groupes", 
      icon: Users, 
      price: "9€", 
      period: "/mois",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    { 
      id: "family", 
      name: "Grands Groupes", 
      icon: TreePine, 
      price: "19€", 
      period: "/mois",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      popular: true
    },
    { 
      id: "clan", 
      name: "Clans", 
      icon: Crown, 
      price: "49€", 
      period: "/mois",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    }
  ]

  const renderValue = (value: any, planId: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      )
    }
    return (
      <span className={`text-sm font-medium ${planId === 'family' ? 'text-purple-700' : 'text-slate-700'}`}>
        {value}
      </span>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Comparaison détaillée des plans
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Découvrez en détail ce qui distingue chaque plan pour choisir celui qui correspond à vos besoins familiaux.
        </p>
        <div className="mt-4 text-xs text-slate-500">
          * Plantation d'arbres uniquement avec abonnement annuel
        </div>
      </div>

      {/* Version desktop */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden shadow-xl">
          {/* Header avec les plans */}
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
            <div className="grid grid-cols-5 gap-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-slate-800">Fonctionnalités</h3>
              </div>
              {plans.map((plan) => {
                const IconComponent = plan.icon
                return (
                  <div key={plan.id} className={`text-center p-4 rounded-xl ${plan.bgColor} ${plan.borderColor} border-2 ${plan.popular ? 'ring-2 ring-purple-300' : ''}`}>
                    {plan.popular && (
                      <div className="text-xs text-purple-600 font-bold mb-2">⭐ POPULAIRE</div>
                    )}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">{plan.name}</h4>
                    <div className="text-xl font-bold text-slate-800">{plan.price}</div>
                    <div className="text-xs text-slate-500">{plan.period}</div>
                  </div>
                )
              })}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {features.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Titre de catégorie */}
                <div className="bg-slate-100 px-6 py-3 border-b">
                  <h4 className="font-semibold text-slate-800">{category.category}</h4>
                </div>
                
                {/* Items de la catégorie */}
                {category.items.map((item, itemIndex) => (
                  <div key={item.name} className={`grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-100 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <div className="text-sm font-medium text-slate-700 flex items-center">
                      {item.name}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {renderValue(item.discovery, 'discovery')}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {renderValue(item.personal, 'personal')}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {renderValue(item.family, 'family')}
                    </div>
                    <div className="text-center flex items-center justify-center">
                      {renderValue(item.clan, 'clan')}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>

          {/* Footer avec boutons */}
          <div className="bg-slate-50 px-6 py-6">
            <div className="grid grid-cols-5 gap-4">
              <div></div>
              {plans.map((plan) => (
                <Button 
                  key={plan.id}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.id === 'discovery' ? 'Gratuit' : 'Choisir'}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Version mobile */}
      <div className="lg:hidden space-y-6">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          return (
            <Card key={plan.id} className={`${plan.popular ? 'ring-2 ring-purple-300' : ''}`}>
              <CardHeader className={`${plan.bgColor} ${plan.borderColor} border-b`}>
                {plan.popular && (
                  <div className="text-center text-xs text-purple-600 font-bold mb-2">⭐ POPULAIRE</div>
                )}
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{plan.name}</h4>
                  <div className="text-xl font-bold text-slate-800">{plan.price}</div>
                  <div className="text-xs text-slate-500">{plan.period}</div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {features.map((category) => (
                  <div key={category.category} className="mb-4">
                    <h5 className="font-semibold text-slate-700 mb-2 text-sm">{category.category}</h5>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div key={item.name} className="flex justify-between items-center text-xs">
                          <span className="text-slate-600">{item.name}</span>
                          <div className="font-medium">
                            {renderValue((item as any)[plan.id], plan.id)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full mt-4"
                >
                  {plan.id === 'discovery' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 