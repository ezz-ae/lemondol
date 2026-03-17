import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Droplets, Shirt, Sparkles } from "lucide-react"

import { catalogProducts, shopCategoryLabels } from "@/lib/catalog"

const allTattooProducts = catalogProducts.filter((product) => product.category === "tattoos")
const tattooProducts = allTattooProducts.slice(0, 3)

const stylingProductIds = ["cherry-check-pleated-skirt", "nightfall-corset-top", "halo-smart-tripod-stand"]
const stylingProducts = catalogProducts.filter((product) => stylingProductIds.includes(product.id))

const ritualPills = [
  { icon: Droplets, label: "Water-transfer application" },
  { icon: Sparkles, label: "Easy oil removal" },
  { icon: Shirt, label: "Style with skirts + corsets" },
]

export function TattooSpotlight() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-10">
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/80">
            New Tattoo Category
          </span>

          <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">One-Time Tattoos for quick look changes</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Build festival looks, photoshoot outfits, and after-dark styling with water-transfer tattoos that layer easily with the skirts,
            corsets, and creator gear already in the collection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {ritualPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/80"
              >
                <pill.icon className="h-4 w-4 text-primary" />
                {pill.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/15 px-4 py-2 text-sm text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              {allTattooProducts.length} live tattoo drops
            </span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {tattooProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 transition-colors hover:bg-white/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {product.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">{shopCategoryLabels[product.category]}</p>
                  <h3 className="font-serif text-xl">{product.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base font-semibold">${product.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-white/75">
                      View
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary/20 via-fuchsia-500/10 to-orange-500/20 p-8 lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/80">
            <Camera className="h-4 w-4" />
            Build the full look
          </span>

          <h3 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">Pair the tattoos with skirts, corsets, and creator gear</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            The tattoo drop works best when it lives inside a full outfit system. These matching pieces help turn the category into a complete look.
          </p>

          <div className="mt-8 space-y-4">
            {stylingProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-black/15 p-4 transition-colors hover:bg-black/25"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-[1.35rem] bg-white/5">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">{shopCategoryLabels[product.category]}</p>
                  <h4 className="truncate font-serif text-xl">{product.name}</h4>
                  <p className="mt-1 text-sm text-white/65">${product.price}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-white/70" />
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop?category=tattoos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
            >
              Browse one-time tattoos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See full catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
