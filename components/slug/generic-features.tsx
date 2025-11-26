"use client";

import { FeatureItem } from "@/types";
import { ArrowRightLeft, BarChart2, Key, LucideIcon, Mouse, PenTool, Rocket, Settings, TrendingUp } from "lucide-react";
import React, { useRef } from "react";
import { IconType } from "react-icons";
import { SiWebflow } from "react-icons/si";
import CustomBadge from "../shared/custom-badge";




const GenericFeaturesSection = ({data, title}:{data: FeatureItem[], title: string}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    state.current.isDown = true;
    container.classList.add("cursor-grabbing");
    state.current.startX = e.pageX - container.offsetLeft;
    state.current.scrollLeft = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    const container = scrollRef.current;
    if (!container) return;
    state.current.isDown = false;
    container.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    const container = scrollRef.current;
    if (!container) return;
    state.current.isDown = false;
    container.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - state.current.startX) * 1.5; // drag speed multiplier
    container.scrollLeft = state.current.scrollLeft - walk;
  };

  return (
    <div className="w-full font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 2xl:px-28 pt-24 2xl:pt-30 pb-8 overflow-hidden">
      <div className="w-full h-full py-14">
        <div className="flex flex-col md:items-start items-center gap-4 mb-16">
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight md:text-start text-center leading-[1.1] max-w-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          {title}
        </h1>
        <p className="text-white/60 md:text-start text-center max-w-xl">
          Explore the comprehensive features and services we offer to elevate your digital presence and drive business growth.
        </p>
      </div>

        {/* DRAGGABLE CONTAINER */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="
            flex gap-4 mt-14 px-4 overflow-x-auto 
            cursor-grab select-none 
            scrollbar-none scroll-smooth
          "
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="relative w-80 h-110 card flex flex-col justify-between border-white/10   p-5  border border-solid font-light  transition-all duration-300 ease-in-out rounded-xl overflow-hidden group flex-shrink-0 z-0 "
            >
              <div className='w-full h-full absolute top-0 left-0 backdrop-blur-2xl z-0' />
                <div className='absolute -top-10 left-0 w-32 h-72 bg-violet-400/10 rotate-135 blur-[100px]' />
              <div className="p-1 flex flex-col justify-between w-full h-full text-white z-10 font-semibold text-2xl leading-tight font-manrope">
                <div>
                  <p className="text-xs text-white/70 mb-1">{item.category}</p>
                  <h1 className="">{item.title}</h1>
                </div>
                <p className="text-xs font-medium text-white/50">{item.description}</p>
              </div>

              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-[0]">
                <span className="absolute w-px h-24 bg-linear-to-b from-transparent to-white/10 top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                  
                </span>
                <div className="absolute w-px h-3 bg-linear-to-b from-transparent to-violet-500 -top-20 left-1/2 -translate-x-1/2 -translate-y-full card-shine-line z-[-1]">

                  </div>
                <div className="max-w-20 aspect-square p-4 border border-muted-foreground/20 bg-linear-to-tl from-[#0d0d0d] to-[#141414] flex items-center justify-center rounded-sm z-3">
                  <item.icon className="text-white/70" size={22} />
                </div>
                <div className="w-8 h-8 bg-violet-500 blur-[30px]  absolute top-1/2 left-1/2 -translate-1/2 card-icon-glow">

                </div>
              </div>
            </div>
          ))}
        </div>
        {/* drag tutorial */}
        <p className="text-center mt-5 text-xs font-medium uppercase tracking-wider text-white/30 flex items-center justify-center gap-2"><ArrowRightLeft size={14}/> Drag to view more </p>
      </div>
      
    </div>
  );
};

export default GenericFeaturesSection;
