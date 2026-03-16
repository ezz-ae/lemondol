"use client"

import { useState, useEffect, useCallback } from "react"
import { useCart } from "./cart-context"
import { Bot, X, Sparkles, Zap, TrendingUp, ShoppingBag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function LemonOrchestrator() {
  const [notification, setNotification] = useState<{ id: string, content: string, type: string, action?: string } | null>(null)
  const [lastAction, setLastAction] = useState<string>("")
  const { items, likedIds } = useCart()

  // Proactive Marketing Intelligence Logic
  const triggerMarketingNudge = useCallback((action: string) => {
    setLastAction(action)
    
    // Logic for dynamic nudges
    if (action === 'scroll_depth_50' && items.length > 0) {
      setNotification({
        id: 'scroll_nudge',
        content: "I see you're exploring! Those items in your cart are selling fast. Want a 5-minute flash discount to finish your look?",
        type: 'marketing',
        action: 'Get Discount'
      })
    } else if (action === 'rapid_clicking') {
      setNotification({
        id: 'help_nudge',
        content: "Finding it hard to choose? I can compare these items for you in the Lemon Chat!",
        type: 'support',
        action: 'Chat with Lemon'
      })
    } else if (action === 'item_liked') {
      setNotification({
        id: 'like_nudge',
        content: "Great taste! This item is trending in your area. I've reserved one for you for the next 20 minutes.",
        type: 'scarcity',
        action: 'View Reserve'
      })
    } else if (action === 'idle_refresh') {
       setNotification({
        id: 'refresh_nudge',
        content: "Still here? I've updated the collection with 3 new items since your last visit. Check the 'New' tab!",
        type: 'new_arrival',
        action: 'See New'
      })
    }
  }, [items.length])

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
  }, [triggerMarketingNudge])

  if (!notification) return (
    <div className="fixed bottom-6 right-6 z-[100] group">
       <Link href="/account">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-2xl cursor-pointer hover:scale-110 transition-all border-4 border-white animate-bounce-slow">
             <Bot className="w-8 h-8" />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse" />
          </div>
       </Link>
    </div>
  )

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-80 animate-in slide-in-from-right-10 fade-in duration-500">
       <Card className="rounded-[2.5rem] border-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden bg-white text-slate-900 group border-2 border-primary/20">
          <div className="p-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="p-7">
             <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live AI Nudge</p>
                      <Badge className="bg-secondary/10 text-secondary border-none text-[8px] font-black uppercase tracking-tighter">Lemon Intelligence</Badge>
                   </div>
                </div>
                <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-slate-900 transition-colors">
                   <X className="w-5 h-5" />
                </button>
             </div>
             
             <p className="text-sm font-bold leading-relaxed mb-8 text-slate-600 italic">
                "{notification.content}"
             </p>

             <div className="space-y-4">
                <Link href="/account" onClick={() => setNotification(null)}>
                  <Button className="w-full rounded-full bg-slate-900 text-white font-black h-14 hover:bg-primary hover:text-primary-foreground hover:scale-[1.03] transition-all shadow-xl">
                     {notification.action}
                     <Zap className="ml-2 w-4 h-4 fill-current" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                   <TrendingUp className="w-3 h-3 text-secondary" />
                   Optimizing your Lemondol journey
                </div>
             </div>
          </div>
       </Card>
    </div>
  )
}
