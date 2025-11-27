import React from 'react'


import { GlowingEffect } from '../ui/glowing-effect'

import Image from 'next/image'
import CustomBadge from '../shared/custom-badge'
import FloatingLines from '../FloatingLines'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const HeroCustomSoft = () => {
  return (
    <div className='w-full min-h-screen font-manrope relative text-white z-0 px-6 md:px-12 lg:px-28 overflow-x-hidden overflow-y-hidden'>
      <div className="absolute top-0 left-0 inset-0  w-full opacity-10 overflow-hidden">
            <FloatingLines 
    enabledWaves={['top', 'middle', 'bottom']}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={[10, 15, 20]}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={[2, 2, 2]}
    bendRadius={5.0}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
        </div>
      <div className=' w-full pt-40 md:pt-[22vh] pb-10 md:pb-14  flex flex-col justify-center items-center top-0 left-0 font-manrope space-y-4  '>
            <CustomBadge darkMode={true} title="Custom Software Development" />
            <h1 className='text-4xl lg:text-5xl 2xl:text-5xl font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff70] to-[#999fb2] text-center leading-tight max-w-3xl z-10'>
                Custom <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Software</span> Development That Drives <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Innovation</span>
            </h1>
            
            <p className='text-white/60 text-sm font-medium max-w-lg text-center pt-1 z-10'>
                Tailored software solutions designed to meet your unique business needs and propel your growth.
            </p>

            {/* Buttons: Stack on very small screens, row on larger */}
        <div className=' flex flex-row  items-center pt-3 gap-4 z-10 w-full sm:w-auto max-w-[80vw]'>
          <Link href={'/contact-sales'} className="w-full sm:w-auto text-center px-4 py-3 md:px-6.5 md:py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
            Contact Sales
          </Link>
          <Link href={'/work'} className="w-full sm:w-auto text-center  px-4 py-3 md:px-6.5 md:py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
            Our Work <ArrowRight size={16} />
          </Link>
        </div>

      </div>

       
      <div>
        <div className="relative h-full rounded-2xl border border-white/10 p-1 md:rounded-3xl md:p-3 mx-auto max-w-7xl">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-black shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
           <Image 
                           src="/custom-1.png"
                           alt="Ecommerce Hero Image"
                           width={1500}
                           height={1500}
                           className='w-full  brightness-100 contrast-115'
                           />
                           
          </div>
        </div>
      </div>
      </div>
      <div className='bg-[#060508] w-full scale-150 h-60 md:h-70 rounded-full absolute bottom-0 blur-2xl z-[2]'>

                </div>

            <div className='bg-[#060508] z-[-2]'>
                    <div className='absolute inset-0 w-full h-full '>
                        <div className='absolute inset-0 w-full h-full bg-radial from-black/0 to-black  '/>
                        
                    </div>
                </div>


        
    </div>
  )
}

export default HeroCustomSoft