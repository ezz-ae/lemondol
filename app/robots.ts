import type { MetadataRoute } from "next"

import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/shop", "/ai-studio", "/product/"],
        disallow: ["/account", "/init", "/deep-store"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  }
}
