import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

// Client Supabase avec clé de service pour les opérations admin
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types pour les opérations admin
export interface CreateUserParams {
  email: string
  password: string
  email_confirm?: boolean
  user_metadata?: Record<string, any>
}

export interface UpdateUserParams {
  email?: string
  password?: string
  email_confirm?: boolean
  user_metadata?: Record<string, any>
}

/**
 * Crée un nouvel utilisateur avec les privilèges admin
 */
export async function createUser(params: CreateUserParams) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser(params)
  return { data, error }
}

/**
 * Met à jour un utilisateur existant
 */
export async function updateUser(userId: string, params: UpdateUserParams) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, params)
  return { data, error }
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  return { data, error }
}

/**
 * Liste tous les utilisateurs
 */
export async function listUsers(page = 1, perPage = 1000) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page,
    perPage
  })
  return { data, error }
}

/**
 * Obtient un utilisateur par son ID
 */
export async function getUserById(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)
  return { data, error }
} 