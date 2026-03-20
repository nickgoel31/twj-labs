'use client';

import React, { useState, useRef, useEffect } from 'react';

// ─── Word-by-word animated text ───────────────────────────────────────────────
interface AnimatedTextProps {
  children: string | string[];
  className?: string;
  baseDelay?: number;
  accentWord?: string;
  accentClass?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  baseDelay = 0,
  accentWord,
  accentClass = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const text = Array.isArray(children) ? children.join('') : children;
  const words = text.trim().split(/\s+/);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => {
        const isAccent = accentWord && word === accentWord;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transition: 'color 0.4s ease, opacity 0.4s ease',
              transitionDelay: lit ? `${baseDelay + i * 55}ms` : '0ms',
              color: lit ? (isAccent ? undefined : 'inherit') : 'rgba(255,255,255,0.15)',
              opacity: lit ? 1 : 0.4,
              marginRight: '0.28em',
            }}
            className={isAccent && lit ? accentClass : ''}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const ComparisonSection: React.FC = () => {
  const [isAgnos, setIsAgnos] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAgnos(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    { other: 'Ghosted after kickoff',            agnos: 'Weekly calls, real updates'        },
    { other: 'Scope creep & hidden fees',         agnos: 'Fixed scope, fixed price'          },
    { other: 'Vague timelines, endless excuses',  agnos: 'Deadlines we actually hit'         },
    { other: 'Pretty mockups, broken code',       agnos: 'Pixel-perfect & production-ready'  },
    { other: 'You chase them for updates',        agnos: 'We chase excellence for you'       },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 font-sans text-white flex justify-center">
      <div className="max-w-[800px] w-full flex flex-col items-center">

        {/* HEADING */}
        <div className="text-center w-full max-w-3xl mb-14">

          {/* Line 1 */}
          <h2 className="text-3xl md:text-[40px] leading-[1.3] font-medium tracking-tight mb-8">
            <AnimatedText baseDelay={0}>
              Most agencies talk a big game.
            </AnimatedText>
            <br className="hidden md:block" />
            <AnimatedText baseDelay={200} accentWord="Few"
              accentClass="text-[#6d64f2] font-semibold">Few</AnimatedText>
          
            <AnimatedText
              baseDelay={280}
              accentWord="actually"
              accentClass="text-[#6d64f2] font-semibold"
            >
              actually
            </AnimatedText>
        
            <AnimatedText baseDelay={360}>show up for you.</AnimatedText>
          </h2>

          {/* Line 2 */}
          <h3 className="text-3xl md:text-[40px] leading-[1.3] font-medium tracking-tight">
            <AnimatedText baseDelay={500}>We let the</AnimatedText>
           
            <AnimatedText
              baseDelay={620}
              accentWord="work"
              accentClass="text-[#6d64f2] font-semibold"
            >
              work
            </AnimatedText>
           
            <AnimatedText baseDelay={700}>speak. See how we stack up</AnimatedText>

            {/* Inline toggle */}
            <button
              onClick={() => setIsAgnos(v => !v)}
              className={`relative inline-flex h-[34px] w-[60px] items-center rounded-full transition-colors duration-300 align-middle mx-2 -translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#6d64f2]/50 cursor-pointer z-100 ${
                isAgnos ? 'bg-[#6d64f2]' : 'bg-slate-500'
              }`}
              role="switch"
              aria-checked={isAgnos}
            >
              <span
                className={`absolute h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                  isAgnos ? 'translate-x-[125%]' : 'translate-x-[18%]'
                }`}
              />
            </button>

            <AnimatedText baseDelay={900}>against the rest of the</AnimatedText>
          
            <AnimatedText
              baseDelay={1100}
              accentWord="field."
              accentClass="text-[#6d64f2] font-semibold"
            >
              field.
            </AnimatedText>
          </h3>
        </div>

        {/* COMPARISON TABLE */}
        <div ref={tableRef} className="relative w-full max-w-2xl flex flex-col md:flex-row mb-16 px-4 md:px-0">

          {/* Left — Other Agencies */}
          <div
            className={`flex-1 flex flex-col bg-[#090a11] border border-white/5 rounded-2xl transition-all duration-500 ease-out cursor-pointer ${
              !isAgnos
                ? 'z-20 shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-[1.03]'
                : 'z-10 shadow-sm md:rounded-r-none'
            }`}
            onClick={() => setIsAgnos(false)}
          >
            <div className="p-8">
              <h4 className={`text-xl mb-6 transition-colors duration-300 ${!isAgnos ? 'text-white font-medium' : 'text-white/40'}`}>
                Other agencies
              </h4>
              <ul className="flex flex-col">
                {features.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 py-4 border-b border-dashed border-gray-800 last:border-0">
                    <svg className="w-3.5 h-3.5 text-white/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span className={`text-[15px] transition-colors duration-300 ${!isAgnos ? 'text-white/60 font-medium' : 'text-white/30'}`}>
                      {item.other}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Agnos Agency */}
          <div
            className={`flex-1 flex flex-col rounded-2xl transition-all duration-500 ease-out cursor-pointer ${
              isAgnos
                ? 'bg-[#5449e8] shadow-[inset_0_9px_45px_rgba(0,0,0,0.6)] shadow-violet-400 z-20 scale-[1.03]'
                : 'bg-[#6c63ef]/20 z-10 shadow-sm md:rounded-l-none'
            }`}
            onClick={() => setIsAgnos(true)}
          >
            <div className="p-8">
              <h4 className={`text-xl mb-6 transition-colors duration-300 ${isAgnos ? 'text-white font-medium' : 'text-white/50'}`}>
                The Walking Jumbo
              </h4>
              <ul className="flex flex-col">
                {features.map((item, idx) => (
                  <li key={idx} className={`flex items-center gap-3 py-4 border-b last:border-0 transition-colors duration-300 ${isAgnos ? 'border-white/10' : 'border-dashed border-white/5'}`}>
                    <svg className={`w-3.5 h-3.5 shrink-0 transition-colors duration-300 ${isAgnos ? 'text-white/60' : 'text-white/40'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    <span className={`text-[15px] transition-colors duration-300 ${isAgnos ? 'text-white/80 font-medium' : 'text-white/50'}`}>
                      {item.agnos}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComparisonSection;