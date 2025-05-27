import { supabase } from './supabase'
import { supabaseAdmin, createUser, listUsers } from './supabase-admin'

const SUPER_ADMIN_EMAIL = 'pitou.software@gmail.com'
const SUPER_ADMIN_PASSWORD = 'Family44330!'
const SUPER_ADMIN_NAME = 'Super Admin'

export interface AdminSetupResult {
  success: boolean
  message: string
  action: 'created' | 'exists' | 'promoted' | 'error'
  details?: any
}

/**
 * Vérifie et crée le compte super admin si nécessaire
 */
export async function ensureSuperAdminExists(): Promise<AdminSetupResult> {
  try {
    console.log('🔍 Vérification du compte super admin...')

    // 1. Vérifier si le profil existe déjà
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', SUPER_ADMIN_EMAIL)
      .single()

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

      // Créer un log d'audit
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

    // 3. Vérifier si l'utilisateur existe dans auth.users
    const { data: authUsersData, error: authError } = await listUsers()
    
    if (authError) {
      throw new Error(`Erreur lors de la vérification des utilisateurs: ${authError.message}`)
    }

    const existingAuthUser = authUsersData?.users?.find(user => user.email === SUPER_ADMIN_EMAIL)

    if (existingAuthUser) {
      // L'utilisateur existe dans auth mais pas dans profiles, créer le profil
      console.log('👤 Création du profil pour utilisateur existant...')
      
      const { data: newProfile, error: createProfileError } = await supabase
        .from('profiles')
        .insert({
          id: existingAuthUser.id,
          email: SUPER_ADMIN_EMAIL,
          full_name: SUPER_ADMIN_NAME,
          role: 'super_admin',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (createProfileError) {
        throw new Error(`Erreur lors de la création du profil: ${createProfileError.message}`)
      }

      // Créer l'abonnement par défaut
      await createDefaultSubscription(existingAuthUser.id)

      console.log('✅ Profil super admin créé')
      return {
        success: true,
        message: 'Profil super admin créé pour utilisateur existant',
        action: 'created',
        details: newProfile
      }
    }

    // 4. Créer complètement le compte super admin
    console.log('🆕 Création du compte super admin complet...')
    
    const { data: newUser, error: signUpError } = await createUser({
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASSWORD,
      email_confirm: true, // Confirmer automatiquement l'email
      user_metadata: {
        full_name: SUPER_ADMIN_NAME
      }
    })

    if (signUpError) {
      throw new Error(`Erreur lors de la création du compte: ${signUpError.message}`)
    }

    if (!newUser.user) {
      throw new Error('Aucun utilisateur créé')
    }

    // Créer le profil avec le rôle super_admin
    const { data: newProfile, error: createProfileError } = await supabase
      .from('profiles')
      .insert({
        id: newUser.user.id,
        email: SUPER_ADMIN_EMAIL,
        full_name: SUPER_ADMIN_NAME,
        role: 'super_admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (createProfileError) {
      throw new Error(`Erreur lors de la création du profil: ${createProfileError.message}`)
    }

    // Créer l'abonnement par défaut
    await createDefaultSubscription(newUser.user.id)

    // Créer un log d'audit
    await createAuditLog(newUser.user.id, 'ACCOUNT_CREATED', 'USER', newUser.user.id, {
      role: 'super_admin',
      created_by: 'system_startup',
      auto_created: true
    })

    console.log('✅ Compte super admin créé avec succès')
    return {
      success: true,
      message: 'Compte super admin créé avec succès',
      action: 'created',
      details: newProfile
    }

  } catch (error) {
    console.error('❌ Erreur lors de la configuration du super admin:', error)
    return {
      success: false,
      message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      action: 'error',
      details: error
    }
  }
}

/**
 * Crée un abonnement par défaut pour l'utilisateur
 */
async function createDefaultSubscription(userId: string) {
  const { error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan_type: 'legacy', // Plan le plus élevé pour le super admin
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.warn('⚠️ Erreur lors de la création de l\'abonnement:', error.message)
  }
}

/**
 * Crée une entrée dans les logs d'audit
 */
async function createAuditLog(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  details: Record<string, any>
) {
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
}

/**
 * Vérifie si l'utilisateur actuel est le super admin
 */
export async function isSuperAdminUser(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || user.email !== SUPER_ADMIN_EMAIL) {
      return false
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    return profile?.role === 'super_admin'
  } catch {
    return false
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