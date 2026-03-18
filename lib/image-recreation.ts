import { z } from "zod"

import { getProductById } from "@/lib/catalog"
import type { NeonDataItem } from "@/lib/neon-data"

const providerSchema = z.enum(["gemini", "imagen", "veo", "generic"])
const outputModeSchema = z.enum(["still", "motion"])
const outputUseCaseSchema = z.enum(["product-card", "editorial-hero", "detail-closeup", "social-story", "short-promo"])
const aspectRatioSchema = z.enum(["1:1", "4:5", "9:16", "16:9"])

const imageRecreationOutputSchema = z.object({
  id: z.string().min(1),
  mode: outputModeSchema,
  providerTarget: providerSchema,
  useCase: outputUseCaseSchema,
  aspectRatio: aspectRatioSchema,
  framing: z.string().min(1),
  background: z.string().min(1),
  lighting: z.string().min(1),
  stylingNotes: z.array(z.string().min(1)).min(1),
})

const imageRecreationFidelitySchema = z.object({
  mustKeep: z.array(z.string().min(1)).min(3),
  canChange: z.array(z.string().min(1)).min(2),
  mustAvoid: z.array(z.string().min(1)).min(3),
  qaChecklist: z.array(z.string().min(1)).min(4),
})

const imageRecreationPromptBlueprintSchema = z.object({
  coreIdentity: z.string().min(1),
  luxuryShift: z.string().min(1),
  composition: z.string().min(1),
  materialRead: z.string().min(1),
  backgroundDirection: z.string().min(1),
  negativePrompt: z.string().min(1),
})

const baseImageRecreationBriefSchema = z.object({
  productId: z.string().optional(),
  neonId: z.string().optional(),
  providerPriority: z.array(providerSchema).min(1),
  status: z.enum(["draft", "approved-brief", "generated", "approved-asset"]),
  objective: z.string().min(1),
  referenceImage: z.string().min(1),
  referenceNotes: z.array(z.string().min(1)).min(1),
  fidelity: imageRecreationFidelitySchema,
  outputs: z.array(imageRecreationOutputSchema).min(1),
  promptBlueprint: imageRecreationPromptBlueprintSchema,
})

export const imageRecreationBriefSchema = baseImageRecreationBriefSchema.superRefine((brief, ctx) => {
  if (brief.productId) {
    const product = getProductById(brief.productId)

    if (!product) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unknown product ID: ${brief.productId}`,
        path: ["productId"],
      })
      return
    }

    if (product.image !== brief.referenceImage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Reference image must match the catalog image for ${brief.productId}`,
        path: ["referenceImage"],
      })
    }
  } else if (!brief.neonId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either productId or neonId must be provided",
      path: ["productId"],
    })
  }
})

export type ImageRecreationBrief = z.infer<typeof imageRecreationBriefSchema>
export type ImageRecreationOutput = z.infer<typeof imageRecreationOutputSchema>
export type ImageRecreationProvider = z.infer<typeof providerSchema>

function requireProduct(productId: string) {
  const product = getProductById(productId)

  if (!product) {
    throw new Error(`Unknown product ID: ${productId}`)
  }

  return product
}

function referenceImageFor(productId: string) {
  return requireProduct(productId).image
}

