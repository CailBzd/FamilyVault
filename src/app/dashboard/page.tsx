"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FamilyTree } from "@/components/family-tree"
import { AdBannerTop, AdBannerSidebar, AdBannerInline } from "@/components/ads/ad-banner"
import { UserProfile, TreeConnection } from '@/lib/stripe'
import { 
  User, 
  Calendar, 
  Shield, 
  Settings, 
  CreditCard,
  Users,
  Gift,
  Clock,
  Zap,
  Crown
} from "lucide-react"

export default function DashboardPage() {
  // Données utilisateur mockées pour la démo - Plan gratuit
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user_demo_123',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@familyvault.eu',
    phone: '06 12 34 56 78',
    emailVerified: true,
    phoneVerified: true,
    subscriptionStatus: 'active',
    currentPlan: 'free', // Plan gratuit avec publicités
    billingInterval: 'free',
    treeConnections: [
      {
        id: 'conn_1',
        type: 'family',
        relationship: 'spouse',
        email: 'marie.dupont@example.com',
        phone: '06 98 76 54 32',
        verified: true,
        connectedAccountId: 'user_marie_456'
      },
      {
        id: 'conn_2',
        type: 'family',
        relationship: 'child',
        email: 'lucas.dupont@example.com',
        verified: false
      },
      {
        id: 'conn_3',
        type: 'professional',
        relationship: 'colleague',
        email: 'pierre.martin@company.com',
        verified: true
      },
      {
        id: 'conn_4',
        type: 'friend',
        relationship: 'friend',
        email: 'sophie.bernard@example.com',
        phone: '06 11 22 33 44',
        verified: false
      }
    ]
  })

  const handleUpdateConnections = (connections: TreeConnection[]) => {
    setUserProfile(prev => ({
      ...prev,
      treeConnections: connections
    }))
  }

  const isFreePlan = userProfile.currentPlan === 'free'
  const isTrialPlan = userProfile.currentPlan === 'trial'

  const daysRemaining = isTrialPlan && userProfile.trialEndDate ? Math.ceil(
    (userProfile.trialEndDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ) : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trial': return 'text-orange-600 bg-orange-50'
      case 'active': return 'text-green-600 bg-green-50'
      case 'canceled': return 'text-red-600 bg-red-50'
      case 'expired': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusLabel = (status: string, plan: string) => {
    if (plan === 'free') return 'Gratuit'
    switch (status) {
      case 'trial': return 'Essai gratuit'
      case 'active': return 'Actif'
      case 'canceled': return 'Annulé'
      case 'expired': return 'Expiré'
      default: return 'Inconnu'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free': return Zap
      case 'trial': return Gift
      case 'personal': return Shield
      case 'family': return Users
      case 'clan': return Crown
      case 'legacy': return Shield
      default: return Shield
    }
  }

  const PlanIcon = getPlanIcon(userProfile.currentPlan)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FamilyVault</h1>
                <p className="text-sm text-gray-500">Tableau de bord</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium">{userProfile.firstName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Publicité en haut pour plan gratuit */}
      {isFreePlan && <AdBannerTop className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Contenu principal */}
          <div className="flex-1">
            {/* Statut du compte */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Statut du compte</CardTitle>
                  <PlanIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userProfile.subscriptionStatus)}`}>
                      {getStatusLabel(userProfile.subscriptionStatus, userProfile.currentPlan)}
                    </span>
                    {isTrialPlan && (
                      <span className="text-xs text-muted-foreground">
                        {daysRemaining} jours restants
                      </span>
                    )}
                    {isFreePlan && (
                      <span className="text-xs text-blue-600">
                        Avec publicités
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connexions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.treeConnections.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {userProfile.treeConnections.filter(c => c.verified).length} vérifiées
                    {isFreePlan && ` / 10 max`}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Plan actuel</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{userProfile.currentPlan}</div>
                  <p className="text-xs text-muted-foreground">
                    {isFreePlan ? 'Gratuit à vie' : 
                     userProfile.billingInterval === 'trial' ? 'Gratuit' : userProfile.billingInterval}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Alerte plan gratuit */}
            {isFreePlan && (
              <Card className="mb-8 border-blue-200 bg-blue-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-blue-800">Plan Gratuit avec Publicités</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Vous utilisez FamilyVault gratuitement. Les publicités nous aident à maintenir ce service gratuit.
                    Passez à un plan payant pour supprimer les publicités et débloquer plus de fonctionnalités.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Passer à un plan payant
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Alerte essai gratuit */}
            {isTrialPlan && daysRemaining <= 5 && (
              <Card className="mb-8 border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <CardTitle className="text-orange-800">Votre essai gratuit expire bientôt</CardTitle>
                  </div>
                  <CardDescription className="text-orange-700">
                    Il vous reste {daysRemaining} jour{daysRemaining > 1 ? 's' : ''} pour profiter de FamilyVault gratuitement.
                    Choisissez un plan pour continuer à protéger vos souvenirs familiaux.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Choisir un plan
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Publicité inline pour plan gratuit */}
            {isFreePlan && <AdBannerInline className="mb-8" />}

            {/* Informations du profil */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Vos informations personnelles et de contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom complet</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {userProfile.firstName} {userProfile.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userProfile.email}</p>
                      {userProfile.emailVerified && (
                        <span className="text-green-600 text-xs">✓ Vérifié</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-sm text-gray-900">{userProfile.phone}</p>
                      {userProfile.phoneVerified && (
                        <span className="text-green-600 text-xs">✓ Vérifié</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Plan</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {userProfile.currentPlan} {isFreePlan && '(avec publicités)'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Arbre généalogique */}
            <FamilyTree 
              userProfile={userProfile} 
              onUpdateConnections={handleUpdateConnections}
            />
          </div>

          {/* Sidebar avec publicité pour plan gratuit */}
          {isFreePlan && (
            <div className="w-80 hidden lg:block">
              <AdBannerSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 