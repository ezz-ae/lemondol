import type { MetadataRoute } from "next"

import { catalogProducts } from "@/lib/catalog"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/shop"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/ai-studio"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = catalogProducts.map((product) => ({
    url: absoluteUrl(`/product/${product.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...routes, ...productRoutes]
}
