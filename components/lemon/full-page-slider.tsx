"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const slides = [
  {
    title: "Luxury Recreation",
    subtitle: "AI-Perfected Visuals",
    description: "Experience your favorite finds recreated with high-end editorial fidelity. Our AI engine transforms raw discovery into luxury campaign assets.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop",
    color: "bg-cyan-500",
    link: "/neon-data",
    cta: "View Perfected"
  },
  {
    title: "Girls Time",
    subtitle: "Aesthetic Discovery",
    description: "The ultimate guide to the city's most vibrant brunch spots, dinner lofts, and rooftop sips. Planned by girls, for girls.",
    image: "https://images.unsplash.com/photo-1543007630-9710e40fa13a?q=80&w=2000&auto=format&fit=crop",
    color: "bg-fuchsia-500",
    link: "/girls-time",
    cta: "Explore Spots"
  },
  {
    title: "Wild Ink",
    subtitle: "Statement Body Art",
    description: "Large-scale sleeves, murals, and neo-tribal fragments. Our boldest tattoo collection yet, designed for those who play with fire.",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=2000&auto=format&fit=crop",
    color: "bg-slate-900",
    link: "/shop/tattoos",
    cta: "Shop Wild"
  }
]

export function FullPageSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative aspect-[3/4] sm:aspect-auto sm:h-[600px] w-full py-6 px-4 flex items-center justify-center overflow-hidden bg-slate-50">
      <motion.div 
        style={{ scale, opacity }}
        className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative bg-white"
      >
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-0 h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-0 h-full relative">
                <div className="absolute inset-0">
                  <Image 
                    src={slide.image} 
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 pb-12 flex flex-col items-start gap-4 text-white">
                  <Badge className={cn("border-none px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em]", slide.color)}>
                    {slide.subtitle}
                  </Badge>
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tight leading-none uppercase italic">{slide.title}</h2>
                    <p className="text-xs text-white/60 font-medium leading-relaxed max-w-[280px]">
                      {slide.description}
                    </p>
                  </div>
                  <Button asChild className="mt-4 rounded-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest px-8 h-12 hover:bg-slate-100">
                    <Link href={slide.link}>
                      {slide.cta}
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Link>
                  </Button>
                </div>

                <div className="absolute top-8 left-8 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Floating Scroll Indicator */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-8 rounded-full bg-white/20 overflow-hidden">
               <motion.div 
                 className="w-full h-full bg-white"
                 initial={{ y: "100%" }}
                 animate={{ y: "-100%" }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 1 }}
               />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
