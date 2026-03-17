import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const alt = "Lemondol Twitter image"
export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FFFCE6 0%, #F8E231 45%, #A4D44D 100%)",
          color: "#0F172A",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>LEMONDOL</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 850 }}>
          <div style={{ fontSize: 78, lineHeight: 0.95, fontWeight: 900 }}>Fresh looks with a bright point of view</div>
          <div style={{ fontSize: 30, lineHeight: 1.3, opacity: 0.85 }}>
            Fashion, accessories, and lifestyle picks curated for cheerful everyday shopping.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
