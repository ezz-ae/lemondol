# Luxury Image Recreation System

This project now includes a strict image-recreation layer in `lib/image-recreation.ts`.

The goal is to recreate the **same exact product** with a luxury finish later through Gemini, Imagen, or Veo, without relying on loose free-form prompts.

## Why this exists

- Product fidelity is critical.
- The product cannot drift into a new silhouette, new artwork, or new hardware.
- Luxury treatment should come from **lighting, composition, set design, and styling context**, not from redesigning the item.

## Structure

Each product brief contains:

- `productId`
- `referenceImage`
- `referenceNotes`
- `fidelity.mustKeep`
- `fidelity.canChange`
- `fidelity.mustAvoid`
- `fidelity.qaChecklist`
- `outputs[]` with exact aspect ratios, framing, lighting, and provider target
- `promptBlueprint` for structured generation

## Current strict briefs

The repo currently includes structured briefs for:

- `nightfall-corset-top`
- `cherry-check-pleated-skirt`
- `orbit-tracking-tripod`
- `neon-heart-ink-sheets`
- `midnight-script-ink-set`
- `rose-glow-mini-ink-pack`

## How to use later

```ts
import { buildStructuredQaChecklist, buildStructuredRecreationPrompt } from "@/lib/image-recreation"

const prompt = buildStructuredRecreationPrompt("nightfall-corset-top", "editorial-hero-4x5")
const checklist = buildStructuredQaChecklist("nightfall-corset-top")
```

## Workflow

1. Pick the product brief.
2. Pick the exact output variant.
3. Generate the structured prompt.
4. Send the prompt to the future provider.
5. Review the output against the QA checklist.
6. Reject any output that changes silhouette, artwork, color, or construction.

## Non-negotiable rule

This system is for **same product, elevated presentation**.

Allowed changes:

- lighting
- environment
- camera polish
- premium styling context
- model or hand placement

Not allowed:

- new product shape
- new pattern or tattoo artwork
- new hardware
- new product category
- random logos or decorative additions
