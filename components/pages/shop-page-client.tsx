"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Camera, Droplets, ShoppingBag, Shirt, SlidersHorizontal, Sparkles, X } from "lucide-react"

import { Footer } from "@/components/lemon/footer"
import { Header } from "@/components/lemon/header"
import { ProductVisual } from "@/components/catalog/product-visual"
import { isShopCategory, shopCategories, shopCategoryLabels, shopProducts, type ShopCategory } from "@/lib/catalog"

type ShopSort = "featured" | "price-low" | "price-high" | "name-az"

const shopSortOptions: { value: ShopSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-az", label: "Name: A to Z" },
]

function isShopSort(value: string | null | undefined): value is ShopSort {
  return Boolean(value && shopSortOptions.some((option) => option.value === value))
}

const collectionCopy: Record<ShopCategory, { eyebrow: string; title: string; description: string; ctaHref: string; ctaLabel: string }> = {
  all: {
    eyebrow: "Curated Drops",
    title: "Fresh looks, creator gear, and one-time ink",
    description: "Browse the full mix of skirts, corsets, creator tools, and one-time tattoos built to work as complete looks instead of isolated products.",
    ctaHref: "/shop/tattoos",
    ctaLabel: "See tattoo collection",
  },
  clothing: {
    eyebrow: "Style Layers",
    title: "Skirts, lace, and corset-led looks",
    description: "The clothing edit now leans harder into pleated minis, lace layers, and after-dark tops that match the tattoo drop.",
    ctaHref: "/shop/tattoos",
    ctaLabel: "Pair with tattoos",
  },
  accessories: {
    eyebrow: "Creator Tools",
    title: "Accessories that finish the content-ready look",
    description: "From everyday carry pieces to smart tripods, the accessories lineup helps turn styling ideas into full creator setups.",
    ctaHref: "/shop/tattoos",
    ctaLabel: "See the ink edit",
  },
  lifestyle: {
    eyebrow: "Giftable Layer",
    title: "Small lifestyle pieces with styling energy",
    description: "Lifestyle picks stay compact here, but they still round out the bigger clothing and tattoo story across the catalog.",
    ctaHref: "/shop",
    ctaLabel: "Browse full catalog",
  },
  tattoos: {
    eyebrow: "Wild Ink Collection",
    title: "Generated body-art drops with after-dark energy",
    description: "A sharper one-time tattoo collection with chrome stars, thorned hearts, chain motifs, and long-stem florals designed for instant outfit drama.",
    ctaHref: "/shop",
    ctaLabel: "Back to all products",
  },
}

const tattooHeroProductIds = ["chrome-siren-star-sheet", "poison-cherry-flame-sheet", "electric-halo-spine-sheet"]

const tattooThemeNotes = [
  {
    title: "Chrome Siren",
    description: "Mirror-bright stars and metallic energy for flash-heavy night looks.",
  },
  {
    title: "Poison Cherry",
    description: "Cherry-fire motifs that push the collection into glossier, hotter night-out territory.",
  },
  {
    title: "Electric Halo",
    description: "Long halo-and-bolt placements that give the body art a luminous, directional feel.",
  },
]

