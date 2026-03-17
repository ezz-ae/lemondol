import InitAdminPageClient from "@/components/pages/init-page-client"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Internal Orchestrator",
  description: "Internal orchestration workspace for Lemondol operations.",
  path: "/init",
  noIndex: true,
})

export default function InitPage() {
  return <InitAdminPageClient />
}
