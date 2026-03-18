import { readFile } from "node:fs/promises"
import path from "node:path"

import { catalogProducts, type CatalogProduct } from "./catalog"

export type NeonSource = "cart" | "similar"

type CartCsvRow = {
  No: string
  "Product Name": string
  Specs: string
  Price: string
  "Original Price": string
  Discount: string
  Store: string
  "Goods ID": string
  "SKU ID": string
  "Product URL": string
  "Image URL": string
}

type SimilarCsvRow = {
  Query: string
  Rank: string
  "Product Name": string
  Price: string
  "Original Price": string
  Discount: string
  "Sales Tip": string
  "Goods ID": string
  "SKU ID": string
  "Mall ID": string
  "Product URL": string
  "Image URL": string
}

export interface NeonDataItem {
  id: string
  source: NeonSource
  sourceIndex: number
  title: string
  subtitle: string
  detail: string
  priceLabel: string
  priceValue: number
  originalPriceLabel: string | null
  originalPriceValue: number | null
  discountLabel: string | null
  discountValue: number | null
  goodsId: string
  skuId: string
  productUrl: string
  imageUrl: string
  query: string | null
  store: string | null
  rank: number | null
}

export interface NeonQueryBreakdown {
  query: string
  count: number
}

export interface NeonDataSummary {
  cartCount: number
  similarCount: number
  totalCount: number
  queryCount: number
  uniqueStoreCount: number
  averagePriceLabel: string
  highestPriceLabel: string
}

export interface NeonDataSignals {
  highestPrice: NeonDataItem | null
  lowestPrice: NeonDataItem | null
  deepestDiscount: NeonDataItem | null
  hottestQuery: NeonQueryBreakdown | null
}

export type NeonDataMode = "live" | "partial" | "demo" | "missing"

export interface NeonDataPayload {
  available: boolean
  mode: NeonDataMode
  message: string | null
  sourceFiles: {
    cart: string
    similar: string
  }
  summary: NeonDataSummary
  signals: NeonDataSignals
  queryBreakdown: NeonQueryBreakdown[]
  cartItems: NeonDataItem[]
  similarItems: NeonDataItem[]
  items: NeonDataItem[]
}

const cartSourcePath = path.join(process.cwd(), "output/playwright/temu-cart.csv")
const similarSourcePath = path.join(process.cwd(), "output/playwright/temu-similar-products.csv")

function parseCsv(text: string) {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]

    if (inQuotes) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          currentField += '"'
          index += 1
        } else {
          inQuotes = false
        }
      } else {
        currentField += character
      }
      continue
    }

    if (character === '"') {
      inQuotes = true
      continue
    }

    if (character === ',') {
      currentRow.push(currentField)
      currentField = ""
      continue
    }

    if (character === '\n') {
      currentRow.push(currentField)
      rows.push(currentRow)
      currentField = ""
      currentRow = []
      continue
    }

    if (character === '\r') {
      continue
    }

    currentField += character
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  return rows.filter((row) => row.some((cell) => cell.trim().length > 0))
}

function rowsToObjects(rows: string[][]) {
  const [headers, ...body] = rows

  return body.map((row) => {
    const record: Record<string, string> = {}

    headers.forEach((header, index) => {
      record[header] = row[index] ?? ""
    })

    return record
  })
}

function parseMoney(value: string | null | undefined) {
  if (!value) return 0

  const normalized = value.replace(/[^\d.-]/g, "")
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

function parseDiscount(value: string | null | undefined) {
  if (!value) return null

  const normalized = value.replace(/[^\d.-]/g, "")
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "AED 0.00"
  }

  return `AED ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function normalizeCartItem(row: CartCsvRow, sourceIndex: number): NeonDataItem {
  const originalPriceValue = parseMoney(row["Original Price"])

  return {
    id: `cart-${row["Goods ID"] || sourceIndex}`,
    source: "cart",
    sourceIndex,
    title: row["Product Name"],
    subtitle: row.Store || "Recovered cart item",
    detail: row.Specs || "Specs unavailable",
    priceLabel: row.Price,
    priceValue: parseMoney(row.Price),
    originalPriceLabel: row["Original Price"] || null,
    originalPriceValue: originalPriceValue > 0 ? originalPriceValue : null,
    discountLabel: row.Discount || null,
    discountValue: parseDiscount(row.Discount),
    goodsId: row["Goods ID"],
    skuId: row["SKU ID"],
    productUrl: row["Product URL"],
    imageUrl: row["Image URL"],
    query: null,
    store: row.Store || null,
    rank: Number.parseInt(row.No, 10) || null,
  }
}

function normalizeSimilarItem(row: SimilarCsvRow, sourceIndex: number): NeonDataItem {
  const originalPriceValue = parseMoney(row["Original Price"])

  return {
    id: `similar-${row["Goods ID"] || sourceIndex}`,
    source: "similar",
    sourceIndex,
    title: row["Product Name"],
    subtitle: row.Query || "Discovery query",
    detail: row["Sales Tip"] || `Search rank #${row.Rank}`,
    priceLabel: row.Price,
    priceValue: parseMoney(row.Price),
    originalPriceLabel: row["Original Price"] || null,
    originalPriceValue: originalPriceValue > 0 ? originalPriceValue : null,
    discountLabel: row.Discount || null,
    discountValue: parseDiscount(row.Discount),
    goodsId: row["Goods ID"],
    skuId: row["SKU ID"],
    productUrl: row["Product URL"],
    imageUrl: row["Image URL"],
    query: row.Query || null,
    store: null,
    rank: Number.parseInt(row.Rank, 10) || null,
  }
}

