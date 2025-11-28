'use client'

import { SparkleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import CustomBadge from './custom-badge'

const faqs = [
  {
    question: "What services does your agency specialize in?",
    answer:
      "We design, build, and optimize high-performing digital experiences. Our core services include Webflow development, WordPress development, e-commerce solutions, AI integration & automation, custom software development, accessibility testing & compliance, web design, SEO optimization, website maintenance, migration, and copywriting.",
  },
  {
    question: "How does your project process work?",
    answer:
      "Every project begins with discovery—understanding your goals, challenges, and audience. We then move into UX planning, UI design, development, testing, and final deployment. Throughout the process, you receive consistent updates, previews, and opportunities to provide feedback.",
  },
  {
    question: "What is the typical timeline for a project?",
    answer:
      "Timelines vary depending on project scope. A standard website takes 3–6 weeks, an e-commerce build 4–8 weeks, AI integrations 1–4 weeks, and custom software projects can range from 1–3 months. We provide a clear timeline before starting.",
  },
  {
    question: "Do you offer maintenance or ongoing support?",
    answer:
      "Yes. We provide monthly and quarterly maintenance plans that include updates, performance monitoring, security fixes, SEO maintenance, content updates, and ongoing support. Clients who build with us often choose long-term maintenance to keep their website healthy.",
  },
  {
    question: "Can you improve or fix my existing website?",
    answer:
      "Absolutely. Whether your site needs design improvements, performance fixes, bug resolution, migrations, accessibility upgrades, or new features—we can help. We frequently work on inherited or partially completed projects.",
  },
  {
    question: "How do payments and contracts work?",
    answer:
      "We typically take a 40–50% upfront deposit to secure your project, followed by one or two milestone payments. All projects include a clear scope, timeline, and agreement before work begins.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes. We work with clients across the US, Europe, Asia, and the Middle East. All communication is done through email, Notion, Slack, Zoom, or your preferred workflow.",
  },
];


const FaqsSection = ({ darkMode = false }: { darkMode?: boolean }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div
      className={cn(
        'w-full  px-6 lg:px-24 font-manrope py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start transition-colors duration-300',
        darkMode ? 'bg-[#060609] text-white' : 'bg-[#F4F5F9] text-black'
      )}
    >
      {/* Left Column */}
      <div className='flex flex-col items-center md:items-start gap-2 col-span-1 px-4'>
        <CustomBadge darkMode={darkMode} title="FAQs" />
                      
        
        <h1 className={cn("text-4xl mt-1 md:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl bg-gradient-to-l md:text-start text-center from-white to-gray-400 bg-clip-text text-transparent py-1",darkMode
              ? 'bg-gradient-to-l from-white to-gray-400'
              : 'bg-gradient-to-l from-[#000000] to-[#3e374b]'
          )}>
          Frequently Asked Questions
                </h1>
                
                <p className="opacity-60  max-w-xl mt-2 mb-5 md:text-start text-center">
          Here are some of the most common questions we get asked about our services and processes.
                </p>
       
      </div>

      {/* Right Column – Accordion */}
      <div className='col-span-1 w-full flex flex-col gap-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleAccordion(index)}
            className={cn(
              'border rounded-md p-4 transition-all duration-200 cursor-pointer backdrop-blur-md',
              darkMode
                ? 'bg-[#0a0a0e]/90 border-white/10 hover:border-[#6c4efc]/50'
                : 'bg-white border-black/10 hover:border-[#6c4efc]/50 shadow-sm',
              activeIndex === index && 'border-[#6c4efc]/50'
            )}
          >
            {/* Question Row */}
            <div className='flex justify-between items-center'>
              <h2
                className={cn(
                  'font-medium opacity-80 transition-colors duration-300',
                  darkMode ? 'text-white' : 'text-black'
                )}
              >
                {faq.question}
              </h2>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'font-bold text-xl select-none transition-colors duration-300',
                  darkMode ? 'text-[#a894ff]' : 'text-[#6c4efc]'
                )}
              >
                +
              </motion.span>
            </div>

            {/* Animated Answer */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key='content'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <p
                    className={cn(
                      'mt-3 text-sm leading-relaxed transition-colors duration-300',
                      darkMode ? 'text-white/70' : 'text-black/70'
                    )}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqsSection
