"use client";

import { useEffect, useRef, useState } from "react";
import CustomBadge from "../shared/custom-badge";
import { getSanityCaseStudies } from "@/actions/get-portfolio";
import Link from "next/link";

import { useTranslations } from "next-intl";

/* ─── individual card ───────────────────────────────────────── */
// Updated to handle dynamic Sanity data structure
function CaseCard({ card, cardWidth }: { card: any, cardWidth: number }) {
  const t = useTranslations('Home.Results');
  // Map metrics from Sanity fields
  const dynamicMetrics = [
    card.conversionRate ? `↗ ${card.conversionRate}` : null,
    card.userGrowth ? `${card.userGrowth} ${t('growth')}` : null,
  ].filter(Boolean);

  return (
    <Link
      href={`/en/work/${card._id}`}
      className="group relative flex-shrink-0 aspect-[9/11] rounded-2xl overflow-hidden cursor-pointer select-none p-2"
      style={{
        width: cardWidth,
        background: "#080808",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Image ── */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={card.heroImage}
          alt={card.companyName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[70%] opacity-95"
          style={{
            background: "linear-gradient(to bottom, transparent, #000000)",
          }}
        />
      </div>

      {/* ── Body ── */}
      <div className="absolute bottom-0 mb-3 sm:mb-5 left-1/2 -translate-x-1/2 bg-[#090a11] rounded-lg p-3 sm:p-5 h-[40%] sm:h-[45%] w-[90%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={card.companyLogo}
              alt={card.companyName}
              className="w-10 sm:w-14"
              draggable={false}
            />

          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 sm:pt-2">
          <span className="text-[14px] sm:text-[16px] font-medium text-white/70">
            {card.companyName}
          </span>
          {card.projectType && (
            <span className="rounded-full bg-violet-500 px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wide text-white">
              {card.projectType}
            </span>
          )}
        </div>

        <p className="text-[11px] sm:text-[13px] leading-relaxed text-white/55 mt-1 sm:mt-2 line-clamp-2">
          {card.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
          {dynamicMetrics.map((m: any) => (
            <span
              key={m}
              className="rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11.5px] font-medium text-white/60"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ─── main section ──────────────────────────────────────────── */
export default function ResultsSection() {
  const t = useTranslations('Home.Results');
  const [studies, setStudies] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(0.6);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(380);

  // Constants aligned with your design
  const GAP = 20;

  useEffect(() => {
    const loadData = async () => {
      const data = await getSanityCaseStudies();
      setStudies(data);
    };
    loadData();

    // Handle initial and resize width
    const handleResize = () => {
      const width = Math.min(380, window.innerWidth - 48);
      setCardWidth(width);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate Loop length based on fetched data and current card width
  const unit = cardWidth + GAP;
  const loopLen = studies.length * unit;
  const track = [...studies, ...studies, ...studies];

  useEffect(() => {
    if (studies.length === 0) return;

    const tick = () => {
      if (!isPaused && !isDragging.current) {
        offsetRef.current -= speedRef.current;
        if (Math.abs(offsetRef.current) >= loopLen) {
          offsetRef.current += loopLen;
        }
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, loopLen, studies.length]);

  /* ── interaction handlers ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    // e.preventDefault(); // Removed to allow interaction with elements inside
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + delta;
  };
  const onMouseUp = () => { isDragging.current = false; };

  // Don't render until data is ready to prevent loop calculation errors
  if (studies.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden py-20"

    >
      {/* ── decorative side panels ── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-72 w-64 opacity-60"
        style={{
          background: "linear-gradient(135deg, #592dd220 0%, transparent 70%)",
          clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-64 opacity-60"
        style={{
          background: "linear-gradient(225deg, #592dd220 0%, transparent 70%)",
          clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* ── header ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mb-16">
        <CustomBadge title={t('badge')} />

        <h2
          className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.12] tracking-tight mt-5"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white">{t('titleLine1')}</span>
          <br />
          <span className="text-white/40">{t('titleLine2')}</span>
        </h2>

        <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-white/40 " style={{ fontFamily: "'Syne', sans-serif" }}>
          {t('sub')}
        </p>

        <Link
          href={'/contact-sales'}
          className="w-fit py-3 px-8 mt-8 rounded-xl text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {t('cta')}
        </Link>
      </div>

      {/* ── scrolling cards ── */}
      <div
        className="relative w-full max-w-7xl mx-auto overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          isDragging.current = false;
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
      >
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to right, #050508 0%, #050508 20%, rgba(8,8,8,0.6) 60%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to left, #050508 0%, #050508 20%, rgba(8,8,8,0.6) 60%, transparent 100%)",
          }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: GAP, paddingLeft: GAP, paddingRight: GAP }}
        >
          {track.map((card: any, i: number) => (
            <CaseCard key={`${card._id}-${i}`} card={card} cardWidth={cardWidth} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}