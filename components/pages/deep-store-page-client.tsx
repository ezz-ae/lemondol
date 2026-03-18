"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/lemon/header"
import { Footer } from "@/components/lemon/footer"
import { Lock, Unlock, ShieldCheck, Zap, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/lemon/cart-context"
import { Switch } from "@/components/ui/switch"

const adultProducts = [
  { 
    id: "silk-wellness", 
    name: "Midnight Silk Set", 
    price: 120, 
    oldPrice: 180, 
    stock: 12, 
    color: "purple",
    desc: "Pure mulberry silk for restorative rest."
  },
  { 
    id: "botanical-serum", 
    name: "Noir Botanical Elixir", 
    price: 145, 
    oldPrice: 210, 
    stock: 5, 
    color: "green",
    desc: "Intensive recovery for the modern woman."
  },
  { 
    id: "artisan-kit", 
    name: "Velvet Calm Kit", 
    price: 85, 
    oldPrice: 130, 
    stock: 24, 
    color: "yellow",
    desc: "Hand-poured essentials for deep relaxation."
  },
  { 
    id: "glow-mask", 
    name: "Amethyst Glow Mask", 
    price: 95, 
    oldPrice: 150, 
    stock: 8, 
    color: "purple",
    desc: "Crystal-infused overnight treatment."
  }
]

export default function DeepStorePage() {
  const { isAdultMode, setIsAdultMode } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-6">
        {!isAdultMode ? (
          <div className="max-w-2xl mx-auto text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
              <div className="relative w-24 h-24 rounded-full bg-white border-4 border-purple-500 flex items-center justify-center text-purple-600 shadow-2xl">
                <Lock className="w-10 h-10" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-serif font-black tracking-tighter text-slate-900">
                L’ADULTE <span className="text-purple-600">COLLECTION</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                Exclusive wellness and luxury essentials for the sophisticated woman. Verified access only.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-6 shadow-inner">
               <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold uppercase tracking-widest ${!isAdultMode ? 'text-slate-900' : 'text-slate-400'}`}>Private Mode</span>
                  <Switch 
                    checked={isAdultMode} 
                    onCheckedChange={setIsAdultMode}
                    className="data-[state=checked]:bg-purple-500 scale-125"
                  />
                  <span className={`text-sm font-bold uppercase tracking-widest ${isAdultMode ? 'text-purple-600' : 'text-slate-400'}`}>Adult Access</span>
               </div>
               <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Switch to activate collection</p>
            </div>

            <div className="flex justify-center gap-8 pt-8">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-slate-100 pb-12">
              <div className="space-y-2">
                <Badge className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4 mb-2">Private Access</Badge>
                <h1 className="text-6xl font-serif font-black tracking-tight text-slate-900">
                  The <span className="text-purple-600">Deep</span> Store
                </h1>
              </div>
              <p className="text-slate-400 font-medium max-w-xs text-right hidden md:block uppercase tracking-widest text-[10px]">
                Simple Elegance. <br/>Vibrant Wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {adultProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Stock Motion Stroke Timer */}
                  <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none">
                    <rect
                      x="4"
                      y="4"
                      width="calc(100% - 8px)"
                      height="calc(100% - 8px)"
                      rx="40"
                      fill="none"
                      stroke={product.color === 'purple' ? '#A855F7' : product.color === 'green' ? '#22C55E' : '#EAB308'}
                      strokeWidth="2.5"
                      strokeDasharray="1200"
                      className="opacity-10 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ 
                        animation: 'dash 15s linear infinite',
                        strokeDashoffset: 1200 - (product.stock * 20)
                      }}
                    />
                  </svg>

                  <Card className="h-full border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 hover:-translate-y-4">
                    <div className={`aspect-[4/5] bg-slate-50 relative group-hover:bg-slate-100 transition-colors`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className={`w-32 h-32 rounded-full blur-3xl opacity-20 ${
                           product.color === 'purple' ? 'bg-purple-500' : 
                           product.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                         }`} />
                      </div>
                      
                      {/* Discount Badge */}
                      <div className={`absolute top-6 left-6 px-4 py-2 rounded-full font-black text-xs text-white shadow-xl ${
                        product.color === 'purple' ? 'bg-purple-600' : 
                        product.color === 'green' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-slate-900">{product.name}</CardTitle>
                      <CardDescription className="text-slate-400 text-xs font-medium uppercase tracking-wider">{product.desc}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-black text-slate-900">${product.price}</span>
                        <span className="text-sm text-slate-300 line-through">${product.oldPrice}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1.5">
                            <div className="flex gap-1">
                               {[1,2,3].map(i => (
                                 <div key={i} className={`w-1 h-1 rounded-full ${i <= (product.stock/10) ? 'bg-slate-900' : 'bg-slate-200'}`} />
                               ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Limited Stock</span>
                         </div>
                         <Button size="icon" className="rounded-full bg-slate-900 hover:bg-purple-600 shadow-lg">
                            <ShoppingBag className="w-4 h-4" />
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Timely Stock Motion Section */}
            <div className="mt-32 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px]" />
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 blur-[120px]" />
               
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                     <h2 className="text-5xl font-serif font-black leading-none">
                       THE <span className="text-purple-400 italic">VANISHING</span> <br/> COLLECTION
                     </h2>
                     <p className="text-slate-400 text-lg">
                       As the stroke completes, the offer disappears. Our stock-driven pricing model rewards the swift.
                     </p>
                     <Button className="rounded-full bg-white text-slate-900 hover:bg-purple-400 hover:text-white px-8 h-14 font-bold text-lg">
                        Explore Urgent Deals
                     </Button>
                  </div>
                  <div className="relative aspect-square md:aspect-video flex items-center justify-center">
                     {/* Big Stroke Timer */}
                     <svg className="w-full h-full max-w-[300px]">
                        <circle
                           cx="150"
                           cy="150"
                           r="140"
                           fill="none"
                           stroke="white"
                           strokeWidth="1"
                           className="opacity-10"
                        />
                        <circle
                           cx="150"
                           cy="150"
                           r="140"
                           fill="none"
                           stroke="#A855F7"
                           strokeWidth="8"
                           strokeDasharray="880"
                           strokeDashoffset="880"
                           className="animate-[stroke-timer_60s_linear_infinite]"
                        />
                        <text x="150" y="160" textAnchor="middle" className="fill-white font-serif text-4xl font-black italic">VEO-3</text>
                     </svg>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes stroke-timer {
          from { stroke-dashoffset: 880; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
      
      <Footer />
    </div>
  )
}
