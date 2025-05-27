import { supabase } from './supabase'

const SUPER_ADMIN_EMAIL = 'pitou.software@gmail.com'
const SUPER_ADMIN_NAME = 'Super Admin'

export interface AdminSetupResult {
  success: boolean
  message: string
  action: 'created' | 'exists' | 'promoted' | 'error' | 'skipped'
  details?: any
}

/**
 * Version simplifiée qui vérifie seulement si le profil existe
 * et le promeut en super admin si nécessaire
 */
export async function ensureSuperAdminExistsSimple(): Promise<AdminSetupResult> {
  try {
    console.log('🔍 Vérification simple du compte super admin...')

    // Vérifier si les variables Supabase sont configurées
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return {
        success: false,
        message: 'Variables Supabase non configurées. Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local',
        action: 'error'
      }
    }

    // Si la clé de service n'est pas configurée, on skip la création automatique
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('⚠️ SUPABASE_SERVICE_ROLE_KEY non configurée - création automatique désactivée')
      return {
        success: true,
        message: 'Création automatique désactivée - configurez SUPABASE_SERVICE_ROLE_KEY pour l\'activer',
        action: 'skipped'
      }
    }

    // 1. Vérifier si le profil existe déjà
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', SUPER_ADMIN_EMAIL)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 = "The result contains 0 rows" (pas d'erreur, juste aucun résultat)
      throw new Error(`Erreur lors de la vérification du profil: ${profileError.message}`)
    }

    if (existingProfile && existingProfile.role === 'super_admin') {
      console.log('✅ Compte super admin déjà configuré')
      return {
        success: true,
        message: 'Compte super admin déjà configuré',
        action: 'exists',
        details: existingProfile
      }
    }

    // 2. Si le profil existe mais n'est pas super admin, le promouvoir
    if (existingProfile && existingProfile.role !== 'super_admin') {
      console.log('⬆️ Promotion du compte existant en super admin...')
      
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          role: 'super_admin',
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProfile.id)
        .select()
        .single()

      if (updateError) {
        throw new Error(`Erreur lors de la promotion: ${updateError.message}`)
      }

      // Créer un log d'audit si possible
      await createAuditLog(existingProfile.id, 'ROLE_UPDATED', 'USER', existingProfile.id, {
        old_role: existingProfile.role,
        new_role: 'super_admin',
        updated_by: 'system_startup'
      })

      console.log('✅ Compte promu en super admin')
      return {
        success: true,
        message: 'Compte promu en super admin',
        action: 'promoted',
        details: updatedProfile
      }
    }

    // 3. Si aucun profil n'existe, indiquer qu'il faut créer le compte manuellement
    console.log('ℹ️ Aucun profil trouvé - création manuelle requise')
    return {
      success: true,
      message: 'Aucun profil trouvé. Créez le compte manuellement via l\'interface ou configurez SUPABASE_SERVICE_ROLE_KEY pour la création automatique.',
      action: 'skipped'
    }

  } catch (error) {
    console.error('❌ Erreur lors de la vérification du super admin:', error)
    return {
      success: false,
      message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      action: 'error',
      details: error
    }
  }
}

/**
 * Crée une entrée dans les logs d'audit (si possible)
 */
async function createAuditLog(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  details: Record<string, any>
) {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.warn('⚠️ Erreur lors de la création du log d\'audit:', error.message)
    }
  } catch (err) {
    console.warn('⚠️ Impossible de créer le log d\'audit:', err)
  }
}

/**
 * Fonction utilitaire pour obtenir les informations du super admin
 */
export function getSuperAdminInfo() {
  return {
    email: SUPER_ADMIN_EMAIL,
    name: SUPER_ADMIN_NAME
  }
} 