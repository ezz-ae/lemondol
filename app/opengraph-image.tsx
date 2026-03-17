import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const alt = "Lemondol open graph image"
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FEFDF0 0%, #FFF7B8 55%, #DFF4B2 100%)",
          color: "#0F172A",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              background: "#F8E231",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Lemondol</div>
            <div style={{ fontSize: 18, opacity: 0.7 }}>Fresh fashion and everyday bright picks</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
          <div style={{ fontSize: 82, lineHeight: 0.95, fontWeight: 900 }}>Fresh fashion, accessories, and lifestyle finds</div>
          <div style={{ fontSize: 28, lineHeight: 1.35, opacity: 0.82 }}>
            Bright styles, playful details, and curated everyday pieces designed to make each day feel like a fresh start.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
