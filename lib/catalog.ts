export type ProductCategory = "clothing" | "accessories" | "lifestyle" | "tattoos"
export type ShopCategory = "all" | ProductCategory
export type ProductBadge = "Bestseller" | "New" | "Sale" | "Girls' Choice" | "Wild" | null

export interface CatalogProduct {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  badge: ProductBadge
  category: ProductCategory
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
}

export const productCategories: ProductCategory[] = ["clothing", "accessories", "lifestyle", "tattoos"]

export const shopCategories: ShopCategory[] = ["all", ...productCategories]

export const shopCategoryLabels: Record<ShopCategory, string> = {
  all: "All",
  clothing: "Clothing",
  accessories: "Accessories",
  lifestyle: "Lifestyle",
  tattoos: "One-Time Tattoos",
}

export function isShopCategory(value: string | null | undefined): value is ShopCategory {
  return Boolean(value && shopCategories.includes(value as ShopCategory))
}

const standardDelivery =
  "Free standard shipping on orders over $50. Express delivery available at checkout. Orders ship within 1–2 business days."

const tattooDelivery =
  "Ships flat in protective sleeves. Free standard shipping on orders over $50. Orders typically dispatch within 1–2 business days."

const tattooImage = (slug: string) => `/images/tattoos/${slug}.svg`

