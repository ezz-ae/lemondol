"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, BarChart3, Boxes, Database, Search, Sparkles, TrendingUp, Zap } from "lucide-react"

import { Header } from "@/components/lemon/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { NeonDataItem, NeonDataPayload, NeonSource } from "@/lib/neon-data"

type SourceFilter = "all" | NeonSource

const sourceFilters: Array<{ label: string; value: SourceFilter }> = [
  { label: "All", value: "all" },
  { label: "Cart", value: "cart" },
  { label: "Similar", value: "similar" },
]

function neonBadgeClass(active: boolean) {
  return active
    ? "border-cyan-300/70 bg-cyan-400/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.28)]"
    : "border-white/10 bg-white/5 text-white/60 hover:border-cyan-300/30 hover:text-white"
}

function sourceBadgeClass(source: NeonSource) {
  return source === "cart"
    ? "border-cyan-300/40 bg-cyan-400/12 text-cyan-100"
    : "border-fuchsia-300/40 bg-fuchsia-400/12 text-fuchsia-100"
}

function filterItems(items: NeonDataItem[], sourceFilter: SourceFilter, queryFilter: string, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return items.filter((item) => {
    if (sourceFilter !== "all" && item.source !== sourceFilter) {
      return false
    }

    if (queryFilter !== "all" && item.query !== queryFilter) {
      return false
    }

    if (!normalizedSearch) {
      return true
    }

    const haystack = [
      item.title,
      item.subtitle,
      item.detail,
      item.goodsId,
      item.skuId,
      item.query,
      item.store,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return haystack.includes(normalizedSearch)
  })
}

function formatAveragePrice(items: NeonDataItem[]) {
  if (items.length === 0) {
    return "AED 0.00"
  }

  const average = items.reduce((sum, item) => sum + item.priceValue, 0) / items.length
  return `AED ${average.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function NeonDataPageClient({ data }: { data: NeonDataPayload }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all")
  const [queryFilter, setQueryFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(18)

  const filteredItems = useMemo(
    () => filterItems(data.items, sourceFilter, queryFilter, searchTerm),
    [data.items, queryFilter, searchTerm, sourceFilter],
  )

  const visibleItems = filteredItems.slice(0, visibleCount)
  const highestFilteredPrice = filteredItems.reduce<number>((current, item) => Math.max(current, item.priceValue), 0)

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Header />

      <div className="relative overflow-hidden pb-24 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="absolute right-0 top-44 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-12 left-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <section className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.04] p-6 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl space-y-4">
                <Badge className="rounded-full border-cyan-300/40 bg-cyan-400/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100">
                  Neon Data
                </Badge>
                <div className="space-y-3">
                  <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Cart Signals + Similar Product Discovery
                  </h1>
                  <p className="max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                    A local neon workspace for the recovered Temu cart export plus the extra discovery layer pulled from across the app.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-white/50">
                  <span>Cart source: {data.sourceFiles.cart}</span>
                  <span>•</span>
                  <span>Similar source: {data.sourceFiles.similar}</span>
                </div>
              </div>

              <div className="grid min-w-[220px] gap-3 sm:grid-cols-2">
                {[
                  { icon: Database, label: "Total Rows", value: data.summary.totalCount.toString() },
                  { icon: Boxes, label: "Cart Rows", value: data.summary.cartCount.toString() },
                  { icon: Sparkles, label: "Similar Rows", value: data.summary.similarCount.toString() },
                  { icon: BarChart3, label: "Query Themes", value: data.summary.queryCount.toString() },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 shadow-[0_0_25px_rgba(167,139,250,0.10)]"
                  >
                    <metric.icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <div className="text-2xl font-black text-white">{metric.value}</div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/45">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {!data.available && (
            <section className="rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-5 text-sm text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.12)]">
              <div className="font-semibold uppercase tracking-[0.28em] text-amber-200">Local data missing</div>
              <p className="mt-2 leading-6 text-amber-50/80">
                {data.message ?? "The CSV sources were not found."} Export the CSV files again to populate this page.
              </p>
            </section>
          )}

          <section className="rounded-[2rem] border border-fuchsia-300/15 bg-white/[0.03] p-5 shadow-[0_0_40px_rgba(217,70,239,0.10)] backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                    setVisibleCount(18)
                  }}
                  placeholder="Search titles, specs, stores, queries, goods IDs..."
                  className="h-12 rounded-2xl border-cyan-300/15 bg-black/20 pl-11 text-white placeholder:text-white/35 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/20"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {sourceFilters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => {
                      setSourceFilter(filter.value)
                      setVisibleCount(18)
                      if (filter.value === "cart") {
                        setQueryFilter("all")
                      }
                    }}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all",
                      neonBadgeClass(sourceFilter === filter.value),
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {sourceFilter !== "cart" && data.queryBreakdown.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      setQueryFilter("all")
                      setVisibleCount(18)
                    }}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[11px] font-medium whitespace-nowrap transition-all",
                      neonBadgeClass(queryFilter === "all"),
                    )}
                  >
                    All queries
                  </button>
                  {data.queryBreakdown.map((entry) => (
                    <button
                      key={entry.query}
                      type="button"
                      onClick={() => {
                        setSourceFilter("similar")
                        setQueryFilter(entry.query)
                        setVisibleCount(18)
                      }}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[11px] font-medium whitespace-nowrap transition-all",
                        neonBadgeClass(queryFilter === entry.query),
                      )}
                    >
                      {entry.query} · {entry.count}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                label: "Highest Price",
                value: data.signals.highestPrice?.priceLabel ?? "AED 0.00",
                caption: data.signals.highestPrice?.title ?? "Waiting for data",
              },
              {
                icon: Zap,
                label: "Deepest Discount",
                value: data.signals.deepestDiscount?.discountLabel ?? "—",
                caption: data.signals.deepestDiscount?.title ?? "Waiting for data",
              },
              {
                icon: Sparkles,
                label: "Hottest Query",
                value: data.signals.hottestQuery ? `${data.signals.hottestQuery.query} · ${data.signals.hottestQuery.count}` : "—",
                caption: `Average price ${data.summary.averagePriceLabel}`,
              },
            ].map((signal) => (
              <div
                key={signal.label}
                className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 shadow-[0_0_30px_rgba(96,165,250,0.10)]"
              >
                <signal.icon className="mb-4 h-5 w-5 text-fuchsia-300" />
                <div className="text-xs uppercase tracking-[0.28em] text-white/45">{signal.label}</div>
                <div className="mt-2 text-2xl font-black text-white">{signal.value}</div>
                <p className="mt-2 text-sm leading-6 text-white/60">{signal.caption}</p>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">Filtered feed</div>
                <h2 className="text-2xl font-black text-white">
                  {filteredItems.length} results <span className="text-white/40">·</span> avg {formatAveragePrice(filteredItems)}
                </h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/55">
                Peak {highestFilteredPrice > 0 ? `AED ${highestFilteredPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "AED 0.00"}
              </div>
            </div>

            {visibleItems.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10">
                  <Search className="h-5 w-5 text-cyan-200" />
                </div>
                <h3 className="text-xl font-black text-white">No results yet</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Try a different search term, switch sources, or reset the query filter.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {visibleItems.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[2rem] border border-cyan-300/12 bg-white/[0.035] shadow-[0_0_36px_rgba(34,211,238,0.10)] backdrop-blur-xl"
                  >
                    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
                      <div className="sm:flex-1 sm:min-w-0">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <Badge className={cn("rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]", sourceBadgeClass(item.source))}>
                            {item.source}
                          </Badge>
                          {item.query && (
                            <Badge className="rounded-full border-white/10 bg-white/8 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
                              {item.query}
                            </Badge>
                          )}
                          {item.store && (
                            <Badge className="rounded-full border-white/10 bg-white/8 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75">
                              {item.store}
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-lg font-black leading-7 text-white sm:text-xl">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/60">{item.detail}</p>

                        <div className="mt-4 flex flex-wrap items-end gap-3">
                          <div className="text-2xl font-black text-cyan-200">{item.priceLabel}</div>
                          {item.originalPriceLabel && (
                            <div className="text-sm text-white/35 line-through">{item.originalPriceLabel}</div>
                          )}
                          {item.discountLabel && (
                            <div className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                              {item.discountLabel}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em] text-white/38">
                          <span>Goods {item.goodsId}</span>
                          <span>Sku {item.skuId}</span>
                          {item.rank ? <span>Rank {item.rank}</span> : null}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-3 sm:w-[132px]">
                        <div
                          className="aspect-square rounded-[1.5rem] border border-white/10 bg-cover bg-center bg-no-repeat shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                          style={
                            item.imageUrl
                              ? {
                                  backgroundImage: `linear-gradient(180deg, rgba(5,8,22,0.05), rgba(5,8,22,0.35)), url(${item.imageUrl})`,
                                }
                              : {
                                  backgroundImage:
                                    "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(217,70,239,0.18), rgba(99,102,241,0.18))",
                                }
                          }
                        />
                        <Button
                          asChild
                          className="h-11 rounded-2xl bg-white text-slate-950 hover:bg-cyan-200"
                        >
                          <a href={item.productUrl} target="_blank" rel="noreferrer">
                            Open
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {visibleCount < filteredItems.length && (
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 18)}
                  className="h-12 rounded-full bg-transparent px-6 text-white ring-1 ring-cyan-300/30 hover:bg-cyan-400/10"
                >
                  Load more neon rows
                </Button>
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-white/55 shadow-[0_0_30px_rgba(168,85,247,0.08)]">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">What this page reads</div>
            <p>
              This view pulls local CSV exports from the Temu cart recovery flow, then layers in the similar-product discovery set so you can scan everything in one neon workspace.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="ghost" className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                <Link href="/shop">Back to shop</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10">
                <Link href="/ai-studio">Open studio</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
