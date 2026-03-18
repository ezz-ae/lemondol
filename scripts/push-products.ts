import { Client } from "pg"
import { catalogProducts } from "../lib/catalog"

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRESQL_URI ??
  process.env.NEON_DATABASE_URL

if (!connectionString) {
  throw new Error(
    "No Postgres connection string found. Set DATABASE_URL (or POSTGRES_URL) before running this script.",
  )
}

const TABLE_NAME = "catalog_products"

const TABLE_SCHEMA = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT,
  badge TEXT,
  category TEXT,
  sizes JSONB,
  details TEXT,
  how_to_use TEXT,
  ingredients TEXT,
  delivery TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`

const UPSERT_QUERY = `
INSERT INTO ${TABLE_NAME} (
  id,
  name,
  tagline,
  description,
  price,
  original_price,
  image,
  badge,
  category,
  sizes,
  details,
  how_to_use,
  ingredients,
  delivery,
  updated_at
) VALUES (
  $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  image = EXCLUDED.image,
  badge = EXCLUDED.badge,
  category = EXCLUDED.category,
  sizes = EXCLUDED.sizes,
  details = EXCLUDED.details,
  how_to_use = EXCLUDED.how_to_use,
  ingredients = EXCLUDED.ingredients,
  delivery = EXCLUDED.delivery,
  updated_at = NOW();
`

async function main() {
  const client = new Client({ connectionString })
  await client.connect()

  try {
    console.log("Ensuring catalog table exists...")
    await client.query(TABLE_SCHEMA)

    console.log(`Pushing ${catalogProducts.length} catalog entries into ${TABLE_NAME}...`)
    let written = 0

    for (const product of catalogProducts) {
      const values = [
        product.id,
        product.name,
        product.tagline,
        product.description,
        product.price,
        product.originalPrice,
        product.image,
        product.badge,
        product.category,
        JSON.stringify(product.sizes),
        product.details,
        product.howToUse,
        product.ingredients,
        product.delivery,
        new Date(),
      ]

      await client.query(UPSERT_QUERY, values)
      written += 1
    }

    console.log(`✅ Successfully upserted ${written} products.`)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error("Failed to push products:", error)
  process.exit(1)
})
