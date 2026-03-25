"use client";

import React from 'react';
import CustomBadge from '../shared/custom-badge';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// --- Types ---
interface StageCardProps {
  stageNumber: number;
  stageKey: string;
  icon: React.ReactNode;
}

// --- Icons (using standard SVGs to mimic the design) ---
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
    <rect x="14" y="14" width="4" height="4" rx="1" />
    <rect x="6" y="14" width="4" height="4" rx="1" />
    <rect x="14" y="6" width="4" height="4" rx="1" />
    <rect x="6" y="6" width="4" height="4" rx="1" />
    <path d="M8 10v4" />
    <path d="M16 10v4" />
    <path d="M10 8h4" />
    <path d="M10 16h4" />
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

// --- Data ---
const STAGES_DATA = [
  {
    stageNumber: 1,
    stageKey: "stage1",
    icon: <RocketIcon />,
  },
  {
    stageNumber: 2,
    stageKey: "stage2",
    icon: <NetworkIcon />,
  },
  {
    stageNumber: 3,
    stageKey: "stage3",
    icon: <SparkleIcon />,
  }
];

// --- Components ---
const StageCard: React.FC<StageCardProps> = ({ stageNumber, stageKey, icon }) => {
  const t = useTranslations("Home.HowWeWork");

  // Dynamically get tags - supporting up to 3 tags as defined in locales
  const tags = [];
  if (t.has(`${stageKey}.tag1`)) tags.push(t(`${stageKey}.tag1`));
  if (t.has(`${stageKey}.tag2`)) tags.push(t(`${stageKey}.tag2`));
  if (t.has(`${stageKey}.tag3`)) tags.push(t(`${stageKey}.tag3`));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#100a17] via-[#0a070f] to-[#09060b] p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-white/10">
      {/* Subtle top-left glow inside the card */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-[40px] pointer-events-none"></div>

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner">
          {icon}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300">
          {t("stage")} {stageNumber}
        </div>
      </div>

      <h3 className="relative z-10 mb-4 text-xl font-semibold text-white">
        {t(`${stageKey}.title`)}
      </h3>
      <p className="relative z-10 mb-8 text-sm leading-relaxed text-gray-400">
        {t(`${stageKey}.description`)}
      </p>

      <div className="relative z-10 flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="rounded-lg border border-white/10 bg-[#ffffff08] px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function OurProjectProcess({ namespace = "Home.HowWeWork" }: { namespace?: string }) {
  const t = useTranslations(namespace as any);
  const tStages = useTranslations("Home.HowWeWork");

  return (
    <section className="min-h-screen  py-24 px-6 md:px-12 lg:px-24 font-sans text-white">
      <div className="mx-auto max-w-7xl">

        {/* Note the `items-start` here. This is CRITICAL for position: sticky to work on grid children */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-7 lg:gap-24">

          {/* Left Column: Scrollable Content */}
          <div className="flex flex-col col-span-4">

            {/* Header Section */}
            <div className="mb-16">
              <CustomBadge title={t('badge')} />

              {/* Headline */}
              <h2
                className="text-[clamp(2.2rem,5vw,3.5rem)]  leading-[1.12] tracking-tight mt-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className="text-white">Every Project Starts</span>

                <span className="text-white/40">{" "}With A Conversation</span>
              </h2>

              {/* Sub */}
              {t.has("sub") && (
                <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/40">
                  {t("sub")}
                </p>
              )}
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-8">
              {STAGES_DATA.map((stage) => (
                <StageCard key={stage.stageNumber} {...stage} />
              ))}
            </div>

          </div>

          {/* Right Column: Sticky Image */}
          {/* 'sticky top-24' keeps it fixed 6rem from the top of the viewport as the left side scrolls */}
          <div className="sticky top-24 hidden h-fit w-full lg:block col-span-3">
            <div className="relative w-full rounded-3xl p-1">

              {/* Outer Blue Glow behind the image */}
              <div className="absolute inset-x-0 -bottom-10 mx-auto h-[120%] w-[90%] rounded-full bg-violet-600/30 blur-[100px] pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl">
                <Image
                  src="/ww2.svg"
                  alt="Student working on laptop"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover  transition-transform duration-700 hover:scale-105"
                />


              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}