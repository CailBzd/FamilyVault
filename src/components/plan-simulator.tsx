"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Users, TreePine, Zap, Shield } from "lucide-react"

export type PlanType = 'discovery' | 'small' | 'large' | 'clan'

interface PlanSimulatorProps {
  currentPlan: PlanType
  onPlanChange: (plan: PlanType) => void
  isSuperAdmin?: boolean
}

export function PlanSimulator({ currentPlan, onPlanChange, isSuperAdmin = false }: PlanSimulatorProps) {
  if (!isSuperAdmin) return null

  const plans = [
    {
      id: 'discovery' as PlanType,
      name: 'Découverte',
      icon: Zap,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'small' as PlanType,
      name: 'Petits Groupes',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'large' as PlanType,
      name: 'Grands Groupes',
      icon: TreePine,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
    },
    {
      id: 'clan' as PlanType,
      name: 'Clans',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
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
          return (
            <Button
              key={plan.id}
              onClick={() => onPlanChange(plan.id)}
              variant={currentPlan === plan.id ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start text-xs ${
                currentPlan === plan.id 
                  ? `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0` 
                  : `${plan.bgColor} ${plan.borderColor} hover:${plan.bgColor}`
              }`}
            >
              <IconComponent className="w-3 h-3 mr-2" />
              {plan.name}
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
} 