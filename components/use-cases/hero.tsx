'use client'

import { UseCase, useCases } from '@/data/use-cases'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomBadge from '../shared/custom-badge'
import {
  BriefcaseIcon,
  ShoppingCartIcon,
  CloudIcon,
  Cog6ToothIcon,
  HeartIcon,
  AcademicCapIcon,
  TruckIcon,
  BanknotesIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/solid';

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  BriefcaseIcon,
  ShoppingCartIcon,
  CloudIcon,
  Cog6ToothIcon,
  HeartIcon,
  AcademicCapIcon,
  TruckIcon,
  BanknotesIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
};

const UseCasesHeroSection = ({ useCase }: { useCase: UseCase }) => {
  const otherUseCases = useCases.flatMap(section => section.cases).filter(uc => uc.link !== useCase.link);

  const IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[useCase.icon];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    // Optional: Only add listener on larger screens to save performance on mobile
    if (window.innerWidth > 1024) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // Adjusted Padding: px-6 for mobile, px-24 for desktop
    <div className="w-full font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 2xl:px-28 pt-28 md:pt-40 pb-10 md:pb-20 overflow-hidden min-h-screen lg:min-h-0">
      
      {/* Header Section */}
      <div className='w-full flex flex-col justify-center items-center top-0 left-0 font-manrope space-y-4'>
        <CustomBadge title={`for ${useCase.title}`} darkMode={true} />
        
        {/* Responsive Text Size */}
        <h1 className='text-3xl md:text-5xl lg:text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff] to-[#999fb2] text-center leading-tight max-w-3xl z-10'>
          {useCase.heroHeading}
        </h1>

        <p className='text-white/60 text-sm md:text-base font-medium max-w-lg text-center pt-1 z-10'>
          {useCase.heroSubheading}
        </p>
      </div>

      {/* Visual Section */}
      <div className='mt-10 h-auto lg:h-[60vh] w-full relative flex flex-col lg:block items-center'>
        
        {/* Background Gradients (Scaled down for mobile) */}
        <div className='absolute w-60 md:w-96 aspect-square left-1/2 top-1/2 -translate-1/2 -translate-y-1/3 bg-gradient-to-tr from-purple-600/10 via-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none z-0' />
        <div className='absolute w-60 md:w-96 aspect-square top-0 left-0 -translate-1/2 -translate-y-1/3 bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none z-0' />
        <div className='absolute w-60 md:w-96 aspect-square top-0 left-full -translate-1/2 -translate-y-1/3 bg-gradient-to-tr from-rose-600/10 via-pink-400/5 to-transparent rounded-full blur-3xl pointer-events-none z-0' />

        {/* Center Main Bubble */}
        {/* Position: Relative on mobile (to stack), Absolute on Desktop */}
        <div className='relative lg:absolute w-64 md:w-80 lg:w-96 aspect-square lg:left-1/2 lg:top-1/2 lg:-translate-1/2 group z-10 mb-8 lg:mb-0'>
          <Image
            src={'/use-case-bubble-main.svg'}
            alt='use-case'
            width={1000}
            height={1000}
            className='w-full h-full object-contain'
          />
          <div className='absolute left-1/2 top-1/2 -translate-1/2 flex flex-col items-center justify-center'>
            <IconComponent className='opacity-60 fill-violet-400 size-8 md:size-10 group-hover:opacity-0 transition duration-500' />
            <p className="text-xs absolute opacity-0 group-hover:opacity-40 transition duration-500 text-center whitespace-nowrap">
              {useCase.title}
            </p>
          </div>
        </div>

        {/* --- MOBILE VIEW: Horizontal Scroll List (Replaces floating bubbles) --- */}
        <div className='flex lg:hidden w-full overflow-x-auto gap-4 pb-4 snap-x px-2 scrollbar-hide z-20 justify-start md:justify-center'>
           {otherUseCases.map((uc) => {
            const IconComp: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[uc.icon];
            
            return (
              <Link 
                key={uc.link} 
                href={`/use-cases/for-${uc.link}`}
                className="flex-shrink-0 w-24 h-24 relative snap-center flex flex-col items-center justify-center bg-white/5 rounded-full border border-white/10"
              >
                 <IconComp className="opacity-50 size-6 mb-1 text-violet-300" />
                 <span className='text-[10px] text-white/50'>{uc.title}</span>
              </Link>
           )})}
        </div>

        {/* --- DESKTOP VIEW: Floating Parallax Bubbles --- */}
        <div className="hidden lg:block w-full h-full absolute top-0 left-0 pointer-events-none">
            {otherUseCases.map((uc, index) => {
              const IconComp: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[uc.icon];

            const isB2B = uc.link === "b2b";
            const activeIsNotB2B = useCase.link !== "b2b";
            const finalTop = isB2B && activeIsNotB2B ? useCase.positions?.top : uc.positions?.top;
            const finalLeft = isB2B && activeIsNotB2B ? useCase.positions?.left : uc.positions?.left;
            const finalRight = isB2B && activeIsNotB2B ? useCase.positions?.right : uc.positions?.right;

            const movementFactor = 0.1 + (index % 1) * 1; 
            const directionX = index % 2 === 0 ? 1 : -1; 
            const directionY = index % 3 === 0 ? -1 : 1; 

            const normalizedMouseX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1000)) - 0.5;
            const normalizedMouseY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1000)) - 0.5;

            const translateX = normalizedMouseX * movementFactor * directionX * 30; 
            const translateY = normalizedMouseY * movementFactor * directionY * 30;

            return (
                <Link
                key={uc.link}
                href={`/use-cases/for-${uc.link}`}
                className="absolute group cursor-pointer transition-transform duration-1000 ease-out will-change-transform pointer-events-auto"
                style={{
                    top: finalTop ? `${finalTop}%` : undefined,
                    left: finalLeft ? `${finalLeft}%` : undefined,
                    right: finalRight ? `${finalRight}%` : undefined,
                    transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`,
                }}
                >
                <div className="w-32 xl:w-40 aspect-square blur-[1px] group-hover:blur-0 transition-all duration-500 relative">
                    <Image
                    src={"/use-case-bubble.svg"}
                    alt="use-case"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <IconComp className="opacity-30 size-5 group-hover:opacity-0 transition duration-500" />
                    <p className="text-xs absolute opacity-0 group-hover:opacity-40 transition duration-500 text-center">
                        {uc.title}
                    </p>
                    </div>
                </div>
                </Link>
            );
            })}
        </div>
        
      </div>
    </div>
  )
}

export default UseCasesHeroSection