export default function ShopPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const resolvedCategory = isShopCategory(categoryParam) ? categoryParam : "all"
  const queryParam = searchParams.get("q") ?? ""
  const sortParam = searchParams.get("sort")
  const resolvedSort = isShopSort(sortParam) ? sortParam : "featured"

  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>(resolvedCategory)
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [sortBy, setSortBy] = useState<ShopSort>(resolvedSort)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedCategory(resolvedCategory)
  }, [resolvedCategory])

  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])

  useEffect(() => {
    setSortBy(resolvedSort)
  }, [resolvedSort])

  const updateRoute = ({
    category = selectedCategory,
    query = searchQuery,
    sort = sortBy,
  }: {
    category?: ShopCategory
    query?: string
    sort?: ShopSort
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (category === "all") {
      nextParams.delete("category")
    } else {
      nextParams.set("category", category)
    }

    const trimmedQuery = query.trim()
    if (trimmedQuery) {
      nextParams.set("q", trimmedQuery)
    } else {
      nextParams.delete("q")
    }

    if (sort === "featured") {
      nextParams.delete("sort")
    } else {
      nextParams.set("sort", sort)
    }

    const nextQuery = nextParams.toString()
    router.replace(nextQuery ? `/shop?${nextQuery}` : "/shop", { scroll: false })
  }

  const handleCategoryChange = (category: ShopCategory) => {
    if (category === selectedCategory) {
      return
    }

    setSelectedCategory(category)
    setIsVisible(false)

    updateRoute({ category })
    window.setTimeout(() => setIsVisible(true), 50)
  }

  const categoryProducts = useMemo(
    () =>
      selectedCategory === "all"
        ? shopProducts
        : shopProducts.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  )

  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredProducts = useMemo(() => {
    const searchMatchedProducts = normalizedSearchQuery
      ? categoryProducts.filter((product) => {
          const searchableText = [product.name, product.description, product.category, shopCategoryLabels[product.category]].join(" ").toLowerCase()
          return searchableText.includes(normalizedSearchQuery)
        })
      : categoryProducts

    const sortedProducts = [...searchMatchedProducts]

    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((left, right) => left.price - right.price)
        break
      case "price-high":
        sortedProducts.sort((left, right) => right.price - left.price)
        break
      case "name-az":
        sortedProducts.sort((left, right) => left.name.localeCompare(right.name))
        break
      default: {
        const badgeRank: Record<string, number> = {
          Bestseller: 0,
          New: 1,
          Sale: 2,
        }

        sortedProducts.sort((left, right) => {
          const leftRank = left.badge ? badgeRank[left.badge] ?? 3 : 3
          const rightRank = right.badge ? badgeRank[right.badge] ?? 3 : 3
          return leftRank - rightRank
        })
      }
    }

    return sortedProducts
  }, [categoryProducts, normalizedSearchQuery, sortBy])

  const heroProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return ["nightfall-corset-top", "orbit-tracking-tripod", "poison-cherry-flame-sheet"].flatMap((id) => {
        const product = shopProducts.find((item) => item.id === id)
        return product ? [product] : []
      })
    }

    if (selectedCategory === "tattoos") {
      return tattooHeroProductIds.flatMap((id) => {
        const product = filteredProducts.find((item) => item.id === id)
        return product ? [product] : []
      })
    }

    return filteredProducts.slice(0, 3)
  }, [filteredProducts, selectedCategory])

  const heroPills = useMemo(() => {
    switch (selectedCategory) {
      case "clothing":
        return [`${filteredProducts.length} style picks`, "Pleated minis", "Lace + corset layers"]
      case "accessories":
        return [`${filteredProducts.length} add-ons`, "Creator-ready gear", "Fast outfit finishing"]
      case "lifestyle":
        return [`${filteredProducts.length} cozy picks`, "Giftable details", "Desk + room glow"]
      case "tattoos":
        return [`${categoryProducts.length} wild tattoo drops`, "Generated editorial art", "Removes with cleansing oil"]
      default:
        return [`${shopProducts.length} curated products`, "4 product categories", "Skirts, gear, and ink"]
    }
  }, [categoryProducts.length, selectedCategory])

  const collectionHero = collectionCopy[selectedCategory]
  const HeroIcon =
    selectedCategory === "tattoos" ? Droplets : selectedCategory === "accessories" ? Camera : selectedCategory === "clothing" ? Shirt : Sparkles
  const isTattooCollection = selectedCategory === "tattoos"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">{collectionHero.eyebrow}</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              {selectedCategory === "all" ? "Shop All Products" : `Shop ${shopCategoryLabels[selectedCategory]}`}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {collectionHero.description}
            </p>
          </div>

          <div
            className={`mb-10 overflow-hidden rounded-[2.5rem] border ${
              isTattooCollection
                ? "border-white/10 bg-slate-950 text-white shadow-[0_35px_80px_-24px_rgba(15,23,42,0.8)]"
                : "border-border/50 bg-card text-foreground lemon-shadow"
            }`}
          >
            <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] ${
                    isTattooCollection ? "border border-white/10 bg-white/10 text-white/80" : "bg-primary/10 text-primary"
                  }`}
                >
                  <HeroIcon className="h-4 w-4" />
                  {collectionHero.eyebrow}
                </span>

                <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">{collectionHero.title}</h2>
                <p className={`mt-4 max-w-2xl text-sm leading-7 md:text-base ${isTattooCollection ? "text-white/70" : "text-muted-foreground"}`}>
                  {selectedCategory === "tattoos"
                    ? "Use the tattoo drop to add glossy editorial energy to festival fits, creator shoots, and after-dark outfits, then layer it with skirts, corsets, and chrome-ready accessories."
                    : "Use this collection to build complete looks faster, then mix in the tattoo category whenever you want quick visual edge without a long-term commitment."}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {heroPills.map((pill) => (
                    <span
                      key={pill}
                      className={`rounded-full px-4 py-2 text-sm ${
                        isTattooCollection ? "border border-white/10 bg-white/8 text-white/80" : "bg-background text-foreground/70 lemon-shadow"
                      }`}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {isTattooCollection ? (
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {tattooThemeNotes.map((note) => (
                      <div key={note.title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Tattoo theme</p>
                        <h3 className="mt-2 font-serif text-xl text-white">{note.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/68">{note.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={collectionHero.ctaHref}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                      isTattooCollection ? "bg-white text-slate-950" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {collectionHero.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {selectedCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => handleCategoryChange("all")}
                      className={`rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                        isTattooCollection ? "border border-white/15 text-white hover:bg-white/10" : "border border-foreground/10 text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      Back to all categories
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
                {heroProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className={`overflow-hidden rounded-[2rem] transition-colors ${
                      isTattooCollection ? "border border-white/10 bg-white/6 hover:bg-white/10" : "bg-background lemon-shadow hover:bg-card"
                    }`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      <ProductVisual
                        name={product.name}
                        image={product.image}
                        category={product.category}
                        badge={product.badge}
                        variant="hero"
                        sizes="(max-width: 1024px) 33vw, 220px"
                      />
                    </div>
                    <div className="p-4">
                      <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] ${isTattooCollection ? "text-white/45" : "text-muted-foreground"}`}>
                        {shopCategoryLabels[product.category]}
                      </p>
                      <h3 className="font-serif text-lg leading-tight">{product.name}</h3>
                      <p className={`mt-1 text-sm ${isTattooCollection ? "text-white/70" : "text-muted-foreground"}`}>${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {shopCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm lemon-transition bg-popover ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground lemon-shadow"
                  }`}
                >
                  {shopCategoryLabels[category]}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  const nextValue = event.target.value
                  setSearchQuery(nextValue)
                  setIsVisible(false)
                  updateRoute({ query: nextValue })
                  window.setTimeout(() => setIsVisible(true), 50)
                }}
                placeholder="Search products, tattoos, skirts, tripods..."
                className="h-14 w-full rounded-full border border-border/60 bg-background px-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>

            <label className="relative block">
              <span className="sr-only">Sort products</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  const nextSort = event.target.value as ShopSort
                  setSortBy(nextSort)
                  setIsVisible(false)
                  updateRoute({ sort: nextSort })
                  window.setTimeout(() => setIsVisible(true), 50)
                }}
                className="h-14 w-full appearance-none rounded-full border border-border/60 bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              >
                {shopSortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex flex-wrap gap-3">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setIsVisible(false)
                    updateRoute({ query: "" })
                    window.setTimeout(() => setIsVisible(true), 50)
                  }}
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/10 px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  Clear search
                </button>
              )}

              {(selectedCategory !== "all" || sortBy !== "featured") && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSortBy("featured")
                    setSearchQuery("")
                    setIsVisible(false)
                    updateRoute({ category: "all", query: "", sort: "featured" })
                    window.setTimeout(() => setIsVisible(true), 50)
                  }}
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/10 px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

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
                  {shopCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        handleCategoryChange(category)
                        setShowFilters(false)
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left lemon-transition ${
                        selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-card text-foreground lemon-shadow"
                      }`}
                    >
                      {shopCategoryLabels[category]}
                    </button>
                  ))}

                  <div className="pt-4">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Sort</label>
                    <select
                      value={sortBy}
                      onChange={(event) => {
                        const nextSort = event.target.value as ShopSort
                        setSortBy(nextSort)
                        updateRoute({ sort: nextSort })
                      }}
                      className="h-14 w-full rounded-2xl border border-border/60 bg-card px-5 text-sm text-foreground outline-none focus:border-primary"
                    >
                      {shopSortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} isVisible={isVisible} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-border/50 bg-card px-8 py-14 text-center lemon-shadow">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">No matches</p>
              <h3 className="mt-3 font-serif text-3xl text-foreground">No products match that search yet</h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                Try a broader term like "tattoo", "skirt", or "tripod", or reset the current filters to jump back into the full collection.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSortBy("featured")
                    updateRoute({ category: "all", query: "", sort: "featured" })
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Reset shop view
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    updateRoute({ query: "" })
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
                >
                  Clear only search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({
  product,
  index,
  isVisible,
}: {
  product: (typeof shopProducts)[number]
  index: number
  isVisible: boolean
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className={`group transition-all duration-700 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card rounded-3xl overflow-hidden lemon-shadow lemon-transition group-hover:scale-[1.02]">
        <div className="relative aspect-square bg-muted overflow-hidden">
          <ProductVisual
            name={product.name}
            image={product.image}
            category={product.category}
            badge={product.badge}
            sizes="(max-width: 768px) 100vw, 33vw"
            imageClassName="lemon-transition group-hover:scale-105"
          />

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

          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 lemon-transition lemon-shadow"
            onClick={(event) => {
              event.preventDefault()
            }}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">${product.price}</span>
            {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
