import { useTranslations } from "next-intl";
import CustomBadge from '../shared/custom-badge';
import Image from 'next/image';

// --- Types ---
interface StageCardProps {
  stageNumber: number;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  stageLabel: string;
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

// --- Components ---
const StageCard: React.FC<StageCardProps> = ({ stageNumber, title, description, tags, icon, stageLabel }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#100a17] via-[#0a070f] to-[#09060b] p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-white/10">
      {/* Subtle top-left glow inside the card */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-[40px] pointer-events-none"></div>

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner">
          {icon}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300">
          {stageLabel} {stageNumber}
        </div>
      </div>

      <h3 className="relative z-10 mb-4 text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="relative z-10 mb-8 text-sm leading-relaxed text-gray-400">
        {description}
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

export default function ProcessSection() {
  const t = useTranslations('Home.HowWeWork');

  const STAGES = [
    {
      stageNumber: 1,
      title: t('stage1.title'),
      description: t('stage1.description'),
      tags: [t('stage1.tag1'), t('stage1.tag2')],
      icon: <RocketIcon />,
      stageLabel: t('stage'),
    },
    {
      stageNumber: 2,
      title: t('stage2.title'),
      description: t('stage2.description'),
      tags: [t('stage2.tag1'), t('stage2.tag2'), t('stage2.tag3')],
      icon: <NetworkIcon />,
      stageLabel: t('stage'),
    },
    {
      stageNumber: 3,
      title: t('stage3.title'),
      description: t('stage3.description'),
      tags: [t('stage3.tag1'), t('stage3.tag2'), t('stage3.tag3')],
      icon: <SparkleIcon />,
      stageLabel: t('stage'),
    }
  ];

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 lg:px-24 font-sans text-white">
      <div className="mx-auto max-w-7xl">

        {/* FIX 1: Removed `items-start`. 
          We want the default `stretch` behavior so the right column track 
          becomes exactly as tall as the left column track.
        */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-7 lg:gap-24">

          {/* FIX 2: Changed col-span-4 to lg:col-span-4 to prevent mobile layout blowout */}
          <div className="flex flex-col lg:col-span-4">

            {/* Header Section */}
            <div className="mb-16">
              <CustomBadge title={t('badge')} />

              {/* Headline */}
              <h2
                className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mt-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className="text-white">{t('titleLine1')} </span>
                <span className="text-white/40">{t('titleLine2')}</span>
              </h2>

              {/* Sub */}
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/40">
                {t('sub')}
              </p>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-8">
              {STAGES.map((stage) => (
                <StageCard key={stage.stageNumber} {...stage} />
              ))}
            </div>

          </div>

          {/* FIX 3: The Wrapper Approach. 
            This outer div acts as the grid item (spanning lg:col-span-3) and stretches to the full height of the left column.
          */}
          <div className="hidden w-full lg:block lg:col-span-3">

            {/* The inner div holds the sticky behavior and slides cleanly inside the parent grid item */}
            <div className="sticky top-24 h-fit">
              <div className="relative w-full rounded-3xl p-1">

                {/* Outer Blue Glow behind the image */}
                <div className="absolute inset-x-0 -bottom-10 mx-auto h-[120%] w-[90%] rounded-full bg-violet-600/30 blur-[100px] pointer-events-none"></div>

                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl">
                  <Image
                    src="/ww2.svg"
                    alt="Call"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}