import { Header } from "@/components/lemon/header"
import { Hero } from "@/components/lemon/hero"
import { TrustBadges } from "@/components/lemon/trust-badges"
import { FeatureSection } from "@/components/lemon/feature-section"
import { ProductGrid } from "@/components/lemon/product-grid"
import { Testimonials } from "@/components/lemon/testimonials"
import { CTABanner } from "@/components/lemon/cta-banner"
import { Newsletter } from "@/components/lemon/newsletter"
import { Footer } from "@/components/lemon/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustBadges />
      <ProductGrid />
      <FeatureSection />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <Footer />
    </main>
  )
}
