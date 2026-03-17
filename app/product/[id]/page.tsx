import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductPageClient from "@/components/pages/product-page-client"
import { StructuredData } from "@/components/seo/structured-data"
import { catalogProducts, getProductById, getProductSeoImagePath } from "@/lib/catalog"
import { createMetadata, getBreadcrumbSchema, getProductSchema } from "@/lib/seo"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return catalogProducts.map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return createMetadata({
      title: "Product Not Found",
      description: "The product you were looking for is no longer available.",
      path: "/shop",
      noIndex: true,
    })
  }

  return createMetadata({
    title: product.name,
    description: `${product.description} Shop ${product.name} at Lemondol for $${product.price}.`,
    path: `/product/${product.id}`,
    image: getProductSeoImagePath(product.id),
    keywords: [product.name, product.category, "buy online", "fashion product"],
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <StructuredData
        data={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/product/${product.id}` },
          ]),
          getProductSchema(product),
        ]}
      />
      <ProductPageClient productId={product.id} />
    </>
  )
}
