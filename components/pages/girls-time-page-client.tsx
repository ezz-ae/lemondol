"use client"

import { useState, useMemo } from "react"
import { Utensils, MapPin, Star, Heart, Sparkles, Filter, ChevronRight, Search, Users, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { diningSpots, type DiningSpot } from "@/lib/dining"
import { useToast } from "@/hooks/use-toast"

export default function GirlsTimePageClient() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const filteredSpots = useMemo(() => {
    return diningSpots.filter((spot) => {
      const matchesTab = activeTab === "all" || spot.category === activeTab
      const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spot.aesthetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            spot.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-72 w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1543007630-9710e40fa13a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <Badge className="mb-4 bg-primary text-primary-foreground border-none px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em]">
            Lifestyle Experience
          </Badge>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Girls Time</h1>
          <p className="text-slate-300 text-sm font-medium max-w-xs mx-auto">
            Discover the most aesthetic spots for brunch, dinner, and late-night toasts.
          </p>
        </div>
      </section>

      {/* App Interface */}
      <div className="px-4 -mt-8 relative z-20">
        <Card className="p-4 rounded-[2.5rem] border-none shadow-2xl bg-white mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search aesthetic spots or moods..." 
                className="pl-11 rounded-full border-slate-100 bg-slate-50 h-12 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent h-auto p-0 flex justify-between gap-2 overflow-x-auto no-scrollbar">
                {["all", "brunch", "dinner", "cafe", "drinks"].map((tab) => (
                  <TabsTrigger 
                    key={tab}
                    value={tab}
                    className="flex-1 rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-slate-100 data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all whitespace-nowrap"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </Card>

        {/* Discovery Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Recommended for You</h2>
            <Button variant="ghost" size="sm" className="text-primary font-bold text-xs">
              View Map
              <MapPin className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredSpots.length > 0 ? (
              filteredSpots.map((spot) => (
                <Card key={spot.id} className="overflow-hidden rounded-[2.5rem] border-none shadow-lg group">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-none px-3 py-1 text-[8px] font-black uppercase tracking-tighter">
                        {spot.priceRange}
                      </Badge>
                      <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 text-[8px] font-black uppercase tracking-tighter">
                        {spot.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">{spot.name}</h3>
                        <p className="text-xs font-bold text-primary italic">{spot.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black text-slate-900">{spot.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {spot.bestFor.map((item) => (
                        <span key={item} className="text-[9px] font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center text-[10px] text-slate-400 font-medium">
                        <MapPin className="h-3 w-3 mr-1" />
                        {spot.location}
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest px-6"
                        onClick={() => toast({
                          title: "Reservation Drafted",
                          description: `We've prepared a draft for ${spot.name}. Want to share it with the group?`,
                        })}
                      >
                        Reserve
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-6 w-6 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No spots found</h3>
                <p className="text-sm text-slate-400">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Section: Planning */}
        <section className="mt-12 mb-8">
          <Card className="p-8 rounded-[3rem] bg-gradient-to-br from-primary to-secondary border-none relative overflow-hidden text-primary-foreground">
            <div className="absolute -right-8 -bottom-8 opacity-20">
              <Camera className="w-48 h-48" />
            </div>
            <div className="relative z-10 max-w-[240px]">
              <Sparkles className="w-8 h-8 mb-4 opacity-50" />
              <h2 className="text-2xl font-black mb-2 leading-tight uppercase tracking-tight">Plan the Vibe</h2>
              <p className="text-sm font-medium mb-6 opacity-90">
                Co-create the ultimate girls&apos; day. Shared maps, moodboards, and live availability.
              </p>
              <Button 
                className="rounded-full bg-white text-slate-900 font-black text-xs uppercase tracking-widest px-8 hover:bg-slate-50"
                onClick={() => toast({
                  title: "Planning Lounge Opened",
                  description: "Share this link with your group to start co-creating the vibe.",
                })}
              >
                Start Planning
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
