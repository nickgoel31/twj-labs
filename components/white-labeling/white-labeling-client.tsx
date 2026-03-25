"use client";

import { useTranslations } from "next-intl";
import { Star, Building2, MousePointer2, Zap, ShieldCheck, Globe2 } from "lucide-react";
import CaseStudiesSection from "@/components/shared/case-studies";
import TestimonialsSection from "@/components/home/testimonials";
import FaqsSection from "@/components/shared/faqs";
import Image from "next/image";
import Link from "next/link";
import WhiteLabelingForm from "./white-labeling-form";

export default function WhiteLabelingClient() {
  const t = useTranslations("WhiteLabeling");

  return (
    <div className="bg-[#030303] text-white w-full min-h-screen font-sans overflow-hidden">
      
      {/* --- HERO SECTION (Matches Image 1) --- */}
      <section className="relative pt-32 px-6 flex flex-col items-center text-center">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-3 p-1 pr-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="bg-[#6B46C1] text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              2025
            </span>
            <span className="text-sm text-neutral-300 font-medium">
              {t('Hero.badge')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-[80px] leading-[1.1] font-normal tracking-tight mb-6" style={{fontFamily: "'DM Sans', sans-serif",}}>
            {t('Hero.titlePart1')} <br />
            <span className="text-white/100">{t('Hero.titlePart2')}</span>
          </h1>

          {/* Subheading */}
          <p className=" text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {t('Hero.description')}
          </p>

          <a
            href="#partnership-form"
            className="w-fit py-3 px-8 rounded-xl text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            {t('Hero.cta')}
          </a>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative mt-24 w-full max-w-5xl mx-auto z-0">
          {/* Purple Glow Underneath */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-[#6B46C1] blur-[140px] opacity-50 z-0 pointer-events-none"></div>
          
          {/* Browser Window UI */}
          <div className="relative z-10 w-full rounded-t-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden aspect-video shadow-2xl flex flex-col">
            
            {/* Browser Header */}
            <div className="h-12 w-full border-b border-white/5 flex items-center justify-between px-4 gap-2 bg-[#111]">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div></div>
              <div className="">
                <div className="w-64 h-6 bg-white/5 rounded text-center text-[10px] text-white/30 flex items-center justify-center tracking-widest uppercase">
                  {t('Hero.workspace')}
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 bg-linear-to-b from-[#161618] to-[#0A0A0A] relative flex items-center justify-center">
              {/* Abstract 3D/Figma Logo Mockup inside Window */}
              <div className="w-24 h-24 bg-[#1e1e20] rounded-[24px] shadow-2xl border border-white/5 flex items-center justify-center relative hover:scale-105 transition-transform cursor-pointer">
                <Image
                src="/symbol-logo-white.svg"
                alt="The Walking Jumbo Symbol White"
                width={500}
                height={500}
                className="w-14"
                />
                {/* Custom Cursor graphic overlay */}
                <MousePointer2 className="absolute -bottom-4 -right-2 text-white fill-white/20 w-8 h-8 rotate-12 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES / CONTENT SECTION (Matches Image 2) --- */}
      <section className="py-32 px-6 relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div>
            {/* Section Pill Badge */}
            <div className="inline-flex items-center gap-3 p-1 pr-4 rounded-full border border-white/10 bg-white/5 mb-8">
              <div className="w-7 h-7 rounded-full bg-[#6B46C1] flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm text-neutral-300 font-medium">
                {t('AboutPartners.badge')}
              </span>
            </div>

             {/* ── headline ── */}
        <h2 className=" text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mb-4 font-manrope">
          <span className="text-white">{t('AboutPartners.titlePart1')}</span>
          <br />
          <span className="text-white/30">{t('AboutPartners.titlePart2')}</span>
        </h2>

            

            {/* Features List */}
            <div className="space-y-10">
              <div className="flex gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500 ease-out">
                    <ShieldCheck className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {t('AboutPartners.feature1Title')}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
                    {t('AboutPartners.feature1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-500 ease-out">
                    <Zap className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {t('AboutPartners.feature2Title')}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
                    {t('AboutPartners.feature2Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <a
                  href="#partnership-form"
                  className="w-fit py-3 px-8 rounded-xl text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  {t('AboutPartners.cta')}
                </a>
              
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-white" />
                  ))}
                </div>
                <span className="text-sm text-neutral-400">
                  
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-[4/4.5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            {/* Subtle glow behind image border */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-[#6B46C1] blur-[80px] opacity-40"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team working together" 
              className="w-full h-full object-cover relative z-10"
            />
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-20"></div>
          </div>

        </div>
      </section>

      {/* --- PARTNERSHIP FORM SECTION --- */}
      <section id="partnership-form" className="py-32 px-6 relative max-w-4xl mx-auto scroll-mt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />
        <WhiteLabelingForm />
      </section>

      {/* Retained Global Components */}
      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />

    </div>
  );
}
