"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, Mail, Phone, User, CheckCircle } from "lucide-react"

interface TrialSignupProps {
  onSuccess?: (userData: any) => void
}

export function TrialSignup({ onSuccess }: TrialSignupProps) {
  const [step, setStep] = useState<'form' | 'email-verification' | 'sms-verification' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emailCode: '',
    smsCode: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation côté client
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('Tous les champs sont requis')
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Adresse email invalide')
      }

      // Validation téléphone français
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Numéro de téléphone invalide')
      }

      // Appel API pour créer le compte et envoyer les codes
      const response = await fetch('/api/auth/trial-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
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
      const response = await fetch('/api/auth/verify-email', {
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

      setStep('sms-verification')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifySMS = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/verify-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          code: formData.smsCode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Code SMS invalide')
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

  const resendCode = async (type: 'email' | 'sms') => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/auth/resend-${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors du renvoi du code')
      }

      // Afficher un message de succès temporaire
      setError(`Code ${type === 'email' ? 'email' : 'SMS'} renvoyé avec succès`)
      setTimeout(() => setError(null), 3000)
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
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">
          {step === 'form' && 'Essai Gratuit 15 Jours'}
          {step === 'email-verification' && 'Vérification Email'}
          {step === 'sms-verification' && 'Vérification SMS'}
          {step === 'success' && 'Compte Créé !'}
        </CardTitle>
        <CardDescription>
          {step === 'form' && 'Aucune carte bancaire requise • Accès complet'}
          {step === 'email-verification' && 'Saisissez le code reçu par email'}
          {step === 'sms-verification' && 'Saisissez le code reçu par SMS'}
          {step === 'success' && 'Votre essai gratuit de 15 jours a commencé'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            error.includes('succès') 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
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
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="06 12 34 56 78"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Création du compte...' : 'Commencer l\'essai gratuit'}
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

            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={() => resendCode('email')}
              disabled={loading}
            >
              Renvoyer le code
            </Button>
          </form>
        )}

        {step === 'sms-verification' && (
          <form onSubmit={handleVerifySMS} className="space-y-4">
            <div className="text-center mb-4">
              <Phone className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Un code de vérification a été envoyé au<br />
                <strong>{formData.phone}</strong>
              </p>
            </div>

            <div>
              <Label htmlFor="smsCode">Code SMS</Label>
              <Input
                id="smsCode"
                type="text"
                value={formData.smsCode}
                onChange={(e) => handleInputChange('smsCode', e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Vérification...' : 'Vérifier le SMS'}
            </Button>

            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={() => resendCode('sms')}
              disabled={loading}
            >
              Renvoyer le code SMS
            </Button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                Bienvenue dans Treeb !
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Votre essai gratuit expire le{' '}
                <strong>
                  {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
                </strong>
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