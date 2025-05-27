import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export type UserRole = 'super_admin' | 'admin' | 'user' | 'guest'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: UserRole
  created_at: string
  updated_at: string
  last_sign_in_at?: string
  is_active: boolean
  metadata?: Record<string, any>
}

export function useRole() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setProfile(null)
          setLoading(false)
          return
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          setError(profileError.message)
        } else if (mounted) {
          setProfile(profileData)
        }
      } catch (err) {
        console.error('Error in fetchProfile:', err)
        setError('Failed to fetch user profile')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProfile()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchProfile()
        } else if (event === 'SIGNED_OUT') {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Permission checks
  const isSuperAdmin = profile?.role === 'super_admin'
  const isAdmin = profile?.role === 'admin' || isSuperAdmin
  const isUser = profile?.role === 'user' || isAdmin
  const isGuest = profile?.role === 'guest'

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

  const canManageUsers = isSuperAdmin
  const canManageVaults = isAdmin
  const canUploadMedia = isUser
  const canViewContent = !isGuest || isUser

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
        setError(error.message)
        return { error: error.message }
      }

      setProfile(data)
      return { data }
    } catch (err) {
      const errorMessage = 'Failed to update profile'
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const updateLastSignIn = async () => {
    if (!profile) return

    await supabase
      .from('profiles')
      .update({ 
        last_sign_in_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id)
  }

  return {
    profile,
    loading,
    error,
    isSuperAdmin,
    isAdmin,
    isUser,
    isGuest,
    hasPermission,
    canManageUsers,
    canManageVaults,
    canUploadMedia,
    canViewContent,
    updateProfile,
    updateLastSignIn,
    refetch: () => {
      setLoading(true)
      setError(null)
      // Re-trigger the effect
      window.location.reload()
    }
  }
} 