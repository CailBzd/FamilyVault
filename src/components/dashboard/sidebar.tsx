"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TreePine, Users, Plus, Crown, Camera, Archive, Zap } from "lucide-react"
import { PlanType } from "@/components/plan-simulator"
import Image from "next/image"
import { useAuth } from '@/hooks/useAuth'

interface SidebarProps {
  currentPlan?: PlanType
}

type ColorTheme = 'emerald' | 'blue' | 'violet' | 'amber'

export function Sidebar({ currentPlan = 'discovery' }: SidebarProps) {
  const planConfig = {
    discovery: {
      name: 'Plan Découverte',
      storage: '150 Mo / 500 Mo',
      storagePercent: 30,
      credits: '0/1 crédit utilisé',
      icon: Zap,
      color: 'emerald' as ColorTheme,
      canCreateGroup: false,
      features: {
        photoQuality: 'Qualité réduite',
        genealogy: 'Aperçu flouté',
        groupLimit: '1 groupe max'
      }
    },
    small: {
      name: 'Petits Groupes',
      storage: '800 Mo / 2 Go',
      storagePercent: 40,
      credits: '1/3 crédits utilisés',
      icon: Users,
      color: 'blue' as ColorTheme,
      canCreateGroup: true,
      features: {
        photoQuality: 'Haute qualité',
        genealogy: 'Arbre complet',
        groupLimit: '3 groupes max'
      }
    },
    large: {
      name: 'Grands Groupes',
      storage: '12 Go / 50 Go',
      storagePercent: 24,
      credits: '2/10 crédits utilisés',
      icon: TreePine,
      color: 'violet' as ColorTheme,
      canCreateGroup: true,
      features: {
        photoQuality: 'Haute qualité + vidéos',
        genealogy: 'Arbre avancé + export',
        groupLimit: '10 groupes max'
      }
    },
    clan: {
      name: 'Clans',
      storage: '120 Go / 500 Go',
      storagePercent: 24,
      credits: '8/∞ crédits utilisés',
      icon: Crown,
      color: 'amber' as ColorTheme,
      canCreateGroup: true,
      features: {
        photoQuality: 'Qualité originale',
        genealogy: 'Multi-familles + API',
        groupLimit: 'Groupes illimités'
      }
    }
  }

  const config = planConfig[currentPlan]
  const PlanIcon = config.icon

  const colorClasses: Record<ColorTheme, {
    bg: string
    border: string
    text: string
    button: string
    accent: string
  }> = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-700',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      accent: 'text-emerald-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700',
      accent: 'text-blue-600'
    },
    violet: {
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      text: 'text-violet-700',
      button: 'bg-violet-600 hover:bg-violet-700',
      accent: 'text-violet-600'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-700',
      button: 'bg-amber-600 hover:bg-amber-700',
      accent: 'text-amber-600'
    }
  }

  const colors = colorClasses[config.color]

  return (
    <div className="space-y-6">
      {/* Header avec logo - palette naturelle */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <div className="w-8 h-8 bg-white rounded-lg p-1 shadow-lg">
            <Image
              src="/treeb-logo.png"
              alt="Treeb Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>
        <div>
          <h2 className="text-stone-100 font-bold text-lg">Treeb</h2>
          <p className="text-stone-400 text-xs">Votre tribu connectée</p>
        </div>
      </div>

      {/* Plan et stockage - harmonisé */}
      <Card className={`${colors.border} ${colors.bg} shadow-sm`}>
        <CardContent className="p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlanIcon className={`w-4 h-4 ${colors.accent}`} />
                <span className="text-sm font-medium text-stone-700">{config.name}</span>
              </div>
            </div>
            
            {/* Barre de stockage */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Stockage</span>
                <span>{config.storage}</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${config.color === 'emerald' ? 'from-emerald-400 to-emerald-500' : 
                    config.color === 'blue' ? 'from-blue-400 to-blue-500' :
                    config.color === 'violet' ? 'from-violet-400 to-violet-500' :
                    'from-amber-400 to-amber-500'}`}
                  style={{ width: `${config.storagePercent}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-stone-500">
              {config.credits}
            </div>
            
            {currentPlan === 'discovery' && (
              <Button size="sm" className={`w-full text-xs ${colors.button} text-white`}>
                Upgrader le plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mes groupes - adaptatif */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-stone-800">Mes groupes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors">
            <span className="text-base mr-3">🏠</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-stone-800">Ma Famille</div>
              <div className="text-xs text-stone-500">5 membres • {config.features.photoQuality}</div>
            </div>
          </div>
          
          {currentPlan !== 'discovery' && (
            <div className="flex items-center p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors">
              <span className="text-base mr-3">🏓</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-800">Club Tennis</div>
                <div className="text-xs text-stone-500">12 membres • {config.features.photoQuality}</div>
              </div>
            </div>
          )}

          {(currentPlan === 'large' || currentPlan === 'clan') && (
            <div className="flex items-center p-3 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors">
              <span className="text-base mr-3">🏘️</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-800">Voisins</div>
                <div className="text-xs text-stone-500">8 membres • {config.features.photoQuality}</div>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className={`w-full text-sm justify-start transition-colors ${
              config.canCreateGroup 
                ? `${colors.text} hover:${colors.bg}` 
                : 'text-stone-400 cursor-not-allowed'
            }`}
            disabled={!config.canCreateGroup}
          >
            <Plus className="w-4 h-4 mr-2" />
            {config.canCreateGroup ? 'Créer un groupe' : 'Upgrader pour créer'}
          </Button>
        </CardContent>
      </Card>

      {/* Arbre généalogique - adaptatif */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="text-center">
            <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
              <div className="w-8 h-8 bg-white rounded-lg p-1 shadow-sm">
                <Image
                  src="/treeb-logo.png"
                  alt="Treeb Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
            </div>
            <div className="text-sm font-medium text-stone-700 mb-2">Arbre généalogique</div>
            <div className="text-xs text-stone-500 mb-4">{config.features.genealogy}</div>
            
            {currentPlan === 'discovery' ? (
              <Button size="sm" className={`w-full ${colors.button} text-white shadow-sm`}>
                Débloquer l'arbre
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="w-full border-stone-300 text-stone-600">
                <Archive className="w-3 h-3 mr-2" />
                Exporter l'arbre
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités du plan */}
      <Card className={`${colors.border} ${colors.bg} shadow-sm`}>
        <CardContent className="p-4">
          <div className="text-xs font-medium text-stone-700 mb-3">Fonctionnalités actuelles</div>
          <div className="space-y-2 text-xs text-stone-600">
            <div className="flex items-center">
              <Camera className="w-3 h-3 mr-2" />
              {config.features.photoQuality}
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-2" />
              {config.features.groupLimit}
            </div>
            <div className="flex items-center">
              <Image
                src="/treeb-logo.png"
                alt="Treeb Logo"
                width={12}
                height={12}
                className="w-3 h-3 mr-2"
              />
              {config.features.genealogy}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 