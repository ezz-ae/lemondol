"use client"

import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"

import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

export function Header() {
  const { setIsOpen, itemCount } = useCart()

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-4 py-4 bg-background/80 backdrop-blur-xl border-b border-slate-50">
        <div className="flex items-center justify-between h-10 relative">
          <button type="button" className="p-2 text-slate-400 active:scale-95 transition-transform" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg group-active:scale-95 transition-transform">
                L
              </div>
              <h1 className="font-serif text-xl font-black tracking-tight text-slate-900 hidden sm:block">Lemondol</h1>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-slate-400 active:scale-95 transition-transform"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}
