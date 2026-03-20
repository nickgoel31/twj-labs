"use client"

import ColorBends from '@/components/ColorBends'
import { PlanType, PricingPlanType } from '@/data/pricing-plans'
import { cn } from '@/lib/utils'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import CustomBadge from '@/components/shared/custom-badge'
import { getPricingPlans } from '@/actions/get-pricing'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * These values must exactly match the `category` field values in the Sanity
 * schema (`pricing.ts` → Select Category → options.list → value).
 */
type ServiceType =
  | 'webflow'
  | 'wordpress'
  | 'ai-automation'
  | 'ecommerce'
  | 'custom-development'
  | 'web-design'
  | 'accessibility'

/**
 * Maps each Sanity category value to its position in the tabs array.
 * The order here controls the left-to-right tab order in the UI.
 */
const SERVICE_ORDER: ServiceType[] = [
  'webflow',
  'wordpress',
  'ecommerce',
  'ai-automation',
  'custom-development',
  'web-design',
  'accessibility',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Safely coerce a value that might be a JSON string (legacy SQLite) or a
 * proper string[] (Sanity) into a plain string[].
 */
export const safeParse = (data: string | string[] | undefined | null): string[] => {
  if (!data) return []
  if (Array.isArray(data)) return data
  try {
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Failed to parse features:', e)
    return []
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

const PricingHero = () => {
  const t = useTranslations('Pricing');
  const [activeService, setActiveService] = React.useState<ServiceType>('webflow')
  const darkMode = true

  const [plansCategory, setPlansCategory] = React.useState<PricingPlanType[]>()
  const [currentPlans, setCurrentPlans] = React.useState<PlanType[]>()
  const [loading, setLoading] = React.useState(false)
  const [initialLoaded, setInitialLoaded] = React.useState(false)

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch all categories once; Sanity returns them already mapped.
        const plans: PricingPlanType[] = await getPricingPlans()
        if (!mounted) return

        setPlansCategory(plans)

        // Find the active category by its `category` slug (not array index).
        const categoryData = plans.find((p) => p.category === activeService)
        setCurrentPlans(categoryData?.plans)
      } catch (error) {
        console.error('Error fetching pricing plans:', error)
        if (!mounted) return
        setCurrentPlans(undefined)
      } finally {
        if (!mounted) return
        setLoading(false)
        setInitialLoaded(true)
      }
    }

    loadData()
    return () => {
      mounted = false
    }
  }, [activeService])

  // Place the featured plan in the centre slot of the 3-column grid.
  const displayedPlans = React.useMemo(() => {
    if (!currentPlans) return undefined
    const arr = [...currentPlans]
    const featuredIndex = arr.findIndex((p) => p.featured)
    if (featuredIndex > -1) {
      const [featured] = arr.splice(featuredIndex, 1)
      arr.splice(Math.floor(arr.length / 2), 0, featured)
    }
    return arr
  }, [currentPlans])

  /**
   * Build the ordered tab list from the fetched Sanity data, preserving
   * SERVICE_ORDER as the canonical sort key and falling back gracefully when
   * a category hasn't been created in Sanity yet.
   */
  const orderedTabs = React.useMemo<ServiceType[]>(() => {
    if (!plansCategory) return SERVICE_ORDER
    const fetchedCategories = new Set(plansCategory.map((p) => p.category as ServiceType))
    // Show only tabs that exist in Sanity, in SERVICE_ORDER order.
    return SERVICE_ORDER.filter((s) => fetchedCategories.has(s))
  }, [plansCategory])

  const getTabTitle = (service: ServiceType) =>
    plansCategory?.find((p) => p.category === service)?.title ?? service

  return (
    <div className='relative w-full overflow-hidden bg-[#060609] min-h-screen'>

      {/* Background Ambience */}
      <div className='absolute w-full h-full top-0 left-0 inset-0 z-0 opacity-60 pointer-events-none'>
        <ColorBends
          colors={['#5449e8']}
          rotation={0}
          speed={0.1}
          scale={1.5}
          frequency={1}
          warpStrength={1.04}
          mouseInfluence={0.1}
          parallax={0.1}
          noise={0.2}
          transparent={true}
        />
      </div>

      {/* Main Container */}
      <div className='relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32'>

        {/* Header Section */}
        <div className='flex flex-col items-center gap-6 text-center'>
          <CustomBadge title={t('badge')} darkMode={darkMode} />

          {/* ── headline ── */}
          <h2 className="text-center text-[clamp(2rem,5vw,3.7rem)] font-medium leading-[1.12] tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
            <span className="text-white">Tailored Pricing Plans to</span>
            <br />
            <span className="text-white/30">Suit Your Business Needs</span>
          </h2>

          {/* ── sub ── */}
          <p className="text-center text-[14.5px] leading-relaxed text-white/40 max-w-md mb-4">
            All packages are customizable to fit your needs. Let's hop on a call and scope out your project details to find the perfect fit.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className='mt-12 w-full flex justify-center'>
          <div className='w-full max-w-full overflow-x-auto no-scrollbar pb-4 md:pb-0'>
            <div className='bg-[#0b090d]/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center gap-1 w-max mx-auto'>
              {orderedTabs.map((service) => (
                <button
                  key={service}
                  onClick={() => setActiveService(service)}
                  className={cn(
                    'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap outline-none focus:outline-none',
                    activeService === service
                      ? 'text-white shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5',
                  )}
                >
                  {activeService === service && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute inset-0 bg-[#5449e8] rounded-full shadow-[0_0_20px_rgba(84,73,232,0.5)]'
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className='relative z-10'>{getTabTitle(service)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className='mt-16 w-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeService + (loading ? '-loading' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              {loading && !initialLoaded &&
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} index={i} />)}

              {loading && initialLoaded &&
                displayedPlans?.map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} index={index} />
                ))}

              {!loading &&
                displayedPlans?.map((plan, index) => (
                  <PricingCard
                    key={plan.id}
                    activeServiceName={activeService}
                    plan={plan}
                    darkMode={darkMode}
                    index={index}
                  />
                ))}

              {!loading && !displayedPlans && (
                <div className='col-span-full text-center text-slate-400 py-12'>
                  {t('error')}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-screen loading overlay (first load only) */}
      {loading && !initialLoaded && (
        <div className='absolute inset-0 z-50 flex items-center justify-center pointer-events-auto'>
          <div className='backdrop-blur-sm bg-black/40 absolute inset-0' />
          <div className='relative z-10 flex flex-col items-center gap-4'>
            <Spinner />
            <span className='text-sm text-slate-300'>{t('loading')}</span>
          </div>
        </div>
      )}

      <div aria-live='polite' className='sr-only'>
        {loading ? t('loading') : 'Pricing plans loaded'}
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const SkeletonCard = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className='group relative w-full rounded-2xl p-0.5 flex flex-col'
  >
    <div className='relative h-full w-full rounded-xl overflow-hidden p-6 md:p-8 flex flex-col bg-neutral-950'>
      <div className='absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(#ffffff14_1px,transparent_1px)] bg-size-[20px_20px]' />
      <div className='relative z-10 mb-8'>
        <div className='h-6 w-32 rounded bg-slate-800 animate-pulse mb-3' />
        <div className='h-2 w-12 rounded bg-slate-800 animate-pulse mb-4' />
        <div className='h-4 w-full max-w-[240px] rounded bg-slate-800 animate-pulse' />
      </div>
      <div className='relative z-10 flex-grow space-y-4 mb-8'>
        <ul className='space-y-3'>
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className='flex items-start gap-3 text-sm'>
              <div className='h-4 w-4 rounded-full bg-slate-800 animate-pulse shrink-0' />
              <div className='h-3 w-full max-w-[180px] rounded bg-slate-800 animate-pulse' />
            </li>
          ))}
        </ul>
      </div>
      <div className='relative z-10 mt-auto pt-6 border-t border-white/5'>
        <button disabled className='w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase bg-white/5 text-white/30 cursor-not-allowed'>
          Loading...
        </button>
      </div>
    </div>
  </motion.div>
)

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = () => (
  <svg className='animate-spin h-12 w-12 text-white' viewBox='0 0 24 24' role='img' aria-hidden='true'>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

// ─── PricingCard ──────────────────────────────────────────────────────────────

const PricingCard = ({
  plan,
  darkMode,
  index,
  activeServiceName,
}: {
  plan: PlanType
  darkMode: boolean
  index: number
  activeServiceName?: string
}) => {
  const t = useTranslations('Pricing');
  const featuresList = safeParse(plan.features)
  const notIncludedList = safeParse(plan.featuresNotIncluded)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col w-full min-h-full',
        plan.featured ? 'z-10 scale-[1.02] lg:scale-105' : 'z-0 scale-100',
      )}
    >
      {/* Glowing border layer */}
      <div
        className={cn(
          'absolute inset-0 rounded-3xl transition-all duration-500',
          plan.featured
            ? 'bg-linear-to-b from-[#5449e8] to-transparent shadow-[inset_0_1px_0px_rgba(0,0,0,0.6)] shadow-violet-400 opacity-100 blur-[1px]'
            : 'bg-linear-to-b from-white/20 via-white/5 to-transparent opacity-50 group-hover:opacity-100',
        )}
      />

      {/* Card body */}
      <div
        className={cn(
          'relative flex flex-col h-full rounded-[23px] p-8 transition-colors duration-300 m-[1px]',
          darkMode ? 'bg-[#0c0c12]' : 'bg-white',
        )}
      >
        <div className='absolute top-0 left-0 right-0 h-48 bg-linear-to-b from-white/1 rounded-3xl to-transparent pointer-events-none' />
        <div
          className='absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none'
          style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }}
        />

        {plan.featured && (
          <div className='absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-[60px] pointer-events-none' />
        )}

        {/* Featured badge */}
        {plan.featured && (
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-[10px] font-bold uppercase tracking-widest text-white border border-white/20'>
              <Sparkles size={10} className='fill-white' /> {t('mostPopular')}
            </span>
          </div>
        )}

        {/* Header */}
        <div className='relative z-10 mb-8'>
          <h3 className={cn('text-xl font-bold tracking-tight mb-3', darkMode ? 'text-white' : 'text-slate-900')}>
            {plan.name}
          </h3>
          <p className={cn('text-sm leading-relaxed min-h-[40px]', darkMode ? 'text-slate-400' : 'text-slate-500')}>
            {plan.description}
          </p>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8' />

        {/* Features */}
        <div className='relative z-10 flex-grow space-y-5'>
          {plan.everythingIncludedPrev && (
            <p className='text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse' />
              {t('everythingPrev')}
            </p>
          )}

          <ul className='space-y-4'>
            {featuresList.map((feature, i) => (
              <li key={`f-${i}`} className='flex items-start gap-3'>
                <div
                  className={cn(
                    'mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 border',
                    plan.featured
                      ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm shadow-indigo-500/50'
                      : 'bg-white/5 border-white/10 text-slate-400',
                  )}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={cn('text-sm font-medium leading-tight', darkMode ? 'text-slate-200' : 'text-slate-700')}>
                  {feature}
                </span>
              </li>
            ))}

            {notIncludedList.map((feature, i) => (
              <li key={`nf-${i}`} className='flex items-start gap-3 opacity-50 grayscale'>
                <div className='mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 border border-white/5 bg-white/2 text-slate-600'>
                  <X size={12} strokeWidth={3} />
                </div>
                <span className={cn('text-sm font-medium leading-tight line-through decoration-slate-600', darkMode ? 'text-slate-500' : 'text-slate-400')}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className='relative z-10 mt-8 pt-6 border-t border-white/5'>
          <button
            className={cn(
              'group/btn relative w-full px-5 py-3 rounded-xl text-sm font-bold tracking-wide uppercase overflow-hidden transition-all duration-300 cursor-pointer',
              plan.featured
                ? 'font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] text-white hover:shadow-violet-400 transition-all duration-500'
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
            )}
          >
            <Link href={`/contact-sales?ser-int=${activeServiceName}&plan=${plan.name}`}>
              <div className='absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out z-20' />
              <span className='relative z-10 flex items-center justify-center gap-2'>
                {t('cta')}
                <ArrowRight size={16} className='transition-transform duration-300 group-hover/btn:translate-x-1 text-white' />
              </span>
            </Link>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default PricingHero