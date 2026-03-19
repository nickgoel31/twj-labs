import React from 'react'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import DarkVeil from '../DarkVeil'
import { LogoSymbolGradient, LogoSymbolWhite, LogoWhite } from '../shared/logo'
import { services } from '@/data/services'
import Image from 'next/image'
import { useCases } from '@/data/use-cases'
import { ArrowRight, Sparkles } from 'lucide-react' // Assuming you have lucide-react, if not, remove the icon
import CTAWithVerticalMarquee from './CTA';

const FooterWithCTA = () => {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navbar');
  const sT = useTranslations('Services');
  const uT = useTranslations('UseCases');
  const currentYear = new Date().getFullYear();

  const serviceKeyMap: { [key: number]: string } = {
    1: 'webflow', 2: 'wordpress', 3: 'webDesign', 4: 'ecommerce', 5: 'customSoftware',
    14: 'aiIntegration', 13: 'accessibility', 7: 'seo', 8: 'socialMedia', 9: 'maintenance',
    10: 'copywriting', 11: 'migration', 6: 'aiIntegration' // Some IDs might be inconsistent
  };

  const useCaseKeyMap: { [key: string]: string } = {
    'b2b': 'b2b', 'ecommerce': 'ecommerce', 'saas': 'saas', 'healthcare': 'healthcare',
    'education': 'education', 'finance': 'finance', 'realestate': 'realestate', 'hospitality': 'hospitality'
  };

  return (
    <footer className='w-full relative overflow-hidden bg-[#060609] '>

      {/* --- Background Effects --- */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* <div className='absolute inset-0 opacity-60'>
            <DarkVeil
            hueShift={1}
            noiseIntensity={0.03}
            speed={0.3}
            warpAmount={5}
            />
        </div> */}
        <div className="absolute inset-0 backdrop-blur-3xl z-1" />

        {/* Large Background Logo Watermark */}
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] opacity-[0.03] rotate-[-15deg] pointer-events-none z-2">
          <Image
            src="/logo-outline.svg" // Ensure this path is correct
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className='relative z-10 max-w-7xl 2xl:max-w-360 mx-auto px-6 md:px-12 lg:px-8 pt-20 pb-12'>

        {/* --- 1. Modernized CTA Section (Card Style) --- */}
        <CTAWithVerticalMarquee />


        {/* --- 2. Footer Navigation Grid --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16'>

          {/* Brand Column (Span 4) */}
          <div className='lg:col-span-4 flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
              <div className='scale-90'>
                <LogoSymbolWhite />
              </div>
              <LogoWhite />
            </div>
            <p className='text-sm text-neutral-400 leading-relaxed max-w-sm'>
              {t('brandDescription')}
            </p>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns (Span 7 total) */}
          <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8'>

            {/* Quick Links */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('company')}</h3>
              <ul className='flex flex-col gap-3'>
                {[
                  { label: navT('home'), href: '/' },
                  { label: navT('about'), href: '/about' },
                  { label: navT('work'), href: '/work' },
                  { label: navT('blog'), href: '/blog' },
                  { label: navT('careers'), href: '/careers' },
                  { label: t('contactSales'), href: '/contact-sales' },
                  { label: navT('freeAudit'), href: '/free-website-audit' },
                  { label: navT('goOnline'), href: '/go-online' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('services')}</h3>
              <ul className='flex flex-col gap-3'>
                {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
                  <li key={service.id}>
                    <Link href={service.url} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {serviceKeyMap[service.id] ? sT(serviceKeyMap[service.id]) : service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases / Legal */}
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-semibold text-white tracking-wide'>{t('resources')}</h3>
              <ul className='flex flex-col gap-3'>
                {useCases[0].cases.map((useCase) => (
                  <li key={useCase.link}>
                    <Link href={`/use-cases/for-${useCase.link}`} className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>
                      {useCaseKeyMap[useCase.link] ? uT(useCaseKeyMap[useCase.link]) : useCase.title}
                    </Link>
                  </li>
                ))}
                <li className="h-px bg-white/10 my-2 w-full" />
                <li>
                  <Link href="/legal/privacy-policy" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('privacyPolicy')}</Link>
                </li>
                <li>
                  <Link href="/legal/terms-of-service" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('termsOfService')}</Link>
                </li>
                <li>
                  <Link href="/legal/sitemap" className='text-sm text-neutral-400 hover:text-white transition-colors duration-200 block hover:tranneutral-x-1 transform'>{t('sitemap')}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- 3. Bottom Bar --- */}
        <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} The Walking Jumbo. {t('rights')}
          </p>

          {/* Optional: Social Icons Placeholders */}
          <div className='flex items-center gap-6 opacity-50'>
            {/* Add standard icons like Twitter/LinkedIn here if you have them */}
            {/* <TwitterIcon className="w-4 h-4 text-white hover:text-[#5449e8] cursor-pointer transition" /> */}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default FooterWithCTA