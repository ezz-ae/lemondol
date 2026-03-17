import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lemondol",
    short_name: "Lemondol",
    description: "Fresh fashion, playful accessories, and lifestyle finds from Lemondol.",
    start_url: "/",
    display: "standalone",
    background_color: "#FEFDF0",
    theme_color: "#F8E231",
    icons: [
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