const rawImageRecreationBriefs = [
  {
    productId: "nightfall-corset-top",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the exact corset top with premium editorial lighting and a luxury fashion campaign finish.",
    referenceImage: referenceImageFor("nightfall-corset-top"),
    referenceNotes: [
      "The silhouette must stay fitted and corset-led, not soften into a generic camisole.",
      "Preserve the dark mesh structure, rhinestone trim, and front shaping seams.",
      "Keep the same neckline depth and the same strap placement.",
    ],
    fidelity: {
      mustKeep: [
        "Exact corset silhouette and body-hugging fit.",
        "Same black mesh fabrication with visible support structure.",
        "Same rhinestone-accent energy and neckline geometry.",
        "Same proportions between bust, waist, and hem length.",
      ],
      canChange: [
        "Background environment can shift into a luxury editorial studio or dark marble interior.",
        "Lighting can become softer, richer, and more cinematic.",
        "Model styling, jewelry, and companion wardrobe can be upgraded.",
      ],
      mustAvoid: [
        "Do not redesign the top into a new corset shape.",
        "Do not change the product color from black.",
        "Do not remove rhinestone or structure details.",
        "Do not add logos, embroidery, sleeves, or extra hardware.",
      ],
      qaChecklist: [
        "The product is still instantly recognizable as the same corset top.",
        "The silhouette reads as fitted and structured, not loose.",
        "Black mesh and rhinestone details remain visible.",
        "Luxury treatment improves presentation without changing the garment design.",
      ],
    },
    outputs: [
      {
        id: "editorial-hero-4x5",
        mode: "still",
        providerTarget: "imagen",
        useCase: "editorial-hero",
        aspectRatio: "4:5",
        framing: "Mid-torso editorial crop with the corset centered and fully readable.",
        background: "Dark premium studio with subtle marble or velvet cues.",
        lighting: "Soft directional studio light with crisp luxury contrast.",
        stylingNotes: ["Luxury beauty look", "Minimal gold jewelry", "No distracting props"],
      },
      {
        id: "product-card-1x1",
        mode: "still",
        providerTarget: "gemini",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Clean centered crop for commerce display.",
        background: "Refined neutral studio backdrop.",
        lighting: "Bright, premium commerce lighting with high material clarity.",
        stylingNotes: ["No heavy shadows", "Fabric texture must stay clear", "Keep focus on garment"],
      },
      {
        id: "luxury-reveal-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "short-promo",
        aspectRatio: "9:16",
        framing: "Slow vertical reveal from neckline to waist.",
        background: "Low-key luxury studio environment.",
        lighting: "Controlled cinematic highlight rolloff across the mesh and trim.",
        stylingNotes: ["Slow camera move only", "No design changes", "Use same product as still brief"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact black mesh corset top with rhinestone-accent trim, fitted structured silhouette, and the same neckline, strap placement, and hem shape as the reference image.",
      luxuryShift: "Elevate it into a luxury fashion editorial look through lighting, styling, and set finish only.",
      composition: "Keep the product readable and dominant in frame with no cropping that hides the core silhouette.",
      materialRead: "Mesh texture, contour structure, and rhinestone details must remain crisp and premium.",
      backgroundDirection: "Use a restrained dark studio or marble-inspired setting that supports the product instead of distracting from it.",
      negativePrompt: "No redesign, no color change, no extra sleeves, no new embellishments, no fantasy styling, no fake brand logos.",
    },
  },
  {
    productId: "cherry-check-pleated-skirt",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the same plaid pleated mini skirt with a polished luxury streetwear presentation.",
    referenceImage: referenceImageFor("cherry-check-pleated-skirt"),
    referenceNotes: [
      "The plaid pattern must stay red-dominant and closely matched in layout.",
      "Preserve the mini length, waistband height, and pleat direction.",
      "The silhouette should still swing outward the same way as the reference.",
    ],
    fidelity: {
      mustKeep: [
        "Same red plaid color family and visual pattern intensity.",
        "Same pleated mini-skirt silhouette and waistband proportion.",
        "Same hem shape and outward flare.",
        "Same youth-streetwear styling energy without changing the garment itself.",
      ],
      canChange: [
        "Background can become an upscale studio floor or luxury apartment setting.",
        "Companion styling can add premium boots, knitwear, or tailored layers.",
        "Lighting can shift toward glossy editorial contrast.",
      ],
      mustAvoid: [
        "Do not alter the plaid into tartan with a different layout.",
        "Do not lengthen the skirt or remove pleats.",
        "Do not change the waistband construction.",
        "Do not convert it into a different skirt category.",
      ],
      qaChecklist: [
        "The skirt remains the same product at first glance.",
        "Pleats and waistband proportions match the reference.",
        "Plaid still reads as the same red check story.",
        "Luxury styling improves context without changing the garment design.",
      ],
    },
    outputs: [
      {
        id: "editorial-hero-4x5",
        mode: "still",
        providerTarget: "imagen",
        useCase: "editorial-hero",
        aspectRatio: "4:5",
        framing: "Waist-to-thigh crop with the skirt fully visible and centered.",
        background: "Luxury apartment or high-end studio with soft neutral finishes.",
        lighting: "Bright editorial light with premium texture separation.",
        stylingNotes: ["Pair with a refined fitted top", "Optional boots", "No clutter"],
      },
      {
        id: "detail-closeup-1x1",
        mode: "still",
        providerTarget: "gemini",
        useCase: "detail-closeup",
        aspectRatio: "1:1",
        framing: "Close crop on waistband and pleat quality.",
        background: "Clean premium studio setting.",
        lighting: "Focused commerce lighting showing plaid and stitching clearly.",
        stylingNotes: ["Texture-first", "No cropping that hides core plaid layout", "Luxury but simple"],
      },
      {
        id: "runway-promo-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "short-promo",
        aspectRatio: "9:16",
        framing: "Slow walking shot capturing waistband, pleats, and hem movement.",
        background: "Polished editorial corridor or premium studio floor.",
        lighting: "Clean directional light emphasizing movement and texture.",
        stylingNotes: ["Short controlled movement", "No product redesign", "Pleats must read clearly in motion"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact red plaid pleated mini skirt with the same waistband, pleat structure, hem shape, and outward flare as the reference image.",
      luxuryShift: "Upgrade the presentation into premium street-luxury editorial styling without changing the skirt itself.",
      composition: "Keep the skirt visually dominant and fully legible, especially the plaid layout and pleat spacing.",
      materialRead: "Plaid weave, pleat edges, and waistband construction must remain sharp and recognizable.",
      backgroundDirection: "Use a minimal upscale environment that adds polish but does not compete with the garment.",
      negativePrompt: "No new pattern, no length change, no pleat removal, no color drift, no logos, no fantasy costume treatment.",
    },
  },
  {
    productId: "orbit-tracking-tripod",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the same face-tracking tripod as a premium creator-tech product shot.",
    referenceImage: referenceImageFor("orbit-tracking-tripod"),
    referenceNotes: [
      "Preserve the same tracking head form, tripod geometry, and device mount shape.",
      "The product should still read as compact creator equipment rather than generic consumer electronics.",
      "Keep the fold points and proportions aligned to the reference.",
    ],
    fidelity: {
      mustKeep: [
        "Same tripod leg structure and relative height.",
        "Same face-tracking head silhouette and phone mount proportions.",
        "Same neutral dark hardware finish.",
        "Same compact creator-tool identity.",
      ],
      canChange: [
        "Background can move into a premium creator desk or dark tech studio.",
        "Lighting can become sharper and more premium.",
        "Small supporting props like clean desk surfaces may be added.",
      ],
      mustAvoid: [
        "Do not redesign the tracking head.",
        "Do not add extra arms, microphones, or accessories not in the reference.",
        "Do not change the product into a ring light or gimbal.",
        "Do not add branding or interface screens that are not present.",
      ],
      qaChecklist: [
        "The tripod remains the same product in silhouette and purpose.",
        "Tracking head and mount look unchanged in form.",
        "Creator-tech premium finish reads clearly.",
        "Extra props do not overpower the product.",
      ],
    },
    outputs: [
      {
        id: "product-card-1x1",
        mode: "still",
        providerTarget: "imagen",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Straight-on product-first shot with the full tripod visible.",
        background: "Minimal premium tech gradient or refined desk surface.",
        lighting: "Crisp controlled commerce lighting with subtle reflections.",
        stylingNotes: ["No busy props", "Focus on shape", "Device mount must stay clear"],
      },
      {
        id: "editorial-hero-16x9",
        mode: "still",
        providerTarget: "gemini",
        useCase: "editorial-hero",
        aspectRatio: "16:9",
        framing: "Wide hero shot with the tripod as the hero object on a premium creator desk.",
        background: "Luxury creator studio setup with blurred monitors or subtle desk accents.",
        lighting: "Low-glare cinematic tech light with premium contrast.",
        stylingNotes: ["Desk styling only", "No competing gadgets", "Premium creator mood"],
      },
      {
        id: "demo-reveal-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "short-promo",
        aspectRatio: "9:16",
        framing: "Slow orbit shot around the tripod with a brief mount detail close-up.",
        background: "Premium creator desk environment.",
        lighting: "Controlled product-light sweep across the hardware.",
        stylingNotes: ["Keep product exact", "No morphing", "No unrealistic tech UI"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact face-tracking tripod with the same head, mount, hinge points, and leg geometry as the reference image.",
      luxuryShift: "Present it as refined creator technology through lighting, set design, and premium tech styling only.",
      composition: "Keep the product silhouette fully readable with emphasis on the tracking head and tripod proportions.",
      materialRead: "Hardware finish, clean edges, and hinge details must remain crisp and believable.",
      backgroundDirection: "Use a restrained creator-studio environment with tasteful tech cues, not a noisy gadget scene.",
      negativePrompt: "No redesign, no extra gear, no random screens, no sci-fi styling, no logo invention, no shape drift.",
    },
  },
  {
    productId: "neon-heart-ink-sheets",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the same temporary tattoo sheets as premium beauty-editorial product imagery.",
    referenceImage: referenceImageFor("neon-heart-ink-sheets"),
    referenceNotes: [
      "Keep the same heart artwork family and bright red-pink color story.",
      "Preserve the sheet format rather than turning the product into applied skin art only.",
      "The design arrangement should stay close to the original sheet identity.",
    ],
    fidelity: {
      mustKeep: [
        "Same bright heart-focused artwork story.",
        "Same two-sheet product identity.",
        "Same playful red and pink palette.",
        "Same temporary tattoo category and application logic.",
      ],
      canChange: [
        "Background can become a premium beauty surface or luxury vanity set.",
        "One secondary output can show tasteful application on skin.",
        "Lighting can become glossy and premium.",
      ],
      mustAvoid: [
        "Do not redraw the artwork into a new tattoo theme.",
        "Do not change the color story away from bright heart-led reds and pinks.",
        "Do not make the product look permanent or realistic ink.",
        "Do not clutter the frame with unrelated props.",
      ],
      qaChecklist: [
        "The product still reads as the same tattoo sheet set.",
        "Heart artwork and color family remain recognizable.",
        "Luxury treatment feels beauty-editorial rather than novelty-party.",
        "If applied on skin, the sheet design still matches the product artwork.",
      ],
    },
    outputs: [
      {
        id: "sheet-flatlay-1x1",
        mode: "still",
        providerTarget: "imagen",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Flatlay or slight top-down shot showing the full sheets clearly.",
        background: "Luxury vanity or polished beauty surface.",
        lighting: "Glossy premium beauty lighting with clean highlights.",
        stylingNotes: ["Keep the sheets fully readable", "No heavy props", "Color fidelity is critical"],
      },
      {
        id: "beauty-editorial-4x5",
        mode: "still",
        providerTarget: "gemini",
        useCase: "editorial-hero",
        aspectRatio: "4:5",
        framing: "Beauty-editorial crop with one tattoo applied and the sheet product still present.",
        background: "Minimal luxury beauty set.",
        lighting: "Soft premium skin light with product readability preserved.",
        stylingNotes: ["Application must match sheet artwork", "No extra tattoo styles", "Luxury beauty mood"],
      },
      {
        id: "application-reveal-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "social-story",
        aspectRatio: "9:16",
        framing: "Short application-and-reveal sequence showing the sheet and final heart tattoo.",
        background: "Luxury vanity or editorial prep space.",
        lighting: "Clean beauty lighting with premium gloss.",
        stylingNotes: ["Keep artwork exact", "Avoid extra animation", "Show removable temporary-tattoo feel"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact two-sheet temporary tattoo product with the same bright heart artwork, sheet layout, and red-pink palette as the reference image.",
      luxuryShift: "Elevate the presentation into premium beauty-editorial imagery while keeping the tattoo sheet identity unchanged.",
      composition: "At least one output must keep the sheets fully readable; any applied-skin output must still connect clearly to the original sheets.",
      materialRead: "The tattoo transfer finish should look glossy, cosmetic, and temporary rather than permanent ink.",
      backgroundDirection: "Use a clean premium beauty surface or restrained vanity environment.",
      negativePrompt: "No new tattoo motifs, no black-ink redesign, no permanent tattoo realism, no childish props, no clutter.",
    },
  },
  {
    productId: "midnight-script-ink-set",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the same scripted temporary tattoo sheet with a dark luxury beauty-campaign finish.",
    referenceImage: referenceImageFor("midnight-script-ink-set"),
    referenceNotes: [
      "Preserve the same dark script-led artwork identity.",
      "The sheet should still look like a temporary transfer product, not a permanent tattoo flash board.",
      "Keep the graphic phrase energy consistent with the reference.",
    ],
    fidelity: {
      mustKeep: [
        "Same dark scripted phrase artwork identity.",
        "Same sheet-based temporary tattoo format.",
        "Same compact phrase-and-accent layout logic.",
        "Same waterproof temporary-tattoo positioning cues.",
      ],
      canChange: [
        "Background can become a dark premium beauty or editorial surface.",
        "A secondary output can show tasteful placement on collarbone or arm.",
        "Lighting can lean cinematic and high-contrast.",
      ],
      mustAvoid: [
        "Do not swap the script style for a different tattoo language.",
        "Do not turn the sheet into hand-drawn flash art.",
        "Do not introduce bright color tattoo elements.",
        "Do not make the tattoo look permanent or aged.",
      ],
      qaChecklist: [
        "The artwork still reads as the same dark script product.",
        "The sheet format remains believable and temporary.",
        "Luxury treatment enhances contrast without changing the design.",
        "Applied examples still match the source sheet artwork.",
      ],
    },
    outputs: [
      {
        id: "sheet-product-1x1",
        mode: "still",
        providerTarget: "imagen",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Straight-on sheet product shot with readable artwork.",
        background: "Dark premium beauty backdrop.",
        lighting: "High-contrast premium light with clear sheet readability.",
        stylingNotes: ["Minimal props", "Keep product dominant", "No color drift"],
      },
      {
        id: "collarbone-editorial-4x5",
        mode: "still",
        providerTarget: "gemini",
        useCase: "editorial-hero",
        aspectRatio: "4:5",
        framing: "Close editorial crop showing tasteful collarbone placement plus the product sheet nearby.",
        background: "Restrained luxury beauty set.",
        lighting: "Cinematic soft contrast emphasizing the script detail.",
        stylingNotes: ["Skin application must match the sheet", "No extra tattoos", "Beauty-campaign polish"],
      },
      {
        id: "script-reveal-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "social-story",
        aspectRatio: "9:16",
        framing: "Short reveal from product sheet to applied script detail.",
        background: "Dark editorial beauty setup.",
        lighting: "Soft cinematic highlight sweep.",
        stylingNotes: ["Show exact design match", "No morphing artwork", "Keep movement minimal"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact dark scripted temporary tattoo sheet with the same phrase-led artwork style and layout as the reference image.",
      luxuryShift: "Make it feel like a premium beauty-campaign product through lighting, framing, and tasteful styling only.",
      composition: "Keep the sheet readable in product-first outputs and ensure any applied version visibly matches the same artwork.",
      materialRead: "The transfer finish must look cosmetic, glossy, and temporary, not like healed permanent ink.",
      backgroundDirection: "Use a dark premium beauty or editorial surface with restrained luxury cues.",
      negativePrompt: "No artwork redesign, no color tattoos, no permanent ink realism, no grunge styling, no clutter.",
    },
  },
  {
    productId: "rose-glow-mini-ink-pack",
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: "Recreate the same mini tattoo pack with a soft premium romance-luxury mood.",
    referenceImage: referenceImageFor("rose-glow-mini-ink-pack"),
    referenceNotes: [
      "Preserve the mini pack identity and sweet phrase-art tone.",
      "Keep the scale compact and placement-friendly.",
      "The product should remain temporary and wearable, not illustrative art only.",
    ],
    fidelity: {
      mustKeep: [
        "Same mini-pack product identity.",
        "Same soft romantic phrase-art direction.",
        "Same temporary wearable format.",
        "Same compact scale for wrists, ankles, or shoulders.",
      ],
      canChange: [
        "Background can shift into a soft luxury beauty set or romantic editorial environment.",
        "Styling can become more premium and polished.",
        "Lighting can become softer and warmer.",
      ],
      mustAvoid: [
        "Do not turn the pack into a new artwork family.",
        "Do not make the tattoos oversized.",
        "Do not change the product into permanent black ink.",
        "Do not over-style the frame with props.",
      ],
      qaChecklist: [
        "The mini tattoo pack still reads as the same romantic temporary product.",
        "Scale remains compact and wearable.",
        "Luxury treatment feels soft and premium, not costume-like.",
        "Any applied examples still match the pack artwork style.",
      ],
    },
    outputs: [
      {
        id: "soft-flatlay-1x1",
        mode: "still",
        providerTarget: "imagen",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Soft flatlay showing the mini tattoo pack clearly.",
        background: "Warm luxury beauty surface with subtle rose-tone accents.",
        lighting: "Soft diffused premium lighting.",
        stylingNotes: ["Romantic but restrained", "Pack stays readable", "No busy styling props"],
      },
      {
        id: "romance-editorial-4x5",
        mode: "still",
        providerTarget: "gemini",
        useCase: "editorial-hero",
        aspectRatio: "4:5",
        framing: "Beauty-editorial crop with a small applied tattoo plus visible product pack.",
        background: "Soft romantic editorial setting.",
        lighting: "Warm premium skin light with gentle falloff.",
        stylingNotes: ["Applied tattoo must stay small", "Soft luxury finish", "Keep the pack present"],
      },
      {
        id: "mini-pack-story-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "social-story",
        aspectRatio: "9:16",
        framing: "Short romantic reveal from pack to subtle applied tattoo detail.",
        background: "Soft luxury vanity or editorial prep space.",
        lighting: "Warm diffused beauty light.",
        stylingNotes: ["Gentle movement only", "No design morphing", "Keep tattoo scale compact"],
      },
    ],
    promptBlueprint: {
      coreIdentity: "Same exact mini temporary tattoo pack with the same soft romantic phrase-art tone and compact wearable scale as the reference image.",
      luxuryShift: "Elevate the presentation into a premium romance-beauty campaign while keeping the product itself unchanged.",
      composition: "Keep the pack readable in product-first outputs and ensure any applied look stays delicate and small-scale.",
      materialRead: "The transfer finish should feel cosmetic and temporary, with a soft premium sheen.",
      backgroundDirection: "Use a restrained warm beauty or romance-editorial environment with soft luxury cues.",
      negativePrompt: "No oversized tattoos, no permanent-ink realism, no new artwork, no clutter, no cartoon styling.",
    },
  },
] satisfies ImageRecreationBrief[]

export const luxuryImageRecreationBriefs = imageRecreationBriefSchema.array().parse(rawImageRecreationBriefs)

export const luxuryImageRecreationBriefMap = new Map(
  luxuryImageRecreationBriefs.map((brief) => [brief.productId!, brief]),
)

export function getLuxuryImageRecreationBrief(productId: string) {
  return luxuryImageRecreationBriefMap.get(productId)
}

export function generateBriefForNeonItem(item: NeonDataItem): ImageRecreationBrief {
  const isCart = item.source === "cart"

  return {
    neonId: item.id,
    providerPriority: ["imagen", "gemini", "veo"],
    status: "approved-brief",
    objective: `Elevate the ${item.title} into a luxury ${isCart ? "editorial" : "lifestyle"} campaign asset.`,
    referenceImage: item.imageUrl,
    referenceNotes: [
      `Maintain the exact core design of the ${item.title}.`,
      "The silhouette must remain faithful to the original product.",
      "Identify and preserve key materials and hardware visible in the source image.",
    ],
    fidelity: {
      mustKeep: [
        `Exact silhouette and proportions of the ${item.title}.`,
        "Original color palette and any distinctive patterns or graphics.",
        "Primary hardware, buttons, or structural details.",
        "Core functional purpose and product category.",
      ],
      canChange: [
        "Elevate the environment to a premium, high-end studio or architectural setting.",
        "Upgrade the lighting to cinematic, multi-point editorial lighting.",
        "Surround the product with luxury-tier styling and complementary high-end accessories.",
        "Refine the texture rendering to look more premium (e.g., from 'plastic' to 'polished metal' if applicable).",
      ],
      mustAvoid: [
        "Do not redesign the product silhouette.",
        "Do not add logos or branding that weren't in the original.",
        "Do not change the color scheme.",
        "Do not add extra features or components that change the product's identity.",
      ],
      qaChecklist: [
        "Is the product immediately recognizable as the original from the cart/discovery?",
        "Does the lighting feel expensive and professional?",
        "Is the background clean and supportive of a luxury aesthetic?",
        "Does the final output feel like it belongs in a high-end fashion or tech magazine?",
      ],
    },
    outputs: [
      {
        id: "luxury-reveal-1x1",
        mode: "still",
        providerTarget: "imagen",
        useCase: "product-card",
        aspectRatio: "1:1",
        framing: "Centered, premium product crop with soft focus background.",
        background: "Minimalist luxury studio with subtle depth.",
        lighting: "Glowy, soft-wrap editorial light with premium contrast.",
        stylingNotes: ["High-end presentation", "Zero clutter", "Focus on materiality"],
      },
      {
        id: "campaign-motion-9x16",
        mode: "motion",
        providerTarget: "veo",
        useCase: "short-promo",
        aspectRatio: "9:16",
        framing: "Slow cinematic pan or rotation highlighting the product's silhouette.",
        background: "Architectural luxury space with natural light play.",
        lighting: "Golden hour or crisp studio light with elegant shadow play.",
        stylingNotes: ["Slow movement", "No redesign", "Premium atmosphere"],
      },
    ],
    promptBlueprint: {
      coreIdentity: `The exact ${item.title} from the reference image, preserving its specific silhouette, ${item.subtitle || "materials"}, and design details.`,
      luxuryShift: "Elevate the product presentation to a luxury tier through lighting, high-end environment, and premium styling only.",
      composition: "Keep the product as the central hero, framed for a high-end luxury campaign.",
      materialRead: "Enhance the visual quality of the materials to look premium while staying true to the original texture.",
      backgroundDirection: "A sophisticated, restrained environment like a boutique showroom or a minimalist architectural space.",
      negativePrompt: "No design changes, no color shifts, no added features, no generic replacements, no clutter.",
    },
  }
}

export function getBriefForProductOrNeon(id: string, neonItems?: NeonDataItem[]): ImageRecreationBrief | null {
  const catalogBrief = getLuxuryImageRecreationBrief(id)
  if (catalogBrief) return catalogBrief

  if (neonItems) {
    const neonItem = neonItems.find((item) => item.id === id)
    if (neonItem) {
      return generateBriefForNeonItem(neonItem)
    }
  }

  return null
}

function requireBrief(id: string, neonItems?: NeonDataItem[]) {
  const brief = getBriefForProductOrNeon(id, neonItems)

  if (!brief) {
    throw new Error(`No structured recreation brief exists for: ${id}`)
  }

  return brief
}

function requireOutput(brief: ImageRecreationBrief, outputId: string) {
  const output = brief.outputs.find((item) => item.id === outputId)

  if (!output) {
    throw new Error(`Unknown recreation output ID: ${outputId}`)
  }

  return output
}

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n")
}

export function buildStructuredRecreationPrompt(
  id: string,
  outputId: string,
  neonItems?: NeonDataItem[],
) {
  const brief = requireBrief(id, neonItems)
  const output = requireOutput(brief, outputId)

  return [
    `Task: structured luxury ${output.mode === "still" ? "image" : "motion"} recreation`,
    `Provider target: ${output.providerTarget}`,
    `Subject ID: ${brief.productId || brief.neonId}`,
    `Objective: ${brief.objective}`,
    `Reference image: ${brief.referenceImage}`,
    "",
    "Product identity to preserve:",
    brief.promptBlueprint.coreIdentity,
    "",
    "Luxury direction:",
    brief.promptBlueprint.luxuryShift,
    "",
    `Use case: ${output.useCase}`,
    `Aspect ratio: ${output.aspectRatio}`,
    `Framing: ${output.framing}`,
    `Background: ${output.background}`,
    `Lighting: ${output.lighting}`,
    "Styling notes:",
    formatList(output.stylingNotes),
    "",
    "Must keep:",
    formatList(brief.fidelity.mustKeep),
    "",
    "Allowed changes:",
    formatList(brief.fidelity.canChange),
    "",
    "Must avoid:",
    formatList(brief.fidelity.mustAvoid),
    "",
    "Reference notes:",
    formatList(brief.referenceNotes),
    "",
    "Material read:",
    brief.promptBlueprint.materialRead,
    "",
    "Composition guardrails:",
    brief.promptBlueprint.composition,
    "",
    "Background direction:",
    brief.promptBlueprint.backgroundDirection,
    "",
    "Negative prompt:",
    brief.promptBlueprint.negativePrompt,
  ].join("\n")
}

export function buildStructuredQaChecklist(id: string, neonItems?: NeonDataItem[]) {
  const brief = requireBrief(id, neonItems)
  return brief.fidelity.qaChecklist
}

export function listLuxuryImageRecreationProducts() {
  return luxuryImageRecreationBriefs.map((brief) => ({
    productId: brief.productId,
    outputs: brief.outputs.map((output) => output.id),
    providerPriority: brief.providerPriority,
    status: brief.status,
  }))
}
