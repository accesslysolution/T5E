'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function HeroSection() {
  const riseUpVariant: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    },
  };

  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#f4f4f2] overflow-hidden px-6 pb-6 pt-28 md:px-12 md:pb-12 md:pt-32 font-sans rounded-3xl mx-2 my-2 flex flex-col justify-center">
      
      {/* Background Hero Image (Full Screen) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/img/hero.avif"
          alt="T5E Luxury Real Estate Development"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f4f2]/90 via-[#f4f4f2]/60 to-transparent"></div>
      </div>

      {/* Main Hero Content (Layered over the image) */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
        
        {/* Left Column: Animated Text Content */}
        <motion.div 
          className="flex flex-col"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Top category tags */}
          <motion.div variants={riseUpVariant} className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-1.5 text-xs font-semibold text-[#1C2B1E] border border-[#1C2B1E]/20 bg-white/40 backdrop-blur-md rounded-full shadow-sm">
              Premium Estates
            </span>
            <span className="px-4 py-1.5 text-xs font-semibold text-[#1C2B1E] border border-[#1C2B1E]/20 bg-white/40 backdrop-blur-md rounded-full shadow-sm">
              Inspired by Nature
            </span>
            <span className="px-4 py-1.5 text-xs font-semibold text-[#1C2B1E] border border-[#1C2B1E]/20 bg-white/40 backdrop-blur-md rounded-full shadow-sm">
              Urban Sanctuaries
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={riseUpVariant}
            className="text-6xl md:text-8xl font-bold text-[#1C2B1E] leading-[1.1] tracking-tighter drop-shadow-sm"
          >
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 flex items-center justify-center border border-[#1C2B1E]/30 rounded-full text-xl hover:bg-[#1C2B1E]/5 backdrop-blur-sm transition-colors text-[#1C2B1E]">
                ✦
              </button>
              REDEFINING
            </div>
            <div className="flex items-center gap-4">
              LIVING
            </div>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={riseUpVariant}
            className="mt-6 text-base md:text-lg text-gray-800 max-w-lg leading-relaxed font-medium drop-shadow-sm"
          >
            Welcome to <strong className="text-[#1C2B1E]">The 5 Elements (T5E)</strong>. 
            We develop visionary spaces where luxury meets sustainability, crafting 
            environments designed in perfect harmony with nature to elevate your everyday life.
          </motion.p>

          {/* Embedded YouTube Video */}
          <motion.div 
            variants={riseUpVariant}
            className="mt-10 w-[320px] h-[190px] bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-xl relative overflow-hidden"
          >
            <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uR4dbOCN2s4?autoplay=1&mute=1&start=21&rel=0&modestbranding=1"
                title="T5E Signature Collection"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl w-full h-full object-cover"
              ></iframe>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}