"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/lemon/header"
import { Footer } from "@/components/lemon/footer"
import { useCart, CartItem } from "@/components/lemon/cart-context"
import { 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  Sparkles, 
  Trash2, 
  CreditCard, 
  ChevronRight,
  Gift,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'checkout-summary' | 'discount-applied' | 'product-suggestion'
  data?: any
}

export default function AccountChatPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart, likedIds } = useCart()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Lemon, your personal shopping assistant. I see you've picked some beautiful items. I've analyzed your style and can help you get the perfect fit or find extra savings!",
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: inputValue }
    setMessages(prev => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    // Lemon AI Logic
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase()
      let response: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "" }

      if (lowerInput.includes("size") || lowerInput.includes("fit")) {
        response = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "I'd love to help with sizing! Could you tell me your height and preferred fit (tight/relaxed)? I'll match it with our 'Lemon-Fit' database to ensure your items feel perfect.",
        }
      } else if (lowerInput.includes("checkout") || lowerInput.includes("buy")) {
        response = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Perfect. I've prepared your secure checkout summary. Since you have ${likedIds.length} liked items, I've unlocked an extra loyalty discount!`,
          type: 'checkout-summary',
          data: { discount: 15 + (likedIds.length * 2), total: subtotal * (1 - (0.15 + (likedIds.length * 0.02))) }
        }
      } else if (lowerInput.includes("liked") || lowerInput.includes("recommend")) {
          response = {
            id: Date.now().toString(),
            role: 'assistant',
            content: "Looking at your 'Liked' list, I feel these items really speak to your soul. I can bundle them with a special 25% discount if you add them now!",
            type: 'product-suggestion',
            data: { name: "Liked Collection Bundle", price: "Custom", image: "/images/products/dress.png" }
          }
      } else if (lowerInput.includes("discount") || lowerInput.includes("save")) {
        response = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Since you're a Lemon member, I've unlocked a special 20% discount on your current cart!",
          type: 'discount-applied',
          data: { code: "LEMON20", value: "20%" }
        }
      } else if (lowerInput.includes("suggest") || lowerInput.includes("best")) {
        response = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Based on your style, I think these 'Zest Sneakers' would complete your look perfectly. Want me to add them?",
          type: 'product-suggestion',
          data: { name: "Zest Sneakers", price: 45, image: "/images/products/tee.png" }
        }
      } else {
        response = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "I'm here to make your Lemondol experience perfect. You can ask me to help with checkout, find discounts, or suggest items that match your cart!"
        }
      }

      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#FEFDF0] flex flex-col">
      <Header />
      
      <div className="flex-1 pt-24 pb-4 px-4 lg:px-6">
        <div className="flex flex-col gap-6 h-[78vh]">
          
          {/* Lemon AI Chat - The Checkout Hub */}
          <div className="flex-1 flex flex-col gap-3">
             <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg animate-bounce-slow">
                      <Bot className="w-6 h-6" />
                   </div>
                   <div>
                      <h1 className="font-serif text-xl font-black text-slate-900 leading-none mb-1">Lemon Chat</h1>
                      <div className="flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         <p className="text-[8px] uppercase font-black text-slate-400 tracking-widest">Personal AI</p>
                      </div>
                   </div>
                </div>
                <Badge variant="outline" className="bg-white rounded-full text-[9px] font-black uppercase">Member</Badge>
             </div>

             <Card className="flex-1 border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-xl relative flex flex-col border border-white/40">
                <ScrollArea className="flex-1 p-8 lg:p-12" ref={scrollRef}>
                   <div className="space-y-10">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-700`}>
                           <div className={`flex gap-5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transition-transform hover:rotate-6 ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-primary text-primary-foreground'}`}>
                                 {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                              </div>
                              <div className="space-y-6">
                                 <div className={`p-6 rounded-[2rem] text-sm md:text-base font-medium leading-relaxed ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-2xl' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-xl'}`}>
                                    {msg.content}
                                 </div>

                                 {/* Checkout Summary Card */}
                                 {msg.type === 'checkout-summary' && (
                                   <Card className="rounded-[3rem] border-none bg-slate-900 text-white p-8 space-y-6 animate-in zoom-in-95 shadow-2xl">
                                      <div className="flex items-center justify-between mb-2">
                                         <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                                               <CreditCard className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-black text-xl italic tracking-tight">Checkout</h3>
                                         </div>
                                         <Badge className="bg-primary text-primary-foreground border-none font-black px-4">SECURE</Badge>
                                      </div>
                                      <div className="space-y-3 text-sm">
                                         <div className="flex justify-between opacity-60 font-bold">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                         </div>
                                         <div className="flex justify-between text-primary font-black italic text-base">
                                            <span>Loyalty Discount</span>
                                            <span>-{msg.data.discount}%</span>
                                         </div>
                                         <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                            <span className="font-bold opacity-40 uppercase text-[10px] tracking-widest">Total Amount</span>
                                            <span className="text-4xl font-black">${msg.data.total.toFixed(2)}</span>
                                         </div>
                                      </div>
                                      <Button className="w-full rounded-full bg-primary text-primary-foreground h-16 font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(248,226,49,0.3)]">
                                         Confirm Order
                                         <ChevronRight className="ml-2 w-6 h-6" />
                                      </Button>
                                   </Card>
                                 )}

                                 {/* Discount Applied Notification */}
                                 {msg.type === 'discount-applied' && (
                                   <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 animate-in bounce-in">
                                      <Gift className="w-6 h-6" />
                                      <div>
                                         <p className="font-black text-sm">{msg.data.value} DISCOUNT UNLOCKED</p>
                                         <p className="text-[10px] uppercase font-bold">Code: {msg.data.code} Auto-Applied</p>
                                      </div>
                                   </div>
                                 )}

                                 {/* Product Suggestion */}
                                 {msg.type === 'product-suggestion' && (
                                   <Card className="rounded-3xl border-none shadow-xl overflow-hidden bg-white max-w-[280px] group animate-in slide-in-from-right-8">
                                      <div className="aspect-square bg-slate-100 relative">
                                         <Image src={msg.data.image} alt={msg.data.name} fill className="object-cover" />
                                         <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground p-2 rounded-full shadow-lg">
                                            <Sparkles className="w-4 h-4" />
                                         </div>
                                      </div>
                                      <div className="p-4 flex justify-between items-center">
                                         <div>
                                            <p className="font-bold text-sm">{msg.data.name}</p>
                                            <p className="text-xs text-primary font-black">${msg.data.price}</p>
                                         </div>
                                         <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/10">
                                            <Plus className="w-5 h-5" />
                                         </Button>
                                      </div>
                                   </Card>
                                 )}
                              </div>
                           </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start pl-12">
                           <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                           </div>
                        </div>
                      )}
                   </div>
                </ScrollArea>

                <div className="p-6 bg-slate-50 border-t border-slate-100">
                   <form onSubmit={handleSendMessage} className="relative">
                      <Input 
                        placeholder="Say 'Checkout', 'Give me a discount', or 'What matches my cart?'"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="py-8 pr-20 rounded-[2rem] border-none shadow-inner bg-white text-lg placeholder:text-slate-300 focus-visible:ring-primary"
                      />
                      <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all shadow-lg">
                         <Send className="w-5 h-5" />
                      </Button>
                   </form>
                   <div className="flex justify-center gap-6 mt-4">
                      <button onClick={() => setInputValue("Ready to checkout")} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                         <CheckCircle2 className="w-3 h-3" /> Quick Checkout
                      </button>
                      <button onClick={() => setInputValue("Help me save money")} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                         <Gift className="w-3 h-3" /> Get Discounts
                      </button>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
