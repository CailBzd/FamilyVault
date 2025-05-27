"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Mail, Phone, User, CheckCircle, AlertCircle } from "lucide-react"

interface FreeSignupProps {
  onSuccess?: (userData: any) => void
}

export function FreeSignup({ onSuccess }: FreeSignupProps) {
  const [step, setStep] = useState<'form' | 'email-verification' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emailCode: '',
    acceptAds: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation côté client
      if (!formData.firstName || !formData.lastName || !formData.email) {
        throw new Error('Nom, prénom et email sont requis')
      }

      if (!formData.acceptAds) {
        throw new Error('Vous devez accepter les publicités pour utiliser le plan gratuit')
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Adresse email invalide')
      }

      // Appel API pour créer le compte gratuit
      const response = await fetch('/api/auth/free-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          acceptAds: formData.acceptAds
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      setStep('email-verification')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/verify-free-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.emailCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Code email invalide')
      }

      setStep('success')
      onSuccess?.(data.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">
          {step === 'form' && 'Plan Gratuit'}
          {step === 'email-verification' && 'Vérification Email'}
          {step === 'success' && 'Compte Créé !'}
        </CardTitle>
        <CardDescription>
          {step === 'form' && 'Accès gratuit à vie avec publicités'}
          {step === 'email-verification' && 'Saisissez le code reçu par email'}
          {step === 'success' && 'Votre compte gratuit est prêt'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Jean"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Dupont"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jean.dupont@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Téléphone (optionnel)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>

            {/* Avertissement publicités */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Plan gratuit avec publicités</h4>
                  <p className="text-xs text-blue-700 mt-1">
                    Ce plan inclut des publicités pour financer les services. 
                    Vous pouvez passer à un plan payant à tout moment pour supprimer les publicités.
                  </p>
                </div>
              </div>
            </div>

            {/* Acceptation des publicités */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="acceptAds"
                checked={formData.acceptAds}
                onChange={(e) => handleInputChange('acceptAds', e.target.checked)}
                className="mt-1"
                required
              />
              <Label htmlFor="acceptAds" className="text-sm">
                J'accepte l'affichage de publicités pour utiliser le plan gratuit
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !formData.acceptAds}>
              {loading ? 'Création du compte...' : 'Créer mon compte gratuit'}
            </Button>
          </form>
        )}

        {step === 'email-verification' && (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <div className="text-center mb-4">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Un code de vérification a été envoyé à<br />
                <strong>{formData.email}</strong>
              </p>
            </div>

            <div>
              <Label htmlFor="emailCode">Code de vérification</Label>
              <Input
                id="emailCode"
                type="text"
                value={formData.emailCode}
                onChange={(e) => handleInputChange('emailCode', e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Vérification...' : 'Vérifier l\'email'}
            </Button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                Bienvenue dans FamilyVault !
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Votre compte gratuit est maintenant actif.<br />
                Profitez de 5GB de stockage et de toutes les fonctionnalités de base.
              </p>
            </div>
          </div>
        )}
      </CardContent>

      {step === 'success' && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => window.location.href = '/dashboard'}
          >
            Accéder à mon compte
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 