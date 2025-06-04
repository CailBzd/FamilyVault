"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Users, TreePine, Zap, Shield } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export type PlanType = 'discovery' | 'small' | 'large' | 'clan'

interface Plan {
  id: PlanType
  name: string
  price: number
  currency: string
  period: string
  description: string
  icon: any
  color: string
  treesPerYear: number
  ecological: string
  features: string[]
  limitations: string[]
}

interface PlanSimulatorProps {
  currentPlan: PlanType
  onPlanChange: (plan: PlanType) => void
  isSuperAdmin?: boolean
}

export function PlanSimulator({ currentPlan, onPlanChange, isSuperAdmin = false }: PlanSimulatorProps) {
  const { isSuperAdmin: authIsSuperAdmin } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('discovery')

  if (!authIsSuperAdmin) return null

  const plans: Plan[] = [
    {
      id: 'discovery',
      name: 'Plan Découverte',
      price: 0,
      currency: '€',
      period: '/mois',
      description: 'Parfait pour commencer',
      icon: TreePine,
      color: 'emerald',
      treesPerYear: 0,
      ecological: 'Plantez des arbres avec un plan supérieur',
      features: [
        'Stockage 500 Mo',
        'Photos qualité réduite',
        '1 groupe familial',
        'Arbre généalogique flouté',
        'Support par email'
      ],
      limitations: [
        'Qualité photo limitée',
        'Pas d\'arbre généalogique complet',
        'Stockage limité'
      ]
    },
    {
      id: 'small',
      name: 'Petits Groupes',
      price: 9,
      currency: '€',
      period: '/mois',
      description: 'Idéal pour les familles',
      icon: Users,
      color: 'blue',
      treesPerYear: 1,
      ecological: '🌳 1 arbre planté chaque année',
      features: [
        'Stockage 2 Go',
        'Photos haute qualité',
        '3 groupes max',
        'Arbre généalogique complet',
        'Support prioritaire',
        'Invitations illimitées'
      ],
      limitations: [
        'Pas de vidéos',
        'Export limité'
      ]
    },
    {
      id: 'large',
      name: 'Grands Groupes',
      price: 19,
      currency: '€',
      period: '/mois',
      description: 'Pour les grandes familles',
      icon: Crown,
      color: 'violet',
      treesPerYear: 3,
      ecological: '🌳 3 arbres plantés chaque année',
      features: [
        'Stockage 50 Go',
        'Photos + vidéos haute qualité',
        '10 groupes max',
        'Arbre généalogique avancé + export',
        'Support téléphonique',
        'Recherche intelligente',
        'Sauvegarde automatique'
      ],
      limitations: [
        'API limitée'
      ]
    },
    {
      id: 'clan',
      name: 'Clans',
      price: 49,
      currency: '€',
      period: '/mois',
      description: 'Pour les très grandes tribus',
      icon: Zap,
      color: 'amber',
      treesPerYear: 10,
      ecological: '🌳 10 arbres plantés chaque année',
      features: [
        'Stockage 500 Go',
        'Qualité originale',
        'Groupes illimités',
        'Multi-familles + API complète',
        'Support 24/7',
        'Fonctionnalités avancées',
        'Backup géolocalisé',
        'Certificats arbres plantés'
      ],
      limitations: []
    }
  ]

  return (
    <Card className="fixed top-4 right-4 z-50 border-rose-200 bg-rose-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center text-rose-800">
          <Shield className="w-4 h-4 mr-2" />
          Super Admin - Simulateur
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          const colorClasses = {
            emerald: 'from-emerald-500 to-teal-500 bg-emerald-50 border-emerald-200',
            blue: 'from-blue-500 to-indigo-500 bg-blue-50 border-blue-200',
            violet: 'from-violet-500 to-purple-500 bg-violet-50 border-violet-200',
            amber: 'from-amber-500 to-orange-500 bg-amber-50 border-amber-200'
          }
          const classes = colorClasses[plan.color as keyof typeof colorClasses]
          
          return (
            <div key={plan.id} className="space-y-1">
              <Button
                onClick={() => onPlanChange(plan.id)}
                variant={currentPlan === plan.id ? "default" : "outline"}
                size="sm"
                className={`w-full justify-start text-xs ${
                  currentPlan === plan.id 
                    ? `bg-gradient-to-r ${classes.split(' ')[0]} ${classes.split(' ')[1]} hover:opacity-90 text-white border-0` 
                    : `${classes.split(' ')[2]} ${classes.split(' ')[3]} hover:${classes.split(' ')[2]}`
                }`}
              >
                <IconComponent className="w-3 h-3 mr-2" />
                {plan.name}
              </Button>
              {plan.treesPerYear > 0 && (
                <div className="text-xs text-emerald-600 font-medium px-2">
                  🌳 {plan.treesPerYear} arbre{plan.treesPerYear > 1 ? 's' : ''}/an
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
} 