"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/lemon/header"
import { Footer } from "@/components/lemon/footer"

type Category = "all" | "clothing" | "accessories" | "lifestyle"

const products = [
  {
    id: "lemon-dress",
    name: "Sunshine Lemon Dress",
    description: "Vibrant yellow cotton dress with lemon print",
    price: 45,
    originalPrice: 55,
    image: "/images/products/dress.png",
    badge: "Bestseller",
    category: "clothing" as const
  },
  {
    id: "citrus-tote",
    name: "Citrus Canvas Tote",
    description: "Durable tote bag for your daily squeeze",
    price: 22,
    originalPrice: null,
    image: "/images/products/tote.png",
    badge: "New",
    category: "accessories" as const
  },
  {
    id: "zest-candle",
    name: "Lemon Zest Candle",
    description: "Fresh scented soy candle for a bright mood",
    price: 18,
    originalPrice: null,
    image: "/images/products/candle.png",
    badge: null,
    category: "lifestyle" as const
  },
  {
    id: "spring-hat",
    name: "Spring Meadow Hat",
    description: "Protective sun hat with floral details",
    price: 28,
    originalPrice: 35,
    image: "/images/products/hat.png",
    badge: "Sale",
    category: "accessories" as const
  },
  {
    id: "lemon-tee",
    name: "Lemon Squeeze Tee",
    description: "100% organic cotton tee with cute graphic",
    price: 25,
    originalPrice: null,
    image: "/images/products/tee.png",
    badge: null,
    category: "clothing" as const
  },
  {
    id: "lemon-socks",
    name: "Sour & Sweet Socks",
    description: "Comfortable socks with tiny lemon patterns",
    price: 12,
    originalPrice: null,
    image: "/images/products/socks.png",
    badge: "New",
    category: "clothing" as const
  }
]

const categories: Category[] = ["all", "clothing", "accessories", "lifestyle"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  // Reset animation when category changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Shop All Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Discover our full range of fresh fashion, accessories, and lifestyle picks
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm capitalize lemon-transition bg-popover ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground lemon-shadow"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left capitalize lemon-transition ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground lemon-shadow"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div 
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({ 
  product, 
  index, 
  isVisible 
}: { 
  product: typeof products[0]
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden lemon-shadow lemon-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {/* Skeleton */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover lemon-transition group-hover:scale-105 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                product.badge === "Sale"
                  ? "bg-destructive/10 text-destructive"
                  : product.badge === "New"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* Quick add button */}
          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 lemon-transition lemon-shadow"
            onClick={(e) => {
              e.preventDefault()
            }}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
