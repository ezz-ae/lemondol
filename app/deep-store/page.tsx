import DeepStorePageClient from "@/components/pages/deep-store-page-client"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Private Collection Access",
  description: "Private access area for Lemondol's restricted collection.",
  path: "/deep-store",
  noIndex: true,
})

export default function DeepStorePage() {
  return <DeepStorePageClient />
}
