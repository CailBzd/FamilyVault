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
    // const tempUser = await getTemporaryFreeUser(email)
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

    // TODO: Créer le compte utilisateur gratuit définitif
    // const user = await createFreeUser({
    //   firstName: tempUser.firstName,
    //   lastName: tempUser.lastName,
    //   email: tempUser.email,
    //   phone: tempUser.phone,
    //   emailVerified: true,
    //   phoneVerified: false,
    //   subscriptionStatus: 'active',
    //   currentPlan: 'free',
    //   billingInterval: 'free',
    //   acceptAds: tempUser.acceptAds,
    //   treeConnections: []
    // })

    // TODO: Supprimer les données temporaires
    // await deleteTemporaryFreeUser(tempUser.id)

    // TODO: Créer une session utilisateur
    // const session = await createUserSession(user.id)

    // Pour le développement, on simule la création du compte
    const mockUser = {
      id: 'user_free_' + Date.now(),
      firstName: 'Test',
      lastName: 'Free',
      email: email,
      phone: '',
      emailVerified: true,
      phoneVerified: false,
      subscriptionStatus: 'active',
      currentPlan: 'free',
      billingInterval: 'free',
      acceptAds: true,
      treeConnections: []
    }

    console.log('✅ Email vérifié et compte gratuit créé:', { email, code, user: mockUser })

    return NextResponse.json({
      message: 'Compte gratuit créé avec succès',
      user: mockUser
    })
  } catch (error) {
    console.error('Erreur lors de la vérification email gratuite:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 