"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User, Sparkles, ShieldCheck } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsOpen, itemCount, isAdultMode, setIsAdultMode } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 lg:pt-6">
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 backdrop-blur-xl rounded-[2rem] lg:rounded-3xl py-1 lg:py-2 animate-scale-fade-in bg-white/70 border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2.5 text-foreground/60 hover:text-primary transition-all lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              href="/shop"
              className="text-xs uppercase font-black tracking-widest text-foreground/60 hover:text-foreground transition-all hover:scale-105"
            >
              Shop
            </Link>
            <Link
              href="/deep-store"
              className="text-xs uppercase font-black tracking-widest text-foreground/60 hover:text-foreground transition-all hover:scale-105"
            >
              Deep Store
            </Link>
            <Link
              href="/ai-studio"
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs uppercase font-black tracking-widest hover:bg-primary/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Studio
            </Link>
          </div>

          {/* Logo - Centered on Mobile and Desktop */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-xl lg:rounded-2xl flex items-center justify-center text-primary-foreground font-black text-lg lg:text-xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
                L
              </div>
              <h1 className="font-serif text-xl lg:text-2xl font-black tracking-tight text-foreground hidden sm:block">
                Lemondol
              </h1>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 lg:gap-3">
            {/* Adult Mode Switch - Hide on small mobile, accessible via Deep Store or Account */}
            <div className="hidden xl:flex items-center gap-3 mr-4 bg-slate-50/80 px-4 py-2 rounded-2xl border border-slate-100">
               <Label htmlFor="adult-mode" className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <ShieldCheck className={`w-4 h-4 transition-colors duration-500 ${isAdultMode ? 'text-purple-500' : 'text-slate-300'}`} />
                  Adult
               </Label>
               <Switch 
                  id="adult-mode" 
                  checked={isAdultMode} 
                  onCheckedChange={setIsAdultMode}
                  className="scale-90 data-[state=checked]:bg-purple-500"
               />
            </div>

            <button
              type="button"
              className="hidden lg:flex p-2.5 text-foreground/60 hover:text-primary transition-all hover:bg-white rounded-xl"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              className="hidden lg:flex p-2.5 text-foreground/60 hover:text-primary transition-all hover:bg-white rounded-xl relative"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse-ring" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-foreground/60 hover:text-primary transition-all hover:bg-white rounded-xl"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-foreground text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden lemon-transition ${
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground lemon-transition"
            >
              Shop
            </Link>
            <Link
              href="/"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground lemon-transition"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground lemon-transition"
            >
              Ingredients
            </Link>
            <Link
              href="/account"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground lemon-transition"
            >
              Account
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
