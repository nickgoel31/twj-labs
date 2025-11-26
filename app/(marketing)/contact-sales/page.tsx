"use client";

import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { SparkleIcon, ChevronUp, X, ChevronDown } from "lucide-react";
// 1. Import Suspense
import React, { useState, useEffect, Suspense } from "react"; 
import { GrReactjs } from "react-icons/gr";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiSupabase, SiPrisma, SiWebflow, SiWordpress, SiOpenai, SiZapier, SiN8N, SiFigma, SiDocker, SiGithub } from "react-icons/si";
import { FaShopify } from "react-icons/fa";
import { TbBrandNextjs, TbColorPicker } from "react-icons/tb";
import { RiStockLine, RiTailwindCssFill } from "react-icons/ri";
import OurWorkCardSmall from "@/components/shared/our-work-card-small";
import CustomBadge from "@/components/shared/custom-badge";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { contactFormSubmit } from "@/actions/contact-form-submit";
import { OurWorkType } from "@/data/work-sample";
import { getPortfolio } from "@/actions/get-portfolio";

// --- CONSTANTS ---
const TECHNOLOGIES = [
  { name: "React", logo: <GrReactjs size={20} /> },
  { name: "Next.js", logo: <TbBrandNextjs size={20} /> },
  { name: "TypeScript", logo: <SiTypescript size={20} /> },
  { name: "Tailwind CSS", logo: <RiTailwindCssFill size={20} /> },
  { name: "Node.js", logo: <SiNodedotjs size={20} /> },
  { name: "Express", logo: <SiExpress size={20} /> },
  { name: "MongoDB", logo: <SiMongodb size={20} /> },
  { name: "PostgreSQL", logo: <SiPostgresql size={20} /> },
  { name: "Supabase", logo: <SiSupabase size={20} /> },
  { name: "Prisma", logo: <SiPrisma size={20} /> },
  { name: "Webflow", logo: <SiWebflow size={20} /> },
  { name: "WordPress", logo: <SiWordpress size={20} /> },
  { name: "Shopify", logo: <FaShopify size={20} /> },
  { name: "OpenAI", logo: <SiOpenai size={20} /> },
  { name: "Zapier", logo: <SiZapier size={20} /> },
  { name: "n8n", logo: <SiN8N size={20} /> },
  { name: "Figma", logo: <SiFigma size={20} /> },
  { name: "Docker", logo: <SiDocker size={20} /> },
  { name: "GitHub", logo: <SiGithub size={20} /> },
];

// --- LEFT SIDE COMPONENTS ---
const LeftSideHero = () => {
  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <CustomBadge title="Contact Sales" darkMode={true} />
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 leading-[1.1] max-w-2xl">
          Let&apos;s Build Something <br/>
          <span className="text-indigo-400">Great Together.</span>
        </h1>
        
        <p className="text-base text-slate-400 max-w-lg leading-relaxed">
          Our team is ready to help you achieve your goals and bring your vision to life. Reach out to us today to discuss your project.
        </p>
      </div>

      <div className="flex flex-col gap-8 mt-10">
        {[
            { icon: TbColorPicker, title: "Design That Converts", desc: "Our design approach focuses on creating visually stunning and high-converting websites that drive results." },
            { icon: RiStockLine, title: "Boost Your Online Presence", desc: "Our team will work with you to create a tailored strategy that enhances your brand visibility and drives traffic." },
            { icon: SparkleIcon, title: "Custom Solutions", desc: "We understand that every business is unique, which is why we offer custom solutions tailored to your specific needs." },
            {
                icon: X, title: "Dedicated Support", desc: "Our dedicated support team is here to assist you every step of the way, ensuring a smooth and successful project."
            }
        ].map((item, i) => (
            <div key={i} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors duration-300">
                    <item.icon className="text-indigo-400" size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed group-hover:text-slate-400 transition-colors">
                        {item.desc}
                    </p>
                </div>
            </div>
        ))}
      </div>
    </>
  )
}

