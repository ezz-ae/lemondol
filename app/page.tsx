import { Header } from "@/components/lemon/header"
import { Hero } from "@/components/lemon/hero"
import { TrustBadges } from "@/components/lemon/trust-badges"
import { FeatureSection } from "@/components/lemon/feature-section"
import { ProductGrid } from "@/components/lemon/product-grid"
import { Testimonials } from "@/components/lemon/testimonials"
import { CTABanner } from "@/components/lemon/cta-banner"
import { Newsletter } from "@/components/lemon/newsletter"
import { Footer } from "@/components/lemon/footer"
import { StructuredData } from "@/components/seo/structured-data"
import { createMetadata, getWebPageSchema } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Fresh Fashion, Accessories & Lifestyle",
  description:
    "Shop Lemondol for bright fashion, playful accessories, and everyday lifestyle finds made to make each day feel like a fresh start.",
  path: "/",
  keywords: ["fresh fashion", "colorful accessories", "giftable lifestyle picks"],
})

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={getWebPageSchema({
          title: "Lemondol Home",
          description:
            "Shop Lemondol for bright fashion, playful accessories, and everyday lifestyle finds made to make each day feel like a fresh start.",
          path: "/",
        })}
      />
      <div className="space-y-0">
        <Header />
        <Hero />
        <TrustBadges />
        <ProductGrid />
        <FeatureSection />
        <Testimonials />
        <CTABanner />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}
