"use client";

import React from "react";
import {
  Zap,
  CheckCircle2,
  Mic,
  Clock,
  Eye,
  Layout,
  Send,
  Apple,
  Chrome,
  Layers,
  Hexagon,
  Aperture,
  LineChartIcon,
  ShoppingCart,
  Bolt,
  RefreshCcw
} from "lucide-react";
import { BsAmazon, BsWordpress } from "react-icons/bs";
import { FaShopify } from "react-icons/fa";
import { FaWebflow } from "react-icons/fa6";
import { SiN8N, SiOpenai } from "react-icons/si";

import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations('Home.Features');

  return (
    <section className=" min-h-screen pb-24 pt-8 px-6 md:px-12 font-sans text-white">
      
      <div className="max-w-6xl mx-auto">
        
        {/* TOP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Seamless API Integrations */}
          <div className="bg-[#090a11] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Background faint grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-50 z-0 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 z-10 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Zap size={20} className="text-white fill-white/20" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-4 z-10 tracking-tight">
             {t('platformIntegrations')}
            </h3>
            
            <p className="text-gray-400 text-sm mb-10 z-10 leading-relaxed px-4">
              {t('platformIntegrationsDesc')}
            </p>

            {/* Inner Graphic Area */}
            <div className="w-full h-48 bg-[#110e1a]/80 border border-white/10 rounded-2xl relative z-10 mt-auto flex flex-col justify-between p-4">
              
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 300 150" preserveAspectRatio="none">
                <path d="M 30,30 C 30,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                <path d="M 78,30 C 78,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                <path d="M 126,30 C 126,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                <path d="M 174,30 C 174,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                <path d="M 222,30 C 222,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                <path d="M 270,30 C 270,100 150,100 150,130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
              </svg>

              {/* Top Icons Row */}
              <div className="flex justify-between w-full px-2 z-10">
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center"><FaShopify size={12} className="text-white/70"/></div>
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center"><BsWordpress size={12} className="text-white/70"/></div>
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center"><Chrome size={12} className="text-white/70"/></div>
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center"><FaWebflow size={12} className="text-white/70"/></div>
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center"><SiOpenai size={12} className="text-white/70"/></div>
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                  <SiN8N size={12} className="text-white/70"/>
                </div>
              </div>

              {/* Bottom Target Icon */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-400/50">
                <Layers size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Card 2: Trusted Authentication */}
          <div className="bg-[#090a11] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-50 z-0 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 z-10 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Zap size={20} className="text-white fill-white/20" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-4 z-10 tracking-tight">
              {t('aiAutomation')}
            </h3>
            
            <p className="text-gray-400 text-sm mb-10 z-10 leading-relaxed px-4">
              {t('aiAutomationDesc')}
            </p>

            {/* Inner Graphic Area */}
            <div className="w-full h-48 bg-[#110e1a]/80 border border-white/10 rounded-2xl relative z-10 mt-auto flex items-center justify-center overflow-hidden">
              
              {/* Background floating tags */}
              <div className="absolute inset-0 flex flex-wrap gap-2 p-3 justify-center content-center opacity-30 select-none">
                {["LLM", "Infrastructure", "Automation", "Chatbots", "Workflows", "n8n", "LLM", "Infrastructure", "Automation", "Chatbots", "Workflows", "n8n","Capabilities"].map((tag, i) => (
                  <div key={i} className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] text-white/70 whitespace-nowrap">
                    {tag}
                  </div>
                ))}
              </div>

              {/* Center Checkmark */}
              <div className="relative z-20 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.8)]">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse scale-150" />
                <CheckCircle2 size={28} className="text-purple-700 fill-purple-700 stroke-white z-10" />
              </div>
            </div>
          </div>

          {/* Card 3: AI-Speech Recognition */}
          <div className="bg-[#090a11] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] opacity-50 z-0 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 z-10 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Zap size={20} className="text-white fill-white/20" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-4 z-10 tracking-tight">
              {t('accessibility')}
            </h3>
            
            <p className="text-gray-400 text-sm mb-10 z-10 leading-relaxed px-4">
              {t('accessibilityDesc')}
            </p>

            {/* Inner Graphic Area */}
            {/* Inner Graphic Area — Accessibility Checker */}
<div className="w-full h-48 bg-[#0d0b14]/80 border border-white/10 rounded-2xl relative z-10 mt-auto overflow-hidden">
  
  {/* Header bar */}
  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
    <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">WCAG Audit</span>
    <span className="text-[10px] font-bold text-emerald-400">5/6 Passed</span>
  </div>

  {/* Checklist rows */}
  <div className="flex flex-col gap-0 px-3 py-2">
    {[
      { label: "Colour Contrast",   status: "pass" },
      { label: "Keyboard Navigation", status: "pass" },
      { label: "Alt Text on Images", status: "pass" },
      { label: "Focus Indicators",  status: "fail" },
      { label: "ARIA Landmarks",    status: "pass" },
      { label: "Screen Reader",     status: "pass" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0"
      >
        <div className="flex items-center gap-2">
          {/* Status dot */}
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: item.status === "pass" ? "#34d399" : "#f87171",
              boxShadow: item.status === "pass"
                ? "0 0 6px rgba(52,211,153,0.7)"
                : "0 0 6px rgba(248,113,113,0.7)",
            }}
          />
          <span className="text-[11px] text-white/50">{item.label}</span>
        </div>

        {/* Badge */}
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: item.status === "pass"
              ? "rgba(52,211,153,0.12)"
              : "rgba(248,113,113,0.12)",
            color: item.status === "pass" ? "#34d399" : "#f87171",
            border: item.status === "pass"
              ? "1px solid rgba(52,211,153,0.25)"
              : "1px solid rgba(248,113,113,0.25)",
          }}
        >
          {item.status === "pass" ? "Pass" : "Fail"}
        </span>
      </div>
    ))}
  </div>
</div>
          </div>
          
        </div>

        {/* BOTTOM FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-20 border-t border-white/10 pt-16">
          
          {/* Feature 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LineChartIcon size={18} className="text-white" />
              <h4 className="font-semibold text-white">{t('seo')}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('seoDesc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart size={18} className="text-white" />
              <h4 className="font-semibold text-white">{t('ecommerce')}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('ecommerceDesc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bolt size={18} className="text-white" />
              <h4 className="font-semibold text-white">{t('performance')}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('performanceDesc')}
            </p>
          </div>

          {/* Feature 4 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RefreshCcw size={18} className="text-white transform -rotate-45" />
              <h4 className="font-semibold text-white">{t('maintenance')}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('maintenanceDesc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}