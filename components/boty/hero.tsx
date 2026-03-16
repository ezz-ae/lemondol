"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-20">
      {/* Visual Elements - Floating Lemons/Blobs */}
      <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="w-full lg:max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white mb-8 animate-blur-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
               <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Fresh. Vibrant. Affordable.</span>
            </div>
            
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 text-balance text-slate-900 tracking-tighter">
              <span className="block animate-blur-in opacity-0 font-black" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>Style that</span>
              <span className="block animate-blur-in opacity-0 font-black text-primary italic drop-shadow-sm" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Squeezes.</span>
            </h2>
            
            <p className="text-lg md:text-2xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 text-slate-500 font-medium animate-blur-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              Lemondol brings you a curated selection of high-quality products that make every day feel like a fresh start.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-blur-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-full text-lg font-black tracking-tight transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] active:scale-95"
              >
                Explore Shop
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/deep-store"
                className="group inline-flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-slate-900 px-12 py-6 rounded-full text-lg font-black tracking-tight transition-all hover:border-purple-200 hover:bg-purple-50/30 active:scale-95"
              >
                The Deep Store
              </Link>
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
