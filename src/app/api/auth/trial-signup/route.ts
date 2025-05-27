import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await request.json()

    // Validation des données
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
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

    // Validation téléphone français
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Numéro de téléphone invalide' },
        { status: 400 }
      )
    }

    // TODO: Vérifier si l'email ou le téléphone existe déjà
    // const existingUser = await checkExistingUser(email, phone)
    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: 'Un compte existe déjà avec cet email ou ce numéro' },
    //     { status: 409 }
    //   )
    // }

    // Générer les codes de vérification
    const emailCode = Math.floor(100000 + Math.random() * 900000).toString()
    const smsCode = Math.floor(100000 + Math.random() * 900000).toString()

    // TODO: Stocker temporairement les données utilisateur et les codes
    // await storeTemporaryUser({
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   emailCode,
    //   smsCode,
    //   expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    // })

    // TODO: Envoyer l'email de vérification
    // await sendVerificationEmail(email, emailCode, firstName)

    // TODO: Envoyer le SMS de vérification
    // await sendVerificationSMS(phone, smsCode)

    console.log('🔐 Codes de vérification générés:', { email, emailCode, phone, smsCode })

    return NextResponse.json({
      message: 'Codes de vérification envoyés',
      email,
      phone
    })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 