import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, acceptAds } = await request.json()

    // Validation des données
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Nom, prénom et email sont requis' },
        { status: 400 }
      )
    }

    if (!acceptAds) {
      return NextResponse.json(
        { error: 'Vous devez accepter les publicités pour utiliser le plan gratuit' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // TODO: Vérifier si l'email existe déjà
    // const existingUser = await checkExistingUser(email)
    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: 'Un compte existe déjà avec cet email' },
    //     { status: 409 }
    //   )
    // }

    // Générer le code de vérification email
    const emailCode = Math.floor(100000 + Math.random() * 900000).toString()

    // TODO: Stocker temporairement les données utilisateur et le code
    // await storeTemporaryFreeUser({
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   emailCode,
    //   acceptAds,
    //   planType: 'free',
    //   expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    // })

    // TODO: Envoyer l'email de vérification
    // await sendVerificationEmail(email, emailCode, firstName)

    console.log('🔐 Code de vérification généré pour plan gratuit:', { email, emailCode })

    return NextResponse.json({
      message: 'Code de vérification envoyé',
      email
    })
  } catch (error) {
    console.error('Erreur lors de l\'inscription gratuite:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 