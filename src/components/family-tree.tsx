"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Users, 
  UserPlus, 
  Heart, 
  Baby, 
  Crown, 
  Briefcase, 
  UserCheck, 
  Mail, 
  Phone,
  Search,
  Filter,
  Plus
} from "lucide-react"
import { TreeConnection, UserProfile } from '@/lib/stripe'

interface FamilyTreeProps {
  userProfile: UserProfile
  onUpdateConnections?: (connections: TreeConnection[]) => void
}

const relationshipTypes = {
  family: {
    parent: { label: 'Parent', icon: Crown, color: 'text-purple-600' },
    child: { label: 'Enfant', icon: Baby, color: 'text-blue-600' },
    spouse: { label: 'Conjoint(e)', icon: Heart, color: 'text-red-600' },
    sibling: { label: 'Frère/Sœur', icon: Users, color: 'text-green-600' },
    grandparent: { label: 'Grand-parent', icon: Crown, color: 'text-purple-800' },
    grandchild: { label: 'Petit-enfant', icon: Baby, color: 'text-blue-400' },
    uncle_aunt: { label: 'Oncle/Tante', icon: Users, color: 'text-orange-600' },
    cousin: { label: 'Cousin(e)', icon: Users, color: 'text-yellow-600' },
  },
  friend: {
    best_friend: { label: 'Meilleur(e) ami(e)', icon: Heart, color: 'text-pink-600' },
    friend: { label: 'Ami(e)', icon: Users, color: 'text-indigo-600' },
    neighbor: { label: 'Voisin(e)', icon: Users, color: 'text-teal-600' },
  },
  professional: {
    colleague: { label: 'Collègue', icon: Briefcase, color: 'text-gray-600' },
    manager: { label: 'Manager', icon: Crown, color: 'text-slate-700' },
    employee: { label: 'Employé(e)', icon: Users, color: 'text-slate-500' },
    client: { label: 'Client', icon: Briefcase, color: 'text-emerald-600' },
    partner: { label: 'Partenaire', icon: Briefcase, color: 'text-amber-600' },
  }
}

export function FamilyTree({ userProfile, onUpdateConnections }: FamilyTreeProps) {
  const [activeTab, setActiveTab] = useState<'family' | 'friend' | 'professional'>('family')
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newConnection, setNewConnection] = useState({
    type: 'family' as TreeConnection['type'],
    relationship: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const filteredConnections = userProfile.treeConnections.filter(connection => {
    const matchesTab = connection.type === activeTab
    const matchesSearch = searchTerm === '' || 
      connection.relationship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (connection.email && connection.email.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const handleAddConnection = async () => {
    try {
      // TODO: Appel API pour ajouter la connexion
      const response = await fetch('/api/tree/add-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newConnection,
          userId: userProfile.id
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la connexion')
      }

      const data = await response.json()
      
      // Mettre à jour les connexions localement
      const updatedConnections = [...userProfile.treeConnections, data.connection]
      onUpdateConnections?.(updatedConnections)

      // Réinitialiser le formulaire
      setNewConnection({
        type: 'family',
        relationship: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      })
      setShowAddForm(false)
    } catch (error) {
      console.error('Erreur:', error)
      // TODO: Afficher un message d'erreur
    }
  }

  const sendConnectionInvite = async (connectionId: string) => {
    try {
      const response = await fetch('/api/tree/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          connectionId,
          userId: userProfile.id
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'invitation')
      }

      // TODO: Afficher un message de succès
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const getRelationshipInfo = (type: TreeConnection['type'], relationship: string) => {
    const typeRelations = relationshipTypes[type] as Record<string, { label: string; icon: any; color: string }>
    return typeRelations[relationship] || {
      label: relationship,
      icon: Users,
      color: 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Mon Arbre Généalogique</h2>
          <p className="text-muted-foreground">
            Connectez-vous avec votre famille, vos amis et vos contacts professionnels
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une connexion
        </Button>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {(['family', 'friend', 'professional'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'family' && '👨‍👩‍👧‍👦 Famille'}
            {tab === 'friend' && '👥 Amis'}
            {tab === 'professional' && '💼 Professionnel'}
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher une connexion..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Liste des connexions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnections.map((connection) => {
          const relationInfo = getRelationshipInfo(connection.type, connection.relationship)
          const IconComponent = relationInfo.icon

          return (
            <Card key={connection.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full bg-muted ${relationInfo.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{relationInfo.label}</CardTitle>
                      <CardDescription className="text-xs">
                        {connection.verified ? '✅ Vérifié' : '⏳ En attente'}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {connection.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span className="truncate">{connection.email}</span>
                    </div>
                  )}
                  {connection.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span>{connection.phone}</span>
                    </div>
                  )}
                  
                  {!connection.verified && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => sendConnectionInvite(connection.id)}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Inviter
                    </Button>
                  )}
                  
                  {connection.connectedAccountId && (
                    <div className="flex items-center space-x-1 text-xs text-green-600">
                      <UserCheck className="w-3 h-3" />
                      <span>Compte connecté</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredConnections.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucune connexion</h3>
          <p className="text-muted-foreground mb-4">
            Commencez à construire votre réseau en ajoutant vos premières connexions
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une connexion
          </Button>
        </div>
      )}

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Card className="border-2 border-dashed">
          <CardHeader>
            <CardTitle>Ajouter une nouvelle connexion</CardTitle>
            <CardDescription>
              Ajoutez une personne à votre réseau familial ou professionnel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type de relation</Label>
                <select
                  id="type"
                  value={newConnection.type}
                  onChange={(e) => setNewConnection(prev => ({ 
                    ...prev, 
                    type: e.target.value as TreeConnection['type'],
                    relationship: '' 
                  }))}
                  className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="family">👨‍👩‍👧‍👦 Famille</option>
                  <option value="friend">👥 Ami</option>
                  <option value="professional">💼 Professionnel</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="relationship">Relation</Label>
                <select
                  id="relationship"
                  value={newConnection.relationship}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, relationship: e.target.value }))}
                  className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Sélectionner...</option>
                  {Object.entries(relationshipTypes[newConnection.type]).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={newConnection.firstName}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Jean"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={newConnection.lastName}
                  onChange={(e) => setNewConnection(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Dupont"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                value={newConnection.email}
                onChange={(e) => setNewConnection(prev => ({ ...prev, email: e.target.value }))}
                placeholder="jean.dupont@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Téléphone (optionnel)</Label>
              <Input
                id="phone"
                type="tel"
                value={newConnection.phone}
                onChange={(e) => setNewConnection(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddConnection} className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 