const LeftSideToolsWeUse = () => {
  return (
    <div className="mt-16">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Technologies We Use</h2>
      <div className="flex flex-wrap gap-3">
        {TECHNOLOGIES.map((tech) => (
          <div
            key={tech.name}
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#13131a] border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
            title={tech.name}
          >
            <div className="text-slate-400 group-hover:text-indigo-300 transition-colors duration-300">
              {tech.logo}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LeftSideTestimonial = () => {
  return (
    <div className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      
      <SparkleIcon className="text-indigo-500 mb-4 fill-indigo-500" size={20} />
      <p className="text-base text-slate-300 leading-relaxed italic relative z-10">
        &quot;At TWJ Labs, we transform businesses not just websites&quot;
      </p>
      
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            HG
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Harsh Goel</p>
          <p className="text-xs text-slate-500">Founder, TWJ</p>
        </div>
      </div>
    </div>
  )
}

const LeftSideOurWork = () => {
    const [work, setWork] = React.useState<OurWorkType[] | undefined>([])
              const [loading, setLoading] = React.useState<boolean>(false);
              const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);
          
              React.useEffect(() => {
                  let mounted = true;
                  const loadData = async () => {
                      setLoading(true);
                      try {
                          const portfolio = await getPortfolio();
                          if (!mounted) return;
                          setWork(portfolio);
                      } catch (error) {
                          console.error("Error fetching portfolio:", error);
                          if (!mounted) return;
                          setWork(undefined);
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
    <div className="mt-16">
      <div className="flex flex-col items-start gap-4 mb-8">
         <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Recent Work</h2>
         <h3 className="text-2xl font-semibold text-white">
           Crafting Digital Experiences.
         </h3>
      </div>
      {
        loading && !initialLoaded ? (
          <div className="w-full flex items-center justify-center py-10">
              <div className="w-8 h-8 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : null
      }
      <div className="grid grid-cols-1 gap-6">
          {work?.slice(0, 2).map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-colors">
              <OurWorkCardSmall work={item} />
            </div>
          ))}
      </div>
    </div>
  )
}

// --- REUSABLE FORM COMPONENT ---

const ContactForm = ({ className, isMobileExpanded, onMobileClose, serviceInterest, plan, areThereSearchParams }: { className?: string, isMobileExpanded?: boolean, onMobileClose?: () => void, serviceInterest?: string | null, plan?: string | null, areThereSearchParams?: boolean }) => {
  const ServiceMap: Record<string, string> = {  
    webflow: "Webflow Development",
    wordpress: "WordPress Development",
    ecommerce: "E-commerce Solutions",
    custom: "Custom Software Development",
    ai: "AI Integration & Automation",
    "design-branding": "Design & Branding",
    maintainence: "Website Maintenance",
    accessibility: "Accessibility Testing & Compliance",
}

    const [selectedServices, setSelectedServices] = React.useState<string[]>(
      serviceInterest ? [ServiceMap[serviceInterest] || serviceInterest] : []
    );

    const [formData, setFormData] = React.useState({
      name: "", email: "", company: "", website: "", projectDetails: areThereSearchParams ? `I am interested in the ${ServiceMap[serviceInterest || ""] || serviceInterest} service and the ${plan} plan. My requirements are ` : "", budget: "",
    });
    const [submitted, setSubmitted] = React.useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      // Here you would typically handle form submission, e.g., send data to a server
      contactFormSubmit(formData, selectedServices)
        .then((res) => {
          setSubmitted(res?.success || false);
        })
    };
  
    if (submitted) {
      return (
        <div className={cn("flex flex-col items-center justify-center text-white text-center h-full p-6", className)}>
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
              <SparkleIcon size={24} className="text-indigo-400 fill-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Message Received!</h1>
          <p className="text-slate-400 text-sm max-w-xs mb-6 leading-relaxed">
            We’ve received your inquiry and will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all font-semibold text-xs"
          >
            Send another message
          </button>
        </div>
      );
    }
  
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("w-full space-y-6", className)}
      >
        <div className="flex items-center justify-between mb-2">
            <div>
                <h3 className="text-xl font-bold text-white">Project Details</h3>
                <p className="text-sm text-slate-400">Tell us a bit about what you need.</p>
            </div>
            {/* Close button only visible on mobile expanded view */}
            {isMobileExpanded && onMobileClose && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onMobileClose(); }} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
                    <ChevronDown size={20} />
                </button>
            )}
        </div>
  
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="John Doe"
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="john@company.com"
                    required
                />
            </div>
        </div>
  
        {/* Company & Website Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</label>
                <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="Acme Inc."
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="website" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Website</label>
                <input
                    type="text"
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                    placeholder="https://"
                />
            </div>
        </div>
  
        {/* Services Chips */}
        <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">I&apos;m interested in...</label>
            <div className="flex flex-wrap gap-2">
                {[...services[0].servicesList, ...services[1].servicesList].map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                            setSelectedServices((prev) =>
                                prev.includes(service.name)
                                    ? prev.filter((s) => s !== service.name)
                                    : [...prev, service.name]
                            );
                        }}
                        className={cn(
                            "text-xs px-4 py-2 rounded-lg border transition-all duration-300 font-medium",
                            selectedServices.includes(service.name)
                                ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                : "bg-[#13131a] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                        )}
                    >
                        {service.name}
                    </button>
                ))}
            </div>
        </div>
  
        {/* Project Details */}
        <div className="space-y-2">
            <label htmlFor="projectDetails" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Project Details</label>
            <textarea
                id="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20 min-h-[100px] resize-none"
                placeholder="Tell us about your goals, timeline, and requirements..."
            />
        </div>
  
        {/* Budget */}
        <div className="space-y-2">
            <label htmlFor="budget" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Budget Range</label>
            <input
                type="text"
                id="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                placeholder="$5k - $10k"
            />
        </div>
  
        {/* Footer Area */}
        <div className="pt-2">
            <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white  hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
                Book a Free Consultation
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-4">
                By clicking submit, you agree to our Terms & Privacy Policy.
            </p>
        </div>
      </form>
    );
  };


