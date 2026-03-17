import AIStudioPageClient from "@/components/pages/ai-studio-page-client"
import { StructuredData } from "@/components/seo/structured-data"
import { createMetadata, getWebPageSchema } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AI Studio for Product Edits & Videos",
  description:
    "Explore Lemondol AI Studio for creative product visuals, quick edits, and cinematic promo generation concepts.",
  path: "/ai-studio",
  keywords: ["AI studio", "product visuals", "fashion content tools"],
})

export default function AIStudioPage() {
  return (
    <>
      <StructuredData
        data={getWebPageSchema({
          title: "Lemondol AI Studio",
          description:
            "Explore Lemondol AI Studio for creative product visuals, quick edits, and cinematic promo generation concepts.",
          path: "/ai-studio",
        })}
      />
      <AIStudioPageClient />
    </>
  )
}
