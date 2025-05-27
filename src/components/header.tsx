'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SignInForm } from '@/components/auth/signin-form'
import { SignUpForm } from '@/components/auth/signup-form'
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  Settings, 
  Shield,
  Crown,
  Users
} from 'lucide-react'

export function Header() {
  const { user, profile, signOut, loading, isSuperAdmin, isAdmin } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
  }

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false)
    setMobileMenuOpen(false)
  }

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (email) {
      return email.slice(0, 2).toUpperCase()
    }
    return 'U'
  }

  const getRoleIcon = () => {
    if (isSuperAdmin) return <Crown className="h-4 w-4 text-yellow-500" />
    if (isAdmin) return <Shield className="h-4 w-4 text-blue-500" />
    return <User className="h-4 w-4 text-slate-500" />
  }

  const getRoleLabel = () => {
    if (isSuperAdmin) return 'Super Admin'
    if (isAdmin) return 'Administrateur'
    return 'Utilisateur'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FV</span>
              </div>
              <span className="font-bold text-xl text-slate-900">FamilyVault</span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Accueil
            </button>
            <Link
              href="/features"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Tarifs
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-8 animate-pulse bg-slate-200 rounded-full" />
            ) : user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile.avatar_url} alt={profile.full_name || profile.email} />
                      <AvatarFallback>
                        {getUserInitials(profile.full_name, profile.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile.full_name || 'Utilisateur'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile.email}
                      </p>
                      <div className="flex items-center space-x-1 pt-1">
                        {getRoleIcon()}
                        <span className="text-xs text-muted-foreground">
                          {getRoleLabel()}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  {(isSuperAdmin || isAdmin) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Administration</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Se connecter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {authMode === 'signin' ? 'Connexion' : 'Créer un compte'}
                    </DialogTitle>
                  </DialogHeader>
                  {authMode === 'signin' ? (
                    <SignInForm 
                      onSuccess={handleAuthSuccess}
                      onSwitchToSignUp={switchAuthMode}
                    />
                  ) : (
                    <SignUpForm 
                      onSuccess={handleAuthSuccess}
                      onSwitchToSignIn={switchAuthMode}
                    />
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Ouvert */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md w-full text-left"
              >
                Accueil
              </button>
              <Link
                href="/features"
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tarifs
              </Link>
              
              <div className="border-t pt-4">
                {loading ? (
                  <div className="px-3 py-2">
                    <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  </div>
                ) : user && profile ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile.avatar_url} alt={profile.full_name || profile.email} />
                          <AvatarFallback>
                            {getUserInitials(profile.full_name, profile.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {profile.full_name || 'Utilisateur'}
                          </p>
                          <div className="flex items-center space-x-1">
                            {getRoleIcon()}
                            <span className="text-xs text-slate-500">
                              {getRoleLabel()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="block w-full px-3 py-2 text-left text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                      <User className="inline mr-2 h-4 w-4" />
                      Profil
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                      <Settings className="inline mr-2 h-4 w-4" />
                      Paramètres
                    </button>
                    {(isSuperAdmin || isAdmin) && (
                      <button className="block w-full px-3 py-2 text-left text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md">
                        <Users className="inline mr-2 h-4 w-4" />
                        Administration
                      </button>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
                    >
                      <LogOut className="inline mr-2 h-4 w-4" />
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mx-3 mb-2">Se connecter</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {authMode === 'signin' ? 'Connexion' : 'Créer un compte'}
                        </DialogTitle>
                      </DialogHeader>
                      {authMode === 'signin' ? (
                        <SignInForm 
                          onSuccess={handleAuthSuccess}
                          onSwitchToSignUp={switchAuthMode}
                        />
                      ) : (
                        <SignUpForm 
                          onSuccess={handleAuthSuccess}
                          onSwitchToSignIn={switchAuthMode}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 