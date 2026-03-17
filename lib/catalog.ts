export type ProductCategory = "clothing" | "accessories" | "lifestyle"
export type ShopCategory = "all" | ProductCategory
export type ProductBadge = "Bestseller" | "New" | "Sale" | null

export interface CatalogProduct {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  badge: ProductBadge
  category: ProductCategory
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "lemon-dress",
    name: "Sunshine Lemon Dress",
    tagline: "Squeeze the day in style",
    description: "Vibrant yellow cotton dress with a cheerful lemon print for bright everyday styling.",
    price: 45,
    originalPrice: 55,
    image: "/images/products/dress.png",
    badge: "Bestseller",
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    details: "A breathable cotton dress with a softly cinched waist, relaxed skirt, and playful all-over print designed for sunny-day comfort.",
    howToUse: "Machine wash cold with like colors. Hang to dry or tumble dry low. Iron on low heat when needed.",
    ingredients: "100% cotton fabric, natural-feel lining, colorfast printed finish.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  },
  {
    id: "citrus-tote",
    name: "Citrus Canvas Tote",
    tagline: "Carry your sunshine everywhere",
    description: "Durable canvas tote bag built for everyday essentials with a bright citrus look.",
    price: 22,
    originalPrice: null,
    image: "/images/products/tote.png",
    badge: "New",
    category: "accessories",
    sizes: ["One Size"],
    details: "A roomy carryall with reinforced handles, inner pocket storage, and a structured base for daily errands or weekend plans.",
    howToUse: "Spot clean with a damp cloth. Avoid bleach and machine drying to preserve shape and print quality.",
    ingredients: "Heavyweight cotton canvas with woven shoulder straps.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  },
  {
    id: "zest-candle",
    name: "Lemon Zest Candle",
    tagline: "A brighter mood in every room",
    description: "Fresh scented soy candle that brings a clean citrus glow to bedrooms, desks, and cozy corners.",
    price: 18,
    originalPrice: null,
    image: "/images/products/candle.png",
    badge: null,
    category: "lifestyle",
    sizes: ["8 oz"],
    details: "Hand-poured soy wax candle with a cotton wick and soft citrus fragrance designed for a clean, even burn.",
    howToUse: "Trim wick to 1/4 inch before each use. Burn on a stable heat-safe surface for up to 3 hours at a time.",
    ingredients: "Soy wax blend, cotton wick, citrus fragrance oil.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  },
  {
    id: "spring-hat",
    name: "Spring Meadow Hat",
    tagline: "Shade with a soft floral finish",
    description: "Protective sun hat with charming floral details and an easy, lightweight fit.",
    price: 28,
    originalPrice: 35,
    image: "/images/products/hat.png",
    badge: "Sale",
    category: "accessories",
    sizes: ["One Size"],
    details: "Wide-brim silhouette with a flexible structure and airy feel, made for vacations, park days, and warm-weather styling.",
    howToUse: "Store flat or gently hung. Spot clean only and avoid prolonged folding to preserve brim shape.",
    ingredients: "Woven straw blend with soft inner band and decorative trim.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  },
  {
    id: "lemon-tee",
    name: "Lemon Squeeze Tee",
    tagline: "Everyday comfort with a playful twist",
    description: "Organic cotton tee with a cheerful graphic and an easy relaxed fit for everyday wear.",
    price: 25,
    originalPrice: null,
    image: "/images/products/tee.png",
    badge: null,
    category: "clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: "Soft-touch jersey tee with a slightly oversized cut, durable neckline, and versatile styling for layering or standalone wear.",
    howToUse: "Wash cold inside out with similar colors. Tumble dry low or line dry to maintain softness and print clarity.",
    ingredients: "100% organic cotton jersey.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  },
  {
    id: "lemon-socks",
    name: "Sour & Sweet Socks",
    tagline: "Tiny lemons, big comfort",
    description: "Comfortable everyday socks finished with miniature lemon patterns and a soft stretch fit.",
    price: 12,
    originalPrice: null,
    image: "/images/products/socks.png",
    badge: "New",
    category: "clothing",
    sizes: ["S/M", "M/L"],
    details: "Cushioned sole, ribbed cuff, and lightweight knit structure designed for all-day comfort with sneakers, loafers, or lounge sets.",
    howToUse: "Machine wash warm with similar colors. Tumble dry low. Do not iron or bleach.",
    ingredients: "Cotton blend with stretch yarn for fit retention.",
    delivery: "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."
  }
]

export const shopProducts = catalogProducts.map(({ id, name, description, price, originalPrice, image, badge, category }) => ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badge,
  category,
}))

export const shopCategories: ShopCategory[] = ["all", "clothing", "accessories", "lifestyle"]

export function getProductById(id: string) {
  return catalogProducts.find((product) => product.id === id)
}

export function getProductSeoImagePath(id: string) {
  return `/product/${id}/opengraph-image`
}
