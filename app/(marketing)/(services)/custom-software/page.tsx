"use client"

import CustomFeatures from '@/components/custom-soft/features'
import HeroCustomSoft from '@/components/custom-soft/hero'
import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import { ProcessType } from '@/types';
import { AppWindow, ShoppingCartIcon, StoreIcon } from 'lucide-react';
import React from 'react'
import { FaCode, FaPencilRuler, FaRocket, FaSearch, FaShopify } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';

export const process: ProcessType[] = [
  {
    step: 1,
    title: "Requirements & Scope",
    description:
      "We analyze your workflows and requirements to define the scope, technical strategy, and architecture.",
    image: "/our-process/software/1.png",
    icon: 'FaSearch',
  },
  {
    step: 2,
    title: "System Design & Prototyping",
    description:
      "We create flow diagrams, prototypes, and technical specifications to visualize the solution.",
    image: "/our-process/software/2.png",
    icon: 'FaPencilRuler',
  },
  {
    step: 3,
    title: "Development & Integration",
    description:
      "We build secure, scalable software using modern technologies and integrate APIs, databases, and automations.",
    image: "/our-process/software/3.png",
    icon: 'FaCode',
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description:
      "We ensure reliability, security, and performance before deploying your software to the production environment.",
    image: "/our-process/software/4.png",
    icon: 'FaRocket',
  },
];


const subservices = [
  {
    title: "Custom Next.js Web Application Development",
    description:
      "Build fast, scalable, and modern web applications powered by Next.js with server-side rendering, optimized routing, and exceptional performance.",
    icon: 'Code2Icon', // lucide-react
  },
  {
    title: "API Development & Integration",
    description:
      "Design and integrate custom REST or GraphQL APIs to connect your application with external services, internal systems, and third-party platforms.",
    icon: 'PlugIcon', // lucide-react
  },
  {
    title: "UI/UX Design to Production Build",
    description:
      "Transform Figma or custom UI/UX designs into pixel-perfect, responsive, and interactive Next.js front-end experiences.",
    icon: 'LayoutIcon', // lucide-react
  },
  {
    title: "Database & Backend Architecture",
    description:
      "Set up secure and scalable backend architecture using technologies like PostgreSQL, MongoDB, Prisma, Supabase, or Firebase.",
    icon: 'DatabaseIcon', // lucide-react
  },
  {
    title: "Performance Optimization",
    description:
      "Improve site speed, Core Web Vitals, SEO structure, and page load performance using Next.js best practices and advanced caching techniques.",
    icon: 'GaugeIcon', // lucide-react
  },
  {
    title: "Full E2E Application Development",
    description:
      "End-to-end development including planning, architecture, UI design, frontend, backend, API integrations, deployment, and QA testing.",
    icon: 'BoxesIcon', // lucide-react
  },
  {
    title: "Migration to Next.js",
    description:
      "Seamlessly migrate your existing website from WordPress, Wix, Shopify, or custom frameworks to a modern, high-performance Next.js stack.",
    icon: 'RepeatIcon', // lucide-react
  },
  {
    title: "Ongoing Maintenance & Support",
    description:
      "Continuous improvements, bug fixes, monitoring, and feature enhancements to keep your application fast and secure.",
    icon: 'WrenchIcon', // lucide-react
  },
];


const CustomSoftwarePage = () => {
  return (
    <div>
        <HeroCustomSoft />
        {/* <CustomFeatures /> */}
        <OurProcessDynamic process={process} title="Our Custom Software Development Process" darkMode={true} image='/custom-step.svg'/>
        <SubservicesShared subservices={subservices} title="All the Services We Offer" darkMode={false}/>
        <PricingShared forTitle='Custom Development' title={"Let's talk money"} darkMode={false}/>
        <TheTWJDifference />

        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={true}/>
        <FaqsSection darkMode={true}/>
        {/* <WebDesignFeatures /> */}
        {/* <EcommerceFeatures />
        <WhyEcommerce />
        <OurProcessForEcommerce />
        <EcomSubservices />
        <PricingForEcommerce />
        <TheTWJDifference />
        
        <CaseStudiesSection />
        <TestimonialsSection />
        <FaqsSection /> */}

        {/* WHY US? */}
        {/* PRICING FOR WEBFLOW */}
        {/* USECASES */}
        {/* CASE STUDIES/WORK */}
        {/* TESTIMONIALS */}
        {/* FAQ */}
    </div>
  )
}

export default CustomSoftwarePage