const curatedCatalogProducts: CatalogProduct[] = [
  {
    id: "lemon-dress",
    name: "Sunshine Lemon Dress",
    tagline: "Squeeze the day in style",
    description: "Vibrant yellow cotton dress with a cheerful lemon print for bright everyday styling.",
    price: 45,
    originalPrice: 55,
    image: "/placeholder.svg",
    badge: "Bestseller",
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    details: "A breathable cotton dress with a softly cinched waist, relaxed skirt, and playful all-over print designed for sunny-day comfort.",
    howToUse: "Machine wash cold with like colors. Hang to dry or tumble dry low. Iron on low heat when needed.",
    ingredients: "100% cotton fabric, natural-feel lining, colorfast printed finish.",
    delivery: standardDelivery,
  },
  {
    id: "citrus-tote",
    name: "Citrus Canvas Tote",
    tagline: "Carry your sunshine everywhere",
    description: "Durable canvas tote bag built for everyday essentials with a bright citrus look.",
    price: 22,
    originalPrice: null,
    image: "/placeholder.svg",
    badge: "New",
    category: "accessories",
    sizes: ["One Size"],
    details: "A roomy carryall with reinforced handles, inner pocket storage, and a structured base for daily errands or weekend plans.",
    howToUse: "Spot clean with a damp cloth. Avoid bleach and machine drying to preserve shape and print quality.",
    ingredients: "Heavyweight cotton canvas with woven shoulder straps.",
    delivery: standardDelivery,
  },
  {
    id: "zest-candle",
    name: "Lemon Zest Candle",
    tagline: "A brighter mood in every room",
    description: "Fresh scented soy candle that brings a clean citrus glow to bedrooms, desks, and cozy corners.",
    price: 18,
    originalPrice: null,
    image: "/placeholder.svg",
    badge: null,
    category: "lifestyle",
    sizes: ["8 oz"],
    details: "Hand-poured soy wax candle with a cotton wick and soft citrus fragrance designed for a clean, even burn.",
    howToUse: "Trim wick to 1/4 inch before each use. Burn on a stable heat-safe surface for up to 3 hours at a time.",
    ingredients: "Soy wax blend, cotton wick, citrus fragrance oil.",
    delivery: standardDelivery,
  },
  {
    id: "spring-hat",
    name: "Spring Meadow Hat",
    tagline: "Shade with a soft floral finish",
    description: "Protective sun hat with charming floral details and an easy, lightweight fit.",
    price: 28,
    originalPrice: 35,
    image: "/placeholder.svg",
    badge: "Sale",
    category: "accessories",
    sizes: ["One Size"],
    details: "Wide-brim silhouette with a flexible structure and airy feel, made for vacations, park days, and warm-weather styling.",
    howToUse: "Store flat or gently hung. Spot clean only and avoid prolonged folding to preserve brim shape.",
    ingredients: "Woven straw blend with soft inner band and decorative trim.",
    delivery: standardDelivery,
  },
  {
    id: "lemon-tee",
    name: "Lemon Squeeze Tee",
    tagline: "Everyday comfort with a playful twist",
    description: "Organic cotton tee with a cheerful graphic and an easy relaxed fit for everyday wear.",
    price: 25,
    originalPrice: null,
    image: "/placeholder.svg",
    badge: null,
    category: "clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: "Soft-touch jersey tee with a slightly oversized cut, durable neckline, and versatile styling for layering or standalone wear.",
    howToUse: "Wash cold inside out with similar colors. Tumble dry low or line dry to maintain softness and print clarity.",
    ingredients: "100% organic cotton jersey.",
    delivery: standardDelivery,
  },
  {
    id: "lemon-socks",
    name: "Sour & Sweet Socks",
    tagline: "Tiny lemons, big comfort",
    description: "Comfortable everyday socks finished with miniature lemon patterns and a soft stretch fit.",
    price: 12,
    originalPrice: null,
    image: "/placeholder.svg",
    badge: "New",
    category: "clothing",
    sizes: ["S/M", "M/L"],
    details: "Cushioned sole, ribbed cuff, and lightweight knit structure designed for all-day comfort with sneakers, loafers, or lounge sets.",
    howToUse: "Machine wash warm with similar colors. Tumble dry low. Do not iron or bleach.",
    ingredients: "Cotton blend with stretch yarn for fit retention.",
    delivery: standardDelivery,
  },
  {
    id: "high-rise-pleated-mini",
    name: "High-Rise Pleated Mini Skirt",
    tagline: "Sharp lines, instant energy",
    description: "A flirty pleated mini with a clean high waist and easy movement for nights out, brunch plans, and styled-up everyday looks.",
    price: 42,
    originalPrice: 58,
    image: "https://img.kwcdn.com/product/fmket/2e849bc0b2cfe454c3c3f434dbea1b18.jpg",
    badge: "New",
    category: "clothing",
    sizes: ["XS", "S", "M", "L"],
    details: "Designed with a crisp pleated shape, soft drape, and comfortable waistband that pairs well with baby tees, fitted knits, or oversized blazers.",
    howToUse: "Wash cold on gentle cycle and reshape while damp. Hang dry to keep the pleats looking sharp.",
    ingredients: "Soft-touch woven blend with light structure and flexible waistband finish.",
    delivery: standardDelivery,
  },
  {
    id: "streetline-pleated-skirt",
    name: "Streetline A-Line Pleated Skirt",
    tagline: "A stronger silhouette for daily styling",
    description: "A versatile A-line skirt with a sharper streetwear edge and flattering high-rise shape for quick statement outfits.",
    price: 34,
    originalPrice: 46,
    image: "https://img.kwcdn.com/product/fmket/47a01d1e7b9359969b5c4555953f2898.jpg",
    badge: "Sale",
    category: "clothing",
    sizes: ["S", "M", "L", "XL"],
    details: "Made for tucked tanks, mesh layers, and cropped jackets with a silhouette that swings without losing shape.",
    howToUse: "Machine wash cold with dark colors and line dry. Steam lightly to refresh the pleats.",
    ingredients: "Poly blend shell with smooth inner feel and reinforced waistband seams.",
    delivery: standardDelivery,
  },
  {
    id: "rosewire-lace-set",
    name: "Rosewire Lace Bralette Set",
    tagline: "Soft structure with a bold finish",
    description: "A contrast lace lingerie set with adjustable straps, expressive detailing, and a comfortable fit that still feels statement-making.",
    price: 20,
    originalPrice: 29,
    image: "https://img.kwcdn.com/product/fancy/0927024b-bc2f-422d-9fc2-4e9e16202739.jpg",
    badge: "Bestseller",
    category: "clothing",
    sizes: ["S", "M", "L"],
    details: "Includes a lightweight bralette and matching bottoms designed for all-day comfort, layering, and elevated lounge styling.",
    howToUse: "Hand wash cold and lay flat to dry to preserve lace texture and elastic recovery.",
    ingredients: "Stretch lace, soft mesh lining, adjustable shoulder hardware, and flexible elastic trim.",
    delivery: standardDelivery,
  },
  {
    id: "nightfall-corset-top",
    name: "Nightfall Mesh Corset Top",
    tagline: "Defined shape, polished edge",
    description: "A fitted corset-style top with mesh structure, lace-up energy, and a sleek going-out silhouette.",
    price: 32,
    originalPrice: 45,
    image: "https://img.kwcdn.com/product/fmket/94367590bdbb86c3f353141ca96e3aae.jpg",
    badge: "New",
    category: "clothing",
    sizes: ["XS", "S", "M", "L"],
    details: "Built to style with denim, pleated skirts, or tailored pants thanks to supportive paneling and adjustable straps.",
    howToUse: "Spot clean or hand wash cold. Air dry away from direct heat to keep the shaping smooth.",
    ingredients: "Support mesh, stretch lining, rhinestone accents, and lace-up inspired trim.",
    delivery: standardDelivery,
  },
  {
    id: "midnight-lace-duo",
    name: "Midnight Lace Duo Set",
    tagline: "Lightweight lace for after-dark styling",
    description: "A semi-sheer lace bra and brief set designed to feel soft, flattering, and polished under fitted layers or lounge looks.",
    price: 22,
    originalPrice: 31,
    image: "https://img.kwcdn.com/product/fancy/6725d8a4-04f9-4b47-9a7d-b2104a447cef.jpg",
    badge: "New",
    category: "clothing",
    sizes: ["S", "M", "L"],
    details: "Features a V-neck lace bralette, matching briefs, and an easy stretch fit made for comfortable everyday wear.",
    howToUse: "Hand wash cold and lay flat to dry. Avoid bleach and rough agitation.",
    ingredients: "Semi-sheer lace, soft stretch elastic, and lightweight mesh support panels.",
    delivery: standardDelivery,
  },
  {
    id: "orbit-tracking-tripod",
    name: "Orbit Face-Tracking Tripod",
    tagline: "Hands-free filming with clean movement",
    description: "A smart face-tracking phone tripod built for livestreams, tutorials, creator setups, and easy solo content capture.",
    price: 135,
    originalPrice: 169,
    image: "https://img.kwcdn.com/product/21a488b5e6/48c3f8ba-5de5-46c9-8fbf-55b5133b801d_1280x1280.jpeg",
    badge: "New",
    category: "accessories",
    sizes: ["One Size"],
    details: "Features 360° tracking, an adjustable mount, and a stable tripod base for product filming, GRWM videos, and desk-friendly setups.",
    howToUse: "Unfold the base, mount your phone, and activate tracking mode before filming. Store fully collapsed after use.",
    ingredients: "ABS body, reinforced hinge points, stabilized tripod legs, and rechargeable tracking module.",
    delivery: standardDelivery,
  },
  {
    id: "neon-heart-ink-sheets",
    name: "Neon Heart Ink Sheets",
    tagline: "Playful one-time tattoos for bold looks",
    description: "A two-sheet set of bright heart temporary tattoos designed for parties, festivals, beach looks, and layered body-art styling.",
    price: 14,
    originalPrice: 19,
    image: tattooImage("neon-heart-ink-sheets"),
    badge: "New",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "Packed with high-impact heart graphics in punchy pink and red tones for neck, arm, shoulder, or collarbone placement.",
    howToUse: "Apply to clean dry skin, press with water for 20–30 seconds, then peel away the backing. Remove gently with oil or micellar cleanser.",
    ingredients: "Skin-safe temporary pigment film, transfer paper backing, and cosmetic-grade adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "script-shadow-tattoo-sheet",
    name: "Script Shadow Tattoo Sheet",
    tagline: "Minimal phrases with sharp contrast",
    description: "A waterproof one-time tattoo sheet with dark scripted phrases and graphic accents for collarbone, arm, leg, or back placement.",
    price: 4,
    originalPrice: 7,
    image: tattooImage("script-shadow-tattoo-sheet"),
    badge: null,
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "Great for layered styling, concert looks, and quick visual details when you want ink energy without long wear.",
    howToUse: "Trim around the artwork, press onto clean skin with a damp cloth, and let it set before dressing. Remove with cleansing oil.",
    ingredients: "Water-transfer temporary pigment, lightweight adhesive layer, and glossy protective film.",
    delivery: tattooDelivery,
  },
  {
    id: "love-note-ink-pack",
    name: "Love Note One-Time Ink Pack",
    tagline: "Romantic mini tattoos in seconds",
    description: "A five-piece set of one-time tattoo stickers featuring sweet phrase art made for date nights, photo shoots, and playful gifting.",
    price: 6,
    originalPrice: 10,
    image: tattooImage("love-note-ink-pack"),
    badge: "Sale",
    category: "tattoos",
    sizes: ["5 Pieces"],
    details: "Each pack includes compact word-based tattoo designs sized for wrists, shoulders, ankles, or layered torso placement.",
    howToUse: "Press each tattoo onto clean skin with water, allow to dry fully, and avoid heavy rubbing for longer wear.",
    ingredients: "Temporary transfer ink film, safe adhesive layer, and paper backing sheets.",
    delivery: tattooDelivery,
  },
  {
    id: "cherry-check-pleated-skirt",
    name: "Cherry Check Pleated Skirt",
    tagline: "Sharp pleats with a bold plaid finish",
    description: "A red plaid pleated mini skirt designed for concert looks, layered streetwear, and playful everyday styling.",
    price: 19,
    originalPrice: 27,
    image: "https://img.kwcdn.com/product/fancy/9c2a7387-134f-483f-90f8-4332184934c4.jpg",
    badge: "New",
    category: "clothing",
    sizes: ["XS", "S", "M", "L"],
    details: "Features a clean waistband, set pleats, and a swingy mini shape that pairs easily with fitted tops, sweaters, or boots.",
    howToUse: "Machine wash cold on gentle and hang to dry to help preserve pleat structure.",
    ingredients: "Plaid poly-viscose shell, lightweight lining, and stitched pleat setting.",
    delivery: standardDelivery,
  },
  {
    id: "after-dark-corset-bustier",
    name: "After Dark Corset Bustier",
    tagline: "Structured shine for going-out fits",
    description: "A rhinestone-trim corset bustier with contour seams and a sculpted silhouette made for after-dark styling.",
    price: 29,
    originalPrice: 39,
    image: "https://img.kwcdn.com/product/fmket/d5ff446ed5322bd74045f1a3f28654c0.jpg",
    badge: "Sale",
    category: "clothing",
    sizes: ["XS", "S", "M", "L"],
    details: "Designed with shaping seams, a fitted bodice, and embellished trim that works with skirts, denim, or layered jackets.",
    howToUse: "Hand wash cold and reshape while damp. Air dry flat to maintain the structured silhouette.",
    ingredients: "Stretch body fabric, soft inner mesh, rhinestone detailing, and flexible contour boning.",
    delivery: standardDelivery,
  },
  {
    id: "velvet-lace-bralette-set",
    name: "Velvet Lace Bralette Set",
    tagline: "Soft stretch lace with a polished finish",
    description: "A lightweight lace bralette and brief set made for easy layering, lounge looks, and fitted outfit styling.",
    price: 21,
    originalPrice: 29,
    image: "https://img.kwcdn.com/product/fancy/47b7aed4-05fc-4309-b63a-75f619df619b.jpg",
    badge: "New",
    category: "clothing",
    sizes: ["S", "M", "L"],
    details: "Includes a soft triangle bralette, matching brief, and flexible stretch finish designed for smooth all-day wear.",
    howToUse: "Hand wash cold and lay flat to dry. Avoid rough agitation to protect the lace texture.",
    ingredients: "Floral lace, soft stretch mesh, adjustable straps, and elastic support trim.",
    delivery: standardDelivery,
  },
  {
    id: "halo-smart-tripod-stand",
    name: "Halo Smart Tripod Stand",
    tagline: "Compact creator gear for solo shooting",
    description: "A compact smart tripod stand built for GRWM videos, desk tutorials, livestreams, and easy hands-free filming.",
    price: 98,
    originalPrice: 129,
    image: "https://img.kwcdn.com/product/fmket/03ee0ea96b266363be4007f85cb95477.jpg",
    badge: "New",
    category: "accessories",
    sizes: ["One Size"],
    details: "Features a stable folding base, adjustable phone mount, and tracking-ready head for smoother solo content capture.",
    howToUse: "Set the stand on a level surface, mount your phone securely, and adjust height before recording.",
    ingredients: "ABS frame, reinforced hinges, adjustable mount hardware, and rechargeable tracking head.",
    delivery: standardDelivery,
  },
  {
    id: "crimson-kiss-tattoo-duo",
    name: "Crimson Kiss Tattoo Duo",
    tagline: "Heart-led ink for playful outfit details",
    description: "A bold two-sheet temporary tattoo duo with bright heart artwork sized for collarbones, wrists, shoulders, and layered festival styling.",
    price: 12,
    originalPrice: 17,
    image: tattooImage("crimson-kiss-tattoo-duo"),
    badge: "Sale",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "Made for quick high-contrast styling moments, this duo gives you multiple heart motifs to mix across one look or split across separate outfits.",
    howToUse: "Apply to clean dry skin with water for 20–30 seconds, then peel carefully. Remove with cleansing oil when you want a clean reset.",
    ingredients: "Temporary transfer ink film, skin-safe adhesive layer, and glossy paper backing.",
    delivery: tattooDelivery,
  },
  {
    id: "midnight-script-ink-set",
    name: "Midnight Script Ink Set",
    tagline: "Dark phrase tattoos with a sharper edge",
    description: "A one-sheet waterproof tattoo set with statement script and graphic details designed for arms, collarbones, legs, and back placement.",
    price: 5,
    originalPrice: 8,
    image: tattooImage("midnight-script-ink-set"),
    badge: "New",
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "The mix of compact phrase art and darker line work makes this a good fit for concerts, nightlife looks, and quick styled shoots.",
    howToUse: "Cut around each design, place on clean skin, and press with a damp cloth until the backing slides away. Remove with oil or balm cleanser.",
    ingredients: "Water-transfer pigment layer, safe cosmetic adhesive, and protective transfer sheet.",
    delivery: tattooDelivery,
  },
  {
    id: "rose-glow-mini-ink-pack",
    name: "Rose Glow Mini Ink Pack",
    tagline: "Small romantic tattoos for soft styling",
    description: "A five-piece mini tattoo pack with sweet phrase artwork designed for wrists, ankles, shoulders, and layered date-night looks.",
    price: 7,
    originalPrice: 11,
    image: tattooImage("rose-glow-mini-ink-pack"),
    badge: "New",
    category: "tattoos",
    sizes: ["5 Pieces"],
    details: "Each mini design is sized for subtle placement so you can scatter several tattoos across one look without it feeling too heavy.",
    howToUse: "Press each piece onto clean dry skin with water and let it dry fully before adding lotion or clothing over the area.",
    ingredients: "Temporary transfer pigment, lightweight adhesive film, and paper backing sheets.",
    delivery: tattooDelivery,
  },
  {
    id: "venom-heart-body-ink-sheet",
    name: "Venom Heart Body Ink Sheet",
    tagline: "Thorned heart artwork with dramatic contrast",
    description: "A single-sheet temporary tattoo with thorned heart motifs and sharp linework designed for shoulders, arms, ribs, and late-night styling.",
    price: 9,
    originalPrice: 14,
    image: tattooImage("venom-heart-body-ink-sheet"),
    badge: "New",
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "High-contrast heart and thorn motifs make this sheet the boldest option in the tattoo drop, especially when layered with black separates or chrome accessories.",
    howToUse: "Trim the design you want, press onto clean dry skin with a damp cloth, then let it set completely before dressing or adding body oil.",
    ingredients: "Water-transfer pigment layer, glossy sealing film, and skin-safe cosmetic adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "chrome-siren-star-sheet",
    name: "Chrome Siren Star Sheet",
    tagline: "Chrome stars for high-flash styling moments",
    description: "A silver-toned temporary tattoo sheet with starburst and chrome-inspired motifs made for collarbones, hips, wrists, and photo-shoot looks.",
    price: 8,
    originalPrice: 12,
    image: tattooImage("chrome-siren-star-sheet"),
    badge: "Bestseller",
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "The mirrored-star artwork catches light beautifully in flash photography, making it ideal for nightlife fits, party looks, and glossy editorials.",
    howToUse: "Place the artwork face-down on clean skin, saturate with water for 20–30 seconds, and peel gently once the backing loosens.",
    ingredients: "Metallic-look transfer pigment, skin-safe adhesive layer, and protective carrier sheet.",
    delivery: tattooDelivery,
  },
  {
    id: "wild-rose-spine-ink-set",
    name: "Wild Rose Spine Ink Set",
    tagline: "Vertical rose tattoos for statement placement",
    description: "A two-sheet temporary tattoo set with rose, stem, and spine-length artwork created for backs, legs, and elongated placement styling.",
    price: 13,
    originalPrice: 18,
    image: tattooImage("wild-rose-spine-ink-set"),
    badge: "New",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "This set is built for longer placements, giving you a more directional look that still removes easily when the night is over.",
    howToUse: "Use on clean flat skin for the cleanest transfer, press firmly with water, and wait until the backing releases before lifting.",
    ingredients: "Temporary transfer pigment, flexible carrier paper, and cosmetic-grade adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "luxe-chain-ink-duo",
    name: "Luxe Chain Ink Duo",
    tagline: "Chain-inspired body art with a polished finish",
    description: "A two-sheet temporary tattoo duo featuring chain-link motifs and accent charms designed for wrists, ankles, necklines, and layered styling.",
    price: 11,
    originalPrice: 15,
    image: tattooImage("luxe-chain-ink-duo"),
    badge: "Sale",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "The linked motifs mimic jewelry styling without the hardware, letting you stack body-art details into a more polished night-out look.",
    howToUse: "Apply each strip to clean dry skin, press with a damp cloth until fully transferred, and remove with cleansing oil when finished.",
    ingredients: "Temporary transfer pigment film, lightweight gloss seal, and skin-safe adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "poison-cherry-flame-sheet",
    name: "Poison Cherry Flame Sheet",
    tagline: "Cherry-fire motifs with glossy heat",
    description: "A one-sheet temporary tattoo with cherry, flame, and sparkle motifs designed for hips, shoulders, wrists, and nightlife looks.",
    price: 10,
    originalPrice: 14,
    image: tattooImage("poison-cherry-flame-sheet"),
    badge: "New",
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "The cherry-and-flame mix gives this sheet a playful but sharper mood, especially when paired with glossy fabrics, mini skirts, and chrome accessories.",
    howToUse: "Place the selected design face-down on clean dry skin, press with water for 20–30 seconds, and let the transfer set before dressing.",
    ingredients: "Temporary transfer pigment layer, protective gloss film, and skin-safe cosmetic adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "electric-halo-spine-sheet",
    name: "Electric Halo Spine Sheet",
    tagline: "Halo and lightning art for long placements",
    description: "A two-sheet temporary tattoo set mixing halos, bolts, and vertical accents for spine, leg, and sternum styling.",
    price: 12,
    originalPrice: 16,
    image: tattooImage("electric-halo-spine-sheet"),
    badge: "Bestseller",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "Built for longer placements, this sheet pairs luminous halo shapes with slim lightning details that hold up best in cleaner, high-contrast looks.",
    howToUse: "Use on clean flat skin, saturate the backing evenly, and let the transfer settle fully before bending or layering over the area.",
    ingredients: "Water-transfer pigment, flexible carrier paper, and cosmetic-grade adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "dagger-lace-ink-duo",
    name: "Dagger Lace Ink Duo",
    tagline: "Sharp motifs softened with lace detail",
    description: "A two-sheet temporary tattoo duo with dagger, ribbon, and lace-inspired linework made for arms, thighs, and layered alt styling.",
    price: 11,
    originalPrice: 15,
    image: tattooImage("dagger-lace-ink-duo"),
    badge: "Sale",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "The mix of pointed dagger silhouettes and softer lace framing makes this set feel both romantic and aggressive without getting visually heavy.",
    howToUse: "Trim closely around each design, apply with a damp cloth, and avoid rubbing the area until the transfer is fully dry.",
    ingredients: "Temporary transfer pigment film, glossy seal layer, and skin-safe adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "nocturne-moth-charm-sheet",
    name: "Nocturne Moth Charm Sheet",
    tagline: "Night moths and charm motifs with softer edge",
    description: "A one-sheet temporary tattoo with moth, crescent, and charm motifs for collarbones, shoulders, and back-of-arm placements.",
    price: 9,
    originalPrice: 13,
    image: tattooImage("nocturne-moth-charm-sheet"),
    badge: "New",
    category: "tattoos",
    sizes: ["1 Sheet"],
    details: "This sheet keeps the wild collection a little moodier, with softer nocturnal motifs that still play well with black lace, silver jewelry, and night-out makeup.",
    howToUse: "Apply to clean dry skin with water pressure, allow the tattoo to dry completely, and remove gently with cleansing oil when done.",
    ingredients: "Water-transfer pigment layer, protective film, and cosmetic adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "serpent-coil-sleeve",
    name: "Serpent Coil XL Sleeve",
    tagline: "Wrap your story in wild ink",
    description: "A large-scale, high-detail serpent tattoo designed to wrap fully around the arm or leg for a bold, continuous visual flow.",
    price: 18,
    originalPrice: 25,
    image: tattooImage("serpent-coil-sleeve"),
    badge: "Wild",
    category: "tattoos",
    sizes: ["1 XL Sheet"],
    details: "Intricate scale detailing and fluid motion design that follows the natural curves of the body. Waterproof and long-lasting for festival weekends.",
    howToUse: "Clean the skin area. Peel the clear film. Press firmly and saturate with a damp cloth for 60 seconds. Peel slowly.",
    ingredients: "Eco-friendly temporary ink, medical-grade adhesive, high-resolution transfer film.",
    delivery: tattooDelivery,
  },
  {
    id: "midnight-panther-chest",
    name: "Midnight Panther Chest Piece",
    tagline: "Primal energy, temporary soul",
    description: "A symmetrical, traditional-style panther design optimized for chest or upper back placement.",
    price: 15,
    originalPrice: 22,
    image: tattooImage("midnight-panther-chest"),
    badge: "Bestseller",
    category: "tattoos",
    sizes: ["1 Large Sheet"],
    details: "Deep black pigments with subtle grey shading to mimic professional studio ink. Sized to command attention.",
    howToUse: "Best applied on flat surfaces like the chest. Shave area for maximum adherence. Press with warm water.",
    ingredients: "Non-toxic soy-based ink, transfer paper, matte finish coating.",
    delivery: tattooDelivery,
  },
  {
    id: "ethereal-dragon-back",
    name: "Ethereal Dragon Back Mural",
    tagline: "A masterpiece for the night",
    description: "A sprawling, delicate dragon illustration that covers the entire back with ethereal line-work.",
    price: 24,
    originalPrice: 35,
    image: tattooImage("ethereal-dragon-back"),
    badge: "New",
    category: "tattoos",
    sizes: ["2 XL Sheets"],
    details: "Combines fine-line art with larger shaded areas for a professional, multi-layered look. Perfect for open-back dresses.",
    howToUse: "Requires a partner for application. Align the two sheets carefully before wetting.",
    ingredients: "High-fidelity transfer film, skin-safe pigment, gloss-free finish.",
    delivery: tattooDelivery,
  },
  {
    id: "thorny-vine-wrap",
    name: "Thorny Vine Leg Wrap",
    tagline: "Delicate thorns, powerful aesthetic",
    description: "A modular vine system that can be wrapped around legs, arms, or the torso in customizable patterns.",
    price: 12,
    originalPrice: null,
    image: tattooImage("thorny-vine-wrap"),
    badge: null,
    category: "tattoos",
    sizes: ["3 Modular Strips"],
    details: "Dark green and black tones with sharp thorn details. Can be cut to size for custom placements.",
    howToUse: "Apply strip by strip, overlapping slightly at the edges for a seamless vine effect.",
    ingredients: "Waterproof temporary pigment, flex-fit adhesive.",
    delivery: tattooDelivery,
  },
  {
    id: "barbed-wire-halo",
    name: "Barbed Wire Halo Set",
    tagline: "Industrial edge for the modern spirit",
    description: "A set of barbed wire bands and circular 'halos' for wrists, biceps, or necks.",
    price: 9,
    originalPrice: 14,
    image: tattooImage("barbed-wire-halo"),
    badge: "Sale",
    category: "tattoos",
    sizes: ["2 Sheets"],
    details: "Classic industrial aesthetic with high-contrast black ink. Includes multiple lengths and styles.",
    howToUse: "Measure around your wrist or arm first. Trim the strip to fit, then apply with water.",
    ingredients: "Skin-safe ink film, adhesive backing.",
    delivery: tattooDelivery,
  },
  {
    id: "cyber-tribal-torso",
    name: "Cyber-Tribal Torso Fragments",
    tagline: "Neo-tribal energy for the digital age",
    description: "Geometric, sharp-edged tribal fragments designed for asymmetrical placement on the torso or hips.",
    price: 16,
    originalPrice: null,
    image: tattooImage("cyber-tribal-torso"),
    badge: "New",
    category: "tattoos",
    sizes: ["1 Large Sheet"],
    details: "Futuristic sharp lines and solid black fills. Designed to accentuate muscle tone and body shape.",
    howToUse: "Apply to clean, dry skin. Best placed on the side-torso or lower back.",
    ingredients: "Heavyweight transfer paper, premium matte ink.",
    delivery: tattooDelivery,
  },
  {
    id: "girls-night-charcuterie",
    name: "Aesthetic Brunch Board Set",
    tagline: "Host the perfect girls' time",
    description: "A complete bamboo charcuterie set with marble accents and serving tools for the ultimate aesthetic spread.",
    price: 65,
    originalPrice: 85,
    image: "/placeholder.svg",
    badge: "New",
    category: "lifestyle",
    sizes: ["Large"],
    details: "Includes a 15-inch bamboo board, three ceramic dipping bowls, and a 4-piece cheese knife set.",
    howToUse: "Hand wash board with mild soap. Ceramic bowls are dishwasher safe.",
    ingredients: "Sustainable bamboo, natural marble, stainless steel tools.",
    delivery: standardDelivery,
  },
  {
    id: "lemon-martini-glass-set",
    name: "Zesty Coupe Glass Duo",
    tagline: "Sip in citrus-tinted luxury",
    description: "Hand-blown martini glasses with a subtle yellow tint and a wide, elegant coupe shape.",
    price: 38,
    originalPrice: null,
    image: "/placeholder.svg",
    badge: "Bestseller",
    category: "lifestyle",
    sizes: ["Set of 2"],
    details: "Perfect for lemon drops or espresso martinis. Fine rim and slender stem for a premium feel.",
    howToUse: "Hand wash recommended to maintain the delicate yellow tint and glass clarity.",
    ingredients: "Lead-free crystal glass with organic yellow pigment.",
    delivery: standardDelivery,
  },
]

