"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Bot,
  Check,
  Copy,
  CreditCard,
  Database,
  ExternalLink,
  ImageIcon,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Video,
  Wand2,
  Zap,
} from "lucide-react"

import { Footer } from "@/components/lemon/footer"
import { Header } from "@/components/lemon/header"
import { ProductVisual } from "@/components/catalog/product-visual"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { getProductById, shopCategoryLabels } from "@/lib/catalog"
import {
  buildStructuredQaChecklist,
  buildStructuredRecreationPrompt,
  luxuryImageRecreationBriefs,
} from "@/lib/image-recreation"

const providerLabels = {
  gemini: "Gemini",
  imagen: "Imagen",
  veo: "Veo",
  generic: "Generic",
} as const

const inventory = [
  { id: "L001", name: "Sunshine Lemon Dress", stock: 45, price: 45, status: "Active" },
  { id: "L190", name: "Nightfall Mesh Corset Top", stock: 18, price: 32, status: "Reference Locked" },
  { id: "L238", name: "Neon Heart Ink Sheets", stock: 64, price: 14, status: "Creative Ready" },
]

const shippingQueue = [
  { id: "SHIP-01", status: "In Transit", destination: "New York, NY" },
  { id: "SHIP-02", status: "Processing", destination: "Los Angeles, CA" },
  { id: "SHIP-03", status: "Delivered", destination: "London, UK" },
]

function formatList(items: string[]) {
  return items.map((item) => `• ${item}`).join("\n")
}

