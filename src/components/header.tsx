'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogIn, LogOut, User, Menu, X } from 'lucide-react'

export function Header() {
  const { user, loading, signIn, signOut } = useAuth()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        alert('Erreur de connexion: ' + error.message)
      } else {
        setIsLoginOpen(false)
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      alert('Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (href: string, sectionId?: string) => {
    if (sectionId && window.location.pathname === '/') {
      // Si on est sur la page d'accueil, faire défiler vers la section
      scrollToSection(sectionId)
    } else if (sectionId) {
      // Si on n'est pas sur la page d'accueil, naviguer vers la page d'accueil avec l'ancre
      window.location.href = `/#${sectionId}`
    } else {
      // Navigation normale vers une page
      window.location.href = href
    }
  }

  const handleFeaturesClick = () => {
    if (window.location.pathname === '/') {
      scrollToSection('features')
    } else {
      // Offrir le choix entre la section sur la page d'accueil ou la page dédiée
      window.location.href = '/features'
    }
  }

  const handlePricingClick = () => {
    if (window.location.pathname === '/') {
      scrollToSection('pricing')
    } else {
      // Offrir le choix entre la section sur la page d'accueil ou la page dédiée
      window.location.href = '/pricing'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">FamilyVault</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavClick('/', 'hero')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              Accueil
            </button>
            <button
              onClick={handleFeaturesClick}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              Fonctionnalités
            </button>
            <button
              onClick={handlePricingClick}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              Tarifs
            </button>
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Tableau de bord
              </Link>
            )}
          </nav>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            )}
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile ouvert */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <button
                onClick={() => {
                  handleNavClick('/', 'hero')
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              >
                Accueil
              </button>
              <button
                onClick={() => {
                  handleFeaturesClick()
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => {
                  handlePricingClick()
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              >
                Tarifs
              </button>
              {user && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
              )}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2">
                      <p className="text-base font-medium text-gray-800">{user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsLoginOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialog de connexion */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Se connecter</DialogTitle>
            <DialogDescription className="text-gray-600">
              Connectez-vous à votre compte FamilyVault
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false)
                    handlePricingClick()
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Voir nos tarifs
                </button>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  )
} 