const TOTAL_CATALOG_PRODUCTS = 1000

const extraAdjectives = [
  "Luminous",
  "Velvet",
  "Daydream",
  "Auburn",
  "Iridescent",
  "Sculpted",
  "Opaline",
  "Sunlit",
  "Dusky",
  "Glacial",
  "Rich",
  "Serene",
]

const taglineTemplates: Record<ProductCategory, string> = {
  clothing: "{adjective} tailoring with effortless movement",
  accessories: "{adjective} accents to polish any outfit",
  lifestyle: "{adjective} essentials for luminous rituals",
  tattoos: "{adjective} ink that reads like a statement",
}

const categoryFocus: Record<ProductCategory, string> = {
  clothing: "clothing piece",
  accessories: "accessory accent",
  lifestyle: "lifestyle essential",
  tattoos: "temporary ink story",
}

const descriptionVerbs: Record<ProductCategory, string[]> = {
  clothing: [
    "cinch into bold silhouettes without sacrificing comfort",
    "blend sculpted tailoring with slow-draped ease",
    "move effortlessly across days built for minimal fuss",
  ],
  accessories: [
    "finish every outfit with polished hardware and tactile textures",
    "keep essentials within easy reach with refined lines",
    "introduce subtle contrast while staying weightless",
  ],
  lifestyle: [
    "turn quiet routines into celebratory rituals",
    "anchor your day with calm yet confident energy",
    "animate shared moments with thoughtful finishes",
  ],
  tattoos: [
    "land as studio-grade statement art without the commitment",
    "accent skin with high-contrast detail that photographs cleanly",
    "layer with glossy fabrics or matte accessories while still feeling removable",
  ],
}

