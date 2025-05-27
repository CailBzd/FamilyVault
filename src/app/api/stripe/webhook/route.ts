import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/stripe-server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Vérifier la signature du webhook
    const event = verifyWebhookSignature(body, signature, webhookSecret)

    // Traiter les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('✅ Checkout session completed:', session.id)
        
        // TODO: Mettre à jour la base de données avec l'abonnement
        // - Créer ou mettre à jour l'utilisateur
        // - Enregistrer l'abonnement
        // - Envoyer un email de bienvenue
        
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('✅ Subscription created:', subscription.id)
        
        // TODO: Activer l'abonnement dans la base de données
        
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('✅ Subscription updated:', subscription.id)
        
        // TODO: Mettre à jour l'abonnement dans la base de données
        
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        console.log('❌ Subscription cancelled:', subscription.id)
        
        // TODO: Désactiver l'abonnement dans la base de données
        
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('✅ Payment succeeded:', invoice.id)
        
        // TODO: Confirmer le paiement et prolonger l'abonnement
        
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('❌ Payment failed:', invoice.id)
        
        // TODO: Notifier l'utilisateur de l'échec du paiement
        
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
} 