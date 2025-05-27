"use client"

import { useState } from 'react'
import { getStripe } from '@/lib/stripe'
import { PlanType } from '@/lib/stripe'

export function useStripe() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCheckoutSession = async ({
    planType,
    userId,
    userEmail,
    userName,
  }: {
    planType: PlanType
    userId: string
    userEmail: string
    userName?: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      // Appeler l'API pour créer la session de checkout
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          userId,
          userEmail,
          userName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Rediriger vers Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe not loaded')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  const openCustomerPortal = async (customerId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session')
      }

      // Rediriger vers le portail client
      window.location.href = data.url
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Portal error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    createCheckoutSession,
    openCustomerPortal,
    loading,
    error,
  }
} 