const detailNotes: Record<ProductCategory, string[]> = {
  clothing: [
    "Tailored darts keep the silhouette clean while letting layers peek through.",
    "Soft stretch panels trace the body for a flattering, modern drape.",
    "Precision seams map to your shape so this piece layers easily under jackets.",
  ],
  accessories: [
    "Minimal hardware and brushed finishes keep the look refined and travel-ready.",
    "Structured stitching and hidden pockets stay smooth even under a shoulder strap.",
    "Textural woven surfaces add depth while remaining weightless in wear.",
  ],
  lifestyle: [
    "Hand-finishing brings a quiet luxe sheen to every surface.",
    "Cozy, tactile materials invite slow mornings and curated gatherings.",
    "Balanced proportions make this roster-ready for any ritual you rehearse.",
  ],
  tattoos: [
    "Micro-details and bold lines make this feel like professional studio ink.",
    "Layer-friendly placements keep the look versatile across digits and limbs.",
    "A matte finish keeps the art crisp under flash photography.",
  ],
}

const howToUseNotes: Record<ProductCategory, string[]> = {
  clothing: [
    "Machine wash cold, tumble dry low, and reshape while damp.",
    "Turn inside out before washing to preserve surface textures.",
    "Use a gentle cycle and hang dry to keep the structure sharp.",
  ],
  accessories: [
    "Wipe clean with a damp cloth and allow to air dry.",
    "Store flat in the dust bag and keep away from heavy moisture.",
    "Rotate between uses to preserve the hardware sheen.",
  ],
  lifestyle: [
    "Hand wash gently, then air dry on a cloth to keep the finish calm.",
    "Spot clean spills immediately with mild soap.",
    "Treat with a light polish every few uses for a luminous patina.",
  ],
  tattoos: [
    "Press onto clean skin with water for at least 30 seconds.",
    "Avoid lotions for the first hour after application.",
    "Remove with cleansing oil or micellar water when you want a clean slate.",
  ],
}

