"use client"

import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function AdBanner({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '' 
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la publicité:', error)
    }
  }, [])

  // Ne pas afficher les pubs si AdSense n'est pas activé
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED) {
    return null
  }

  return (
    <div className={`ad-container ${className}`}>
      <div className="text-xs text-gray-400 text-center mb-1">Publicité</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

// Composants prédéfinis pour différents formats
export function AdBannerTop({ className }: { className?: string }) {
  return (
    <AdBanner
      slot="1234567890" // Remplacer par votre slot AdSense
      format="horizontal"
      className={`mb-6 ${className}`}
    />
  )
}

export function AdBannerSidebar({ className }: { className?: string }) {
  return (
    <AdBanner
      slot="0987654321" // Remplacer par votre slot AdSense
      format="vertical"
      className={`sticky top-4 ${className}`}
    />
  )
}

export function AdBannerInline({ className }: { className?: string }) {
  return (
    <AdBanner
      slot="1122334455" // Remplacer par votre slot AdSense
      format="rectangle"
      className={`my-4 ${className}`}
    />
  )
} 