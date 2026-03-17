import AccountPageClient from "@/components/pages/account-page-client"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Your Account",
  description: "Manage your Lemondol account details, orders, and preferences.",
  path: "/account",
  noIndex: true,
})

export default function AccountPage() {
  return <AccountPageClient />
}