const ingredientNotes: Record<ProductCategory, string[]> = {
  clothing: [
    "Recycled cotton, modal, and stretch elastane for effortless movement.",
    "Organic cotton with a soft-tech elastane core for drape and coverage.",
    "Micro-rib knit with linen-inspired fibers for breathing structure.",
  ],
  accessories: [
    "Italian nylon webbing with brushed stainless accents.",
    "Cotton canvas with vegan leather trims and subtle hardware.",
    "Lightweight recycled polymers balanced with chrome-dipped clasps.",
  ],
  lifestyle: [
    "Sustainable bamboo, porcelain, and brushed brass details.",
    "Hand-blown glass, natural cork, and cold-pressed oils.",
    "Recycled ceramic, organic cotton, and plant-based waxes.",
  ],
  tattoos: [
    "Cosmetic-grade pigment, breathable film, and protective seal.",
    "Water-transfer ink, adhesive layer, and medicated backing.",
    "Skin-safe polymer film with shimmer-free pigment panels.",
  ],
}

const categoryNameSuffix: Record<ProductCategory, string> = {
  clothing: "Loom",
  accessories: "Signal",
  lifestyle: "Studio",
  tattoos: "Ink",
}

const categorySizesMap: Record<ProductCategory, string[]> = {
  clothing: ["XS", "S", "M", "L", "XL"],
  accessories: ["One Size"],
  lifestyle: ["Standard"],
  tattoos: ["1 Sheet"],
}

