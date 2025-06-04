"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, TreePine, Users, Camera, Crown, TrendingUp, Gift, Star } from "lucide-react"
import { PlanType } from "@/components/plan-simulator"
import Image from "next/image"

interface ActivityPanelProps {
  currentPlan?: PlanType
}

type ColorTheme = 'emerald' | 'blue' | 'violet' | 'amber'

export function ActivityPanel({ currentPlan = 'discovery' }: ActivityPanelProps) {
  const planConfig = {
    discovery: {
      name: 'Découverte',
      color: 'emerald' as ColorTheme,
      genealogyTeaser: 'Aperçu flouté de votre arbre',
      hiddenConnections: 12,
      upgradePrice: '9€/mois',
      nextPlan: 'Petits Groupes',
      features: ['Photos haute qualité', 'Arbre généalogique complet', '2 groupes supplémentaires'],
      totalTreesPlanted: 0,
      treesPerYear: 0,
      nextPlantingDate: ''
    },
    small: {
      name: 'Petits Groupes',
      color: 'blue' as ColorTheme,
      genealogyTeaser: 'Arbre complet disponible',
      hiddenConnections: 8,
      upgradePrice: '19€/mois',
      nextPlan: 'Grands Groupes',
      features: ['50 Go de stockage', '7 groupes supplémentaires', 'Recherche intelligente'],
      totalTreesPlanted: 2,
      treesPerYear: 1,
      nextPlantingDate: '15 Mars 2025'
    },
    large: {
      name: 'Grands Groupes',
      color: 'violet' as ColorTheme,
      genealogyTeaser: 'Arbre avancé avec exports',
      hiddenConnections: 0,
      upgradePrice: '49€/mois',
      nextPlan: 'Clans',
      features: ['500 Go de stockage', 'Groupes illimités', 'API d\'intégration'],
      totalTreesPlanted: 9,
      treesPerYear: 3,
      nextPlantingDate: '15 Mars 2025'
    },
    clan: {
      name: 'Clans',
      color: 'amber' as ColorTheme,
      genealogyTeaser: 'Toutes les fonctionnalités premium',
      hiddenConnections: 0,
      upgradePrice: null,
      nextPlan: null,
      features: ['Accès complet', 'Support 24/7', 'Fonctionnalités avancées'],
      totalTreesPlanted: 25,
      treesPerYear: 10,
      nextPlantingDate: '15 Mars 2025'
    }
  }

  const config = planConfig[currentPlan]
  
  const activities = [
    {
      id: 1,
      type: "new_photo",
      user: "Maman",
      action: "a ajouté 3 photos",
      group: "Ma Famille",
      time: "il y a 1h",
      icon: Camera
    },
    {
      id: 2,
      type: "new_member",
      user: "Cousin Paul",
      action: "a rejoint le groupe",
      group: "Ma Famille",
      time: "il y a 2h",
      icon: Users
    }
  ]

  const colorClasses: Record<ColorTheme, {
    bg: string
    border: string
    button: string
    text: string
    accent: string
  }> = {
    emerald: {
      bg: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      button: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      text: 'text-emerald-800',
      accent: 'text-emerald-600'
    },
    blue: {
      bg: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      button: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      text: 'text-blue-800',
      accent: 'text-blue-600'
    },
    violet: {
      bg: 'from-violet-50 to-purple-50',
      border: 'border-violet-200',
      button: 'from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700',
      text: 'text-violet-800',
      accent: 'text-violet-600'
    },
    amber: {
      bg: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200',
      button: 'from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700',
      text: 'text-amber-800',
      accent: 'text-amber-600'
    }
  }

  const colors = colorClasses[config.color]

  return (
    <div className="space-y-6">
      {/* Potentiel Treeb - Adaptatif selon le plan */}
      <Card className={`${colors.border} bg-gradient-to-br ${colors.bg} shadow-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Image
              src="/treeb-logo.png"
              alt="Treeb Logo"
              width={20}
              height={20}
              className="w-5 h-5 mr-2"
            />
            Votre potentiel Treeb
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Arbre généalogique adaptatif */}
          <div className="relative">
            <div className="text-sm font-medium mb-2 flex items-center text-stone-700">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              Arbre généalogique
            </div>
            
            {currentPlan === 'discovery' ? (
              <div className="h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl relative overflow-hidden border border-stone-300">
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Image
                      src="/treeb-logo.png"
                      alt="Treeb Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6 text-stone-500 mx-auto mb-1"
                    />
                    <div className="text-xs text-stone-600 font-medium">Aperçu flouté</div>
                  </div>
                </div>
                {/* Silhouettes floutées */}
                <div className="absolute top-2 left-4 w-3 h-3 bg-stone-400/50 rounded-full blur-sm" />
                <div className="absolute top-4 right-6 w-3 h-3 bg-stone-400/50 rounded-full blur-sm" />
                <div className="absolute bottom-3 center w-3 h-3 bg-stone-400/50 rounded-full blur-sm" />
              </div>
            ) : (
              <div className={`h-24 bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} flex items-center justify-center`}>
                <div className="text-center">
                  <Image
                    src="/treeb-logo.png"
                    alt="Treeb Logo"
                    width={24}
                    height={24}
                    className={`w-6 h-6 ${colors.accent} mx-auto mb-1`}
                  />
                  <div className={`text-xs ${colors.text} font-medium`}>{config.genealogyTeaser}</div>
                </div>
              </div>
            )}
            
            {config.hiddenConnections > 0 && (
              <div className={`text-xs ${colors.accent} font-medium mt-2 flex items-center`}>
                <Image
                  src="/treeb-logo.png"
                  alt="Treeb Logo"
                  width={16}
                  height={16}
                  className="w-3 h-3 mr-1"
                />
                Découvrir {config.hiddenConnections} connexions cachées
              </div>
            )}
          </div>

          {/* Avantages selon le plan */}
          {config.nextPlan && (
            <div>
              <div className={`text-sm font-medium ${colors.text} mb-2`}>
                💎 Passer à {config.nextPlan} pour :
              </div>
              <div className="space-y-1 text-xs">
                {config.features.map((feature, index) => (
                  <div key={index} className={`flex items-center ${colors.text}`}>
                    <Image
                      src="/treeb-logo.png"
                      alt="Treeb Logo"
                      width={16}
                      height={16}
                      className="w-3 h-3 mr-2"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {config.upgradePrice && (
            <Button className={`w-full bg-gradient-to-r ${colors.button} text-white shadow-sm`}>
              <Crown className="w-4 h-4 mr-2" />
              Upgrader - {config.upgradePrice}
            </Button>
          )}

          {currentPlan === 'clan' && (
            <div className="text-center py-2">
              <div className={`text-sm font-medium ${colors.text} mb-1`}>
                🎉 Vous profitez du meilleur plan !
              </div>
              <div className="text-xs text-stone-600">
                Toutes les fonctionnalités premium débloquées
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activités récentes */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-stone-800">Activités récentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-stone-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-stone-800">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {activity.group} • {activity.time}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Suggestion d'engagement selon le plan */}
      {currentPlan !== 'clan' && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm font-medium text-orange-800 ml-3">
                Suggestion d'engagement
              </span>
            </div>
            <div className="text-xs text-orange-700 mb-3">
              {currentPlan === 'discovery' 
                ? "Invitez plus de membres avec un plan supérieur !"
                : "Créez un nouveau groupe pour vos activités !"
              }
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full text-xs border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              {currentPlan === 'discovery' ? 'Voir les plans' : 'Créer un groupe'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistiques d'engagement */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={16}
                height={16}
                className="w-4 h-4 mr-2"
              />
              <span className="text-2xl font-bold text-stone-800">23</span>
            </div>
            <div className="text-xs text-stone-600 mb-1">souvenirs partagés ce mois</div>
            {currentPlan === 'discovery' && (
              <div className="text-xs text-amber-600">(qualité réduite)</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Impact Écologique */}
      {currentPlan !== 'discovery' && (
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-lg mb-2">🌳</div>
              <div className="text-lg font-bold text-emerald-700 mb-1">
                {planConfig[currentPlan].totalTreesPlanted} arbres plantés
              </div>
              <div className="text-xs text-emerald-600 mb-2">
                +{planConfig[currentPlan].treesPerYear} par an avec abonnement annuel
              </div>
              {currentPlan === 'clan' && (
                <div className="text-xs text-amber-600 font-medium mb-2">
                  + Invitation à participer à la plantation
                </div>
              )}
              <div className="text-xs text-stone-600">
                🌍 Votre tribu contribue à la reforestation
              </div>
              <div className="mt-2 p-2 bg-emerald-100 rounded-lg">
                <div className="text-xs text-emerald-700 font-medium">
                  Prochain: {planConfig[currentPlan].nextPlantingDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 