"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, FileText, Map, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

const sidebarLinks = [
  { name: "Privacy Policy", href: "/legal/privacy-policy", icon: Lock },
  { name: "Terms of Service", href: "/legal/terms-of-service", icon: FileText },
  { name: "Sitemap", href: "/legal/sitemap", icon: Map },
];

const LegalLayout = ({ children, title, lastUpdated }: LegalLayoutProps) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        
        {/* Breadcrumb / Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Legal & Links</h3>
                <nav className="flex flex-col gap-2">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border",
                          isActive
                            ? "bg-white/10 border-white/10 text-white shadow-lg shadow-indigo-500/10"
                            : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon size={16} className={isActive ? "text-indigo-400" : "text-slate-500"} />
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Contact Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">Have questions?</p>
                <p className="text-sm text-slate-400 mb-4">Email our legal team regarding any concerns.</p>
                <a href="mailto:harsh.goel@twjlabs.com" className="text-sm font-bold text-white hover:underline line-clamp-1">harsh.goel@twjlabs.com</a>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-10 pb-10 border-b border-white/10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
                    <p className="text-slate-400">Last updated: <span className="text-indigo-300">{lastUpdated}</span></p>
                </div>
                
                {/* Prose Content Styling */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
                    {children}
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalLayout;