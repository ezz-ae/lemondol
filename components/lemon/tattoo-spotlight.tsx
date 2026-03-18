import Link from "next/link"
import { ArrowRight, Camera, Droplets, Shirt, Sparkles } from "lucide-react"

import { ProductVisual } from "@/components/catalog/product-visual"
import { catalogProducts, shopCategoryLabels } from "@/lib/catalog"

const allTattooProducts = catalogProducts.filter((product) => product.category === "tattoos")
const spotlightTattooIds = ["chrome-siren-star-sheet", "poison-cherry-flame-sheet", "venom-heart-body-ink-sheet", "electric-halo-spine-sheet"]
const tattooProducts = spotlightTattooIds.flatMap((id) => {
  const product = allTattooProducts.find((item) => item.id === id)
  return product ? [product] : []
})
const vaultTattooProducts = allTattooProducts.filter((product) => !spotlightTattooIds.includes(product.id)).slice(0, 6)

const stylingProductIds = ["cherry-check-pleated-skirt", "nightfall-corset-top", "halo-smart-tripod-stand"]
const stylingProducts = catalogProducts.filter((product) => stylingProductIds.includes(product.id))

const collectionStories = [
  {
    title: "Chrome flash",
    description: "Metallic stars and jewelry-inspired accents that light up under flash and nightlife lighting.",
  },
  {
    title: "Cherry heat",
    description: "Playful cherry-and-flame artwork that makes the collection feel hotter and more glam.",
  },
  {
    title: "Electric placements",
    description: "Halo and bolt shapes built for spine, sternum, and leg placements with more direction.",
  },
]

const ritualPills = [
  { icon: Sparkles, label: "Generated editorial art" },
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
            Wild Ink Collection
          </span>

          <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Generated one-time tattoos with a bolder mood</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Build louder festival looks, photo-shoot outfits, and after-dark styling with glossy tattoo art that layers easily with the skirts,
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {tattooProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 transition-colors hover:bg-white/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  <ProductVisual
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    badge={product.badge}
                    sizes="(max-width: 768px) 33vw, 220px"
                    imageClassName="transition-transform duration-500 group-hover:scale-105"
                  />
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

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/45">More ink in the vault</p>
              <span className="text-xs text-white/55">{vaultTattooProducts.length} extra drops</span>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {vaultTattooProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group min-w-[170px] rounded-[1.5rem] border border-white/10 bg-black/15 p-3 transition-colors hover:bg-black/25"
                >
                  <div className="relative h-28 overflow-hidden rounded-[1.15rem] bg-white/5">
                    <ProductVisual
                      name={product.name}
                      image={product.image}
                      category={product.category}
                      badge={product.badge}
                      variant="thumb"
                      sizes="170px"
                    />
                  </div>
                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/40">{shopCategoryLabels[product.category]}</p>
                  <h3 className="mt-2 line-clamp-2 font-serif text-lg leading-tight text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-white/60">${product.price}</p>
                </Link>
              ))}
            </div>
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

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {collectionStories.map((story) => (
              <div key={story.title} className="rounded-[1.75rem] border border-white/10 bg-black/15 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Mood board</p>
                <h4 className="mt-2 font-serif text-xl text-white">{story.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/65">{story.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {stylingProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-black/15 p-4 transition-colors hover:bg-black/25"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-[1.35rem] bg-white/5">
                  <ProductVisual
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    badge={product.badge}
                    variant="thumb"
                    sizes="80px"
                  />
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
              href="/shop/tattoos"
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
