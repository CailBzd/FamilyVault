import Stripe from 'stripe'

// Configuration Stripe côté serveur
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// Fonction pour créer une session de checkout
export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerId,
  metadata = {},
}: {
  priceId: string
  successUrl: string
  cancelUrl: string
  customerId?: string
  metadata?: Record<string, string>
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer: customerId,
      metadata,
      subscription_data: {
        metadata,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: customerId ? undefined : 'always',
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Fonction pour créer un portail client
export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string
  returnUrl: string
}) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    throw error
  }
}

// Fonction pour récupérer un abonnement
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    throw error
  }
}

// Fonction pour créer ou récupérer un client
export async function createOrRetrieveCustomer({
  email,
  name,
  userId,
}: {
  email: string
  name?: string
  userId: string
}) {
  try {
    // Chercher un client existant par email
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0]
    }

    // Créer un nouveau client
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    })

    return customer
  } catch (error) {
    console.error('Error creating or retrieving customer:', error)
    throw error
  }
}

// Fonction pour vérifier la signature du webhook
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
) {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret)
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    throw error
  }
} 