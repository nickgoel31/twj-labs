"use client"
import AIChatWidget from '@/components/ai-chat-widget'
import ChatbotWidget from '@/components/layout/chatbot-widget'
import DistortedBlurBottomBar from '@/components/layout/distorted-bottom-bar'
import FooterWithCTA from '@/components/layout/footer-with-cta'
import Navbar from '@/components/layout/navbar'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll(0.06);
  return (
    <div className='bg-[#060609] font-manrope overflow-x-clip'>
      <Navbar />
      <DistortedBlurBottomBar />
      {/* <ChatbotWidget /> */}
      <AIChatWidget />
      {children}
      <FooterWithCTA />
    </div>
  )
}

export default MainLayout