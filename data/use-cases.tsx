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



export type UseCase = {
  title: string;
  icon: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  whyChoosePoints: string[];
  link: string;
  positions?: { top: number; left?: number; right?: number };
}

export const useCases: { heading: string; cases: UseCase[] }[] = [
  {
    heading: 'Industry',
    cases: [
      // ------------------ B2B ------------------ //
      {
        title: 'B2B',
        icon: 'BriefcaseIcon',
        description: 'Websites tailored for B2B companies to drive leads and conversions.',
        heroHeading: 'We build stunning B2B websites that convert customers',
        heroSubheading:
          'Empower your B2B business with a website that captivates your audience, drives conversions, and accelerates growth.',
        whyChoosePoints: [
          'Industry Expertise: We understand the needs of B2B companies and create messaging that connects with decision-makers.',
          'Lead Generation Focus: Our designs prioritize conversion funnels, CTAs, and clear pathways to inquiry.',
          'Professional Aesthetics: Clean, trustworthy design that positions your brand as an authority.',
        ],
        link: 'b2b',
        positions:{ top: 22, left: 35}
      },

      // ------------------ E-Commerce ------------------ //
      {
        title: 'E-Commerce',
        icon: 'ShoppingCartIcon',
        description: 'High-converting online stores built for performance, UX, and growth.',
        heroHeading: 'We design and build e-commerce experiences that boost revenue',
        heroSubheading:
          'From Shopify to custom storefronts, we create smooth, high-performing shopping experiences built to scale.',
        whyChoosePoints: [
          'Conversion-Optimized Design: Every page is crafted to increase add-to-cart and checkout rates.',
          'Scalable Store Architecture: Structured product data, filtering, and integrations for long-term growth.',
          'Seamless Integrations: Payments, inventory, fulfillment, CRM, and marketing automations — all connected.',
        ],
        link: 'ecommerce',
        positions:{ top: 22, left: 35}
      },

      // ------------------ SaaS ------------------ //
      {
        title: 'SaaS',
        icon: 'CloudIcon',
        description: 'Landing pages, dashboards, and product experiences built for SaaS companies.',
        heroHeading: 'We help SaaS companies build stunning product experiences',
        heroSubheading:
          'From marketing sites to in-app dashboards, we craft experiences that convert users and elevate product perception.',
        whyChoosePoints: [
          'Product-Led Approach: We design UX that aligns with your onboarding and feature adoption goals.',
          'Scalable Component Systems: Figma design systems + modular UI ensure long-term consistency.',
          'Clear Messaging: We simplify complex products through strong UX writing and visuals.',
        ],
        link: 'saas',
        positions:{ top: 24, left:66}
      },

      // ------------------ Healthcare ------------------ //
      {
        title: 'Healthcare',
        icon: 'HeartIcon',
        description: 'Accessible, trustworthy healthcare websites built to serve patients effectively.',
        heroHeading: 'We create clean, accessible healthcare websites that build trust',
        heroSubheading:
          'From clinics to health platforms, we design compliant, patient-first experiences.',
        whyChoosePoints: [
          'Accessibility First: WCAG-compliant structure for inclusive patient access.',
          'Trust & Clarity: Clean visuals and messaging designed to build confidence.',
          'HIPAA-Aligned Practices: Secure design-thinking for sensitive workflows.',
        ],
        link: 'healthcare',
        positions:{ top: 50, left: 20}
      },

      // ------------------ Education ------------------ //
      {
        title: 'Education',
        icon: 'AcademicCapIcon',
        description: 'Digital experiences for schools, educators, and e-learning platforms.',
        heroHeading: 'We help education brands deliver better learning experiences',
        heroSubheading:
          'From course platforms to institutional websites, we design experiences that support students and educators.',
        whyChoosePoints: [
          'User-Friendly Navigation: Clear structure for students, parents, and faculty.',
          'Content-Rich Layouts: Course catalogs, schedules, and resources built for clarity.',
          'Modern eLearning UX: Dashboard flows, progress tracking, and intuitive UI.',
        ],
        link: 'education',
        positions:{ top: 50, left: 80}
      },

    
      // ------------------ Finance / Fintech ------------------ //
      {
        title: 'Finance & FinTech',
        icon: 'BanknotesIcon',
        description: 'Secure, compliant, and high-trust websites for finance brands.',
        heroHeading: 'We design secure, high-trust digital experiences for finance',
        heroSubheading:
          'Your financial brand needs clarity, credibility, and seamless digital workflows — we deliver that.',
        whyChoosePoints: [
          'Trust-Centered Design: Layouts that communicate security and professionalism.',
          'Compliance-Friendly Structure: Built with accessibility and clarity in mind.',
          'High Performance: Optimized for speed, reliability, and uptime.',
          'User-Focused Workflows: Intuitive navigation for complex financial services.',
        ],
        link: 'finance',
        positions:{ top: 82, left: 64}
      },

      // ------------------ Real Estate ------------------ //
      {
        title: 'Real Estate',
        icon: 'HomeModernIcon',
        description: 'Modern real estate websites with property listings and lead funnels.',
        heroHeading: 'We create modern real-estate sites built to generate leads',
        heroSubheading:
          'From property listings to interactive maps, we build real estate experiences that convert.',
        whyChoosePoints: [
          'Listing-Ready Templates: Property pages built for clarity and conversion.',
          'Interactive Tools: Filters, maps, and inquiry forms.',
          'High-End Presentation: Clean design that elevates your properties.',
          'Lead Generation Focus: Optimized funnels to capture potential buyers.',
        ],
        link: 'realestate',
        positions:{ top: 82, left: 35}
      },

      // ------------------ Hospitality ------------------ //
      {
        title: 'Hospitality',
        icon: 'BuildingStorefrontIcon',
        description: 'Beautiful, conversion-focused websites for hotels and hospitality brands.',
        heroHeading: 'We design hospitality websites built for bookings',
        heroSubheading:
          'From hotels to service businesses, we create immersive digital experiences that drive reservations.',
        whyChoosePoints: [
          'Booking-Optimized: Conversion-driven structure for more reservations.',
          'Visual Storytelling: Clean layouts that elevate your brand aesthetic.',
          'Mobile-First Design: Fast, seamless UX for users booking on the go.',
          'Seamless Booking Flows: Intuitive interfaces for easy reservations.',
        ],
        link: 'hospitality',
        positions:{ top: 100, left:50}
      },
    ],
  },
];