function emptyPayload(message: string): NeonDataPayload {
  return {
    available: false,
    mode: "missing",
    message,
    sourceFiles: {
      cart: cartSourcePath,
      similar: similarSourcePath,
    },
    summary: {
      cartCount: 0,
      similarCount: 0,
      totalCount: 0,
      queryCount: 0,
      uniqueStoreCount: 0,
      averagePriceLabel: "AED 0.00",
      highestPriceLabel: "AED 0.00",
    },
    signals: {
      highestPrice: null,
      lowestPrice: null,
      deepestDiscount: null,
      hottestQuery: null,
    },
    queryBreakdown: [],
    cartItems: [],
    similarItems: [],
    items: [],
  }
}

async function readOptionalFile(filePath: string) {
  try {
    return await readFile(filePath, "utf8")
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null
    }

    throw error
  }
}

function toAed(value: number) {
  return Number((value * 3.67).toFixed(2))
}

function toDiscountLabel(priceValue: number, originalPriceValue: number | null) {
  if (!originalPriceValue || originalPriceValue <= priceValue) {
    return null
  }

  const percentage = Math.round(((originalPriceValue - priceValue) / originalPriceValue) * 100)
  return percentage > 0 ? `${percentage}% OFF` : null
}

function buildDemoCartItem(product: CatalogProduct, sourceIndex: number): NeonDataItem {
  const priceValue = toAed(product.price)
  const originalPriceValue = product.originalPrice ? toAed(product.originalPrice) : toAed(product.price * 1.12)

  return {
    id: `demo-cart-${product.id}`,
    source: "cart",
    sourceIndex,
    title: product.name,
    subtitle: product.tagline,
    detail: product.details,
    priceLabel: formatCurrency(priceValue),
    priceValue,
    originalPriceLabel: formatCurrency(originalPriceValue),
    originalPriceValue,
    discountLabel: toDiscountLabel(priceValue, originalPriceValue),
    discountValue: parseDiscount(toDiscountLabel(priceValue, originalPriceValue)),
    goodsId: `CART-${sourceIndex.toString().padStart(4, "0")}`,
    skuId: `SKU-C-${sourceIndex.toString().padStart(4, "0")}`,
    productUrl: `/product/${product.id}`,
    imageUrl: product.image,
    query: null,
    store: `Lemondol Market ${sourceIndex % 2 === 0 ? "Prime" : "Studio"}`,
    rank: sourceIndex,
  }
}

function buildDemoSimilarItem(product: CatalogProduct, sourceIndex: number): NeonDataItem {
  const queries = ["lemon tote", "sunny dress", "giftable candle", "fresh accessories"]
  const query = queries[(sourceIndex - 1) % queries.length]
  const priceValue = toAed(product.price + ((sourceIndex % 3) + 1) * 4)
  const originalPriceValue = toAed((product.originalPrice ?? product.price * 1.18) + ((sourceIndex % 2) + 1) * 5)

  return {
    id: `demo-similar-${product.id}-${sourceIndex}`,
    source: "similar",
    sourceIndex,
    title: `${product.name} Market Match`,
    subtitle: query,
    detail: `Trending against "${query}" shoppers this week`,
    priceLabel: formatCurrency(priceValue),
    priceValue,
    originalPriceLabel: formatCurrency(originalPriceValue),
    originalPriceValue,
    discountLabel: toDiscountLabel(priceValue, originalPriceValue),
    discountValue: parseDiscount(toDiscountLabel(priceValue, originalPriceValue)),
    goodsId: `SIM-${sourceIndex.toString().padStart(4, "0")}`,
    skuId: `SKU-S-${sourceIndex.toString().padStart(4, "0")}`,
    productUrl: `/product/${product.id}`,
    imageUrl: product.image,
    query,
    store: null,
    rank: sourceIndex,
  }
}

