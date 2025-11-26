"use client"

import { ArrowRight } from "lucide-react"
import React from "react"
import Link from "next/link"
import { HeroSection } from "@/types"
import { motion, Variants } from "framer-motion"
import CustomBadge from "../shared/custom-badge"

const GenericHeroPage = ({ data }: { data: HeroSection }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = React.useState({ rotateX: 0, rotateY: 0 })

  // --- Mouse 3D motion ---
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      // Optional: Disable 3D tilt on mobile for performance/UX
      if (window.innerWidth < 1024) return;

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateY = ((x - centerX) / centerX) * 10
      const rotateX = -((y - centerY) / centerY) * 10

      requestAnimationFrame(() => {
        setTransform({ rotateX, rotateY })
      })
    }

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        setTransform({ rotateX: 0, rotateY: 0 })
      })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // --- Variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  // --- Render
  return (
    // Changed h-screen to min-h-screen for mobile safety
    // Adjusted padding: px-6 for mobile, increasing to px-24 for desktop
    <div className="w-full min-h-screen font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 2xl:px-28 pt-28 lg:pt-32  lg:pb-6 flex flex-col justify-center">
      
      {/* Grid: 1 column on mobile, 2 on Large screens */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-12 lg:gap-10 h-full">
        
        {/* LEFT SIDE: Content */}
        {/* Removed h-full justify-between to allow natural stacking on mobile */}
        <div className="w-full flex flex-col items-center md:items-start justify-between font-manrope space-y-4 lg:space-y-12 order-1 ">
          
          <div className="flex flex-col items-center md:items-start gap-5">
            <CustomBadge darkMode={true} title={data.tag} />
            
            {/* Responsive Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-[48px] 2xl:text-[56px] font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff70] to-[#999fb2] leading-[1.2] md:leading-tight max-w-full lg:max-w-xl z-10 text-center md:text-left">
              {data.title}
            </h1>
          </div>

          <div className="w-full">
            <p className="text-white/60 text-sm md:text-base 2xl:text-lg font-medium max-w-full lg:max-w-lg z-10 pb-2 leading-relaxed text-center md:text-left">
              {data.description}
            </p>

            {/* Buttons: Stack on small mobile, row on larger */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4 z-10 w-full sm:w-auto">
              <Link
                href={"/contact-sales"}
                className="w-full sm:w-auto text-center px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500"
              >
                Contact Sales
              </Link>
              <Link
                href={"/our-work"}
                className="w-full sm:w-auto justify-center px-6.5 py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                Our Work <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Visuals */}
        {/* Added fixed height for mobile (h-[500px]) so the card renders. On desktop it goes back to h-auto/full */}
        <div
          ref={containerRef}
          className="w-full h-[450px] md:h-[600px] lg:h-auto relative z-0 order-2 lg:order-2"
        >
          <div className="w-64 aspect-square rounded-full z-[-1] absolute bottom-0 -translate-x-1/2 left-1/2 bg-[#5449e830] blur-[150px]" />

          <motion.div
            className="w-full h-full relative rounded-3xl bg-radial from-[#06060a] via-[#161616] to-[#0b0b12] backdrop-blur overflow-hidden flex flex-col items-center justify-center p-6 space-y-8 z-1 transition-transform duration-150 ease-out will-change-transform border border-white/5"
            style={{
               // Only apply transform if screen is large enough (controlled via JS logic or just CSS perspective)
               transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data.displayElements?.map((Element, index) => (
              <motion.div
                key={index}
                style={{
                  perspective: "200px",
                  // Reduce parallax movement slightly on mobile by default
                  transform: `translateX(${transform.rotateX * 0.2}px) translateY(${transform.rotateY * 0.2}px)`,
                }}
                className="w-full flex items-center justify-center"
              >
                {Element}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GenericHeroPage