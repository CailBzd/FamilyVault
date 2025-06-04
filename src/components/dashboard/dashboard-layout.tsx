"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Feed } from "./feed"
import { ActivityPanel } from "./activity-panel"
import { PlanSimulator, PlanType } from "@/components/plan-simulator"

interface DashboardLayoutProps {
  isSuperAdmin?: boolean
}

export function DashboardLayout({ isSuperAdmin = false }: DashboardLayoutProps) {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('discovery')

  return (
    <div className="min-h-screen bg-stone-50">
      <PlanSimulator 
        currentPlan={currentPlan}
        onPlanChange={setCurrentPlan}
        isSuperAdmin={isSuperAdmin}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar gauche */}
          <div className="col-span-12 lg:col-span-3">
            <Sidebar currentPlan={currentPlan} />
          </div>
          
          {/* Feed central */}
          <div className="col-span-12 lg:col-span-6">
            <Feed currentPlan={currentPlan} />
          </div>
          
          {/* Panel d'activité droite */}
          <div className="col-span-12 lg:col-span-3">
            <ActivityPanel currentPlan={currentPlan} />
          </div>
        </div>
      </div>
    </div>
  )
} 