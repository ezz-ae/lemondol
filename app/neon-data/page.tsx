import NeonDataPageClient from "@/components/pages/neon-data-page-client"
import { StructuredData } from "@/components/seo/structured-data"
import { getNeonData } from "@/lib/neon-data"
import { createMetadata, getWebPageSchema } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata = createMetadata({
  title: "Neon Data",
  description:
    "A neon-styled local data workspace for recovered cart items and related Temu product discovery.",
  path: "/neon-data",
  keywords: ["local data workspace", "cart export", "product discovery"],
  noIndex: true,
})

export default async function NeonDataPage() {
  const data = await getNeonData()

  return (
    <>
      <StructuredData
        data={getWebPageSchema({
          title: "Lemondol Neon Data",
          description:
            "A neon-styled local data workspace for recovered cart items and related Temu product discovery.",
          path: "/neon-data",
        })}
      />
      <NeonDataPageClient data={data} />
    </>
  )
}
