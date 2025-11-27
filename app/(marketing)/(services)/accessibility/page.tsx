"use client"

import HeroAccessibility from '@/components/accessibility/hero'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing'
import SubservicesShared from '@/components/shared/subservices'
import React from 'react'


import { ProcessType } from '@/types'
import WhyAccessibility from '@/components/accessibility/why'

const process: ProcessType[] = [
  {
    step: 1,
    title: "Audit & Evaluation",
    description:
      "Comprehensive automated and manual audits to identify WCAG, ARIA and keyboard-navigation issues across your site.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'AccessibilityIcon', // e.g. Lucide: Accessibility
  },
  {
    step: 2,
    title: "Issue Prioritization & Roadmap",
    description:
      "We classify findings by severity and impact, produce a remediation roadmap, and estimate effort and business risk for each fix.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'AlertTriangleIcon', // e.g. Lucide: AlertTriangle or Signal
  },
  {
    step: 3,
    title: "Remediation & Implementation",
    description:
      "Our team implements fixes—semantic HTML, ARIA attributes, contrast adjustments, keyboard support and accessible components—while preserving design intent.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'CodeIcon', // e.g. Lucide: Code or Tool
  },
  {
    step: 4,
    title: "Verification, Testing & Certification",
    description:
      "We re-test, validate fixes across devices and screen readers, produce an accessibility report and help you achieve WCAG/Section 508 compliance evidence.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'CheckCircleIcon', // e.g. Lucide: CheckCircle
  },
];

const subservices = [
  {
    title: "Automated Site Scans",
    description:
      "Run scheduled automated scans (axe, Lighthouse, WAVE) to continuously surface regressions and new issues.",
    icon: 'FileSearchIcon', // e.g. Lucide: Search or FileSearch
  },
  {
    title: "Manual Accessibility Audits",
    description:
      "Human-led testing with keyboard-only navigation, screen readers (VoiceOver/NVDA/JAWS), and mobile accessibility checks.",
    icon: 'EyeIcon', // e.g. Lucide: Eye
  },
  {
    title: "Contrast & Color Testing",
    description:
      "Contrast analysis and color-blindness simulations with suggested palette adjustments to meet WCAG ratios.",
    icon: 'DropletIcon', // e.g. use a color/contrast icon (Droplet or Palette)
  },
  {
    title: "Keyboard & Focus Management",
    description:
      "Ensure logical tab order, visible focus states, and no keyboard traps for complete keyboard operability.",
    icon: 'KeyboardIcon', // e.g. Lucide: Keyboard
  },
  {
    title: "ARIA & Semantic Markup Remediation",
    description:
      "Add correct semantic HTML and ARIA roles/labels to ensure assistive technologies interpret content correctly.",
    icon: 'TagIcon', // e.g. Lucide: Tag or Bookmark
  },
  {
    title: "Screen Reader Testing",
    description:
      "VoiceOver / NVDA / JAWS testing and narration tuning so content reads clearly and in the right order for users.",
    icon: 'SpeakerIcon', // e.g. Lucide: Volume or Speaker
  },
  {
    title: "Accessibility Training & Documentation",
    description:
      "Developer and content-team training, plus an accessibility handbook and remediation guides for long-term compliance.",
    icon: 'BookOpenIcon', // e.g. Lucide: BookOpen or Book
  },
  {
    title: "Policy & Certification Support",
    description:
      "We prepare reports, remediation logs, and help coordinate third-party certification or legal review for compliance requirements.",
    icon: 'ShieldCheckIcon', // e.g. Lucide: ShieldCheck
  },
];


const AccessibilityPage = () => {
  return (
    <div className='font-manrope text-white'>
      <HeroAccessibility />
      <WhyAccessibility />
      <OurProcessDynamic process={process} title="Our Accessibility Services Process" darkMode={true} image={'/accessibility-step.svg'}/>
      <SubservicesShared subservices={subservices} darkMode={true} title='Accessibility Solutions'/>
      <PricingShared forTitle='Accessibility' title={"Let's talk money"} darkMode={true}/>
      <TheTWJDifference />
      <CaseStudiesSection darkMode={false}/>
      <TestimonialsSection darkMode={false}/>
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default AccessibilityPage