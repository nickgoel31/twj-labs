"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Settings, 
  Layout, 
  Search, 
  FileText, 
  Zap, 
  Crosshair, 
  ClipboardCheck, 
  AlertCircle,
  User,
  Mail,
  MessageSquare
} from 'lucide-react'

// --- CONSTANTS ---
const AUDIT_SUBMITTED_COOKIE = 'audit_submitted_lock';
const COOKIE_EXPIRY_DAYS = 7;

// --- UTILITY FUNCTIONS FOR COOKIE MANAGEMENT ---

// Function to set the cookie after successful submission
const setAuditLockCookie = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS); 
  // Set cookie for a week
  document.cookie = `${AUDIT_SUBMITTED_COOKIE}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
};

// Function to check for the presence of the cookie
const checkAuditLockCookie = () => {
  // Check if the cookie string contains the lock key
  return document.cookie.split('; ').some(item => item.startsWith(AUDIT_SUBMITTED_COOKIE));
};


// --- STUBBED/REUSABLE COMPONENTS (for single file execution) ---

const CustomBadge = ({ title, darkMode = true }: { title: string, darkMode?: boolean }) => (
  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-widest ${
    darkMode ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
  }`}>
    {title}
  </span>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-[#0f0f13] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group h-full flex flex-col"
  >
    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-indigo-400 w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
  </motion.div>
);

const TheTWJDifference = () => (
  <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#060609] text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">The Walking Jumbo Difference</h2>
      <p className="text-neutral-400 text-lg mb-10">We don't just point out problems; we provide solutions backed by years of experience in high-growth digital strategy.</p>
    </div>
  </section>
);

