import GirlsTimePageClient from "@/components/pages/girls-time-page-client"
import { StructuredData } from "@/components/seo/structured-data"
import { createMetadata, getWebPageSchema } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata = createMetadata({
  title: "Girls Time",
  description:
    "The ultimate aesthetic discovery app for girls' time. Find the best brunch, dinner, and drinks spots with high-energy vibes.",
  path: "/girls-time",
  keywords: ["girls time", "aesthetic dining", "brunch spots", "girls night out"],
})

export default async function GirlsTimePage() {
  return (
    <>
      <StructuredData
        data={getWebPageSchema({
          title: "Lemondol Girls Time App",
          description:
            "The ultimate aesthetic discovery app for girls' time. Find the best brunch, dinner, and drinks spots with high-energy vibes.",
          path: "/girls-time",
        })}
      />
      <GirlsTimePageClient />
    </>
  )
}
