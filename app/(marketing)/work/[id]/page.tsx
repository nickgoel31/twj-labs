"use client"

import CaseStudiesSection from '@/components/shared/case-studies'
import WorkDetailsHero from '@/components/work/hero-section'
import { usePathname } from 'next/navigation'
import { getSanityCaseStudyById } from '@/actions/get-portfolio'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Lightbulb, Quote, TrendingUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// ── Types ──────────────────────────────────────────────────────────────────────
export interface SanityDetailedWorkType {
  _id: string
  companyName: string
  companyLogo: string
  industry: string
  description: string
  heroImage: string
  gallery: string[]
  projectType: string
  completionDate: string
  technologies: string[]
  siteUrl: string
  problem: string
  solution: string
  results: string
  testimonialQuote: string
  testimonialName: string
  testimonialDesignation: string
  conversionRate: string
  userGrowth: string
}

// ── Loader ─────────────────────────────────────────────────────────────────────
const Loader = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#080807]" role="status">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 border border-indigo-400/20 rounded-full animate-ping" />
      <div className="absolute inset-2 border border-indigo-400/40 rounded-full animate-pulse" />
      <div className="absolute inset-4 bg-indigo-400/20 rounded-full" />
    </div>
    <p className="mt-8 text-[11px] font-mono tracking-[0.3em] uppercase text-white/25">
      Loading case study
    </p>
  </div>
)

// ── Animated section number ────────────────────────────────────────────────────
const SectionNumber = ({ num, label }: { num: string; label: string }) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-6 mb-14"
    >
      <span
        className="text-[clamp(5rem,10vw,7rem)] font-black leading-none tracking-[-0.05em] text-transparent select-none"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          fontFamily: "'Syne', 'Manrope', sans-serif",
        }}
      >
        {num}
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="h-px w-10 bg-indigo-400/50" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-400/70">
          {label}
        </span>
      </div>
    </motion.div>
  )
}

// ── Metric pill ────────────────────────────────────────────────────────────────
const Metric = ({
  value,
  label,
  delay = 0,
}: {
  value: string
  label: string
  delay?: number
}) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2 p-6 border border-white/6 bg-white/[0.02] rounded-sm group hover:border-indigo-400/25 transition-colors duration-500"
    >
      <span
        className="text-5xl font-black tracking-[-0.04em] text-indigo-300 leading-none"
        style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}
      >
        {value}
      </span>
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/35">{label}</span>
    </motion.div>
  )
}

