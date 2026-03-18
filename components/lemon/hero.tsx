"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProductVisual } from "@/components/catalog/product-visual"
import { shopProducts, shopCategoryLabels } from "@/lib/catalog"

const heroProductIds = ["nightfall-corset-top", "orbit-tracking-tripod", "poison-cherry-flame-sheet"]
const featuredHeroProducts = heroProductIds.flatMap((id) => {
  const product = shopProducts.find((item) => item.id === id)
  return product ? [product] : []
})

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-[80vh] flex items-center overflow-hidden bg-background pb-20 pt-10">
      {/* Visual Elements - Floating Lemons/Blobs */}
      <div className="absolute top-[5%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-[5%] left-[-10%] w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-4xl w-full mx-auto">
          <div className="w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white mb-6 animate-blur-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
               <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Fresh. Vibrant. Affordable.</span>
            </div>
            
            <h2 className="font-serif text-6xl leading-[0.85] mb-6 text-balance text-slate-900 tracking-tighter">
              <span className="block animate-blur-in opacity-0 font-black" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Style that</span>
              <span className="block animate-blur-in opacity-0 font-black text-primary italic drop-shadow-sm" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Squeezes.</span>
            </h2>
            
            <p className="text-base leading-relaxed mb-10 text-slate-500 font-medium animate-blur-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              High-quality products that make every day feel like a fresh start.
            </p>
            
            <div className="flex flex-col gap-4 animate-blur-in opacity-0 md:flex-row md:justify-center" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <Link
                href="/shop"
                className="group inline-flex w-full justify-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-black tracking-tight transition-all hover:bg-primary hover:text-primary-foreground shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] active:scale-95 sm:w-auto"
              >
                Explore Shop
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/deep-store"
                className="group inline-flex w-full justify-center gap-4 bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-full text-lg font-black tracking-tight transition-all active:scale-95 sm:w-auto"
              >
                The Deep Store
              </Link>
            </div>

            <div className="mt-10 animate-blur-in opacity-0" style={{ animationDelay: '1.05s', animationFillMode: 'forwards' }}>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Featured drops</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {featuredHeroProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group block">
                    <div className="relative aspect-[0.82] overflow-hidden rounded-[1.5rem] bg-white/70 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.22)] ring-1 ring-white/60 transition-transform duration-300 group-hover:-translate-y-1">
                      <ProductVisual
                        name={product.name}
                        image={product.image}
                        category={product.category}
                        badge={product.badge}
                        variant="hero"
                        sizes="(max-width: 768px) 30vw, 140px"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent p-3 text-white">
                        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/70">{shopCategoryLabels[product.category]}</p>
                        <p className="mt-1 line-clamp-2 text-xs font-black leading-tight">{product.name}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-300">
        <span className="text-[10px] tracking-[0.3em] uppercase font-black">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-200 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll_2s_infinite]" />
        </div>
      </div>
    </section>
  )
}
