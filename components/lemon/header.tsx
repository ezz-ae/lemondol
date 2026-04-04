"use client"

import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"

import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

export function Header() {
  const { setIsOpen, itemCount } = useCart()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-background/80 backdrop-blur-xl">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="p-2 text-slate-400 active:scale-95 transition-transform" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground shadow-lg transition-transform group-active:scale-95">
                L
              </div>
              <h1 className="hidden font-serif text-xl font-black tracking-tight text-slate-900 sm:block">Lemondol</h1>
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
