import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()

    // Validation des données
    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Téléphone et code sont requis' },
        { status: 400 }
      )
    }

    // TODO: Récupérer les données temporaires de l'utilisateur
    // const tempUser = await getTemporaryUserByPhone(phone)
    // if (!tempUser) {
    //   return NextResponse.json(
    //     { error: 'Session expirée, veuillez recommencer' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Vérifier que l'email a été vérifié
    // if (!tempUser.emailVerified) {
    //   return NextResponse.json(
    //     { error: 'Veuillez d\'abord vérifier votre email' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Vérifier le code SMS
    // if (tempUser.smsCode !== code) {
    //   return NextResponse.json(
    //     { error: 'Code SMS invalide' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Créer le compte utilisateur définitif
    // const user = await createUser({
    //   firstName: tempUser.firstName,
    //   lastName: tempUser.lastName,
    //   email: tempUser.email,
    //   phone: tempUser.phone,
    //   emailVerified: true,
    //   phoneVerified: true,
    //   subscriptionStatus: 'trial',
    //   currentPlan: 'trial',
    //   billingInterval: 'trial',
    //   trialStartDate: new Date(),
    //   trialEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 jours
    //   treeConnections: []
    // })

    // TODO: Supprimer les données temporaires
    // await deleteTemporaryUser(tempUser.id)

    // TODO: Créer une session utilisateur
    // const session = await createUserSession(user.id)

    // Pour le développement, on simule la création du compte
    const mockUser = {
      id: 'user_' + Date.now(),
      firstName: 'Test',
      lastName: 'User',
      email: 'test@familyvault.eu',
      phone: phone,
      emailVerified: true,
      phoneVerified: true,
      subscriptionStatus: 'trial',
      currentPlan: 'trial',
      billingInterval: 'trial',
      trialStartDate: new Date(),
      trialEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      treeConnections: []
    }

    console.log('✅ SMS vérifié et compte créé:', { phone, code, user: mockUser })

    return NextResponse.json({
      message: 'Compte créé avec succès',
      user: mockUser,
      trialExpiresAt: mockUser.trialEndDate
    })
  } catch (error) {
    console.error('Erreur lors de la vérification SMS:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 