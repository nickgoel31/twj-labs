import { ArrowUpRight, BarChart3, CheckCircle, SearchIcon, Zap } from "lucide-react";

export const SEOScoreCard = () => {
  return (
    <div className="relative flex flex-col md:h-[60vh] justify-between gap-6 overflow-hidden rounded-xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg md:w-[70%]">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">SEO Health</h2>
        <span className="text-sm text-green-400 flex items-center gap-1">
          <ArrowUpRight size={16} />
          +14%
        </span>
      </div>

      {/* Circular Score Indicator */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgb(163,105,255)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="251"
              strokeDashoffset="50"
              fill="none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
            92
          </span>
        </div>
        <p className="text-sm text-gray-300 mt-2">Excellent Optimization</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-green-400" />
          Meta Tags
        </div>
        <div className="flex items-center gap-1">
          <Zap size={14} className="text-yellow-400" />
          Speed
        </div>
        <div className="flex items-center gap-1">
          <BarChart3 size={14} className="text-blue-400" />
          Keywords
        </div>
      </div>
    </div>
  );
};

export const SEOSearchBar = () => {
    return (
        <div className='relative flex space-x-3 overflow-hidden rounded-xl p-4 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg md:w-[70%] '>
            <SearchIcon size={20} className='text-white/20'/>
            <p className='text-white/40 font-manrope font-medium text-sm'>Best Web Development agency in India</p>
        </div>
    )
}