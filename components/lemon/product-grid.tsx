"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Heart, Ruler, ShoppingBag, Sparkles, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductVisual } from "@/components/catalog/product-visual"
import { productCategories, shopCategoryLabels, shopProducts, type ProductCategory } from "@/lib/catalog"
import { useCart } from "./cart-context"

const categories = productCategories.map((category) => ({
  id: category,
  label: shopCategoryLabels[category],
}))

const suggestionDismissKey = "lemondol-home-suggestion-dismissed"

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("clothing")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [hasDismissedPopup, setHasDismissedPopup] = useState(false)
  const [popupProduct, setPopupProduct] = useState<(typeof shopProducts)[number] | null>(null)

  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem, likedIds, toggleLike } = useCart()

  const filteredProducts = shopProducts.filter((product) => product.category === selectedCategory).slice(0, 4)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasDismissedPopup(window.sessionStorage.getItem(suggestionDismissKey) === "true")
  }, [])

  useEffect(() => {
    if (!isVisible || hasShownPopup || hasDismissedPopup) {
      return
    }

    const timer = window.setTimeout(() => {
      const suggestionPool = filteredProducts.length > 0 ? filteredProducts : shopProducts
      const suggestion = suggestionPool[Math.floor(Math.random() * suggestionPool.length)]
      setPopupProduct(suggestion)
      setShowPopup(true)
      setHasShownPopup(true)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [filteredProducts, hasDismissedPopup, hasShownPopup, isVisible])

  useEffect(() => {
    if (!showPopup) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowPopup(false)
    }, 7500)

    return () => window.clearTimeout(timer)
  }, [showPopup])

  const dismissPopup = (persist = true) => {
    setShowPopup(false)

    if (!persist || typeof window === "undefined") {
      return
    }

    window.sessionStorage.setItem(suggestionDismissKey, "true")
    setHasDismissedPopup(true)
  }

  const handleCategoryChange = (category: ProductCategory) => {
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

  useEffect(() => {
    shopProducts.forEach((product) => {
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
      { threshold: 0.1 },
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const currentGridRef = gridRef.current
    const currentHeaderRef = headerRef.current

    if (currentGridRef) {
      gridObserver.observe(currentGridRef)
    }

    if (currentHeaderRef) {
      headerObserver.observe(currentHeaderRef)
    }

    return () => {
      if (currentGridRef) {
        gridObserver.unobserve(currentGridRef)
      }
      if (currentHeaderRef) {
        headerObserver.unobserve(currentHeaderRef)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span
            className={`text-sm tracking-[0.3em] uppercase text-secondary mb-4 block font-bold ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={headerVisible ? { animationDelay: "0.2s", animationFillMode: "forwards" } : {}}
          >
            Fresh Finds
          </span>
          <h2
            className={`mb-4 text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={headerVisible ? { animationDelay: "0.4s", animationFillMode: "forwards" } : {}}
          >
            Your Daily Squeeze
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={headerVisible ? { animationDelay: "0.6s", animationFillMode: "forwards" } : {}}
          >
            Curated pieces that make every day feel like a fresh start, now with creator gear and one-time tattoo drops.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="grid w-full max-w-xl grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`rounded-full px-4 py-3 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={`${selectedCategory}-${product.id}`}
              className={`group relative transition-all duration-500 ease-out ${
                isVisible && !isTransitioning ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: isTransitioning ? "0ms" : `${index * 80}ms` }}
            >
              {likedIds.includes(product.id) && (
                <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-primary via-accent to-secondary animate-pulse z-0 blur-sm opacity-50" />
              )}

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

              <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] lemon-transition group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 relative z-10">
                <Link href={`/product/${product.id}`} className="relative aspect-square bg-muted overflow-hidden block">
                  <ProductVisual
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    badge={product.badge}
                    sizes="(max-width: 768px) 90vw, 360px"
                    imageClassName="lemon-transition group-hover:scale-105"
                    draggable={false}
                  />
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

                <div className="absolute bottom-4 right-4 flex flex-col gap-3 opacity-100 lg:opacity-0 translate-y-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button
                    type="button"
                    className={`w-11 h-11 lg:w-10 lg:h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-xl transition-all active:scale-90 ${
                      likedIds.includes(product.id) ? "bg-primary text-primary-foreground scale-110" : "bg-white/90 text-foreground"
                    }`}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      toggleLike(product.id)
                    }}
                  >
                    <Heart className={`w-5 h-5 lg:w-4 lg:h-4 ${likedIds.includes(product.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    type="button"
                    className="w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl transition-all active:scale-90"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                      })
                    }}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-5 h-5 lg:w-4 lg:h-4" />
                  </button>
                  <Link
                    href="/account"
                    onClick={(event: React.MouseEvent) => event.stopPropagation()}
                    className="w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-accent/90 backdrop-blur-md flex items-center justify-center shadow-xl transition-all active:scale-90 text-accent-foreground"
                    aria-label="Sizing Help"
                  >
                    <Ruler className="w-5 h-5 lg:w-4 lg:h-4" />
                  </Link>
                </div>

                <div className="p-6">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{shopCategoryLabels[product.category]}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-slate-900">${product.price}</span>
                      {product.originalPrice && <span className="text-sm text-slate-300 line-through font-bold">${product.originalPrice}</span>}
                    </div>
                    {product.badge === "Sale" && <Badge className="bg-secondary text-secondary-foreground border-none font-black text-[9px]">OFFER</Badge>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showPopup && popupProduct && (
          <div className="fixed inset-x-4 bottom-36 z-[70] animate-in slide-in-from-bottom-6 fade-in duration-500 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:w-80 sm:slide-in-from-left-10">
            <Card className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.22)] sm:rounded-[2.5rem]">
              <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground sm:p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Lemon Suggests</span>
                </div>
                <button type="button" onClick={() => dismissPopup(true)} aria-label="Dismiss suggestion">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[1.25rem] bg-muted sm:h-20 sm:w-20 sm:rounded-2xl">
                    <ProductVisual
                      name={popupProduct.name}
                      image={popupProduct.image}
                      category={popupProduct.category}
                      badge={popupProduct.badge}
                      variant="thumb"
                      sizes="80px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Suggested match</p>
                    <p className="mt-1 text-lg font-black leading-tight text-slate-900 sm:text-base">{popupProduct.name}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Quick add from this {shopCategoryLabels[popupProduct.category].toLowerCase()} edit, without breaking your flow.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl font-black text-slate-900 sm:text-sm">${popupProduct.price}</span>
                      <Badge className="border-none bg-secondary text-[9px] font-black text-secondary-foreground">EXTRA 10% OFF</Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">Shows only after you reach the product section.</p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/product/${popupProduct.id}`}
                      onClick={() => dismissPopup(true)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Button
                      className="h-11 rounded-full bg-slate-900 px-4 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                      onClick={() => {
                        addItem({
                          id: popupProduct.id,
                          name: popupProduct.name,
                          description: popupProduct.description,
                          price: popupProduct.price,
                          image: popupProduct.image,
                        })
                        dismissPopup(true)
                      }}
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href={`/shop?category=${selectedCategory}`}
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide lemon-transition hover:bg-foreground/5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
