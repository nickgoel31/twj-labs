import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import WhatWeDoSection from '@/components/home/what-we-do'
import OtherServicesPricing from '@/components/pricing/other-services-pricing'
import PricingSection from '@/components/pricing/pricing-section-other'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import UseCasesHeroSection from '@/components/use-cases/hero'
import UseCasesWhySharedIndustrySection from '@/components/use-cases/why'
import { useCases } from '@/data/use-cases'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Record<string, string | string[]> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const industryLink = slug.split('-')[1]
  const currentUseCase = useCases.find(section => 
    section.cases.find(useCase => useCase.link === industryLink)
  )?.cases.find(useCase => useCase.link === industryLink)

  if (!currentUseCase) {
    return {};
  }
 
  return {
    title: `Best Web Agency for ${currentUseCase.title}`,
    description: currentUseCase.description
  }
}

const UsecaseSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  const industryLink = slug.split('-')[1]
  const currentUseCase = useCases.find(section => 
    section.cases.find(useCase => useCase.link === industryLink)
  )?.cases.find(useCase => useCase.link === industryLink)

  if (!currentUseCase) {
    return <div className='text-white p-10'>Use case not found.</div>
  }

  return (
    <div>
      <UseCasesHeroSection useCase={currentUseCase} />
      <UseCasesWhySharedIndustrySection useCase={currentUseCase} />
      
      <CaseStudiesSection darkMode={false}/>
      <TestimonialsSection darkMode={false}/>
      <WhatWeDoSection />
      <PricingSection />
      <OtherServicesPricing />
      <TheTWJDifference />
      <FaqsSection />
    </div>
  )
}

export default UsecaseSlugPage