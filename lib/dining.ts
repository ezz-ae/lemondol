export interface DiningSpot {
  id: string
  name: string
  category: "brunch" | "dinner" | "cafe" | "drinks"
  tagline: string
  description: string
  aesthetic: string
  bestFor: string[]
  priceRange: "$$" | "$$$" | "$$$$"
  image: string
  location: string
  rating: number
}

export const diningSpots: DiningSpot[] = [
  {
    id: "lemon-garden-bistro",
    name: "The Lemon Garden Bistro",
    category: "brunch",
    tagline: "Sun-drenched brunching",
    description: "A lush, open-air bistro with yellow parasols and the city's best citrus-infused pancakes.",
    aesthetic: "Mediterranean Chic",
    bestFor: ["Sunday Brunch", "Aesthetic Photos", "Long Talks"],
    priceRange: "$$$",
    image: "/images/dining/lemon-garden.jpg",
    location: "Downtown Plaza, Terrace Level",
    rating: 4.9,
  },
  {
    id: "neon-sushi-loft",
    name: "Neon Sushi Loft",
    category: "dinner",
    tagline: "High-energy dining",
    description: "Cyberpunk-inspired sushi lounge with vibrant lighting and experimental rolls.",
    aesthetic: "Cyberpunk / Industrial",
    bestFor: ["Girls' Night Out", "Pre-Party Drinks", "Late Night Bites"],
    priceRange: "$$$$",
    image: "/images/dining/neon-sushi.jpg",
    location: "The North Warehouse District",
    rating: 4.7,
  },
  {
    id: "velvet-espresso-bar",
    name: "Velvet Espresso Bar",
    category: "cafe",
    tagline: "Cozy corners, sharp coffee",
    description: "A dark, moody cafe with velvet seating and a menu dedicated to artisanal roasts and gold-leaf lattes.",
    aesthetic: "Dark Academy / Gothic",
    bestFor: ["Co-working", "Intimate Catch-ups", "Rainy Afternoons"],
    priceRange: "$$",
    image: "/images/dining/velvet-espresso.jpg",
    location: "Arts Quarter, Lane 4",
    rating: 4.8,
  },
  {
    id: "pink-palms-rooftop",
    name: "Pink Palms Rooftop",
    category: "drinks",
    tagline: "Sunset sips and city views",
    description: "A tropical-themed rooftop bar with pink palm trees and a curated list of floral cocktails.",
    aesthetic: "Tropical Retro / Barbie-core",
    bestFor: ["Sunset Cocktails", "Birthdays", "Group Toasts"],
    priceRange: "$$$",
    image: "/images/dining/pink-palms.jpg",
    location: "Sky Tower, Floor 42",
    rating: 4.6,
  },
  {
    id: "truffle-terrace",
    name: "The Truffle Terrace",
    category: "dinner",
    tagline: "Refined dining, elevated mood",
    description: "An elegant terrace restaurant specializing in truffle-led dishes and vintage wines.",
    aesthetic: "Luxury Minimalist",
    bestFor: ["Celebrations", "Fine Dining", "Quiet Luxury"],
    priceRange: "$$$$",
    image: "/images/dining/truffle-terrace.jpg",
    location: "Upper West Heights",
    rating: 4.9,
  },
  {
    id: "matcha-mansion",
    name: "Matcha Mansion",
    category: "cafe",
    tagline: "The greenest getaway",
    description: "A converted heritage house serving every possible matcha variation in a zen-garden setting.",
    aesthetic: "Zen / Organic Modern",
    bestFor: ["Relaxing", "Healthy Bites", "Aesthetic Tea Time"],
    priceRange: "$$",
    image: "/images/dining/matcha-mansion.jpg",
    location: "Old Town, Heritage Square",
    rating: 4.5,
  }
]

export function getDiningSpotById(id: string) {
  return diningSpots.find((spot) => spot.id === id)
}
