import Link from "next/link"
import { ArrowRight, Camera, Droplets, Sparkles, Shirt } from "lucide-react"

import { ProductVisual } from "@/components/catalog/product-visual"
import { Footer } from "@/components/lemon/footer"
import { Header } from "@/components/lemon/header"
import { StructuredData } from "@/components/seo/structured-data"
import { catalogProducts } from "@/lib/catalog"
import { absoluteUrl, createMetadata, getBreadcrumbSchema, getWebPageSchema } from "@/lib/seo"

const tattooProducts = catalogProducts.filter((product) => product.category === "tattoos")
const featuredTattooIds = [
  "serpent-coil-sleeve",
  "ethereal-dragon-back",
  "midnight-panther-chest",
  "chrome-siren-star-sheet",
  "cyber-tribal-torso",
]
const featuredTattooProducts = featuredTattooIds.flatMap((id) => {
  const product = tattooProducts.find((item) => item.id === id)
  return product ? [product] : []
})
const vaultTattooProducts = tattooProducts.filter((product) => !featuredTattooIds.includes(product.id))
const stylePairIds = ["cherry-check-pleated-skirt", "nightfall-corset-top", "after-dark-corset-bustier"]
const stylePairs = stylePairIds.flatMap((id) => {
  const product = catalogProducts.find((item) => item.id === id)
  return product ? [product] : []
})

const ritualPills = [
  { icon: Sparkles, label: "Wild Scale Art" },
  { icon: Droplets, label: "60-Second Application" },
  { icon: Shirt, label: "Full-Body Coverage" },
]

const moodBlocks = [
  {
    title: "Serpent Wrap",
    description: "Giant continuous coils that follow the natural motion of arms and legs.",
  },
  {
    title: "Mural Backs",
    description: "Ethereal dragon and floral work designed to cover large-scale skin areas.",
  },
  {
    title: "Cyber Tribal",
    description: "Sharp, neo-tribal fragments for high-contrast asymmetrical torso placement.",
  },
]

export const metadata = createMetadata({
  title: "Wild Ink Collection | Lemondol Tattoos",
  description:
    "Shop Lemondol's dedicated tattoo collection with chrome stars, cherry-fire motifs, thorned hearts, and removable one-time body art built for after-dark styling.",
  path: "/shop/tattoos",
  keywords: ["temporary tattoos", "one-time tattoos", "body art", "fashion tattoos", "festival tattoos"],
})

function getTattooCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wild Ink Collection",
    description:
      "A dedicated Lemondol tattoo collection featuring removable one-time body art with chrome, cherry, floral, and scripted motifs.",
    url: absoluteUrl("/shop/tattoos"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tattooProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/product/${product.id}`),
        name: product.name,
      })),
    },
  }
}

export default function TattooCollectionPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            title: "Wild Ink Collection",
            description:
              "Shop Lemondol's dedicated tattoo collection with chrome stars, cherry-fire motifs, thorned hearts, and removable one-time body art built for after-dark styling.",
            path: "/shop/tattoos",
          }),
          getTattooCollectionSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "Wild Ink Collection", path: "/shop/tattoos" },
          ]),
        ]}
      />

      <main className="min-h-screen bg-background">
        <Header />

        <section className="relative overflow-hidden bg-slate-950 pb-16 pt-28 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.16),transparent_34%)]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.35em] text-white/80">
                  <Sparkles className="h-4 w-4" />
                  Wild Ink Collection
                </span>
                <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] md:text-6xl">
                  One-time tattoos with a louder, glossier mood.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                  This is the full tattoo landing page: chrome stars, thorned hearts, cherry-fire motifs, spine placements, and removable body art built to style with skirts, corsets, and creator gear.
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
                    <Droplets className="h-4 w-4" />
                    {tattooProducts.length} tattoo drops live
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/shop?category=tattoos"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                  >
                    Open tattoo grid
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Browse all products
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {featuredTattooProducts.map((product) => (
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
                        variant="hero"
                        sizes="(max-width: 1024px) 50vw, 260px"
                        imageClassName="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">One-Time Tattoos</p>
                      <h2 className="mt-2 font-serif text-2xl leading-tight text-white">{product.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-white/65">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between text-white">
                        <span className="text-base font-semibold">${product.price}</span>
                        <span className="inline-flex items-center gap-1 text-sm text-white/75">
                          View product
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-primary">Collection moods</p>
                <h2 className="mt-4 font-serif text-4xl text-foreground">Built as a full body-art wardrobe</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {moodBlocks.map((block) => (
                    <div key={block.title} className="rounded-[1.9rem] border border-border/60 bg-card p-5 lemon-shadow">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">Mood</p>
                      <h3 className="mt-3 font-serif text-2xl text-foreground">{block.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{block.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.4rem] border border-border/60 bg-card p-8 lemon-shadow">
                <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.35em] text-primary">
                  <Camera className="h-4 w-4" />
                  Pair the ink
                </p>
                <h2 className="mt-5 font-serif text-3xl text-foreground">Match tattoos with the rest of the look</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  The collection works best when it has clothes and gear around it. These pairings turn the tattoo drop into a full styling system instead of isolated sticker sheets.
                </p>

                <div className="mt-8 space-y-4">
                  {stylePairs.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-4 rounded-[1.8rem] border border-border/60 bg-background p-4 transition-colors hover:bg-card"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-[1.2rem] bg-muted">
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
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Pairing piece</p>
                        <h3 className="mt-1 truncate font-serif text-xl text-foreground">{product.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">${product.price}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-primary">Full tattoo drop</p>
                <h2 className="mt-3 font-serif text-4xl text-foreground">Every tattoo in the collection</h2>
              </div>
              <Link href="/shop?category=tattoos" className="text-sm font-semibold text-foreground underline-offset-4 hover:underline">
                View filtered shop
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tattooProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group rounded-[2rem] border border-border/60 bg-card lemon-shadow transition-transform hover:scale-[1.01]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2rem] bg-muted">
                    <ProductVisual
                      name={product.name}
                      image={product.image}
                      category={product.category}
                      badge={product.badge}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      imageClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">One-Time Tattoos</p>
                    <h3 className="mt-2 font-serif text-xl text-foreground">{product.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-semibold text-foreground">${product.price}</span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-border/60 bg-card p-6 lemon-shadow">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">Vault</p>
                  <h3 className="mt-2 font-serif text-2xl text-foreground">More ink waiting in the collection</h3>
                </div>
                <span className="text-sm text-muted-foreground">{vaultTattooProducts.length} extra drops</span>
              </div>
              <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
                {vaultTattooProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group min-w-[190px] rounded-[1.6rem] border border-border/60 bg-background p-3 transition-colors hover:bg-card"
                  >
                    <div className="relative h-32 overflow-hidden rounded-[1.2rem] bg-muted">
                      <ProductVisual
                        name={product.name}
                        image={product.image}
                        category={product.category}
                        badge={product.badge}
                        variant="thumb"
                        sizes="190px"
                      />
                    </div>
                    <h4 className="mt-3 font-serif text-lg leading-tight text-foreground">{product.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">${product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
