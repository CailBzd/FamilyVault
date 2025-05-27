// Types pour les utilisateurs et comptes
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: string
  updatedAt: string
  subscription?: Subscription
  trialEndsAt?: string
  isTrialActive: boolean
}

export interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  planType: PlanType
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  createdAt: string
  updatedAt: string
}

export type PlanType = 'personal' | 'family' | 'clan' | 'legacy'

// Types pour les relations entre utilisateurs
export interface UserRelation {
  id: string
  fromUserId: string
  toUserId: string
  relationType: RelationType
  relationCategory: RelationCategory
  status: RelationStatus
  invitedEmail?: string
  invitedPhone?: string
  createdAt: string
  updatedAt: string
  fromUser?: User
  toUser?: User
}

export type RelationType = 
  // Relations familiales
  | 'parent' | 'child' | 'spouse' | 'sibling'
  | 'grandparent' | 'grandchild' | 'uncle' | 'aunt'
  | 'cousin' | 'nephew' | 'niece' | 'in-law'
  // Relations amicales
  | 'friend' | 'best-friend' | 'acquaintance'
  // Relations professionnelles
  | 'colleague' | 'manager' | 'employee' | 'business-partner'
  | 'mentor' | 'mentee' | 'client' | 'supplier'

export type RelationCategory = 'family' | 'friends' | 'professional'

export type RelationStatus = 'pending' | 'accepted' | 'declined' | 'blocked'

// Types pour l'arbre généalogique/relationnel
export interface RelationTree {
  user: User
  relations: {
    family: UserRelation[]
    friends: UserRelation[]
    professional: UserRelation[]
  }
}

export interface RelationInvitation {
  id: string
  fromUserId: string
  email: string
  phone?: string
  relationType: RelationType
  relationCategory: RelationCategory
  message?: string
  token: string
  expiresAt: string
  createdAt: string
  fromUser?: User
}

// Types pour l'essai gratuit
export interface TrialInfo {
  isActive: boolean
  daysRemaining: number
  endsAt: string
  canUpgrade: boolean
  features: string[]
}

// Types pour les notifications
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: string
}

export type NotificationType = 
  | 'relation_invitation'
  | 'relation_accepted'
  | 'trial_expiring'
  | 'trial_expired'
  | 'subscription_updated'
  | 'welcome' 