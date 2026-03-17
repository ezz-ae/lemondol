import { ImageResponse } from "next/og"

import { getProductById } from "@/lib/catalog"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

type ProductImageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductOpenGraphImage({ params }: ProductImageProps) {
  const { id } = await params
  const product = getProductById(id)

  const title = product?.name ?? "Lemondol"
  const price = product ? `$${product.price}` : "Fresh finds"
  const category = product ? product.category.toUpperCase() : "COLLECTION"

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FEFDF0 0%, #FFF4A8 40%, #FFD7D2 100%)",
          color: "#0F172A",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>LEMONDOL</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              padding: "12px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.7)",
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
          <div style={{ fontSize: 86, lineHeight: 0.95, fontWeight: 900 }}>{title}</div>
          <div style={{ fontSize: 32, lineHeight: 1.3, opacity: 0.82 }}>{product?.description ?? "Bright style, cheerful details, and everyday comfort."}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, opacity: 0.7 }}>Fresh picks for everyday style</div>
          <div style={{ fontSize: 56, fontWeight: 900 }}>{price}</div>
        </div>
      </div>
    ),
    size,
  )
}
