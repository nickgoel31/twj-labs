"use client"

import { SparkleIcon, ArrowUpRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { getSanityCaseStudies } from '@/actions/get-portfolio'

// Define the type based on what our GROQ query returns
export interface SanityWorkType {
  _id: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  description: string;
  heroImage: string;
  conversionRate: string;
  userGrowth: string;
  technologies: string[];
  projectType: string;
}

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Animation variants for individual cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const WorkPage = () => {
    const [portfolio, setPortfolio] = React.useState<SanityWorkType[]>([])
    const [loading, setLoading] = React.useState<boolean>(false);
    const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getSanityCaseStudies();
                if (!mounted) return;
                setPortfolio(data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
                if (!mounted) return;
                setPortfolio([]);
            } finally {
                if (!mounted) return;
                setLoading(false);
                setInitialLoaded(true);
            }
        }
        loadData();
        return () => { mounted = false; }
    }, [])

  return (
    <div className='bg-[#060609] text-white w-full min-h-screen font-manrope selection:bg-indigo-500/30'>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className='w-full pt-32 pb-24 flex flex-col items-center justify-center text-center space-y-6'>
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-xs font-semibold uppercase tracking-widest'
            >
                <SparkleIcon size={14} className="fill-current" />
                Our Portfolio
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 leading-[1.1] max-w-4xl'
            >
                Selected <span className="text-indigo-500">Works.</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='text-neutral-400 text-sm md:text-base font-medium max-w-2xl leading-relaxed'
            >
                Explore a selection of our recent projects that highlight our commitment to quality, innovation, and client satisfaction.
            </motion.p>
        </div>

        {/* Work Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 z-20'
        >
          {/* Show skeletons during initial load */}
          {loading && !initialLoaded && (
            Array.from({ length: 6 }).map((_, idx) => <SkeletonWorkCard key={`skeleton-${idx}`} index={idx} />)
          )}

          {/* Render actual portfolio when available and not loading */}
          {!loading && portfolio && portfolio.length > 0 && (
            portfolio.map((item) => (
              <OurWorkCard key={item._id} work={item} />
            ))
          )}

          {/* When not loading and no portfolio */}
          {!loading && (!portfolio || portfolio.length === 0) && (
            <div className='col-span-full text-center text-neutral-400 py-12'>
              {initialLoaded ? 'No portfolio items found.' : 'Unable to load portfolio. Please try again later.'}
            </div>
          )}
        </motion.div>
      </div>

      {/* Centered Loading Overlay (blocks interaction during first load) */}
      {loading && !initialLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="backdrop-blur-sm bg-black/40 absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Spinner />
            <span className="text-sm text-neutral-300">Loading portfolio…</span>
          </div>
        </div>
      )}

      {/* ARIA live region */}
      <div aria-live="polite" className="sr-only">
        {loading ? 'Loading portfolio' : 'Portfolio loaded'}
      </div>
    </div>
  )
}

export default WorkPage

/* ----------------------
   OurWorkCard
   ---------------------- */
const OurWorkCard = ({ work }: { work: SanityWorkType }) => {
  // Sanity returns an array directly, so we just fallback to an empty array if it's undefined
  const parsedServices = work.technologies || []
  
  return (
    <div className='z-20'>
        <Link href={`/work/${work._id}`} className="block h-full ">
            <div className="group relative bg-[#0c0c12] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 h-full flex flex-col">
                
                {/* 1. Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {work.heroImage && (
                        <Image
                            src={work.heroImage}
                            alt={work.companyName}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 text-white">
                            {work.projectType}
                        </span>
                    </div>
                </div>

                {/* 2. Content Area */}
                <div className="p-6 flex flex-col flex-grow relative">
                    {/* Background Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <div className="relative z-10 flex justify-between items-start gap-4 mb-4">
                        <div>
                          {work.companyLogo ? (
                            <Image 
                              src={work.companyLogo}
                              alt={work.companyName}
                              width={200}
                              height={200}
                              className="w-16 object-contain mb-4 mx-2 group-hover:opacity-80 transition-opacity duration-300"
                            />
                          ) : (
                            <h3 className="text-xl font-bold text-white mb-4 mx-2">
                                {work.companyName}
                            </h3>
                          )}
                            
                            <div className="flex flex-wrap gap-2 text-xs text-neutral-500 font-mono">
                                {parsedServices.slice(0, 2).map((service, index) => (
                                    <span key={index} className="px-2 py-1 bg-white/5 rounded-full">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Circular Icon Arrow */}
                        <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                             <ArrowUpRight size={18} className="text-white group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-6">
                            {work.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300">
                            Read Success Story 
                            <ArrowRight size={16} className="text-indigo-400" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

/* ----------------------
   Skeleton Work Card
   ---------------------- */
const SkeletonWorkCard = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div variants={cardVariants} initial="hidden" animate="show" transition={{ delay: (index || 0) * 0.03 }}>
      <div className="group relative bg-[#0c0c12] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800/50 animate-pulse" />

        <div className="p-6 flex flex-col flex-grow relative">
          <div className="h-6 w-16 rounded-full bg-neutral-800/80 animate-pulse mb-3" />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-20 rounded-full bg-neutral-800/80 animate-pulse" />
            <div className="h-6 w-16 rounded-full bg-neutral-800/80 animate-pulse" />
          </div>

          <div className="mt-auto">
            <div className="h-4 w-full rounded bg-neutral-800/50 animate-pulse mb-2" />
            <div className="h-4 w-3/4 rounded bg-neutral-800/50 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ----------------------
   Spinner component
   ---------------------- */
const Spinner = () => (
  <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)