"use client"

import { useMemo, useState } from "react"
import Image from "next/image"

import { shopCategoryLabels, type ProductBadge, type ProductCategory } from "@/lib/catalog"
import { cn } from "@/lib/utils"

type ProductVisualVariant = "card" | "thumb" | "hero"

type ProductVisualProps = {
  badge?: ProductBadge
  category: ProductCategory
  className?: string
  image?: string | null
  imageClassName?: string
  name: string
  priority?: boolean
  sizes?: string
  variant?: ProductVisualVariant
}

const themeByCategory: Record<
  ProductCategory,
  {
    chip: string
    ghost: string
    glow: string
    panel: string
    surface: string
  }
> = {
  clothing: {
    chip: "bg-rose-100 text-rose-900",
    ghost: "text-slate-950/12",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.22),transparent_28%)]",
    panel: "bg-white/78 text-slate-900",
    surface: "from-rose-50 via-amber-50 to-yellow-100",
  },
  accessories: {
    chip: "bg-sky-100 text-sky-900",
    ghost: "text-slate-950/12",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.18),transparent_28%)]",
    panel: "bg-white/82 text-slate-900",
    surface: "from-sky-50 via-white to-indigo-100",
  },
  lifestyle: {
    chip: "bg-emerald-100 text-emerald-900",
    ghost: "text-slate-950/12",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.18),transparent_28%)]",
    panel: "bg-white/82 text-slate-900",
    surface: "from-emerald-50 via-lime-50 to-white",
  },
  tattoos: {
    chip: "bg-fuchsia-100 text-fuchsia-950",
    ghost: "text-slate-950/12",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.22),transparent_28%)]",
    panel: "bg-white/82 text-slate-900",
    surface: "from-fuchsia-50 via-rose-50 to-orange-100",
  },
}

function getMonogram(name: string) {
  const parts = name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "L"
}

export function ProductVisual({
  badge,
  category,
  className,
  image,
  imageClassName,
  name,
  priority = false,
  sizes,
  variant = "card",
}: ProductVisualProps) {
  const [hasError, setHasError] = useState(false)
  const theme = themeByCategory[category]
  const monogram = useMemo(() => getMonogram(name), [name])
  const shouldUseFallback = hasError || !image || image === "/placeholder.svg"

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", theme.surface)}>
        <div className={cn("absolute inset-0", theme.glow)} />
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/45 blur-2xl" />
        <div className="absolute -bottom-12 -left-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />

        {shouldUseFallback ? (
          <div className="relative flex h-full flex-col justify-between p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em]", theme.chip)}>
                {shopCategoryLabels[category]}
              </span>
              {badge && variant !== "thumb" ? (
                <span className="rounded-full bg-slate-950/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                  {badge}
                </span>
              ) : null}
            </div>

            {variant === "thumb" ? (
              <div className="flex h-full items-end justify-start">
                <span className="rounded-2xl bg-white/82 px-3 py-2 font-serif text-lg font-bold tracking-tight text-slate-900 shadow-lg">
                  {monogram}
                </span>
              </div>
            ) : (
              <div className="relative">
                <p className={cn("pointer-events-none select-none font-serif text-[4.5rem] font-black leading-none tracking-tighter", theme.ghost)}>
                  {monogram}
                </p>
                <div className={cn("mt-2 rounded-[1.5rem] px-4 py-3 shadow-lg backdrop-blur-md", theme.panel)}>
                  <p className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-400">Lemondol edit</p>
                  <p className={cn("mt-1 font-serif font-bold leading-tight text-slate-900", variant === "hero" ? "text-lg" : "text-base")}>{name}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover", imageClassName)}
            onError={() => setHasError(true)}
          />
        )}
      </div>
    </div>
  )
}
