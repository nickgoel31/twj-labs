"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DarkVeil from "../DarkVeil";
import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

const logos = [
  { name: "Partner 1", src: "/hero/logo-1.webp" },
  { name: "Partner 2", src: "/hero/logo-2.webp" },
  { name: "Partner 3", src: "/hero/logo-3.webp" },
  { name: "Partner 4", src: "/hero/logo-4.webp" },
  { name: "Partner 5", src: "/hero/logo-5.webp" },
];

// Triplicate for a perfectly seamless infinite scroll
const marqueeLogos = [...logos, ...logos, ...logos];

export default function HeroSection() {
  const t = useTranslations('Home.Hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotation, setRotation] = useState(18); // <-- Added state for screen rotation
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Slow up
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -360]);  // Medium down
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 380]); // Fast up
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -700]); // Faster down

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // <-- Added Scroll effect to handle the straightening -->
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500; // Number of pixels to scroll before it's completely straight

      // Calculate rotation: starts at 18, hits 0 when scrollY reaches maxScroll
      const newRotation = Math.max(0, 18 - (scrollY / maxScroll) * 18);
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center "
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 ">
        <div className="opacity-50 h-[600px] md:h-[900px] lg:h-[1200px]" style={{ width: "100%", position: "relative" }}>
          <DarkVeil
            hueShift={2}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={1}
            scanlineFrequency={0}
            warpAmount={2}
          />
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl  px-6 lg:px-12 py-24 pt-44">
        <div className="flex flex-col items-center justify-center gap-16">

          {/* ── Left column ── */}
          <div className="flex-1 w-full  items-center flex flex-col justify-center">

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2.5 mb-8 transition-all duration-700 ease-out rounded-full px-2 py-1.5 backdrop-blur-lg bg-white/5 border border-white/5 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "0ms" }}
            >
              <span className="rounded-full bg-linear-to-b from-violet-700 to-violet-500 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase">
                {t('agency')}
              </span>
              <span className="text-[13px] text-white/80 tracking-wide pr-2">
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-[clamp(3rem,8vw,5.5rem)] font-light leading-[1.05] tracking-tight text-center text-white mb-6 transition-all duration-700 ease-out px-4 md:px-0 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{
                transitionDelay: "120ms",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              Building Experiences for <br /> the web.
            </h1>

            {/* Subheading */}
            <p
              className={`text-[14px] md:text-[15px] leading-relaxed text-white/50 mb-10 max-w-[280px] sm:max-w-md text-center transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "220ms" }}
            >
              {t('subtitle')}
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 mb-16 transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: "320ms" }}
            >
              <Link href={'/contact-sales'} className="w-full sm:w-auto text-center group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-[14px] font-medium text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-[0.97]">
                <span className="relative z-10">{t('ctaConnect')}</span>
              </Link>

              <Link href={'/work'} className="w-full sm:w-auto text-center group rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-[14px] font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white active:scale-[0.97]">
                {t('ctaWork')}
              </Link>
            </div>
            {/* ── Marquee Logo Strip ── */}
            <div
              className={`transition-all duration-700 ease-out w-full max-w-md ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: "420ms" }}
            >
              {/* Divider */}
              <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />



              {/* Marquee wrapper — clips overflow and anchors the fades */}
              <div className="relative overflow-hidden pt-4">

                {/* ── Left progressive fade ── */}
                <div
                  className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
                  style={{
                    background:
                      "linear-gradient(to right, #050508 0%, rgba(5,5,8,0.85) 40%, rgba(5,5,8,0.4) 70%, transparent 100%)",
                  }}
                />

                {/* ── Right progressive fade ── */}
                <div
                  className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
                  style={{
                    background:
                      "linear-gradient(to left, #050508 0%, rgba(5,5,8,0.85) 40%, rgba(5,5,8,0.4) 70%, transparent 100%)",
                  }}
                />

                {/* ── Scrolling track ── */}
                <div className="flex marquee-track items-center gap-12 w-max text-white py-1">
                  {marqueeLogos.map((logo, i) => (
                    <div
                      key={`${logo.name}-${i}`}
                      className="flex items-center shrink-0 opacity-40 hover:opacity-75 transition-opacity duration-300"
                    >
                      <Image
                        src={logo.src!}
                        alt={logo.name}
                        width={120}
                        height={40}
                        className="h-7 w-auto object-contain brightness-0 invert"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SCREEN */}
            <div ref={containerRef} className="relative w-full px-4 md:px-0">
              {/* <-- Replaced the hardcoded Tailwind transform with dynamic inline styles --> */}
              <div
                className="w-full aspect-video bg-[#090a11] rounded-2xl md:rounded-4xl mt-12 md:mt-4 border p-1 md:p-2 flex items-center justify-center border-t-[#d5dce2]/5 border-x-[#d5dce2]/5 border-b-[#b8c2cc]/5 shadow-2xl"
                style={{
                  transform: `perspective(1000px) rotateX(${rotation}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-3xl bg-black w-full h-full">

                  <motion.div style={{ y: y1 }} className="hidden md:block absolute -top-5 md:-top-10 -left-5 md:-left-50 rounded-lg opacity-20">
                    <Image
                      src={'/hero/hero-4-new.png'}
                      alt=""
                      width={600}
                      height={400}
                      className="w-[40%] md:w-97"
                    />
                  </motion.div>

                  <motion.div style={{ y: y2 }} className="hidden md:block absolute -top-2 md:-top-4 -right-10 md:-right-50 rounded-lg opacity-20">
                    <Image
                      src={'/hero/hero-2-new.png'}
                      alt=""
                      width={600}
                      height={400}
                      className="w-[40%] md:w-97"
                    />
                  </motion.div>

                  <motion.div style={{ y: y3 }} className="hidden md:block absolute -top-2 md:-top-96 left-10 md:left-50 rounded-lg opacity-40">
                    <Image
                      src={'/hero/hero-3-new.png'}
                      alt=""
                      width={600}
                      height={400}
                      className="w-[40%] md:w-97"
                    />
                  </motion.div>

                  <motion.div style={{ y: y4 }} className="hidden md:block absolute -top-2 md:-top-4 right-10 md:right-50 rounded-lg opacity-40">
                    <Image
                      src={'/hero/hero-1-new.png'}
                      alt=""
                      width={600}
                      height={400}
                      className="w-[40%] md:w-97"
                    />
                  </motion.div>


                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-black blur-[15px] md:blur-[25px] z-[-1]"></div>

                    <Image
                      src={'/symbol-logo-white.svg'}
                      alt=""
                      width={200}
                      height={200}
                      className="w-12 md:w-24"
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* Marquee: translate exactly 1/3 of the track (one full set of logos) */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        .marquee-track {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }

        /* Pause on hover for readability */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .neon-pulse {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}