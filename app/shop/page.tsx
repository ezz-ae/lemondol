import { StructuredData } from "@/components/seo/structured-data"
import ShopPageClient from "@/components/pages/shop-page-client"
import { createMetadata, getCollectionPageSchema, getWebPageSchema } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Shop Fresh Fashion & Accessories",
  description:
    "Browse Lemondol's full collection of bright fashion, cheerful accessories, and lifestyle picks curated for everyday joy.",
  path: "/shop",
  keywords: ["online boutique", "fashion collection", "accessories shop", "lifestyle gifts"],
})

export default function ShopPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            title: "Shop Lemondol",
            description:
              "Browse Lemondol's full collection of bright fashion, cheerful accessories, and lifestyle picks curated for everyday joy.",
            path: "/shop",
          }),
          getCollectionPageSchema(),
        ]}
      />
      <ShopPageClient />
    </>
  )
}
