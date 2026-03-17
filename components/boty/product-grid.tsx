"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Sparkles, Heart, Ruler, X } from "lucide-react"
import { useCart } from "../lemon/cart-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Category = "clothing" | "accessories" | "lifestyle"

const products = [
  {
    id: "lemon-dress",
    name: "Sunshine Lemon Dress",
    description: "Vibrant yellow cotton dress with lemon print",
    price: 45,
    originalPrice: 55,
    image: "/images/products/dress.png",
    badge: "Bestseller",
    category: "clothing" as Category
  },
  {
    id: "citrus-tote",
    name: "Citrus Canvas Tote",
    description: "Durable tote bag for your daily squeeze",
    price: 22,
    originalPrice: null,
    image: "/images/products/tote.png",
    badge: "New",
    category: "accessories" as Category
  },
  {
    id: "zest-candle",
    name: "Lemon Zest Candle",
    description: "Fresh scented soy candle for a bright mood",
    price: 18,
    originalPrice: null,
    image: "/images/products/candle.png",
    badge: null,
    category: "lifestyle" as Category
  },
  {
    id: "spring-hat",
    name: "Spring Meadow Hat",
    description: "Protective sun hat with floral details",
    price: 28,
    originalPrice: 35,
    image: "/images/products/hat.png",
    badge: "Sale",
    category: "accessories" as Category
  },
  {
    id: "lemon-tee",
    name: "Lemon Squeeze Tee",
    description: "100% organic cotton tee with cute graphic",
    price: 25,
    originalPrice: null,
    image: "/images/products/tee.png",
    badge: null,
    category: "clothing" as Category
  },
  {
    id: "lemon-socks",
    name: "Sour & Sweet Socks",
    description: "Comfortable socks with tiny lemon patterns",
    price: 12,
    originalPrice: null,
    image: "/images/products/socks.png",
    badge: "New",
    category: "clothing" as Category
  }
]

const categories: { id: Category; label: string }[] = [
  { id: "clothing", label: "Clothing" },
  { id: "accessories", label: "Accessories" },
  { id: "lifestyle", label: "Lifestyle" },
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("clothing")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupProduct, setPopupProduct] = useState<any>(null)
  
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem, likedIds, toggleLike } = useCart()

  useEffect(() => {
    // Show smart recommendation popup after 5 seconds
    const timer = setTimeout(() => {
      const randomProduct = products[Math.floor(Math.random() * products.length)]
      setPopupProduct(randomProduct)
      setShowPopup(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  
  const filteredProducts = products.filter(product => product.category === selectedCategory)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm tracking-[0.3em] uppercase text-secondary mb-4 block font-bold ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Fresh Finds
          </span>
          <h2 className={`font-serif leading-tight text-foreground mb-4 text-balance text-6xl font-bold ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Your Daily Squeeze
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Curated pieces that make every day feel like a fresh start.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-background rounded-full p-1 gap-1 relative">
            {/* Animated background slide */}
            <div
              className="absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{
                left: selectedCategory === 'clothing' ? '4px' : selectedCategory === 'accessories' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
                width: 'calc(33.333% - 4px)'
              }}
            />
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={`${selectedCategory}-${product.id}`}
              className={`group relative transition-all duration-500 ease-out ${
                isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              {/* Liked Special Frame */}
              {likedIds.includes(product.id) && (
                <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-primary via-accent to-secondary animate-pulse z-0 blur-sm opacity-50" />
              )}
              
              {/* Stroke Timer for Discounts */}
              {product.originalPrice && (
                <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-10">
                  <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    rx="32"
                    fill="none"
                    stroke="#F8E231"
                    strokeWidth="3"
                    strokeDasharray="1000"
                    className="animate-dash"
                  />
                </svg>
              )}
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] boty-transition group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 relative z-10">
                {/* Image */}
                <Link href={`/product/${product.id}`} className="relative aspect-square bg-muted overflow-hidden block">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover boty-transition group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide bg-white text-black ${
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
                </Link>

                {/* Quick add/like button */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition z-20">
                  <button
                    type="button"
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center boty-shadow boty-transition ${
                      likedIds.includes(product.id) ? 'bg-primary text-primary-foreground' : 'bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleLike(product.id)
                    }}
                  >
                    <Heart className={`w-4 h-4 ${likedIds.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center boty-shadow hover:bg-secondary hover:text-secondary-foreground boty-transition"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image
                      })
                    }}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <Link
                    href="/account"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center boty-shadow hover:scale-110 boty-transition text-accent-foreground"
                    aria-label="Sizing Help"
                  >
                    <Ruler className="w-4 h-4" />
                  </Link>
                </div>

                {/* Info */}
                <div className="p-6">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-slate-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-300 line-through font-bold">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.badge === "Sale" && (
                       <Badge className="bg-secondary text-secondary-foreground border-none font-black text-[9px]">OFFER</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendation Popup */}
        {showPopup && popupProduct && (
          <div className="fixed bottom-8 left-8 z-[60] w-80 animate-in slide-in-from-left-10 fade-in duration-500">
             <Card className="rounded-[2.5rem] border-none shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-white group">
                <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                   <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Lemon Suggests</span>
                   </div>
                   <button onClick={() => setShowPopup(false)}>
                      <X className="w-4 h-4" />
                   </button>
                </div>
                <div className="p-6">
                   <div className="flex gap-4 mb-6">
                      <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden relative flex-shrink-0">
                         <Image src={popupProduct.image} alt={popupProduct.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-bold leading-tight mb-1">Hey there! I feel {popupProduct.name} would match perfectly with the items you’re looking at...</p>
                         <p className="text-[10px] text-muted-foreground italic">“Things find their beauty once they find their soul.”</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-black">${popupProduct.price}</span>
                         <Badge className="bg-secondary text-secondary-foreground text-[8px] font-black">EXTRA 10% OFF</Badge>
                      </div>
                      <Button className="w-full rounded-full bg-slate-900 text-white font-bold h-12 hover:scale-[1.02] transition-all">
                         Add & Apply Discount
                      </Button>
                   </div>
                </div>
             </Card>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