function buildPayload({
  cartItems,
  similarItems,
  cartSource,
  similarSource,
  mode,
  message,
}: {
  cartItems: NeonDataItem[]
  similarItems: NeonDataItem[]
  cartSource: string
  similarSource: string
  mode: NeonDataMode
  message: string | null
}): NeonDataPayload {
  const items = [...cartItems, ...similarItems]

  const queryCounts = new Map<string, number>()
  similarItems.forEach((item) => {
    if (!item.query) return
    queryCounts.set(item.query, (queryCounts.get(item.query) ?? 0) + 1)
  })

  const queryBreakdown = Array.from(queryCounts.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((left, right) => right.count - left.count || left.query.localeCompare(right.query))

  const totalPrice = items.reduce((sum, item) => sum + item.priceValue, 0)
  const averagePrice = items.length > 0 ? totalPrice / items.length : 0
  const highestPrice = items.reduce<NeonDataItem | null>((current, item) => {
    if (!current || item.priceValue > current.priceValue) {
      return item
    }
    return current
  }, null)
  const lowestPrice = items.reduce<NeonDataItem | null>((current, item) => {
    if (!current || item.priceValue < current.priceValue) {
      return item
    }
    return current
  }, null)
  const deepestDiscount = items.reduce<NeonDataItem | null>((current, item) => {
    if (item.discountValue === null) {
      return current
    }

    if (!current || (current.discountValue ?? -1) < item.discountValue) {
      return item
    }

    return current
  }, null)

  return {
    available: items.length > 0,
    mode,
    message,
    sourceFiles: {
      cart: cartSource,
      similar: similarSource,
    },
    summary: {
      cartCount: cartItems.length,
      similarCount: similarItems.length,
      totalCount: items.length,
      queryCount: queryBreakdown.length,
      uniqueStoreCount: new Set(cartItems.map((item) => item.store).filter(Boolean)).size,
      averagePriceLabel: formatCurrency(averagePrice),
      highestPriceLabel: formatCurrency(highestPrice?.priceValue ?? 0),
    },
    signals: {
      highestPrice,
      lowestPrice,
      deepestDiscount,
      hottestQuery: queryBreakdown[0] ?? null,
    },
    queryBreakdown,
    cartItems,
    similarItems,
    items,
  }
}

function demoPayload(message: string): NeonDataPayload {
  const demoCartItems = catalogProducts.slice(0, 4).map((product, index) => buildDemoCartItem(product, index + 1))
  const demoSimilarItems = [...catalogProducts, ...catalogProducts.slice(0, 2)].map((product, index) =>
    buildDemoSimilarItem(product, index + 1),
  )

  return buildPayload({
    cartItems: demoCartItems,
    similarItems: demoSimilarItems,
    cartSource: "Bundled demo cart dataset",
    similarSource: "Bundled demo similar-products dataset",
    mode: "demo",
    message,
  })
}

export async function getNeonData(): Promise<NeonDataPayload> {
  try {
    const [cartText, similarText] = await Promise.all([
      readOptionalFile(cartSourcePath),
      readOptionalFile(similarSourcePath),
    ])

    const cartRows = cartText ? (rowsToObjects(parseCsv(cartText)) as CartCsvRow[]) : []
    const similarRows = similarText ? (rowsToObjects(parseCsv(similarText)) as SimilarCsvRow[]) : []

    const cartItems = cartRows.map((row, index) => normalizeCartItem(row, index + 1))
    const similarItems = similarRows.map((row, index) => normalizeSimilarItem(row, index + 1))

    if (cartItems.length === 0 && similarItems.length === 0) {
      return demoPayload("Local CSV exports were not found, so the dashboard is showing bundled demo market data.")
    }

    const missingSources = [
      !cartText ? "cart export" : null,
      !similarText ? "similar-products export" : null,
    ].filter(Boolean)

    const mode: NeonDataMode = missingSources.length > 0 ? "partial" : "live"
    const message =
      missingSources.length > 0
        ? `Loaded live data with ${missingSources.join(" and ")} missing.`
        : null

    return buildPayload({
      cartItems,
      similarItems,
      cartSource: cartText ? cartSourcePath : `Missing local file: ${cartSourcePath}`,
      similarSource: similarText ? similarSourcePath : `Missing local file: ${similarSourcePath}`,
      mode,
      message,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to read the local CSV exports for Neon Data."

    return demoPayload(`${message} Showing bundled demo market data instead.`)
  }
}

export async function getNeonItemById(id: string): Promise<NeonDataItem | null> {
  const data = await getNeonData()
  return data.items.find((item) => item.id === id) ?? null
}
