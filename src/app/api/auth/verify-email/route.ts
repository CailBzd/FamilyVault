import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    // Validation des données
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email et code sont requis' },
        { status: 400 }
      )
    }

    // TODO: Récupérer les données temporaires de l'utilisateur
    // const tempUser = await getTemporaryUser(email)
    // if (!tempUser) {
    //   return NextResponse.json(
    //     { error: 'Session expirée, veuillez recommencer' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Vérifier le code email
    // if (tempUser.emailCode !== code) {
    //   return NextResponse.json(
    //     { error: 'Code email invalide' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Marquer l'email comme vérifié
    // await updateTemporaryUser(email, { emailVerified: true })

    // Pour le développement, on accepte tous les codes
    console.log('✅ Email vérifié:', { email, code })

    return NextResponse.json({
      message: 'Email vérifié avec succès',
      emailVerified: true
    })
  } catch (error) {
    console.error('Erreur lors de la vérification email:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 