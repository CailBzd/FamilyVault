import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe-server'
import { STRIPE_PLANS, PlanType } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { planType, userId, userEmail, userName } = await request.json()

    // Validation des données
    if (!planType || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Plan type, user ID, and email are required' },
        { status: 400 }
      )
    }

    // Vérifier que le plan existe
    const plan = STRIPE_PLANS[planType as PlanType]
    if (!plan || !plan.priceId) {
      return NextResponse.json(
        { error: 'Invalid plan type or price ID not configured' },
        { status: 400 }
      )
    }

    // URLs de redirection
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/dashboard?success=true&plan=${planType}`
    const cancelUrl = `${baseUrl}/?canceled=true`

    // Créer la session de checkout
    const session = await createCheckoutSession({
      priceId: plan.priceId,
      successUrl,
      cancelUrl,
      metadata: {
        userId,
        planType,
        userEmail,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 