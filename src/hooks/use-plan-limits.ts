import { PlanType } from '@/lib/stripe'

interface PlanLimits {
  storage: string
  maxConnections: number | 'unlimited'
  maxFamilyMembers: number | 'unlimited'
  hasAds: boolean
  features: string[]
}

const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    storage: '5GB',
    maxConnections: 10,
    maxFamilyMembers: 5,
    hasAds: true,
    features: ['basic']
  },
  trial: {
    storage: '50GB',
    maxConnections: 'unlimited',
    maxFamilyMembers: 'unlimited',
    hasAds: false,
    features: ['all']
  },
  personal: {
    storage: '50GB',
    maxConnections: 50,
    maxFamilyMembers: 5,
    hasAds: false,
    features: ['personal']
  },
  family: {
    storage: '200GB',
    maxConnections: 'unlimited',
    maxFamilyMembers: 8,
    hasAds: false,
    features: ['family', 'extended']
  },
  clan: {
    storage: '500GB',
    maxConnections: 'unlimited',
    maxFamilyMembers: 20,
    hasAds: false,
    features: ['clan', 'multi-generational']
  },
  legacy: {
    storage: 'unlimited',
    maxConnections: 'unlimited',
    maxFamilyMembers: 'unlimited',
    hasAds: false,
    features: ['legacy', 'inheritance', 'permanent']
  }
}

export function usePlanLimits(planType: PlanType) {
  const limits = PLAN_LIMITS[planType]

  const canAddConnection = (currentConnections: number): boolean => {
    if (limits.maxConnections === 'unlimited') return true
    return currentConnections < limits.maxConnections
  }

  const canAddFamilyMember = (currentMembers: number): boolean => {
    if (limits.maxFamilyMembers === 'unlimited') return true
    return currentMembers < limits.maxFamilyMembers
  }

  const getConnectionsRemaining = (currentConnections: number): number | null => {
    if (limits.maxConnections === 'unlimited') return null
    return Math.max(0, limits.maxConnections - currentConnections)
  }

  const getFamilyMembersRemaining = (currentMembers: number): number | null => {
    if (limits.maxFamilyMembers === 'unlimited') return null
    return Math.max(0, limits.maxFamilyMembers - currentMembers)
  }

  const isFeatureAvailable = (feature: string): boolean => {
    if (limits.features.includes('all')) return true
    return limits.features.includes(feature)
  }

  return {
    limits,
    canAddConnection,
    canAddFamilyMember,
    getConnectionsRemaining,
    getFamilyMembersRemaining,
    isFeatureAvailable,
    hasAds: limits.hasAds
  }
} 