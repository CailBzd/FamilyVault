'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, Mail, User, Lock } from 'lucide-react'

interface SignUpFormProps {
  onSuccess?: () => void
  onSwitchToSignIn?: () => void
}

export function SignUpForm({ onSuccess, onSwitchToSignIn }: SignUpFormProps) {
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Le nom complet est requis')
      return false
    }

    if (!formData.email.trim()) {
      setError('L\'email est requis')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer un email valide')
      return false
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return false
    }

    // Validation de la complexité du mot de passe
    const hasUpperCase = /[A-Z]/.test(formData.password)
    const hasLowerCase = /[a-z]/.test(formData.password)
    const hasNumbers = /\d/.test(formData.password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      setError('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
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
      const { data, error } = await signUp(
        formData.email.trim(),
        formData.password,
        formData.fullName.trim()
      )

      if (error) {
        if (error.message.includes('already registered')) {
          setError('Cette adresse email est déjà utilisée')
        } else if (error.message.includes('weak password')) {
          setError('Le mot de passe est trop faible')
        } else {
          setError(error.message)
        }
        return
      }

      if (data.user && !data.user.email_confirmed_at) {
        setSuccess(true)
        setError(null)
      } else {
        onSuccess?.()
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite')
      console.error('Signup error:', err)
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

  if (success) {
    return (
      <div className="space-y-4">
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertDescription>
            Un email de confirmation a été envoyé à <strong>{formData.email}</strong>.
            Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </AlertDescription>
        </Alert>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={onSwitchToSignIn}
            className="w-full"
          >
            Retour à la connexion
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nom complet</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="fullName"
            type="text"
            placeholder="Votre nom complet"
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            className="pl-10"
            disabled={loading}
            required
          />
        </div>
      </div>

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
        <p className="text-xs text-slate-500">
          Au moins 8 caractères avec majuscule, minuscule, chiffre et caractère spécial
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            className="pl-10 pr-10"
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            disabled={loading}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
            Création du compte...
          </>
        ) : (
          'Créer mon compte'
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
          disabled={loading}
        >
          Déjà un compte ? Se connecter
        </button>
      </div>
    </form>
  )
} 