"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, BookOpen, Mail, Layers, Briefcase, InspectionPanel } from 'lucide-react'; 
import { LogoSymbolWhite } from '../shared/logo'
import { services } from '@/data/services'
import { useCases } from '@/data/use-cases'

// --- Types ---
type LinkItem = {
  label: string;
  isMegaMenu: boolean;
  href: string;
  megaMenuid?: string;
}

const links: LinkItem[] = [
  { label: 'Services', isMegaMenu: true, href: '#', megaMenuid: 'services-mega-menu' },
  { label: 'Pricing', isMegaMenu: false, href: '/pricing' },
  { label: 'Use Cases', isMegaMenu: true, href: '#', megaMenuid: 'use-cases-mega-menu' },
  // { label: 'Work', isMegaMenu: false, href: '/work' },
  // { label: 'About', isMegaMenu: false, href: '/about' },
  {
    label: 'Company', isMegaMenu: true, href: '#', megaMenuid: 'company-mega-menu'
  }
]

const Navbar = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`w-full h-20 px-6 md:px-12 lg:px-24 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300 
          ${scrolled || mobileMenuOpen ? "bg-[#08060b]/90 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-transparent border-white/0"}
        `}
      >
        {/* LOGO */}
        <div className='scale-90 relative z-50'>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <LogoSymbolWhite />
          </Link>
        </div>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden lg:flex space-x-8 text-[13.5px] font-medium text-white/70 translate-x-4">
          {links.map((link) => (
            // KEY CHANGE: The onMouseEnter/Leave is now on this wrapper div
            <div 
                key={link.label} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => link.isMegaMenu && setActiveMegaMenu(link.megaMenuid || null)}
                onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href={link.href}
                className="hover:text-white transition flex items-center gap-1 py-4"
              >
                {link.label}
                {link.isMegaMenu && <ChevronDown size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />}
              </Link>

              {/* Desktop Mega Menus */}
              <AnimatePresence>
                {link.isMegaMenu && link.megaMenuid === "services-mega-menu" && activeMegaMenu === "services-mega-menu" && (
                  <ServicesMegaMenu />
                )}
                {link.isMegaMenu && link.megaMenuid === "use-cases-mega-menu" && activeMegaMenu === "use-cases-mega-menu" && (
                  <UseCasesMegaMenu />
                )}
                {link.isMegaMenu && link.megaMenuid === "company-mega-menu" && activeMegaMenu === "company-mega-menu" && <CompanyMegaMenu />}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- DESKTOP CTA (Hidden on Mobile) --- */}
        <div className="hidden lg:block">
          <Link href={'/contact-sales'} className="px-5 py-3 rounded-full text-xs font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] text-white hover:shadow-violet-400 transition-all duration-500">
            Contact Sales
          </Link>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="lg:hidden text-white relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

// ============================================================================
// MOBILE MENU COMPONENT
// ============================================================================

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  // State to handle accordions inside mobile menu
  const [expandedLink, setExpandedLink] = useState<string | null>(null);

  const toggleAccordion = (label: string) => {
    setExpandedLink(expandedLink === label ? null : label);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-[#08060b] pt-24 px-6 overflow-y-auto"
    >
      <div className="flex flex-col space-y-6 pb-20">
        {links.map((link) => (
          <div key={link.label} className="border-b border-white/10 pb-4">
            <div 
              className="flex items-center justify-between text-xl font-medium text-white cursor-pointer"
              onClick={() => {
                if (link.isMegaMenu) {
                  toggleAccordion(link.label);
                } else {
                  onClose(); // Close menu if it's a regular link
                }
              }}
            >
              {link.isMegaMenu ? (
                <span className="flex items-center justify-between w-full">
                    {link.label}
                    <motion.div 
                        animate={{ rotate: expandedLink === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown size={20} className="text-white/50" />
                    </motion.div>
                </span>
              ) : (
                <Link href={link.href} className="block w-full" onClick={onClose}>
                  {link.label}
                </Link>
              )}
            </div>

            {/* Mobile Accordion Content */}
            <AnimatePresence>
              {link.isMegaMenu && expandedLink === link.label && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pl-2 space-y-4">
                    {link.megaMenuid === "services-mega-menu" && (
                       <MobileServicesList onClose={onClose} />
                    )}
                    {link.megaMenuid === "use-cases-mega-menu" && (
                       <MobileUseCasesList onClose={onClose} />
                    )}
                    {link.megaMenuid === "company-mega-menu" && (
                       <div className="flex flex-col gap-4">
                          <Link href="/about" onClick={onClose} className="text-white/70 hover:text-white text-sm">About</Link>
                          <Link href="/blog" onClick={onClose} className="text-white/70 hover:text-white text-sm">Blog</Link>
                          <Link href="/work" onClick={onClose} className="text-white/70 hover:text-white text-sm">Work</Link>
                          <Link href="/careers" onClick={onClose} className="text-white/70 hover:text-white text-sm">Careers</Link>
                          <Link href="/contact" onClick={onClose} className="text-white/70 hover:text-white text-sm">Contact</Link>
                        </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Mobile CTA */}
        <div className="pt-4">
          <Link 
            href={'/contact-sales'} 
            onClick={onClose}
            className="block w-full text-center px-5 py-4 rounded-xl text-sm font-bold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Helper for Mobile Services List
const MobileServicesList = ({ onClose }: { onClose: () => void }) => (
    <div className="grid grid-cols-1 gap-4">
        {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
            <Link key={service.id} href={service.url} onClick={onClose} className="flex items-center gap-3 text-white/70 hover:text-white">
                 <div className="w-6 h-6 border border-white/10 rounded-sm flex items-center justify-center bg-white/5">
                    <service.icon size={12} />
                 </div>
                 <span className="text-sm">{service.name}</span>
            </Link>
        ))}
    </div>
)
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

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
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
};

// Helper for Mobile Use Cases List
const MobileUseCasesList = ({ onClose }: { onClose: () => void }) => {
  
  return (
    <div className="flex flex-col gap-6">
        {useCases.map((category) => 
        (
            <div key={category.heading}>
                <h4 className="text-xs font-bold text-white/40 uppercase mb-3">{category.heading}</h4>
                <div className="flex flex-col gap-3">
                    {category.cases.map((item) => {
                      const IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[item.icon];
                      return (
                         <Link key={item.title} href={`/use-cases/for-${item.link}`} onClick={onClose} className="flex items-center gap-3 text-white/70 hover:text-white">
                          <div className="w-6 h-6 border border-white/10 rounded-sm flex items-center justify-center bg-white/5">
                            <IconComponent className='size-3' />
                          </div>
                             <span className="text-sm">{item.title}</span>
                         </Link>
                    )})}
                </div>
            </div>
        ))}
    </div>
)
}


// ============================================================================
// DESKTOP MEGA MENUS
// ============================================================================

const ServicesMegaMenu = () => {
  return (
    <motion.div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[45rem]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
         {/* Background Effects */}
        <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
        <div className='absolute -top-20 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-[2] relative p-1">
          {/* Main Services */}
          <div className="w-full flex-[2] border-r border-white/5 p-6 space-y-4">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Core Services</h3>
            <div className="grid grid-cols-2 gap-4">
              {services[0].servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={service.url}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors ${service.id === 13 ? 'col-span-2' : ''}`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <service.icon size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{service.name}</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">{service.tagline}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Services */}
          <div className="w-full p-6 space-y-4 bg-white/[0.02] flex-1">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Specialized</h3>
            <div className="flex flex-col gap-2">
              {services[1].servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={service.url}
                  className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div>
                      <div className="text-xs font-medium text-white  transition-colors">{service.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UseCasesMegaMenu = () => {
  return (
    <motion.div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-max"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
         <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
         <div className='absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-[2] relative">
          {useCases.map((category, idx) => (
            <div key={category.heading} className={`w-[600px] p-6 space-y-4 ${idx !== useCases.length - 1 ? 'border-r border-white/5' : ''}`}>
              <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{category.heading}</h3>
              <div className="grid grid-cols-2 gap-6">
                {category.cases.map((item) => {
                  const IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>> = iconMap[item.icon];
                  return (
                  <Link
                    key={item.title}
                    href={`/use-cases/for-${item.link}`}
                    className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                      <IconComponent  className="text-white/80 size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-[10px] text-white/50 leading-tight line-clamp-1 group-hover:text-white/70">{item.description}</div>
                    </div>
                  </Link>
                )})}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


const CompanyMegaMenu = () => {
  return (
    <motion.div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[35rem]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#121117] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 relative">
         {/* Background Effects */}
        <div className='absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none' />
        <div className='absolute -top-20 -left-20 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none' />

        <div className="flex z-[2] relative p-1">
          {/* Main Services */}
          <div className="w-full flex-[1.4] border-r border-white/5 p-6 space-y-4">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Company</h3>
            <div className="">
              
                <nav className='space-y-2'>
                  <Link
                
                  href={"/about"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Briefcase size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">About</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">Learn more about our company</div>
                  </div>
                </Link>
                 <Link
                
                  href={"/work"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Layers size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Our Work</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">Discover our projects and case studies.</div>
                  </div>
                </Link>
                 <Link
                
                  href={"/careers"}
                  className={`group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <Briefcase size={14} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Careers</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">Explore job opportunities with us.</div>
                  </div>
                </Link>
                </nav>
              
            </div>
          </div>

          {/* Other Services */}
          <div className="w-full p-6 space-y-4 bg-white/[0.02] flex-1">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link
                
                  href={"/blog"}
                  className={`group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <BookOpen size={14} className="text-white/80" />
                  </div>
                  <div className='w-full'>
                    <div className="text-xs font-bold text-white ">Blog</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">Read our latest articles and insights.</div>
                  </div>
                </Link>
               <Link
                
                  href={"/free-website-audit"}
                  className={`group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors`}
                >
                  <div className="w-8 h-8 shrink-0 rounded border border-white/10 bg-[#1e1e24] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <InspectionPanel size={14} className="text-white/80" />
                  </div>
                  <div className='w-full'>
                    <div className="text-xs font-bold text-white ">Free Website Audit</div>
                    <div className="text-[10px] text-white/50 leading-tight group-hover:text-white/70">Get a detailed analysis</div>
                  </div>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

