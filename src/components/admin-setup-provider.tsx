'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ensureSuperAdminExistsSimple, AdminSetupResult } from '@/lib/admin-setup-simple'

interface AdminSetupContextType {
  setupResult: AdminSetupResult | null
  isSetupComplete: boolean
  isLoading: boolean
  error: string | null
}

const AdminSetupContext = createContext<AdminSetupContextType>({
  setupResult: null,
  isSetupComplete: false,
  isLoading: true,
  error: null
})

export function useAdminSetup() {
  return useContext(AdminSetupContext)
}

interface AdminSetupProviderProps {
  children: ReactNode
}

export function AdminSetupProvider({ children }: AdminSetupProviderProps) {
  const [setupResult, setSetupResult] = useState<AdminSetupResult | null>(null)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const setupSuperAdmin = async () => {
      try {
        console.log('🚀 Démarrage de la configuration du super admin...')
        
        // Attendre un peu pour s'assurer que Supabase est initialisé
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const result = await ensureSuperAdminExistsSimple()
        
        if (mounted) {
          setSetupResult(result)
          
          if (result.success) {
            setIsSetupComplete(true)
            setError(null)
            
            // Afficher un message de succès dans la console
            switch (result.action) {
              case 'exists':
                console.log('✅ Super admin déjà configuré')
                break
              case 'created':
                console.log('🎉 Super admin créé avec succès!')
                break
              case 'promoted':
                console.log('⬆️ Compte promu en super admin!')
                break
              case 'skipped':
                console.log('⚠️ Configuration automatique désactivée')
                break
            }
          } else {
            setError(result.message)
            console.error('❌ Échec de la configuration du super admin:', result.message)
          }
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
          setError(errorMessage)
          console.error('❌ Erreur lors de la configuration du super admin:', err)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    // Exécuter la configuration seulement en développement ou si explicitement activé
    const shouldSetup = process.env.NODE_ENV === 'development' || 
                       process.env.NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP === 'true'

    if (shouldSetup) {
      setupSuperAdmin()
    } else {
      // En production, marquer comme terminé sans faire la configuration
      setIsSetupComplete(true)
      setIsLoading(false)
      console.log('ℹ️ Configuration automatique du super admin désactivée en production')
    }

    return () => {
      mounted = false
    }
  }, [])

  const contextValue: AdminSetupContextType = {
    setupResult,
    isSetupComplete,
    isLoading,
    error
  }

  return (
    <AdminSetupContext.Provider value={contextValue}>
      {children}
    </AdminSetupContext.Provider>
  )
}

/**
 * Composant d'affichage du statut de configuration (optionnel)
 */
export function AdminSetupStatus() {
  const { setupResult, isSetupComplete, isLoading, error } = useAdminSetup()

  // Ne rien afficher en production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-lg shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Configuration du super admin...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-start space-x-2">
          <span className="text-red-600">❌</span>
          <div>
            <p className="text-sm font-medium">Erreur de configuration</p>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isSetupComplete && setupResult?.success) {
    const getIcon = () => {
      switch (setupResult.action) {
        case 'exists': return '✅'
        case 'created': return '🎉'
        case 'promoted': return '⬆️'
        case 'skipped': return '⚠️'
        default: return '✅'
      }
    }

    const getMessage = () => {
      switch (setupResult.action) {
        case 'exists': return 'Super admin déjà configuré'
        case 'created': return 'Super admin créé avec succès'
        case 'promoted': return 'Compte promu en super admin'
        case 'skipped': return 'Configuration automatique désactivée'
        default: return 'Configuration terminée'
      }
    }

    const getBgColor = () => {
      switch (setupResult.action) {
        case 'skipped': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
        default: return 'bg-green-100 border-green-300 text-green-800'
      }
    }

    return (
      <div className={`fixed bottom-4 right-4 ${getBgColor()} px-4 py-2 rounded-lg shadow-lg z-50`}>
        <div className="flex items-center space-x-2">
          <span>{getIcon()}</span>
          <span className="text-sm">{getMessage()}</span>
        </div>
      </div>
    )
  }

  return null
} 