const categoryPriceBase: Record<ProductCategory, number> = {
  clothing: 42,
  accessories: 32,
  lifestyle: 28,
  tattoos: 9,
}

const categoryImagePool: Record<ProductCategory, string[]> = {
  clothing: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1507764923503-6ccfcf45d0b8?auto=format&fit=crop&w=900&q=80",
  ],
  tattoos: [
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1475180098004-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  ],
}

function badgeForVariant(index: number): ProductBadge {
  const cadence = (index + 2) % 13
  if (cadence === 0) return "Bestseller"
  if (cadence === 3) return "Sale"
  if (cadence === 6) return "New"
  if (cadence === 9) return "Girls' Choice"
  if (cadence === 11) return "Wild"
  return null
}

function generatePerfectlySelectedProducts(startIndex: number, count: number): CatalogProduct[] {
  if (count <= 0) {
    return []
  }

  return Array.from({ length: count }, (_, offset) => {
    const variantIndex = startIndex + offset
    const category = productCategories[variantIndex % productCategories.length]
    const adjective = extraAdjectives[variantIndex % extraAdjectives.length]
    const suffix = categoryNameSuffix[category]
    const name = `${adjective} ${suffix} ${variantIndex.toString().padStart(4, "0")}`
    const tagline = taglineTemplates[category].replace("{adjective}", adjective)
    const focus = categoryFocus[category]
    const article = /^[AEIOU]/i.test(adjective) ? "An" : "A"
    const descriptionVerb = descriptionVerbs[category][variantIndex % descriptionVerbs[category].length]
    const description = `${article} ${adjective.toLowerCase()} ${focus} designed to ${descriptionVerb}.`
    const price =
      Math.round(categoryPriceBase[category] + ((variantIndex + 1) % 6) * 4 + (category === "accessories" ? 2 : 0))
    const originalPrice = (variantIndex + 1) % 3 === 0 ? null : price + 7 + ((variantIndex + 2) % 4) * 2
    const detailsList = detailNotes[category]
    const howToUseList = howToUseNotes[category]
    const ingredientList = ingredientNotes[category]
    const imageList = categoryImagePool[category]

    return {
      id: `lemondol-batch-${variantIndex.toString().padStart(4, "0")}`,
      name,
      tagline,
      description,
      price,
      originalPrice,
      image: imageList[variantIndex % imageList.length],
      badge: badgeForVariant(variantIndex),
      category,
      sizes: categorySizesMap[category],
      details: detailsList[variantIndex % detailsList.length],
      howToUse: howToUseList[variantIndex % howToUseList.length],
      ingredients: ingredientList[variantIndex % ingredientList.length],
      delivery: category === "tattoos" ? tattooDelivery : standardDelivery,
    }
  })
}

const curatedCatalogProductsCount = curatedCatalogProducts.length
const extraProductCount = Math.max(0, TOTAL_CATALOG_PRODUCTS - curatedCatalogProductsCount)

export const catalogProducts: CatalogProduct[] = [
  ...curatedCatalogProducts,
  ...generatePerfectlySelectedProducts(curatedCatalogProductsCount + 1, extraProductCount),
]

export const shopProducts = catalogProducts.map(({ id, name, description, price, originalPrice, image, badge, category }) => ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badge,
  category,
}))

export function getProductById(id: string) {
  return catalogProducts.find((product) => product.id === id)
}

export function getProductSeoImagePath(id: string) {
  return `/product/${id}/opengraph-image`
}
