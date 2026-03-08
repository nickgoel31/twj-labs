"use client"

import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import ToolsWeUseSection from './tools'
import CustomBadge from '../shared/custom-badge'
import { SparklesCore } from '../sparkles'
import CircularGallery from '../CircularGallery'

// 1. Define your custom images
const myCustomImages = [
  { image: 'https://images.unsplash.com/photo-1506744626753-eba7bc3613ee?q=80&w=1600&auto=format&fit=crop', text: 'Nature' },
  { image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1600&auto=format&fit=crop', text: 'City' },
  { image: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1600&auto=format&fit=crop', text: 'Ocean' }
  // Add as many as you need...
];

const HeroSection = () => {
  const [tilt, setTilt] = useState(30); // start tilted at 30°

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust 300px threshold — after 300px scroll, card is flat
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      const newTilt = 30 - progress * 30; // from 30° to 0°
      setTilt(newTilt);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Added overflow-hidden to prevent side cards from causing horizontal scroll on smaller desktops
    <div className='w-full pb-16 relative overflow-hidden'>
      <div className="absolute top-0 left-0 inset-0 w-full overflow-hidden ">
       
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline // Important for iOS to not open fullscreen
        src="/bgs/light-rays-loop.mp4" 
      />
      {/* Optional: Add a CSS overlay if you want to tint it dynamically
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay" /> 
      */}
      <div className="absolute inset-0 bg-black/30 mix-blend-overlay" /> 
      </div>
      <div className="absolute top-0 left-0 inset-0 w-full overflow-hidden block md:hidden">
          {/* <LightRays
          raysOrigin="top-center"
          raysColor="#baa1e3"
          raysSpeed={0.1}
          lightSpread={3}
          rayLength={5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.1}
          distortion={0.12}
          className="custom-rays"
        /> */}

        <div className='absolute top-0 left-0 w-full h-full z-10 opacity-5'>
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
      </div>

      {/* CONTENT */}
      {/* Changed px-24 to px-6 md:px-24 for mobile spacing */}
      {/* Changed pt-40 to pt-32 md:pt-40 to account for smaller mobile headers */}
      <div className='w-full pt-32 md:pt-40 pb-20 flex flex-col justify-center items-center px-6 md:px-24 top-0 left-0 font-manrope space-y-4'>
        <CustomBadge darkMode={true} title="Development & Design Agency" />
        
        {/* Responsive Text Size: text-3xl on mobile, 44px on desktop */}
        <h1 className='text-4xl md:text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff] to-[#999fb2] text-center leading-tight max-w-3xl z-10'>
          We build digital experiences that perform, convert, and scale
        </h1>

        <p className='text-white/60 text-sm font-medium max-w-lg text-center pt-1 z-10'>
          Partner with us to transform your ideas into high-performing digital products that drive growth and deliver exceptional user experiences.
        </p>

        {/* Buttons: Stack on very small screens, row on larger */}
        <div className='pt-3 flex flex-row  items-center gap-4 z-10 w-full sm:w-auto max-w-[80vw]'>
          <Link href={'/contact-sales'} aria-label='Contact Sales' className="w-full sm:w-auto text-center px-4 py-3 md:px-6.5 md:py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
            Contact Sales
          </Link>
          <Link href={'/work'} aria-label='Our Work' className="w-full sm:w-auto text-center  px-4 py-3 md:px-6.5 md:py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
            Our Work <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* VISUAL */}
      <div className="w-full flex items-center justify-center mb-14 relative z-10 px-4 ">
        
        {/* LEFT CARD - Hidden on mobile/tablet/small laptops (xl:block) to prevent layout breakage */}
        <div className='hidden xl:block absolute left-1/2 -translate-x-[65%] translate-y-2 three-d-card-1 rounded-lg w-[700px] 2xl:w-[800px] aspect-video p-2 bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 opacity-80 transition-transform duration-200 ease-out'
          style={{
            transform: `perspective(75em) rotateX(${tilt}deg)`,
          }}>
          <div className="absolute inset-0 bg-[#523a7840] blur-3xl" />
          <Image
            src="/hero/2.png"
            alt="Description of image"
            width={800}
            height={450}
            className="w-full h-full rounded-lg opacity-80 select-none"
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none bg-linear-to-t from-[#0b0b0b] to-transparent" />
        </div>

        {/* RIGHT CARD - Hidden on mobile/tablet/small laptops (xl:block) */}
        <div className='hidden xl:block absolute right-1/2 translate-x-[70%] -translate-y-2 three-d-card-1 rounded-lg w-[650px] 2xl:w-[750px] aspect-video p-2 bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 opacity-80 transition-transform duration-200 ease-out'
          style={{
            transform: `perspective(75em) rotateX(${tilt}deg)`,
          }}>
          <div className="absolute inset-0 bg-[#523a7840] blur-3xl" />
          <Image
            src="/hero/3.png"
            alt="Description of image"
            width={800}
            height={450}
            className="w-full h-full rounded-lg opacity-80 select-none"
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none bg-linear-to-t from-[#0b0b0b] to-transparent" />
        </div>

        {/* CENTER MAIN CARD - Responsive Width */}
        <div
          className="rounded-lg w-full md:w-[700px] lg:w-[750px] 2xl:w-[850px] aspect-video p-2 bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 border border-white/5 relative z-8 three-d-card-1 transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(75em) rotateX(${tilt}deg)`,
          }}
        >
          <div className="absolute inset-0 bg-[#523a7840] blur-3xl" />
          <Image
            src="/hero/1-newest.png"
            alt="Description of image"
            width={800}
            height={450}
            className="w-full h-full rounded-lg"
          />
          <div className="absolute inset-0 rounded-lg pointer-events-none bg-linear-to-t from-[#0b0b0b] to-transparent" />
        </div>

        

        {/* <div className='absolute -bottom-16 left-0 bg-[#06070d] rounded-full blur-2xl h-48 w-full z-[30]' /> */}
      </div>

      <ToolsWeUseSection />
    </div>
  )
}

export default HeroSection