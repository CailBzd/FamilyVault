import { HeroSection } from "@/components/hero-section"
import { PricingGrid } from "@/components/pricing-grid"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PricingGrid />
    </main>
  )
}
