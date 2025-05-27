import { NextRequest, NextResponse } from 'next/server'
import { ensureSuperAdminExists } from '@/lib/admin-setup'

export async function POST(request: NextRequest) {
  try {
    // Vérifier que la requête vient du bon environnement
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isSetupEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP === 'true'
    
    if (!isDevelopment && !isSetupEnabled) {
      return NextResponse.json(
        { error: 'Configuration automatique du super admin désactivée' },
        { status: 403 }
      )
    }

    // Vérifier la clé de sécurité (optionnel)
    const authHeader = request.headers.get('authorization')
    const setupKey = process.env.ADMIN_SETUP_KEY
    
    if (setupKey && authHeader !== `Bearer ${setupKey}`) {
      return NextResponse.json(
        { error: 'Clé d\'autorisation invalide' },
        { status: 401 }
      )
    }

    console.log('🔧 Démarrage de la configuration du super admin via API...')
    
    const result = await ensureSuperAdminExists()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        action: result.action,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
          details: result.details
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('❌ Erreur dans l\'API de configuration du super admin:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Endpoint pour vérifier le statut
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    if (!isDevelopment) {
      return NextResponse.json(
        { error: 'Endpoint disponible uniquement en développement' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      status: 'API de configuration du super admin disponible',
      environment: process.env.NODE_ENV,
      autoSetupEnabled: process.env.NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP === 'true',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    )
  }
} 