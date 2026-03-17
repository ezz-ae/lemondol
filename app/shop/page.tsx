import { Suspense } from "react"

import { StructuredData } from "@/components/seo/structured-data"
import ShopPageClient from "@/components/pages/shop-page-client"
import { createMetadata, getCollectionPageSchema, getWebPageSchema } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Shop Fresh Fashion, Accessories & Tattoos",
  description:
    "Browse Lemondol's full collection of bright fashion, cheerful accessories, lifestyle picks, and one-time tattoo drops curated for everyday joy.",
  path: "/shop",
  keywords: ["online boutique", "fashion collection", "accessories shop", "lifestyle gifts", "temporary tattoos"],
})

export default function ShopPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            title: "Shop Lemondol",
            description:
              "Browse Lemondol's full collection of bright fashion, cheerful accessories, lifestyle picks, and one-time tattoo drops curated for everyday joy.",
            path: "/shop",
          }),
          getCollectionPageSchema(),
        ]}
      />
      <Suspense fallback={null}>
        <ShopPageClient />
      </Suspense>
    </>
  )
}