const FaqsSection = ({ darkMode = true }: { darkMode?: boolean }) => (
  <section className={`py-24 px-6 md:px-12 lg:px-24 ${darkMode ? 'bg-[#060609] text-white' : 'bg-[#F4F5F9] text-black'}`}>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {[
          { q: "Is this really free?", a: "Yes. Our goal is to demonstrate our value. The audit is genuinely free with no hidden costs or obligation to hire us." },
          { q: "How long does it take to receive the audit?", a: "We aim for 24-48 hours. Since every audit is manually reviewed, it depends on current volume." },
          { q: "Is this just an automated report?", a: "Absolutely not. We run initial technical checks, but the core analysis, scoring, and action plan are done manually by an expert strategist." },
          { q: "What data do you need?", a: "Just your website URL and the best email to send the report to. We don't need access to your analytics or backend." },
        ].map((faq, index) => (
          <div key={index} className={`p-5 rounded-xl border ${darkMode ? 'bg-[#0f0f13] border-white/10' : 'bg-white border-neutral-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{faq.q}</h3>
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- MAIN PAGE ---

export default function FreeAuditPage() {
  const [formData, setFormData] = useState({
    url: '',
    email: '',
    challenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false); // New state for cookie lock

  // Check for the cookie lock on component mount
  useEffect(() => {
    if (checkAuditLockCookie()) {
      setHasSubmittedBefore(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSubmittedBefore || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call to submitAuditEmail
    // In a real app, this would be your server action call: await submitAuditEmail(formData)
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // On successful submission:
    setAuditLockCookie(); // Set the cookie to prevent future submissions
    setIsSubmitting(false);
    setIsSuccess(true);
    setHasSubmittedBefore(true); // Update state immediately
    
    // Scroll to top to see success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const AuditFormContent = () => {
    if (hasSubmittedBefore) {
      return (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
            <CheckCircle2 className="text-indigo-500 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Audit Already Requested</h3>
          <p className="text-neutral-400 mb-6">
            Thank you! You have already claimed your free audit. Please check your inbox for the report, which should arrive within the next {COOKIE_EXPIRY_DAYS} days.
          </p>
          <p className="text-xs text-neutral-600">
            This prevents accidentally submitting the same site multiple times.
          </p>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="text-center py-10">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle2 className="text-green-500 w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
          <p className="text-neutral-400 mb-6">
            Our team has started analyzing <span className="text-white font-medium">{formData.url}</span>. You will receive your custom video and PDF report at <span className="text-white font-medium">{formData.email}</span> within 24-48 hours.
          </p>
          <button onClick={() => {
            setIsSuccess(false);
            setFormData({ url: '', email: '', challenges: '' });
          }} className="text-sm text-indigo-400 hover:text-white underline">
            Submit another site (clears cookie lock)
          </button>
        </div>
      );
    }

    // Default Form View
    return (
      <>
        <h3 className="text-2xl font-bold mb-2">Claim Your Free Audit</h3>
        <p className="text-neutral-500 mb-6 text-sm">Takes 20 seconds. Delivered within 24–48 hours.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Website URL</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="url" 
                required
                placeholder="https://yourwebsite.com"
                className="w-full bg-[#15151a] text-white pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Your Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="name@company.com"
                className="w-full bg-[#15151a] text-white pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">What&apos;s not working? (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-neutral-500" size={18} />
              <textarea 
                placeholder="e.g. Traffic is fine but nobody buys..."
                className="w-full bg-[#15151a] text-white pl-11 pr-4 py-3 rounded-xl border border-white/5 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600 min-h-[80px]"
                value={formData.challenges}
                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Audit'} <ArrowRight size={18} />
          </button>
          
          <p className="text-[10px] text-neutral-600 text-center">
            No credit card required. No obligation.
          </p>
        </form>
      </>
    );
  };


  return (
    <div className="min-h-screen bg-[#060609] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="text-left">
            <CustomBadge title="Limited Time: 100% Free Audit" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl mt-2 lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6"
            >
              Discover What’s Holding <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white">Your Site Back.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 max-w-xl mb-8 leading-relaxed"
            >
              Your website could be losing customers right now. Our team will analyze your site and send you a detailed breakdown of what’s working, what’s broken, and how to fix it — <strong className="text-white">before it costs you clients.</strong>
            </motion.p>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-400 font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> No Automated PDF Fluff</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Real Human Review</span>
            </div>
          </div>

          {/* Right: Lead Capture Form controlled by cookie state */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0c0c10] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
              {AuditFormContent()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHAT YOU GET GRID --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <CustomBadge title="What&apos;s Included" darkMode={true} />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-5">What You’ll Get in This Audit</h2>
            <p className="text-neutral-400">A complete x-ray of your digital presence. No vague advice—real insights you can use immediately.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* 1. Tech */}
            <FeatureCard 
              delay={0.1}
              icon={Settings}
              title="1. Technical Performance"
              description="We’ll test your website’s speed, load times, responsiveness, caching, and core vitals — the stuff Google really cares about."
            />
            {/* 2. UX */}
            <FeatureCard 
              delay={0.15}
              icon={Layout}
              title="2. Design & UX"
              description="Expert analysis of your layout, navigation, structure, and conversion flow. No vague “your design is okay” nonsense — real insights, real fixes."
            />
              {/* 3. SEO */}
              <FeatureCard 
              delay={0.2}
              icon={Search}
              title="3. SEO & Visibility"
              description="We check how well you rank, if Google can crawl your pages, keyword gaps, missing metadata, and whether your competitors are beating you."
            />
              {/* 4. Content */}
              <FeatureCard 
              delay={0.25}
              icon={FileText}
              title="4. Content & Messaging"
              description="Does your website communicate value clearly? Is your messaging helping or hurting your conversions? We’ll tell you."
            />
              {/* 5. Brand */}
              <FeatureCard 
              delay={0.3}
              icon={Zap}
              title="5. Brand Positioning"
              description="Get clarity on how your business is perceived vs. how it should be. Are you sending the right signals?"
            />
              {/* 6. Competitors */}
              <FeatureCard 
              delay={0.35}
              icon={Crosshair}
              title="6. Competitor Benchmark"
              description="We compare your website to your top competitors to show where you stand — and exactly where you can win."
            />
            {/* 7. Action Plan (Spans full width on mobile, specialized on desktop) */}
            <div className="md:col-span-2 lg:col-span-3">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/20 to-indigo-900/20 border border-indigo-500/20 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                  <ClipboardCheck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">7. Action Plan: What to Fix First</h3>
                  <p className="text-neutral-400">A prioritized roadmap showing what to fix immediately and what can wait. We categorize issues by "Quick Wins" vs "Long-term Strategy."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHO IS THIS FOR --- */}
      <section className="pt-20 bg-[#F4F5F9] text-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <CustomBadge title="Is this for you?" darkMode={false}/>
               <h2 className="text-3xl md:text-5xl font-bold mb-4 mt-4">Who This Is For</h2>
               <p className="text-neutral-500 text-lg mb-8">This isn&apos;t for everyone. But if you are serious about growth, this is your starting line.</p>
               
               <div className="space-y-4">
                 {[
                   "Your website isn’t bringing leads or sales",
                   "You’re getting traffic but no conversions",
                   "Your site feels slow, clunky or outdated",
                   "You suspect your SEO is weak (or non-existent)",
                   "You’re planning a redesign or rebuild soon",
                   "You want a professional evaluation before investing"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-black/5 rounded-xl border border-white/5">
                     <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400">
                       <User size={16} />
                     </div>
                     <span className="font-medium">{item}</span>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="relative">
              {/* Timeline Visual */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-indigo-500/20 to-transparent"></div>
                
                <div className="space-y-12 relative z-10">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#e6e6f4] border-4 border-indigo-500 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-xl font-bold mb-2">You Submit Your Site</h3>
                      <p className="text-neutral-500">Fill out the simple form above. Tell us your biggest pain point.</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#e6e6f4] border-4 border-indigo-500/50 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-xl font-bold mb-2">We Analyze Manually</h3>
                      <p className="text-neutral-500">Our designers and SEO strategists dive into your site. We don't just run software; we look at it with human eyes.</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#e6e6f4] border-4 border-white/10 flex items-center justify-center shrink-0 z-10">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-xl font-bold mb-2">You Get Your Report</h3>
                      <p className="text-neutral-500">Within 24-48 hours, a custom PDF arrives in your inbox. No pressure. No hard sales. You decide what to do next.</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY FREE? --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 text-center bg-[#F4F5F9] text-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Are We Doing This For Free?</h2>
          <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
            Because once you see the issues clearly, you’ll realize how much money you’re leaving on the table.
          </p>
          <p className="text-neutral-500 mb-8">
            And if you want help fixing them — great, that’s what we do best. <br/>
            If not? You still walk away with an insanely useful action plan.
          </p>
          <div className="inline-block px-6 py-2 rounded-lg bg-black/5 border border-white/10 text-indigo-500 font-semibold tracking-wide uppercase text-sm">
            Win-Win Situation
          </div>
        </div>
      </section>

      <TheTWJDifference />
      <FaqsSection darkMode={true}/>


    </div>
  )
}