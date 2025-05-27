'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'

interface SignInFormProps {
  onSuccess?: () => void
  onSwitchToSignUp?: () => void
}

export function SignInForm({ onSuccess, onSwitchToSignUp }: SignInFormProps) {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('L\'email est requis')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer un email valide')
      return false
    }

    if (!formData.password) {
      setError('Le mot de passe est requis')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signIn(
        formData.email.trim(),
        formData.password
      )

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre email avant de vous connecter')
        } else if (error.message.includes('Too many requests')) {
          setError('Trop de tentatives de connexion. Veuillez réessayer plus tard')
        } else {
          setError(error.message)
        }
        return
      }

      if (data.user) {
        onSuccess?.()
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite')
      console.error('Signin error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            className="pl-10"
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Votre mot de passe"
            value={formData.password}
            onChange={handleInputChange('password')}
            className="pl-10 pr-10"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            disabled={loading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connexion...
          </>
        ) : (
          'Se connecter'
        )}
      </Button>

      <div className="space-y-2 text-center">
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
          disabled={loading}
        >
          Pas encore de compte ? S'inscrire
        </button>
        
        <div>
          <button
            type="button"
            className="text-sm text-slate-600 hover:text-slate-800 underline"
            disabled={loading}
            onClick={() => {
              // TODO: Implement forgot password
              alert('Fonctionnalité de récupération de mot de passe à venir')
            }}
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
    </form>
  )
} 