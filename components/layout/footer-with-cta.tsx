import React from 'react'
import Link from 'next/link'
import DarkVeil from '../DarkVeil' 
import { LogoSymbolGradient, LogoSymbolWhite, LogoWhite } from '../shared/logo'
import { services } from '@/data/services'
import Image from 'next/image'
import { useCases } from '@/data/use-cases'
import { ArrowRight, Sparkles } from 'lucide-react' // Assuming you have lucide-react, if not, remove the icon

const FooterWithCTA = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full relative overflow-hidden bg-[#060609] '>

      {/* --- Background Effects --- */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* <div className='absolute inset-0 opacity-60'>
            <DarkVeil
            hueShift={1}
            noiseIntensity={0.03}
            speed={0.3}
            warpAmount={5}
            />
        </div> */}
        <div className="absolute inset-0 backdrop-blur-3xl z-[1]" />
        
        {/* Large Background Logo Watermark */}
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] opacity-[0.03] rotate-[-15deg] pointer-events-none z-[2]">
            <Image
                src="/logo-outline.svg" // Ensure this path is correct
                alt=""
                fill
                className="object-contain"
            />
        </div>
      </div>

      <div className='relative z-10 max-w-[80rem] 2xl:max-w-[90rem] mx-auto px-6 md:px-12 lg:px-8 pt-20 pb-12'>
        
        {/* --- 1. Modernized CTA Section (Card Style) --- */}
        <div className="relative w-full max-w-[85rem] 2xl:max-w-[90rem] mx-auto mb-30 group">
      {/* 1. The "Glow" Behind the Card - Soft ambient light */}
      <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-[#5449e8] via-purple-500 to-[#5449e8] opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
      
      {/* 2. Main Card Container */}
      <div className="relative rounded-[32px] overflow-hidden bg-[#0a0a0a] border border-white/10 ring-1 ring-white/5 p-8 md:p-20">
        
        {/* 3. Background Grid Pattern & Radial Mask */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* 4. Top Spotlight Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#5449e8]/20 blur-[100px] pointer-events-none mix-blend-screen" />

        {/* Content Layer */}
        <div className="relative flex flex-col items-center text-center gap-8 z-10">
          
          {/* Logo / Icon Badge */}
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg ">
             {/* Replace this with your LogoSymbolGradient */}
             <div className="p-3 rounded-xl bg-gradient-to-br from-[#5449e8] to-purple-600 flex items-center justify-center">
                <LogoSymbolWhite />
             </div>
          </div>

          {/* Typography */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight  drop-shadow-sm bg-clip-text text-transparent bg-linear-to-b from-white  to-neutral-400">
              Ready to transform <br/>
              <span className="">
                your business?
              </span>
            </h2>
            <p className="text-sm md:text-lg text-neutral-400  max-w-lg mx-auto leading-relaxed ">
              Schedule a call with us to start your brand&apos;s trip to the stars... or maybe just to talk shop.
            </p>
          </div>

          {/* 5. The "Shining" Button */}
          <div className="pt-3">
            <Link 
              href={'/contact-sales'} 
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#5449e8] focus:ring-offset-2 focus:ring-offset-indigo-200"
            >
              {/* Spinning Gradient Border */}
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              
              {/* Button Content */}
              <Link href={"/contact-sales"} aria-label='Contact Sales' className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:bg-neutral-900 gap-2">
                Contact Sales
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
              </Link>
            </Link>
          </div>
          
        </div>
      </div>
    </div>


        {/* --- 2. Footer Navigation Grid --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>
          
          {/* Brand Column (Span 4) */}
          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <div className='scale-90'>
                <LogoSymbolWhite />
              </div>
              <LogoWhite />
            </div>
            <p className='text-sm text-neutral-400 leading-relaxed max-w-sm'>
              We are a team of Webflow, brand, and design experts passionate about building sites that accelerate growth for B2B brands.
            </p>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns (Span 7 total) */}
          <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8'>
            
            {/* Quick Links */}
            <div className='flex flex-col gap-4'>
                <h3 className='text-sm font-semibold text-white tracking-wide'>Company</h3>
                <ul className='flex flex-col gap-3'>
                    {['Home', 'About', 'Work', 'Contact Sales'].map((item) => (
                        <li key={item}>
                             <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Services */}
            <div className='flex flex-col gap-4'>
                <h3 className='text-sm font-semibold text-white tracking-wide'>Services</h3>
                <ul className='flex flex-col gap-3'>
                    {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
                         <li key={service.id}>
                            <Link href={service.url} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                                {service.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Use Cases / Legal */}
            <div className='flex flex-col gap-4'>
                <h3 className='text-sm font-semibold text-white tracking-wide'>Resources</h3>
                <ul className='flex flex-col gap-3'>
                    {useCases[0].cases.map((useCase) => (
                         <li key={useCase.link}>
                            <Link href={`/use-cases/for-${useCase.link}`} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                                {useCase.title}
                            </Link>
                        </li>
                    ))}
                    <li className="h-px bg-white/10 my-2 w-full" />
                    <li>
                        <Link href="/legal/privacy-policy" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/legal/terms-of-service" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>Terms of Service</Link>
                    </li>
                    <li>
                        <Link href="/legal/sitemap" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>Sitemap</Link>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {/* --- 3. Bottom Bar --- */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='text-xs text-neutral-500'>
                &copy; {currentYear} The Walking Jumbo. All rights reserved.
            </p>
            
            {/* Optional: Social Icons Placeholders */}
            <div className='flex items-center gap-6 opacity-50'>
                {/* Add standard icons like Twitter/LinkedIn here if you have them */}
                {/* <TwitterIcon className="w-4 h-4 text-white hover:text-[#5449e8] cursor-pointer transition" /> */}
            </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterWithCTA