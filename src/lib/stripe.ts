import { loadStripe, Stripe } from '@stripe/stripe-js'

// Configuration Stripe côté client
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
    }
    
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

// Configuration des plans Treeb avec plan gratuit, essai gratuit et tarifs mensuels/annuels
export const STRIPE_PLANS = {
  free: {
    name: 'Gratuit',
    priceId: null, // Pas de prix Stripe pour le plan gratuit
    price: 0,
    currency: 'eur',
    interval: 'free',
    features: [
      'Accès gratuit à vie',
      'Stockage limité (5 GB)',
      'Arbre généalogique basique',
      'Jusqu\'à 10 connexions',
      'Publicités intégrées',
      'Support communautaire'
    ],
    limitations: {
      storage: '5GB',
      connections: 10,
      ads: true,
      features: 'basic'
    }
  },
  trial: {
    name: 'Essai Gratuit',
    priceId: null, // Pas de prix Stripe pour l'essai
    price: 0,
    currency: 'eur',
    interval: 'trial',
    trialDays: 15,
    features: [
      '15 jours gratuits',
      'Toutes les fonctionnalités',
      'Aucune carte bancaire requise',
      'Création d\'arbre généalogique',
      'Connexions familiales et professionnelles',
      'Support par email'
    ]
  },
  personal: {
    name: 'Personnel',
    monthly: {
      priceId: process.env.STRIPE_PERSONAL_MONTHLY_PRICE_ID,
      price: 9,
      currency: 'eur',
      interval: 'month',
    },
    yearly: {
      priceId: process.env.STRIPE_PERSONAL_YEARLY_PRICE_ID,
      price: 90, // 2 mois gratuits
      currency: 'eur',
      interval: 'year',
      discount: '17%'
    },
    features: [
      '1 utilisateur',
      '50 GB de stockage',
      'Partage avec 5 membres famille',
      'Arbre généalogique personnel',
      'Historique 1 an',
      'Chiffrement de bout en bout',
      'Support par email'
    ]
  },
  family: {
    name: 'Famille',
    monthly: {
      priceId: process.env.STRIPE_FAMILY_MONTHLY_PRICE_ID,
      price: 19,
      currency: 'eur',
      interval: 'month',
    },
    yearly: {
      priceId: process.env.STRIPE_FAMILY_YEARLY_PRICE_ID,
      price: 190, // 2 mois gratuits
      currency: 'eur',
      interval: 'year',
      discount: '17%'
    },
    popular: true,
    features: [
      'Jusqu\'à 8 membres',
      '200 GB de stockage partagé',
      'Albums photos illimités',
      'Arbre généalogique familial étendu',
      'Connexions professionnelles',
      'Historique 3 ans',
      'Sauvegarde automatique mobile',
      'Support prioritaire'
    ]
  },
  clan: {
    name: 'Clan',
    monthly: {
      priceId: process.env.STRIPE_CLAN_MONTHLY_PRICE_ID,
      price: 39,
      currency: 'eur',
      interval: 'month',
    },
    yearly: {
      priceId: process.env.STRIPE_CLAN_YEARLY_PRICE_ID,
      price: 390, // 2 mois gratuits
      currency: 'eur',
      interval: 'year',
      discount: '17%'
    },
    features: [
      'Jusqu\'à 20 membres',
      '500 GB de stockage',
      'Gestion multi-générations',
      'Arbre généalogique complet',
      'Réseaux familiaux et professionnels',
      'Historique illimité',
      'Support prioritaire',
      'Gestionnaire de famille dédié'
    ]
  },
  legacy: {
    name: 'Legacy',
    monthly: {
      priceId: process.env.STRIPE_LEGACY_MONTHLY_PRICE_ID,
      price: 99,
      currency: 'eur',
      interval: 'month',
    },
    yearly: {
      priceId: process.env.STRIPE_LEGACY_YEARLY_PRICE_ID,
      price: 990, // 2 mois gratuits
      currency: 'eur',
      interval: 'year',
      discount: '17%'
    },
    features: [
      'Archivage permanent',
      'Transmission aux héritiers',
      'Coffre-fort numérique testamentaire',
      'Arbre généalogique historique',
      'Stockage illimité',
      'Support juridique',
      'Garantie à vie'
    ]
  }
} as const

export type PlanType = keyof typeof STRIPE_PLANS
export type BillingInterval = 'monthly' | 'yearly' | 'trial' | 'free'

// Types pour l'arbre généalogique
export interface TreeConnection {
  id: string
  type: 'family' | 'friend' | 'professional'
  relationship: string // 'parent', 'enfant', 'conjoint', 'ami', 'collègue', etc.
  email?: string
  phone?: string
  verified: boolean
  connectedAccountId?: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  emailVerified: boolean
  phoneVerified: boolean
  trialStartDate?: Date
  trialEndDate?: Date
  subscriptionStatus: 'trial' | 'active' | 'canceled' | 'expired'
  currentPlan: PlanType
  billingInterval: BillingInterval
  treeConnections: TreeConnection[]
} 