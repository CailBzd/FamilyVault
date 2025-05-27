import { NextRequest, NextResponse } from 'next/server'
import { createCustomerPortalSession } from '@/lib/stripe-server'

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json()

    // Validation des données
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }

    // URL de retour
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const returnUrl = `${baseUrl}/dashboard`

    // Créer la session du portail client
    const session = await createCustomerPortalSession({
      customerId,
      returnUrl,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 