// --- MOBILE PEEKING DRAWER COMPONENT ---
const MobilePeekingForm = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
                closed: { height: "80px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" },
                open: { height: "100dvh", borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
                "fixed bottom-0 left-0 w-full bg-[#0c0c12] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] z-[100] lg:hidden overflow-hidden flex flex-col",
                isOpen ? "rounded-none" : "rounded-t-3xl cursor-pointer"
            )}
            onClick={() => !isOpen && setIsOpen(true)}
        >
            {/* Handle Bar / Peek Header */}
            <div className={cn("w-full flex items-center justify-between px-6 py-4 shrink-0 transition-all duration-300", isOpen ? "bg-[#13131a] border-b border-white/5" : "")}>
                 {!isOpen ? (
                     // Closed State Header
                     <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-lg">Ready to start?</span>
                            <span className="text-xs text-slate-400">Book your free consultation</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center animate-bounce">
                            <ChevronUp className="text-indigo-400" size={20} />
                        </div>
                     </div>
                 ) : (
                     // Open State Header (Hidden technically because Form has its own header, but we keep structure)
                     <div className="w-full flex justify-center py-2" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                        <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                     </div>
                 )}
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-24">
                <ContactForm 
                    isMobileExpanded={isOpen} 
                    onMobileClose={() => setIsOpen(false)} 
                    
                />
            </div>
        </motion.div>
    );
};


// --- MAIN PAGE CONTENT (RENAMED) ---
// 2. Rename the previous ContactSalesPage to ContactSalesContent
const ContactSalesContent = () => {
  const searchParams = useSearchParams();
  const serviceInterest = searchParams.get('ser-int');
  const plan = searchParams.get('plan');

  return (
    <div className="w-full bg-[#060609] selection:bg-indigo-500/30 font-manrope min-h-screen">
        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[90rem] mx-auto pt-20 md:pt-28 md:py-20 px-6 md:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column (Content) */}
            <div className="pt-10 pb-32 lg:pb-0"> {/* Added padding bottom for mobile so content isn't hidden behind peek bar */}
                <LeftSideHero />
                <LeftSideToolsWeUse />
                <LeftSideTestimonial />
                <LeftSideOurWork />
                
                {/* On mobile, we show the static form at the very bottom of content as requested ("at the bottom... it should be there") */}
                <div className="lg:hidden mt-20 ">
                    
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                         <ContactForm serviceInterest={serviceInterest} plan={plan} areThereSearchParams={!!serviceInterest} />
                    </div>
                </div>
            </div>

            {/* Right Column (Desktop Form - Sticky) */}
            <div className="hidden lg:block relative h-full">
                <div className="sticky top-24 w-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 shadow-2xl shadow-black/50">
                     <ContactForm serviceInterest={serviceInterest} plan={plan} areThereSearchParams={!!serviceInterest} />
                </div>
            </div>
        </div>
        </div>

        {/* Mobile Peeking Drawer */}
        <MobilePeekingForm />
    </div>
  );
};

// 3. Create a new wrapper component that includes the Suspense boundary
const ContactSalesPage = () => {
    return (
        // The fallback UI is displayed while the URL params are being loaded
        <Suspense fallback={<div className="min-h-screen w-full bg-[#060609]" />}>
            <ContactSalesContent />
        </Suspense>
    );
};

export default ContactSalesPage;