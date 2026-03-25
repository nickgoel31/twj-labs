import { client as sanityClient } from '@/sanity/client'
import type { PlanType, PricingPlanType } from '@/data/pricing-plans'

// ─── Sanity raw types (mirrors the schema exactly) ───────────────────────────

export interface SanityPlan {
  _key: string
  planName: string
  price?: string
  description?: string
  featuredPlan?: boolean
  everythingInPrevious?: boolean
  includedFeatures?: string[]
  missingFeatures?: string[]
}

export interface SanityPricingDocument {
  _id: string
  category: string
  plans: SanityPlan[]
}

// ─── GROQ ────────────────────────────────────────────────────────────────────

/**
 * Fetch every pricing document, ordered by the category field so the
 * tab order is deterministic on the client.
 */
export const ALL_PRICING_QUERY = `
  *[_type == "pricing"] | order(category asc) {
    _id,
    category,
    plans[] {
      _key,
      planName,
      price,
      description,
      featuredPlan,
      everythingInPrevious,
      includedFeatures,
      missingFeatures
    }
  }
`

/**
 * Fetch a single category's document.
 * $category must match one of the Sanity category values
 * (e.g. "webflow", "ai-automation", "custom-development").
 */
export const PRICING_BY_CATEGORY_QUERY = `
  *[_type == "pricing" && category == $category][0] {
    _id,
    category,
    plans[] {
      _key,
      planName,
      price,
      description,
      featuredPlan,
      everythingInPrevious,
      includedFeatures,
      missingFeatures
    }
  }
`

// ─── Mapper: Sanity document → PricingPlanType ────────────────────────────────

/**
 * Converts the raw Sanity category string into the display title shown in tabs.
 * Keep this in sync with the Sanity schema `options.list` titles.
 */
const CATEGORY_TITLES: Record<string, string> = {
  webflow: 'Webflow',
  wordpress: 'Wordpress',
  'ai-automation': 'AI Integration & Automation',
  ecommerce: 'Ecommerce',
  'custom-development': 'Custom Development',
  'web-design': 'Web Design',
  accessibility: 'Accessibility',
  'go-online': 'Go Online',
}

const mapSanityPlan = (raw: SanityPlan, idx: number): PlanType => ({
  id: raw._key ?? String(idx),
  name: raw.planName ?? '',
  price: raw.price ?? '',
  description: raw.description ?? '',
  featured: raw.featuredPlan ?? false,
  everythingIncludedPrev: raw.everythingInPrevious ?? false,
  // Sanity already returns these as string[]; safeParse in PricingCard handles
  // the legacy SQLite JSON-string format gracefully either way.
  features: raw.includedFeatures ?? [],
  featuresNotIncluded: raw.missingFeatures ?? [],
})

export const mapSanityDocument = (doc: SanityPricingDocument): PricingPlanType => ({
  id: doc._id,
  category: doc.category,
  title: CATEGORY_TITLES[doc.category] ?? doc.category,
  plans: (doc.plans ?? []).map(mapSanityPlan),
})

// ─── Fetch helpers (used by server actions) ──────────────────────────────────

export const fetchAllPricingPlans = async (): Promise<PricingPlanType[]> => {
  const raw: SanityPricingDocument[] = await sanityClient.fetch(ALL_PRICING_QUERY)
  return raw.map(mapSanityDocument)
}

export const fetchPricingByCategory = async (
  category: string,
): Promise<PricingPlanType | null> => {
  const raw: SanityPricingDocument | null = await sanityClient.fetch(
    PRICING_BY_CATEGORY_QUERY,
    { category },
  )
  return raw ? mapSanityDocument(raw) : null
}