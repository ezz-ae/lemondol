"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-24 bg-primary rounded-[3rem] mx-4 mb-20 overflow-hidden relative group">
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-primary-foreground mb-6 text-balance font-black tracking-tighter">
            Join the <span className="italic opacity-80">Lemon</span> Squad
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 font-medium">
            Get fresh drops, exclusive discounts, and a zest of style in your inbox.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-primary-foreground text-primary rounded-full px-10 py-5 shadow-2xl animate-in zoom-in-95 duration-500">
              <Check className="w-6 h-6" />
              <span className="font-black uppercase tracking-widest text-sm">Welcome to the squad! 🍋</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@lemonsquad.com"
                className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/30 lemon-transition text-lg"
                required
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest lemon-transition hover:bg-white hover:text-slate-900 shadow-xl active:scale-95"
              >
                Join Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-primary-foreground/40 mt-8 font-bold uppercase tracking-widest">
            Unsubscribe anytime • Secure & Private
          </p>
        </div>
      </div>
    </section>
  )
}
