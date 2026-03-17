"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Sparkles, User, ShieldCheck } from "lucide-react"
import { useCart } from "./cart-context"

export function BottomNav() {
  const pathname = usePathname()
  const { isAdultMode } = useCart()

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { label: "Studio", href: "/ai-studio", icon: Sparkles },
    { label: "Lemon", href: "/account", icon: User },
  ]

  // Add Deep Store only if Adult Mode is active or we are already there
  const showDeepStore = isAdultMode || pathname === "/deep-store"

  return (
    <div className="sticky bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none">
      <nav className="w-full bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-primary-foreground scale-110 shadow-lg" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </Link>
          )
        })}
        
        {showDeepStore && (
          <Link
            href="/deep-store"
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
              pathname === "/deep-store" 
                ? "bg-purple-500 text-white scale-110 shadow-lg" 
                : "text-purple-400/60 hover:text-purple-400"
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-tighter">Deep</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
