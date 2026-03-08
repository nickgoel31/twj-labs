"use client"
import AIChatWidget from '@/components/ai-chat-widget'
import ChatbotWidget from '@/components/layout/chatbot-widget'
import FooterWithCTA from '@/components/layout/footer-with-cta'
import Navbar from '@/components/layout/navbar'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#060609] font-manrope'>
      <Navbar />
      {/* <ChatbotWidget /> */}
      <AIChatWidget />
      {children}
      <FooterWithCTA />
    </div>
  )
}

export default MainLayout