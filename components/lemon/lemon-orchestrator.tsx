"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useCart } from "./cart-context"
import { Bot, X, Sparkles, Zap, TrendingUp, ShoppingBag, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function LemonOrchestrator({ hasNeonData }: { hasNeonData?: boolean }) {
  const [notification, setNotification] = useState<{ id: string, content: string, type: string, action?: string, path?: string } | null>(null)
  const [lastAction, setLastAction] = useState<string>("")
  const { items, likedIds } = useCart()
  const nudgeCount = useRef(0)

  useEffect(() => {
    if (!notification) {
      return
    }

    const timer = window.setTimeout(() => {
      setNotification(null)
    }, 6500)

    return () => window.clearTimeout(timer)
  }, [notification])

  // Proactive Marketing Intelligence Logic
  const triggerMarketingNudge = useCallback((action: string) => {
    if (nudgeCount.current > 3 && action !== 'item_liked') return // Prevent over-nudging
    
    setLastAction(action)
    nudgeCount.current++
    
    // Logic for dynamic nudges
    if (action === 'scroll_depth_50' && items.length > 0) {
      setNotification({
        id: 'scroll_nudge',
        content: "Still thinking? Grab those cart items now for an extra 5% off (next 10 mins!)",
        type: 'marketing',
        action: 'Claim Discount',
        path: '/account'
      })
    } else if (action === 'rapid_clicking') {
      setNotification({
        id: 'help_nudge',
        content: "Need a hand? I can pull similar items from the vault for you.",
        type: 'support',
        action: 'View Similar',
        path: '/neon-data'
      })
    } else if (action === 'item_liked') {
      setNotification({
        id: 'like_nudge',
        content: "Bold choice! This is trending in our 'Wild' collection.",
        type: 'scarcity',
        action: 'See More Wild',
        path: '/shop/tattoos'
      })
    } else if (action === 'idle_refresh') {
       setNotification({
        id: 'refresh_nudge',
        content: "Freshly updated! I've just added 3 new 'Girls Time' spots for you.",
        type: 'new_arrival',
        action: 'Discover Now',
        path: '/girls-time'
      })
    } else if (action === 'neon_discovery' && hasNeonData) {
      setNotification({
        id: 'neon_nudge',
        content: "I've applied visual perfection to your recovered items. Take a look?",
        type: 'intelligence',
        action: 'View Studio',
        path: '/neon-data'
      })
    }
  }, [items.length, hasNeonData])

  // Monitor Global Actions
  useEffect(() => {
    let clickCount = 0
    let lastClickTime = Date.now()

    const handleClick = () => {
      const now = Date.now()
      if (now - lastClickTime < 500) {
        clickCount++
        if (clickCount > 4) triggerMarketingNudge('rapid_clicking')
      } else {
        clickCount = 0
      }
      lastClickTime = now
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && scrollPercent < 55) triggerMarketingNudge('scroll_depth_50')
      
      // Trigger neon discovery at 30% scroll if not already nudged
      if (scrollPercent > 30 && scrollPercent < 35 && hasNeonData) {
        triggerMarketingNudge('neon_discovery')
      }
    }

    // Monitor for Refresh (via performance entries)
    const perfEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    if (perfEntries.length > 0 && perfEntries[0].type === 'reload') {
        setTimeout(() => triggerMarketingNudge('idle_refresh'), 2000)
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [triggerMarketingNudge, hasNeonData])

  return (
    <div className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] right-4 z-[110] flex flex-col items-end gap-3 sm:bottom-[104px] sm:right-6 lg:right-8">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-[240px] sm:w-[280px] origin-bottom-right"
          >
            <Card className="overflow-hidden rounded-[2rem] border-2 border-primary/20 bg-white/95 backdrop-blur-xl text-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative">
              <div className="p-1 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Live Nudge</span>
                  </div>
                  <button 
                    onClick={() => setNotification(null)} 
                    className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                </div>
                
                <p className="mb-4 text-xs font-bold leading-relaxed text-slate-600 italic">
                  “{notification.content}”
                </p>

                <Link href={notification.path || "/account"} onClick={() => setNotification(null)}>
                  <Button className="h-10 w-full rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:scale-[1.03] transition-transform">
                    {notification.action}
                  </Button>
                </Link>
              </div>
              
              {/* Little triangle tail for speech bubble */}
              <div className="absolute -bottom-1 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-primary/20 rotate-45 transform translate-y-1/2" />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href="/account">
        <div className="relative group">
          <div className="h-14 w-14 rounded-2xl border-4 border-white bg-primary text-primary-foreground shadow-2xl transition-all hover:scale-110 flex items-center justify-center cursor-pointer overflow-hidden">
             <Bot className={cn("h-7 w-7 transition-all", notification ? "scale-90 opacity-50" : "scale-100 opacity-100")} />
             {notification && (
               <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in-50 duration-300">
                 <MessageCircle className="w-7 h-7 fill-primary-foreground" />
               </div>
             )}
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse" />
        </div>
      </Link>
    </div>
  )
}
