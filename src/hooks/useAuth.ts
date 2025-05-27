import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { UserProfile, UserRole } from './useRole'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        }
        setLoading(false)
      }
    }

    const fetchProfile = async (userId: string) => {
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (!error && mounted) {
          setProfile(profileData)
          
          // Update last sign in
          await supabase
            .from('profiles')
            .update({ 
              last_sign_in_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', userId)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    getSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setProfile(null)
          }
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || email
        }
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setProfile(null)
    }
    return { error }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return { error: 'No profile found' }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      setProfile(data)
      return { data }
    } catch (err) {
      return { error: 'Failed to update profile' }
    }
  }

  // Permission checks
  const isSuperAdmin = profile?.role === 'super_admin'
  const isAdmin = profile?.role === 'admin' || isSuperAdmin
  const isUser = profile?.role === 'user' || isAdmin

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!profile) return false

    const roleHierarchy: Record<UserRole, number> = {
      guest: 0,
      user: 1,
      admin: 2,
      super_admin: 3
    }

    return roleHierarchy[profile.role] >= roleHierarchy[requiredRole]
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isSuperAdmin,
    isAdmin,
    isUser,
    hasPermission,
    canManageUsers: isSuperAdmin,
    canManageVaults: isAdmin,
    canUploadMedia: isUser,
  }
} 