"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/lemon/header"
import { Footer } from "@/components/lemon/footer"
import { 
  Send, 
  Bot, 
  User, 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Truck, 
  CreditCard, 
  Sparkles, 
  Wand2, 
  Plus, 
  Settings,
  MoreVertical,
  ChevronRight,
  Database,
  Search,
  Zap,
  RefreshCw,
  Video,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  type?: 'text' | 'product' | 'inventory' | 'action' | 'veo'
  data?: any
}

export default function InitAdminPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Welcome to Lemondol Orchestrator (Powered by Gemini). I can manage your products, users, inventory, and creative assets. How can I help you today?",
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Mock Inventory
  const [inventory, setInventory] = useState([
    { id: "L001", name: "Sunshine Lemon Dress", stock: 45, price: 45, status: "Active" },
    { id: "L002", name: "Citrus Canvas Tote", stock: 120, price: 22, status: "Active" },
    { id: "L003", name: "Lemon Zest Candle", stock: 85, price: 18, status: "Low Stock" }
  ])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = { id: Date.now(), role: 'user', content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)

    // Gemini Orchestration Simulation
    setTimeout(() => {
      const lowerInput = userMessage.content.toLowerCase()
      let response: Message = { id: Date.now() + 1, role: 'assistant', content: "" }

      if (lowerInput.includes("add product") || lowerInput.includes("new item")) {
        response = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I've drafted a new product based on your request. I'll use the Lemondol 'Fresh Squeeze' template. Should I publish it?",
          type: 'product',
          data: { name: "Lemon Pop Sneakers", price: "$55", stock: 100 }
        }
      } else if (lowerInput.includes("inventory") || lowerInput.includes("stock")) {
        response = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Here is the current Lemondol inventory status. I've highlighted items that need restocking.",
          type: 'inventory',
          data: inventory
        }
      } else if (lowerInput.includes("veo") || lowerInput.includes("video")) {
        response = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Veo 3 Engine is ready. Generating a cinematic promo for 'Sunshine Lemon Dress'. Prompt sent: 'Cinematic golden hour, flowy lemon dress, vibrant yellow, 4K'.",
          type: 'veo',
          data: { prompt: "Cinematic golden hour, flowy lemon dress, vibrant yellow, 4K" }
        }
      } else if (lowerInput.includes("canva") || lowerInput.includes("design")) {
          response = {
              id: Date.now() + 1,
              role: 'assistant',
              content: "Opening Canva integration... I've synchronized the Lemondol brand kit for this design session.",
              type: 'action',
              data: { action: "Open Canva" }
          }
      } else {
        response = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Understood. I'm orchestrating that change across the platform. Is there anything else I should adjust?"
        }
      }

      setMessages(prev => [...prev, response])
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#FDFCF0] flex flex-col">
      <Header />
      
      <div className="flex-1 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto h-[80vh] flex gap-6">
          
          {/* Main Orchestrator Chat */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold">/init Orchestrator</h1>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Gemini 3 Flash Active
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-white/50">Canva Synced</Badge>
                <Badge variant="outline" className="bg-white/50">Veo 3 Ready</Badge>
              </div>
            </div>

            <Card className="flex-1 flex flex-col border-none shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-[3.5rem] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/40">
              <ScrollArea className="flex-1 p-8" ref={scrollRef}>
                <div className="space-y-8">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-slate-900 text-white'}`}>
                          {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>
                        <div className="space-y-4">
                          <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-secondary/20 text-slate-900 rounded-tr-none' : 'bg-white shadow-xl border border-slate-100 text-slate-800 rounded-tl-none'}`}>
                            {msg.content}
                          </div>
                          
                          {/* Rich Components Based on AI Type */}
                          {msg.type === 'product' && (
                            <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white p-6 animate-in zoom-in-95 shadow-2xl">
                              <div className="flex items-center justify-between mb-4">
                                <Badge className="bg-primary text-primary-foreground border-none font-black px-3">DRAFT READY</Badge>
                                <div className="flex gap-2">
                                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
                                </div>
                              </div>
                              <h4 className="text-xl font-black mb-1">{msg.data.name}</h4>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Price: {msg.data.price} • Stock: {msg.data.stock}</p>
                              <div className="flex gap-3">
                                <Button className="flex-1 rounded-full bg-white text-slate-900 font-black hover:bg-primary transition-all">Push to Store</Button>
                                <Button variant="outline" className="rounded-full border-white/20 text-white font-bold hover:bg-white/10">Refine AI Prompt</Button>
                              </div>
                            </Card>
                          )}

                          {msg.type === 'inventory' && (
                            <Card className="rounded-3xl border-none shadow-lg overflow-hidden animate-in fade-in">
                              <table className="w-full text-xs">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="p-2 text-left">SKU</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-center">Stock</th>
                                    <th className="p-2 text-right">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {msg.data.map((item: any) => (
                                    <tr key={item.id} className="border-t border-muted">
                                      <td className="p-2 font-mono">{item.id}</td>
                                      <td className="p-2 font-bold">{item.name}</td>
                                      <td className="p-2 text-center">
                                        <Badge variant={item.stock < 50 ? "destructive" : "secondary"}>{item.stock}</Badge>
                                      </td>
                                      <td className="p-2 text-right">
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Settings className="w-3 h-3" /></Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </Card>
                          )}

                          {msg.type === 'veo' && (
                            <div className="rounded-3xl bg-black p-4 text-white space-y-3 animate-in slide-in-from-right-4">
                              <div className="flex items-center gap-2 text-xs text-primary font-bold">
                                <Video className="w-3 h-3" />
                                VEO 3 ENGINE RUNNING
                              </div>
                              <div className="aspect-video bg-white/10 rounded-2xl flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 animate-spin opacity-50" />
                              </div>
                              <p className="text-[10px] opacity-60">Prompt: {msg.data.prompt}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                       <div className="flex gap-2 items-center text-xs text-muted-foreground ml-11">
                         <RefreshCw className="w-3 h-3 animate-spin" />
                         Gemini is thinking...
                       </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <CardFooter className="p-6 pt-0">
                <form onSubmit={handleSendMessage} className="w-full relative">
                  <Input 
                    placeholder="Ask Gemini to edit products, sync Canva, or send Veo prompts..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pr-16 py-8 rounded-[2rem] border-muted shadow-lg bg-white"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                     <Button type="button" size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
                        <Plus className="w-5 h-5" />
                     </Button>
                     <Button type="submit" size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-12 h-12 shadow-lg">
                        <Send className="w-5 h-5" />
                     </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </div>

          {/* Side Management Panel */}
          <div className="w-80 flex flex-col gap-4">
            <Tabs defaultValue="inventory" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 bg-white/50 backdrop-blur rounded-2xl p-1 h-auto">
                <TabsTrigger value="inventory" className="rounded-xl py-2 flex flex-col gap-1">
                   <Package className="w-4 h-4" />
                   <span className="text-[10px]">Stock</span>
                </TabsTrigger>
                <TabsTrigger value="paypal" className="rounded-xl py-2 flex flex-col gap-1">
                   <CreditCard className="w-4 h-4" />
                   <span className="text-[10px]">Paypal</span>
                </TabsTrigger>
                <TabsTrigger value="delivery" className="rounded-xl py-2 flex flex-col gap-1">
                   <Truck className="w-4 h-4" />
                   <span className="text-[10px]">Delivery</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 flex-1">
                <TabsContent value="inventory" className="h-full m-0">
                  <Card className="h-full border-none shadow-xl rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold flex items-center justify-between">
                        Inventory List
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><RefreshCw className="w-4 h-4" /></Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[45vh]">
                        <div className="divide-y divide-muted">
                          {inventory.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-sm">{item.name}</span>
                                <Badge variant={item.status === 'Active' ? 'secondary' : 'outline'} className="text-[10px]">{item.status}</Badge>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>SKU: {item.id}</span>
                                <span className={item.stock < 50 ? "text-destructive font-bold" : ""}>Stock: {item.stock}</span>
                              </div>
                            </div>
                          ))}
                          <div className="p-4 text-center">
                            <Button variant="outline" size="sm" className="w-full rounded-full border-dashed">
                              <Plus className="w-4 h-4 mr-2" />
                              Source New Product
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="paypal" className="h-full m-0">
                  <Card className="h-full border-none shadow-xl rounded-3xl bg-[#003087] text-white">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        PayPal Management
                      </CardTitle>
                      <CardDescription className="text-blue-100">Lemondol Business Balance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="text-3xl font-bold">$12,450.80</div>
                       <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase opacity-60">Recent Transactions</p>
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center text-xs bg-white/10 p-2 rounded-xl">
                               <span>Order #LE-{2000+i}</span>
                               <span className="font-bold">+$45.00</span>
                            </div>
                          ))}
                       </div>
                       <Button className="w-full bg-white text-[#003087] hover:bg-blue-50 rounded-full font-bold">
                          View Dashboard
                          <ExternalLink className="w-3 h-3 ml-2" />
                       </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="delivery" className="h-full m-0">
                  <Card className="h-full border-none shadow-xl rounded-3xl bg-white overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold">Shipping Queue</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[45vh]">
                        <div className="p-4 space-y-4">
                          {[
                            { id: "SHIP-01", status: "In Transit", destination: "New York, NY" },
                            { id: "SHIP-02", status: "Processing", destination: "Los Angeles, CA" },
                            { id: "SHIP-03", status: "Delivered", destination: "London, UK" }
                          ].map((ship) => (
                            <div key={ship.id} className="p-3 bg-muted/30 rounded-2xl border border-muted">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono font-bold">{ship.id}</span>
                                <Badge className="text-[9px]">{ship.status}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                {ship.destination}
                              </p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>

            {/* AI Settings / Orchestra Stats */}
            <Card className="border-none shadow-xl rounded-3xl bg-primary text-primary-foreground p-4">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-tighter">AI Efficiency</span>
                  </div>
                  <span className="text-xs font-bold">98%</span>
               </div>
               <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                  <div className="w-[98%] h-full bg-white" />
               </div>
               <p className="text-[10px] opacity-80 leading-tight">
                  Gemini is currently optimizing 14 product descriptions and monitoring 3 active Veo renders.
               </p>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
