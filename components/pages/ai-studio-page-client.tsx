"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/lemon/header"
import { Footer } from "@/components/lemon/footer"
import { Sparkles, Image as ImageIcon, Video, Wand2, Check, RefreshCw, Download, Zap, Wand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export default function AIStudioPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [resultVideo, setResultVideo] = useState<string | null>(null)

  const handleAutoEdit = () => {
    setIsEditing(true)
    setProgress(0)
    setResultImage(null)
    setStatus("Analyzing image composition...")
  }

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true)
    setProgress(0)
    setResultVideo(null)
    setStatus("Preparing Veo AI engine...")
  }

  useEffect(() => {
    if (isEditing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsEditing(false)
            setResultImage("/images/products/dress.png") // Simulated result
            setStatus("AI Enhancement Complete!")
            return 100
          }
          const next = prev + 2
          if (next === 30) setStatus("Removing background distractions...")
          if (next === 60) setStatus("Optimizing lighting and color balance...")
          if (next === 90) setStatus("Applying final stylistic touches...")
          return next
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isEditing])

  useEffect(() => {
    if (isGeneratingVideo) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsGeneratingVideo(false)
            setResultVideo("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3d8cad2-8091-4809-aac0-eaac74b0be7c-Z4XUCz3CRR7qjaOsoq6rFmbJfIRdgs.mp4") // Simulated Veo output
            setStatus("Veo AI Video Generated!")
            return 100
          }
          const next = prev + 1
          if (next === 20) setStatus("Extracting product 3D features...")
          if (next === 40) setStatus("Synthesizing cinematic motion...")
          if (next === 70) setStatus("Rendering with Google Veo 3 engine...")
          if (next === 90) setStatus("Finalizing high-resolution output...")
          return next
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isGeneratingVideo])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="pt-32 pb-20 px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
                AI Creative Studio
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Elevate your product presentation with automated AI editing and cinematic video generation powered by <span className="text-primary font-bold">Veo</span>.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                VEO-3 Powered
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Auto-Editor */}
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white group hover:shadow-[0_40px_80px_-20px_rgba(251,191,36,0.15)] transition-all duration-700 h-full flex flex-col">
              <CardHeader className="pb-6 pt-8 px-8">
                <CardTitle className="text-3xl font-black flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Wand2 className="text-primary w-6 h-6" />
                  </div>
                  AI Photo Studio
                </CardTitle>
                <CardDescription className="text-lg">Instant studio-quality enhancement for products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-8 pb-8 flex-1 flex flex-col">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-primary/20 transition-all flex-1">
                  {resultImage ? (
                    <div className="absolute inset-0 animate-in fade-in zoom-in-95 duration-1000">
                      <Image 
                        src={resultImage} 
                        alt="Enhanced Product" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-2xl">
                        AI OPTIMIZED
                      </div>
                    </div>
                  ) : isEditing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                      <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                        <div 
                          className="h-full bg-primary transition-all duration-500 ease-out" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest animate-pulse text-slate-400">{status}</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                      <ImageIcon className="w-20 h-20 mb-6 opacity-20" />
                      <p className="text-sm font-bold uppercase tracking-widest">Select Product</p>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleAutoEdit}
                  disabled={isEditing}
                  className={`w-full text-white rounded-full h-16 text-lg font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-95 ${
                    isEditing ? 'bg-primary cursor-not-allowed opacity-90' : 'bg-slate-900 hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {isEditing ? <RefreshCw className="mr-3 h-6 w-6 animate-spin" /> : <Wand2 className="mr-3 h-6 w-6" />}
                  {isEditing ? "Enhancing..." : "Auto-Enhance Photo"}
                </Button>
              </CardContent>
              </Card>
            </motion.div>

            {/* Veo Video Generator */}
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white group hover:shadow-[0_40px_80px_-20px_rgba(244,114,182,0.15)] transition-all duration-700 h-full flex flex-col">
              <CardHeader className="pb-6 pt-8 px-8">
                <CardTitle className="text-3xl font-black flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <Video className="text-secondary w-6 h-6" />
                  </div>
                  Veo Cinema
                </CardTitle>
                <CardDescription className="text-lg">Cinematic 4K motion powered by Google Veo 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-8 pb-8 flex-1 flex flex-col">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-secondary/20 transition-all flex-1">
                  {resultVideo ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
                    >
                      <source src={resultVideo} type="video/mp4" />
                    </video>
                  ) : isGeneratingVideo ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                      <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                        <div 
                          className="h-full bg-secondary transition-all duration-500 ease-out" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest animate-pulse text-slate-400">{status}</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                      <Video className="w-20 h-20 mb-6 opacity-20" />
                      <p className="text-sm font-bold uppercase tracking-widest">Motion Synthesis</p>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className={`w-full text-white rounded-full h-16 text-lg font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-95 ${
                    isGeneratingVideo ? 'bg-secondary cursor-not-allowed opacity-90' : 'bg-slate-900 hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  {isGeneratingVideo ? <RefreshCw className="mr-3 h-6 w-6 animate-spin" /> : <Sparkles className="mr-3 h-6 w-6" />}
                  {isGeneratingVideo ? "Generating Cinema..." : "Synthesize 4K Motion"}
                </Button>
              </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Tools */}
          <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { icon: Wand, label: "Smart Retouch" },
               { icon: RefreshCw, label: "Style Swap" },
               { icon: Download, label: "Export 4K" },
               { icon: Check, label: "Auto-Publish" }
             ].map((tool, i) => (
               <Button key={i} variant="outline" className="h-24 rounded-3xl border-muted flex flex-col gap-2 hover:bg-primary/5 hover:border-primary transition-all">
                 <tool.icon className="w-6 h-6 text-primary" />
                 <span className="text-xs font-bold uppercase tracking-widest">{tool.label}</span>
               </Button>
             ))}
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
