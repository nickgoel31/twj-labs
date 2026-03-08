"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { SanityDetailedWorkType } from '@/app/(marketing)/work/[id]/page'

const WorkDetailsHero = ({ work }: { work: SanityDetailedWorkType }) => {
  const techList = Array.isArray(work.technologies) ? work.technologies : []
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col overflow-hidden bg-[#080807]"
      style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}
    >
      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Full-bleed background image with parallax ── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0"
      >
        {work.heroImage && (
          <Image
            src={work.heroImage}
            alt={work.companyName}
            fill
            priority
            className="object-cover object-top"
          />
        )}
        {/* Deep cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/55 via-[#080807]/40 to-[#080807]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080807]/90 via-[#080807]/20 to-transparent" />
      </motion.div>

      {/* ── Indigo glow accent ── */}
      <div className="absolute bottom-1/3 left-0 w-[40vw] h-[40vw] bg-indigo-500/10 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-40 flex items-center justify-between px-8 md:px-16 pt-10"
      >
        <div className="flex items-center gap-3">
          {work.industry && (
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-indigo-400/80 border border-indigo-400/20 px-3 py-1.5 rounded-sm bg-indigo-400/5 backdrop-blur-sm">
              {work.industry}
            </span>
          )}
          {work.projectType && (
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 border border-white/10 px-3 py-1.5 rounded-sm">
              {work.projectType}
            </span>
          )}
        </div>

        {work.completionDate && (
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            {work.completionDate}
          </span>
        )}
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-40 flex-1 flex flex-col justify-end px-8 md:px-16 pb-20 pt-24"
      >
        {/* Frosted black overlay behind text */}
        <div className="absolute inset-x-0 bottom-0 h-[75%] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          }}
        />
        {/* Content sits above the overlay */}
        <div className="relative z-10">
        {/* Index mark */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-mono text-[11px] tracking-[0.3em] text-indigo-400/60 uppercase mb-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-indigo-400/40" />
          Case Study
        </motion.span>
          {/* Company name headline */}
        {work.companyLogo && (
          <div className="overflow-hidden mb-6">
          <Image src={work.companyLogo} alt='Logo' width={120} height={120}/>
        </div>
        )}


        {/* Company name headline */}
        <div className="overflow-hidden mb-7">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(3.5rem,10vw,8rem)] font-black tracking-[-0.04em] leading-[0.9] text-white"
            style={{ fontFamily: "'Syne', 'Manrope', sans-serif" }}
          >
            {work.companyName}
          </motion.h1>
        </div>

        {/* Description + CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl font-light tracking-wide"
          >
            {work.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center gap-4 flex-shrink-0"
          >
            {work.siteUrl && (
              <Link
                href={work.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 border border-indigo-400/40 text-indigo-300 text-sm font-medium tracking-wide px-6 py-3 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-300 rounded-sm"
              >
                View Live
                <ExternalLink size={14} className="group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            )}
          </motion.div>
        </div>

        {/* Tech tags */}
        {techList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-white/8"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mr-2 self-center">Stack</span>
            {techList.map((tech, i) => (
              <span
                key={i}
                className="text-[11px] font-mono tracking-wide text-white/50 bg-white/[0.04] border border-white/8 px-3 py-1 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}
        </div>
      </motion.div>

      {/* ── Vertical scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 md:right-16 bottom-12 z-40 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase rotate-90 origin-center mb-6">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-indigo-400/60"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default WorkDetailsHero