"use client";

import React from "react";
import CustomBadge from "../shared/custom-badge";
import { useTranslations } from "next-intl";

/* ─── icons ─────────────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 1v2M12 21v2M12 3c-2.485 0-4.5 1.343-4.5 3s2.015 3 4.5 3 4.5 1.343 4.5 3-2.015 3-4.5 3-4.5-1.343-4.5-3M12 3c2.485 0 4.5 1.343 4.5 3M12 15c-2.485 0-4.5-1.343-4.5-3M12 21c2.485 0 4.5-1.343 4.5-3s-2.015-3-4.5-3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const AccessibilityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5" r="2" fill="white" />
    <path d="M6 9l6 2 6-2M12 11v5M9 16l-2 4M15 16l2 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const BugIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 9V7a3 3 0 0 1 6 0v2M9 9h6M9 9a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4M3 11h2M19 11h2M5 8l2 2M17 8l-2 2M5 18l2-2M17 18l-2-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LightningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MobileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke="white" strokeWidth="2" />
    <path d="M9 18h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ─── icon accent colours (hue-mapped to purple/blue theme) ─── */
const iconStyles: Record<number, { bg: string; glow: string }> = {
  1: { bg: "linear-gradient(135deg,#7c3aed,#6d28d9)", glow: "rgba(109,40,217,0.5)" },
  2: { bg: "linear-gradient(135deg,#1e3a6e,#1e40af)", glow: "rgba(30,64,175,0.45)" },
  3: { bg: "linear-gradient(135deg,#2563eb,#1d4ed8)", glow: "rgba(37,99,235,0.5)" },
  4: { bg: "linear-gradient(135deg,#4f46e5,#4338ca)", glow: "rgba(79,70,229,0.5)" },
  5: { bg: "linear-gradient(135deg,#0ea5e9,#0284c7)", glow: "rgba(14,165,233,0.45)" },
  6: { bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)", glow: "rgba(139,92,246,0.45)" },
};

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  badge?: string;
  subtitle: string;
  description: string;
  highlight?: boolean; // first card gets the glowing top border
}

/* ─── card ───────────────────────────────────────────────────── */
function FeatureCard({ feature }: { feature: Feature }) {
  const style = iconStyles[feature.id];
  return (
    <div
      className="group relative flex flex-col gap-5 rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-[#090a11] border border-white/5 transition-all hover:border-white/10"
      style={{
        border: feature.highlight
          ? "1px solid rgba(109,40,217,0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: feature.highlight
          ? "0 0 40px rgba(109,40,217,0.15), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* ── top gradient line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-500"
        style={{
          background: feature.highlight
            ? "linear-gradient(90deg, #6d28d9, #3b82f6, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          opacity: 1,
        }}
      />

      {/* ── hover inner glow ── */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse, ${style.glow} 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />

      {/* ── icon ── */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: style.bg,
          boxShadow: `0 4px 16px ${style.glow}`,
        }}
      >
        {feature.icon}
      </div>

      {/* ── text ── */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-[15px] font-bold text-white leading-tight">
            {feature.title}
          </span>
          {feature.badge && (
            <span
              className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
              style={{
                background: "rgba(109,40,217,0.7)",
                border: "1px solid rgba(139,92,246,0.4)",
              }}
            >
              {feature.badge}
            </span>
          )}
        </div>
        <p className="text-[13px] font-medium text-white/35">{feature.subtitle}</p>
      </div>

      {/* ── divider ── */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* ── description ── */}
      <p className="text-[13px] leading-relaxed text-white/40 group-hover:text-white/55 transition-colors duration-300">
        {feature.description}
      </p>
    </div>
  );
}

/* ─── section ────────────────────────────────────────────────── */
export default function Features2Section() {
  const t = useTranslations('Home.Features2');

  const features: Feature[] = [
    {
      id: 1,
      icon: <DollarIcon />,
      title: t('conversion.title'),
      badge: "",
      subtitle: t('conversion.subtitle'),
      description: t('conversion.description'),
    },
    {
      id: 2,
      icon: <AccessibilityIcon />,
      title: t('cleanCode.title'),
      subtitle: t('cleanCode.subtitle'),
      description: t('cleanCode.description'),
    },
    {
      id: 3,
      icon: <BugIcon />,
      title: t('seo.title'),
      subtitle: t('seo.subtitle'),
      description: t('seo.description'),
    },
    {
      id: 4,
      icon: <AwardIcon />,
      title: t('fast.title'),
      subtitle: t('fast.subtitle'),
      description: t('fast.description'),
    },
    {
      id: 5,
      icon: <LightningIcon />,
      title: t('branding.title'),
      badge: t('branding.badge'),
      subtitle: t('branding.subtitle'),
      description: t('branding.description'),
    },
    {
      id: 6,
      icon: <MobileIcon />,
      title: t('mobile.title'),
      subtitle: t('mobile.subtitle'),
      description: t('mobile.description'),
    },
  ];

  return (
    <section
      className="relative w-full  overflow-hidden px-6 py-24"

    >
      {/* ── ambient background bloom ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[360px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse, #6d28d9 0%, #2563eb 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── decorative V wings (matching the rest of the site) ── */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 flex justify-center">
        <div className="relative w-full  h-52">
          <div
            className="absolute left-0 top-0 w-[10%] lg:w-[38%] h-full opacity-20 lg:opacity-70"
            style={{
              background: "linear-gradient(135deg,#6145b0 0%,#2f137d 45%,transparent 100%)",
              clipPath: "polygon(0 0,100% 0,55% 100%,0 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 w-[10%] lg:w-[38%] h-full opacity-20 lg:opacity-70"
            style={{
              background: "linear-gradient(225deg,#6145b0 0%,#2f137d 45%,transparent 100%)",
              clipPath: "polygon(0 0,100% 0,100% 100%,45% 100%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center ">

        {/* ── badge ── */}
        <CustomBadge title={t('badge')} />

        {/* ── headline ── */}
        <h2 className="text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mb-4 mt-5" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span className="text-white">{t('titleLine1')}
          </span>
          <br />
          <span className="text-white/30">{t('titleLine2')}</span>
        </h2>

        {/* ── sub ── */}
        <p className="text-center text-[14.5px] leading-relaxed text-white/40 max-w-md mb-9" style={{ fontFamily: "'Syne', sans-serif" }}>
          {t('sub')}
        </p>

        {/* ── grid ── */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}