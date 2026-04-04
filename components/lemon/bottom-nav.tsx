"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Sparkles, User, ShieldCheck, Utensils } from "lucide-react"
import { useCart } from "./cart-context"

export function BottomNav() {
  const pathname = usePathname()
  const { isAdultMode } = useCart()

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      activeClassName: "bg-primary text-primary-foreground scale-105 shadow-lg font-bold",
      inactiveClassName: "text-white/60 hover:text-white",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: ShoppingBag,
      activeClassName: "bg-primary text-primary-foreground scale-105 shadow-lg font-bold",
      inactiveClassName: "text-white/60 hover:text-white",
    },
    {
      label: "Girls",
      href: "/girls-time",
      icon: Utensils,
      activeClassName: "bg-primary text-primary-foreground scale-105 shadow-lg font-bold",
      inactiveClassName: "text-white/60 hover:text-white",
    },
    {
      label: "Studio",
      href: "/ai-studio",
      icon: Sparkles,
      activeClassName: "bg-primary text-primary-foreground scale-105 shadow-lg font-bold",
      inactiveClassName: "text-white/60 hover:text-white",
    },
    {
      label: "Lemon",
      href: "/account",
      icon: User,
      activeClassName: "bg-primary text-primary-foreground scale-105 shadow-lg font-bold",
      inactiveClassName: "text-white/60 hover:text-white",
    },
  ]

  // Add Deep Store only if Adult Mode is active or we are already there
  const showDeepStore = isAdultMode || pathname === "/deep-store"
  const renderedItems = showDeepStore
    ? [
        ...navItems,
        {
          label: "Deep",
          href: "/deep-store",
          icon: ShieldCheck,
          activeClassName: "bg-purple-500 text-white scale-105 shadow-lg font-bold",
          inactiveClassName: "text-purple-300/70 hover:text-purple-200",
        },
      ]
    : navItems

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-t from-background via-background/90 to-transparent px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
      <nav
        className="pointer-events-auto mx-auto grid w-full max-w-2xl items-center gap-1 rounded-[2.5rem] border border-white/10 bg-slate-900/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        style={{ gridTemplateColumns: `repeat(${renderedItems.length}, minmax(0, 1fr))` }}
      >
        {renderedItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-col items-center gap-1.5 rounded-2xl px-2 py-2.5 text-center transition-all duration-300 active:scale-90 select-none sm:px-3 ${
                isActive ? item.activeClassName : item.inactiveClassName
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate text-[8px] font-black uppercase tracking-tight sm:text-[9px]">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