// ── Gallery strip ──────────────────────────────────────────────────────────────
const GalleryStrip = ({ images }: { images: string[] }) => {
  if (!images?.length) return null
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2">
      <div className="flex gap-4 px-8 md:px-16" style={{ width: "max-content" }}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="relative rounded-sm overflow-hidden flex-shrink-0 border border-white/6"
            style={{ width: "clamp(240px, 30vw, 420px)", aspectRatio: "16/10" }}
          >
            <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
const WorkDetailsPage = () => {
  const pathname = usePathname()
  const currentWorkId = pathname.split('/')[2]

  const [currentWork, setCurrentWork] = React.useState<SanityDetailedWorkType | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [initialLoaded, setInitialLoaded] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    const loadData = async () => {
      if (!currentWorkId) return
      setLoading(true)
      try {
        const data = await getSanityCaseStudyById(currentWorkId)
        if (!mounted) return
        setCurrentWork(data)
      } catch (e) {
        console.error(e)
        if (!mounted) return
        setCurrentWork(null)
      } finally {
        if (!mounted) return
        setLoading(false)
        setInitialLoaded(true)
      }
    }
    loadData()
    return () => { mounted = false }
  }, [currentWorkId])

  if (loading && !initialLoaded) return <Loader />

  if (!currentWork && initialLoaded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#080807]">
        <p className="text-white/25 font-mono text-sm tracking-widest uppercase">
          Case study not found
        </p>
      </div>
    )
  }

  if (!currentWork) return <Loader />

  const hasMetrics = currentWork.conversionRate || currentWork.userGrowth

  return (
    <div className="bg-[#080807] text-white w-full selection:bg-indigo-400/25" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── 1. HERO ── */}
      <WorkDetailsHero work={currentWork as SanityDetailedWorkType} />

      {/* ── 2. GALLERY ── */}
      {currentWork.gallery?.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="px-8 md:px-16 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
              Project Gallery
            </span>
          </div>
          <GalleryStrip images={currentWork.gallery} />
        </section>
      )}

      {/* ── 3. PROBLEM & SOLUTION ── */}
      <section className="relative w-full px-8 md:px-16 py-24 z-10">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[35vw] h-[35vw] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">

          {/* Problem */}
          {currentWork.problem && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 mb-28 items-start">
              <div>
                <SectionNumber num="01" label="The Challenge" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-10 h-10 rounded-sm bg-rose-500/10 border border-rose-500/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="text-rose-400" size={18} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05]"
                    style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}>
                    Problem<br />Statement
                  </h2>
                </div>

                <div className="ml-15 border-l border-white/6 pl-8">
                  <p className="text-white/50 text-lg leading-[1.8] font-light max-w-2xl">
                    {currentWork.problem}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {/* Divider */}
          {currentWork.problem && currentWork.solution && (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-28" />
          )}

          {/* Solution */}
          {currentWork.solution && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
              <div>
                <SectionNumber num="02" label="The Approach" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-10 h-10 rounded-sm bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="text-indigo-400" size={18} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05]"
                    style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}>
                    Solution<br />Overview
                  </h2>
                </div>

                <div className="ml-15 border-l border-indigo-400/15 pl-8">
                  <p className="text-white/50 text-lg leading-[1.8] font-light max-w-2xl">
                    {currentWork.solution}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. RESULTS & METRICS ── */}
      {(currentWork.results || hasMetrics) && (
        <section className="relative w-full px-8 md:px-16 py-24">
          <div className="max-w-7xl mx-auto">

            {/* Metrics grid */}
            {hasMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                {currentWork.conversionRate && (
                  <Metric value={currentWork.conversionRate} label="Conversion Rate" delay={0} />
                )}
                {currentWork.userGrowth && (
                  <Metric value={currentWork.userGrowth} label="User Growth" delay={0.1} />
                )}
              </div>
            )}

            {/* Results block */}
            {currentWork.results && (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
                <div>
                  <SectionNumber num="03" label="The Outcome" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-4"
                >
                  <div className="flex items-start gap-5 mb-8">
                    <div className="w-10 h-10 rounded-sm bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="text-emerald-400" size={18} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05]"
                      style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}>
                      Measurable<br />Impact
                    </h2>
                  </div>

                  <div className="border border-indigo-400/12 bg-indigo-400/[0.03] rounded-sm p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-400/60 to-transparent" />
                    <p className="text-white/70 text-lg leading-[1.8] font-light">
                      {currentWork.results}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. TESTIMONIAL ── */}
      {currentWork.testimonialQuote && (
        <section className="relative w-full px-8 md:px-16 py-28 overflow-hidden">
          {/* Background glyph */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.015] leading-none select-none pointer-events-none"
            style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}
            aria-hidden
          >
            &quot;
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <Quote className="w-8 h-8 text-indigo-400/40 fill-current mx-auto mb-10" />

              <blockquote
                className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.45] tracking-[-0.02em] text-white/75 mb-12"
                style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}
              >
                &ldquo;{currentWork.testimonialQuote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-5">
                <div className="w-11 h-11 rounded-sm bg-indigo-500 text-white flex items-center justify-center font-black text-lg">
                  {currentWork.testimonialName?.charAt(0) ?? 'C'}
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm tracking-wide">
                    {currentWork.testimonialName}
                  </p>
                  <p className="text-white/35 text-xs font-mono tracking-widest uppercase mt-0.5">
                    {currentWork.testimonialDesignation}
                    {currentWork.companyName ? `, ${currentWork.companyName}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 6. DIVIDER ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent mx-auto" />

      {/* ── 7. MORE CASE STUDIES ── */}
      <div className="bg-[#F5F4F0] text-black rounded-t-[2.5rem] overflow-hidden relative">

        {/* Section label */}
        <div className="px-8 md:px-16 pt-16 pb-0 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
              More Work
            </span>
            <h3
              className="text-4xl md:text-5xl font-black tracking-[-0.03em] mt-3 leading-tight text-neutral-900"
              style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}
            >
              Related<br />Case Studies
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-400 group cursor-pointer hover:text-neutral-900 transition-colors">
            View all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <CaseStudiesSection darkMode={false} />
      </div>
    </div>
  )
}

export default WorkDetailsPage