export default function InitAdminPage() {
  const [selectedProductId, setSelectedProductId] = useState(luxuryImageRecreationBriefs[0]?.productId!)
  const [selectedOutputId, setSelectedOutputId] = useState(luxuryImageRecreationBriefs[0]?.outputs[0]?.id ?? "")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedKind, setCopiedKind] = useState<"prompt" | "qa" | "packet" | null>(null)

  const totalOutputs = useMemo(
    () => luxuryImageRecreationBriefs.reduce((count, brief) => count + brief.outputs.length, 0),
    [],
  )

  const stillOutputs = useMemo(
    () => luxuryImageRecreationBriefs.reduce((count, brief) => count + brief.outputs.filter((output) => output.mode === "still").length, 0),
    [],
  )

  const motionOutputs = totalOutputs - stillOutputs

  const lockedRules = useMemo(
    () =>
      luxuryImageRecreationBriefs.reduce(
        (count, brief) => count + brief.fidelity.mustKeep.length + brief.fidelity.mustAvoid.length,
        0,
      ),
    [],
  )

  const filteredBriefs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return luxuryImageRecreationBriefs
    }

    return luxuryImageRecreationBriefs.filter((brief) => {
      if (!brief.productId) return false
      const product = getProductById(brief.productId)
      const searchableText = [
        brief.productId,
        product?.name ?? "",
        product ? shopCategoryLabels[product.category] : "",
        brief.objective,
        brief.outputs.map((output) => output.useCase).join(" "),
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [searchQuery])

  const selectedBrief = useMemo(
    () => luxuryImageRecreationBriefs.find((brief) => brief.productId === selectedProductId) ?? luxuryImageRecreationBriefs[0],
    [selectedProductId],
  )

  useEffect(() => {
    if (!selectedBrief) {
      return
    }

    const outputExists = selectedBrief.outputs.some((output) => output.id === selectedOutputId)

    if (!outputExists) {
      setSelectedOutputId(selectedBrief.outputs[0]?.id ?? "")
    }
  }, [selectedBrief, selectedOutputId])

  if (!selectedBrief) {
    return (
      <main className="min-h-screen bg-[#FDFCF0] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
          <Card className="max-w-xl border-none rounded-[2.5rem] shadow-xl bg-white p-8 text-center">
            <CardTitle className="font-serif text-3xl">No structured briefs yet</CardTitle>
            <CardDescription className="mt-3 text-base">
              Add image recreation briefs in `lib/image-recreation.ts` to activate the `/init` orchestration workspace.
            </CardDescription>
          </Card>
        </div>
        <Footer />
      </main>
    )
  }

  const selectedOutput = selectedBrief.outputs.find((output) => output.id === selectedOutputId) ?? selectedBrief.outputs[0]
  const selectedProduct = getProductById(selectedBrief.productId!)

  if (!selectedOutput || !selectedProduct) {
    return null
  }

  const structuredPrompt = buildStructuredRecreationPrompt(selectedBrief.productId!, selectedOutput.id)
  const qaChecklist = buildStructuredQaChecklist(selectedBrief.productId!)
  const qaChecklistText = formatList(qaChecklist)
  const providerPacket = JSON.stringify(
    {
      productId: selectedBrief.productId!,
      referenceImage: selectedBrief.referenceImage,
      providerPriority: selectedBrief.providerPriority,
      selectedOutput,
      mustKeep: selectedBrief.fidelity.mustKeep,
      mustAvoid: selectedBrief.fidelity.mustAvoid,
      qaChecklist,
    },
    null,
    2,
  )

  const copyText = async (kind: "prompt" | "qa" | "packet", value: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }

    await navigator.clipboard.writeText(value)
    setCopiedKind(kind)
    window.setTimeout(() => setCopiedKind(null), 1500)
  }

  return (
    <main className="min-h-screen bg-[#FDFCF0] flex flex-col">
      <Header />

      <div className="flex-1 px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold">/init Structured Orchestrator</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real image recreation control room: exact-product fidelity, locked invariants, and provider-ready luxury prompts.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground">Structured briefs active</Badge>
              <Badge variant="outline" className="bg-white/70">Gemini-ready later</Badge>
              <Badge variant="outline" className="bg-white/70">Imagen stills mapped</Badge>
              <Badge variant="outline" className="bg-white/70">Veo motion mapped</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={Database} label="Approved Briefs" value={String(luxuryImageRecreationBriefs.length)} helper="Strict product recreation specs" />
            <MetricCard icon={ImageIcon} label="Still Outputs" value={String(stillOutputs)} helper="Commerce + editorial still variants" />
            <MetricCard icon={Video} label="Motion Outputs" value={String(motionOutputs)} helper="Mapped Veo-style promo variants" />
            <MetricCard icon={ShieldCheck} label="Locked Rules" value={String(lockedRules)} helper="Must-keep + must-avoid constraints" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="overflow-hidden rounded-[3rem] border-none bg-white/70 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
              <Tabs defaultValue="brief" className="flex h-full flex-col">
                <div className="border-b border-slate-200/70 px-6 pt-6">
                  <TabsList className="grid h-auto w-full grid-cols-4 rounded-2xl bg-slate-100/80 p-1">
                    <TabsTrigger value="brief" className="rounded-xl py-3 text-xs font-semibold">
                      Brief
                    </TabsTrigger>
                    <TabsTrigger value="prompt" className="rounded-xl py-3 text-xs font-semibold">
                      Prompt
                    </TabsTrigger>
                    <TabsTrigger value="qa" className="rounded-xl py-3 text-xs font-semibold">
                      QA
                    </TabsTrigger>
                    <TabsTrigger value="packet" className="rounded-xl py-3 text-xs font-semibold">
                      Packet
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-[68vh]">
                  <TabsContent value="brief" className="m-0 p-6">
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                      <div className="space-y-4">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100">
                          <ProductVisual
                            name={selectedProduct.name}
                            image={selectedProduct.image}
                            category={selectedProduct.category}
                            badge={selectedProduct.badge}
                            variant="hero"
                            sizes="280px"
                          />
                        </div>

                        <Card className="rounded-[2rem] border border-slate-200/70 bg-slate-50/90 shadow-none">
                          <CardContent className="space-y-3 p-5 text-sm">
                            <div className="flex flex-wrap gap-2">
                              <Badge>{shopCategoryLabels[selectedProduct.category]}</Badge>
                              <Badge variant="secondary">{selectedBrief.status}</Badge>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Reference Image</p>
                              <p className="mt-2 break-all text-xs text-slate-600">{selectedBrief.referenceImage}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="bg-white">{selectedOutput.useCase}</Badge>
                            <Badge variant="outline" className="bg-white">{selectedOutput.aspectRatio}</Badge>
                            <Badge variant="outline" className="bg-white">{providerLabels[selectedOutput.providerTarget]}</Badge>
                          </div>
                          <h2 className="mt-4 font-serif text-4xl leading-tight text-slate-900">{selectedProduct.name}</h2>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{selectedBrief.objective}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <ConstraintCard title="Must Keep" tone="positive" items={selectedBrief.fidelity.mustKeep} />
                          <ConstraintCard title="Can Change" tone="neutral" items={selectedBrief.fidelity.canChange} />
                          <ConstraintCard title="Must Avoid" tone="danger" items={selectedBrief.fidelity.mustAvoid} />
                        </div>

                        <Card className="rounded-[2rem] border border-slate-200/70 bg-white shadow-none">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Reference Notes</CardTitle>
                            <CardDescription>These notes lock the identity before any provider is used.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
                            {selectedBrief.referenceNotes.map((note) => (
                              <div key={note} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <p>{note}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="prompt" className="m-0 p-6">
                    <div className="space-y-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Structured Prompt Output</p>
                          <h3 className="mt-2 font-serif text-3xl">{selectedOutput.id}</h3>
                          <p className="mt-2 text-sm text-slate-600">
                            Feed this prompt to the target provider with the reference image attached. The provider must treat the product identity as locked.
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="rounded-full"
                          onClick={() => copyText("prompt", structuredPrompt)}
                        >
                          {copiedKind === "prompt" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                          {copiedKind === "prompt" ? "Prompt copied" : "Copy prompt"}
                        </Button>
                      </div>

                      <Textarea
                        readOnly
                        value={structuredPrompt}
                        className="min-h-[520px] rounded-[2rem] border-slate-800 bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-100"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="qa" className="m-0 p-6">
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Approval Gate</p>
                          <h3 className="mt-2 font-serif text-3xl">Structured QA checklist</h3>
                          <p className="mt-2 text-sm text-slate-600">
                            Reject any output that changes silhouette, artwork, color, hardware, or category identity.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full bg-white"
                          onClick={() => copyText("qa", qaChecklistText)}
                        >
                          {copiedKind === "qa" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                          {copiedKind === "qa" ? "Checklist copied" : "Copy checklist"}
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {qaChecklist.map((rule) => (
                          <div key={rule} className="flex gap-3 rounded-[1.75rem] border border-slate-200/70 bg-white p-5">
                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <p className="text-sm leading-7 text-slate-700">{rule}</p>
                          </div>
                        ))}
                      </div>

                      <Card className="rounded-[2rem] border border-primary/20 bg-primary/5 shadow-none">
                        <CardHeader>
                          <CardTitle className="text-lg">Release rule</CardTitle>
                          <CardDescription>
                            Luxury polish is allowed. Product redesign is not.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                          <div className="rounded-2xl bg-white/80 px-4 py-3">Approve only if the output looks like the same product with better lighting, setting, and finish.</div>
                          <div className="rounded-2xl bg-white/80 px-4 py-3">Reject if the output changes pattern placement, tattoo artwork, hardware shape, silhouette, or product category.</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="packet" className="m-0 p-6">
                    <div className="space-y-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Provider Packet</p>
                          <h3 className="mt-2 font-serif text-3xl">Execution payload</h3>
                          <p className="mt-2 text-sm text-slate-600">
                            This packet is the structured handoff for Gemini, Imagen, or Veo later.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full bg-white"
                          onClick={() => copyText("packet", providerPacket)}
                        >
                          {copiedKind === "packet" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                          {copiedKind === "packet" ? "Packet copied" : "Copy packet"}
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {selectedBrief.providerPriority.map((provider, index) => (
                          <Card key={provider} className="rounded-[1.75rem] border border-slate-200/70 bg-white shadow-none">
                            <CardContent className="space-y-2 p-5">
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Priority {index + 1}</p>
                              <p className="font-semibold text-slate-900">{providerLabels[provider]}</p>
                              <p className="text-sm text-slate-600">
                                {provider === selectedOutput.providerTarget ? "Target provider for the selected output." : "Fallback provider if the primary target is unavailable."}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Textarea
                        readOnly
                        value={providerPacket}
                        className="min-h-[420px] rounded-[2rem] border-slate-200 bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-100"
                      />
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </Card>

            <div className="space-y-4">
              <Card className="rounded-[2.5rem] border-none bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Wand2 className="h-4 w-4 text-primary" />
                    Creative control panel
                  </CardTitle>
                  <CardDescription>Pick a brief, pick an output, then copy the locked prompt or QA packet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search structured briefs..."
                      className="h-12 rounded-full pl-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Product brief</p>
                    <Select
                      value={selectedBrief.productId!}
                      onValueChange={(value) => {
                        const nextBrief = luxuryImageRecreationBriefs.find((brief) => brief.productId === value)
                        setSelectedProductId(value)
                        setSelectedOutputId(nextBrief?.outputs[0]?.id ?? "")
                      }}
                    >
                      <SelectTrigger className="h-12 w-full rounded-2xl bg-white">
                        <SelectValue placeholder="Select a product brief" />
                      </SelectTrigger>
                      <SelectContent>
                        {luxuryImageRecreationBriefs.map((brief) => {
                          const product = getProductById(brief.productId!)

                          return (
                            <SelectItem key={brief.productId!} value={brief.productId!}>
                              {product?.name ?? brief.productId}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Output variant</p>
                    <Select value={selectedOutput.id} onValueChange={setSelectedOutputId}>
                      <SelectTrigger className="h-12 w-full rounded-2xl bg-white">
                        <SelectValue placeholder="Select an output variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedBrief.outputs.map((output) => (
                          <SelectItem key={output.id} value={output.id}>
                            {output.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge>{providerLabels[selectedOutput.providerTarget]}</Badge>
                    <Badge variant="secondary">{selectedOutput.mode}</Badge>
                    <Badge variant="outline">{selectedOutput.aspectRatio}</Badge>
                    <Badge variant="outline">{selectedOutput.useCase}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="creative" className="flex flex-col">
                <TabsList className="grid h-auto grid-cols-4 rounded-2xl bg-white/70 p-1">
                  <TabsTrigger value="creative" className="rounded-xl py-2 text-[10px] font-semibold">Creative</TabsTrigger>
                  <TabsTrigger value="inventory" className="rounded-xl py-2 text-[10px] font-semibold">Stock</TabsTrigger>
                  <TabsTrigger value="paypal" className="rounded-xl py-2 text-[10px] font-semibold">PayPal</TabsTrigger>
                  <TabsTrigger value="delivery" className="rounded-xl py-2 text-[10px] font-semibold">Delivery</TabsTrigger>
                </TabsList>

                <div className="mt-4">
                  <TabsContent value="creative" className="m-0">
                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Structured brief registry</CardTitle>
                        <CardDescription>Every item below already has locked invariants and mapped outputs.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[38vh]">
                          <div className="space-y-3 p-4">
                            {filteredBriefs.length > 0 ? (
                              filteredBriefs.map((brief) => {
                                const product = getProductById(brief.productId!)
                                const isSelected = brief.productId === selectedBrief.productId

                                return (
                                  <button
                                    key={brief.productId!}
                                    type="button"
                                    onClick={() => {
                                      setSelectedProductId(brief.productId!)
                                      setSelectedOutputId(brief.outputs[0]?.id ?? "")
                                    }}
                                    className={`w-full rounded-[1.75rem] border p-4 text-left transition-colors ${
                                      isSelected ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50/80 hover:bg-slate-100"
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <p className="font-semibold text-slate-900">{product?.name ?? brief.productId}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{brief.objective}</p>
                                      </div>
                                      <Badge variant={isSelected ? "default" : "outline"}>{brief.outputs.length} outputs</Badge>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      <Badge variant="secondary">{product ? shopCategoryLabels[product.category] : "Unknown"}</Badge>
                                      {brief.providerPriority.map((provider) => (
                                        <Badge key={provider} variant="outline" className="bg-white/80">
                                          {providerLabels[provider]}
                                        </Badge>
                                      ))}
                                    </div>
                                  </button>
                                )
                              })
                            ) : (
                              <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-muted-foreground">
                                No structured briefs match that search.
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="inventory" className="m-0">
                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Package className="h-4 w-4 text-primary" />
                          Inventory snapshot
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[38vh]">
                          <div className="divide-y divide-slate-100">
                            {inventory.map((item) => (
                              <div key={item.id} className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="font-semibold text-slate-900">{item.name}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">SKU: {item.id}</p>
                                  </div>
                                  <Badge variant={item.status === "Active" ? "secondary" : "outline"}>{item.status}</Badge>
                                </div>
                                <div className="mt-2 flex justify-between text-sm text-slate-600">
                                  <span>Stock: {item.stock}</span>
                                  <span>${item.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="paypal" className="m-0">
                    <Card className="rounded-[2.5rem] border-none bg-[#003087] text-white shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <CreditCard className="h-4 w-4" />
                          PayPal Management
                        </CardTitle>
                        <CardDescription className="text-blue-100">Lemondol business balance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-3xl font-bold">$12,450.80</div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((index) => (
                            <div key={index} className="flex items-center justify-between rounded-2xl bg-white/10 p-3 text-xs">
                              <span>Order #LE-{2000 + index}</span>
                              <span className="font-bold">+$45.00</span>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full rounded-full bg-white text-[#003087] hover:bg-blue-50">
                          View Dashboard
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="delivery" className="m-0">
                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Truck className="h-4 w-4 text-primary" />
                          Shipping queue
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[38vh]">
                          <div className="space-y-4 p-4">
                            {shippingQueue.map((shipment) => (
                              <div key={shipment.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-semibold text-slate-700">{shipment.id}</span>
                                  <Badge variant="outline">{shipment.status}</Badge>
                                </div>
                                <p className="mt-2 text-sm text-slate-600">{shipment.destination}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>

              <Card className="rounded-[2.5rem] border-none bg-primary p-5 text-primary-foreground shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-current" />
                    <span className="text-xs font-semibold uppercase tracking-[0.25em]">Fidelity lock</span>
                  </div>
                  <span className="text-xs font-bold">100%</span>
                </div>
                <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-full bg-white" />
                </div>
                <p className="text-xs leading-6 text-primary-foreground/85">
                  `/init` now runs on structured briefs instead of freestyle prompts. The selected brief currently targets {providerLabels[selectedOutput.providerTarget]} for the chosen output and blocks any design drift outside the approved rules.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof Database
  label: string
  value: string
  helper: string
}) {
  return (
    <Card className="rounded-[2rem] border-none bg-white/80 shadow-xl backdrop-blur-xl">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
          <p className="mt-3 font-serif text-4xl text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-600">{helper}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}

function ConstraintCard({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: "positive" | "neutral" | "danger"
}) {
  const toneStyles = {
    positive: "border-emerald-200 bg-emerald-50/80",
    neutral: "border-slate-200 bg-slate-50/90",
    danger: "border-rose-200 bg-rose-50/80",
  }[tone]

  return (
    <Card className={`rounded-[2rem] border shadow-none ${toneStyles}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-7 text-slate-700">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <p>{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
