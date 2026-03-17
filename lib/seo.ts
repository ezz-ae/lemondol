import type { Metadata } from "next"

import { catalogProducts, getProductSeoImagePath, type CatalogProduct } from "@/lib/catalog"

function resolveSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!envUrl) {
    return "https://lemondol.vercel.app"
  }

  return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`
}

export const siteConfig = {
  name: "Lemondol",
  title: "Lemondol",
  description:
    "Fresh fashion, playful accessories, and lifestyle finds designed to make every day feel like a bright new start.",
  url: resolveSiteUrl(),
  locale: "en_US",
  keywords: [
    "Lemondol",
    "women's fashion",
    "accessories",
    "lifestyle products",
    "colorful fashion",
    "gift shop",
    "online boutique",
  ],
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return new URL(path, siteConfig.url).toString()
}

type MetadataInput = {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
}

export function createMetadata({ title, description, path, image = "/opengraph-image", keywords = [], noIndex = false }: MetadataInput): Metadata {
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-image-preview": "none",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  }
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon-light-32x32.png"),
    description: siteConfig.description,
  }
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    inLanguage: "en-US",
  }
}

export function getWebPageSchema({ title, description, path }: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function getCollectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop Lemondol",
    description: "Browse Lemondol's complete collection of fashion, accessories, and lifestyle picks.",
    url: absoluteUrl("/shop"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: catalogProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/product/${product.id}`),
        name: product.name,
      })),
    },
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function getProductSchema(product: CatalogProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: [absoluteUrl(getProductSeoImagePath(product.id))],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.id}`),
      priceCurrency: "USD",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }
}
