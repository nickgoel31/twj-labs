"use client"

import React from 'react'
import Image from 'next/image'
import { ArrowRight, SparkleIcon } from 'lucide-react'
import CustomBadge from '../shared/custom-badge'
import Link from 'next/link'
import { OurWorkType } from '@/data/work-sample'
import { safeParse } from '../pricing/pricing-section-other'

const WorkDetailsHero = ({work}:{work:OurWorkType}) => {
  return (
    <div className='w-full  relative  overflow-hidden  pb-48 2xl:pb-72 grid grid-cols-1 md:grid-cols-2 gap-14 md:px-12 lg:px-24 py-24 pt-24 md:pt-[30vh]'>
         <div className='w-full h-full absolute top-0 left-0 backdrop-blur-2xl z-2' />
            <div className='absolute -top-10 left-0 w-64 h-96 bg-violet-400/10 rotate-135 blur-[100px]' />
            <div className='absolute -bottom-10 right-0 w-64 h-96 bg-[#5449e8]/15 rotate-135 blur-[100px]' />

        <div className='flex flex-col items-start gap-3 col-span-1 px-4 h-full'>
           
        <CustomBadge darkMode={true} title="Work" />
        
         <div className='block md:hidden rounded-lg md:w-[700px] lg:w-[650px] 2xl:w-[850px] aspect-video p-1 md:p-2 bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 border border-white/5 z-8  transition-transform duration-200 ease-out opacity-100'>
            <div className="absolute inset-0 bg-[#523a7840] blur-3xl" />
            <Image
                src={work.heroImage}
                alt='Work Hero'
                
                width={800}
                height={600}
                className='w-full h-full object-cover rounded-lg'
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-linear-to-t from-[#0b0b0b] to-transparent" />
        </div>
        <Image src={work.companyLogo} alt={work.companyName} width={120} height={60} className='object-contain mt-2 z-10 w-16'/>
        <h1 className='text-[44px] mt-2 font-bold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-left leading-tight max-w-sm z-10'>
            {work.companyName}
        </h1>
        <p className='text-sm text-white/60 z-10 mt-1'>{work.description}</p>

        <p className='z-10 text-sm font-bold opacity-60'>{work.projectDuration}</p>
        
        {/* TAGS */}
        <div className='flex items-center gap-3 mt-3 z-10'>
            {safeParse(work.services).map((service, index) => (
                <div key={index} className='px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-xs text-white/70'>
                    {service}
                </div>
            ))}
            
        </div>
        <Link href={work.website} target='_blank' className='text-white z-10 font-medium text-sm  mt-5 flex items-center gap-1 hover:underline'>Visit Site <ArrowRight size={16}/></Link>
        
    </div>

        <div className='hidden md:block rounded-lg absolute md:w-[700px] lg:w-[650px] 2xl:w-[850px] aspect-video p-2 bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 border border-white/5 z-8  transition-transform duration-200 ease-out opacity-100 -right-10 mt-[30vh]'>
            <div className="absolute inset-0 bg-[#523a7840] blur-3xl" />
            <Image
                src={work.heroImage}
                alt='Work Hero'
                
                width={800}
                height={600}
                className='w-full h-full object-cover rounded-lg'
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-linear-to-t from-[#0b0b0b] to-transparent" />
        </div>
    </div>
  )
}

export default WorkDetailsHero