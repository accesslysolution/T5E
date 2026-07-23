'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

export default function HeroSection() {
  const riseUpVariant: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const containerVariant: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#f4f4f2] overflow-hidden px-6 pb-8 pt-24 md:px-12 md:pb-12 md:pt-32 font-sans rounded-3xl mx-2 my-2 flex flex-col justify-center">
      
      {/* Background Hero Image (Shared across screens) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/img/hero.avif"
          alt="T5E Luxury Real Estate Development"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f4f4f2]/95 via-[#f4f4f2]/80 md:via-[#f4f4f2]/60 to-transparent"></div>
      </div>

      {/* =========================================================
          DESKTOP VIEW (Original Layout - Hidden on Mobile)
         ========================================================= */}
      <div className="relative z-20 hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
        
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

      {/* =========================================================
          MOBILE VIEW (SaaS / App Style Layout - Hidden on Desktop)
         ========================================================= */}
      <motion.div 
        className="relative z-20 md:hidden flex flex-col justify-center min-h-[85vh] py-6"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {/* SaaS Glowing Pill Badge */}
        <motion.div variants={riseUpVariant} className="self-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C2B1E]/10 border border-[#1C2B1E]/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1C2B1E]">
              The 5 Elements · Pune
            </span>
          </div>
        </motion.div>

        {/* High-Impact Vertical SaaS Headline */}
        <motion.h1 
          variants={riseUpVariant}
          className="text-5xl sm:text-6xl font-extrabold text-[#1C2B1E] leading-[1.05] tracking-tight mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Redefining <br/>
          <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
            Modern Living.
          </span>
        </motion.h1>

        {/* Concise Pitch */}
        <motion.p 
          variants={riseUpVariant}
          className="text-sm text-[#1C2B1E]/80 leading-relaxed font-normal mb-8 max-w-sm"
        >
          Architectural brilliance crafted in harmony with nature. Experience sustainable luxury residences designed for generations.
        </motion.p>

        {/* Floating SaaS "App Card" Video Player */}
        <motion.div 
          variants={riseUpVariant}
          className="w-full bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-3 shadow-[0_20px_50px_rgba(28,43,30,0.15)] relative overflow-hidden"
        >
          {/* Subtle App Window Header Bar */}
          <div className="flex items-center justify-between pb-2.5 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C2B1E]/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C2B1E]/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]"></span>
            </div>
            <span className="text-[9px] tracking-widest font-bold uppercase text-[#1C2B1E]/60">
              Showcase Reel
            </span>
            <span className="text-xs text-[#c9a84c]">✦</span>
          </div>

          {/* 16:9 Video Embed Wrapper */}
          <div className="w-full aspect-video bg-gray-950 rounded-2xl overflow-hidden relative shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/uR4dbOCN2s4?autoplay=1&mute=1&start=21&rel=0&modestbranding=1"
              title="T5E Signature Collection"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>

          {/* Bottom Card Footer Overlay */}
          <div className="pt-3 px-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#1C2B1E]">
                Signature Collection
              </p>
              <p className="text-[9px] text-[#1C2B1E]/60">
                Tap fullscreen to immerse
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#1C2B1E] text-white text-[9px] font-bold tracking-widest uppercase shadow-sm">
              T5E
            </div>
          </div>
        </motion.div>

      </motion.div>

    </main>
  );
}