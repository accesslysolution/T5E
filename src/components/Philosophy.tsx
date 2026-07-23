"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ELEMENTS = [
  {
    number: "01",
    name: "Prithvi",
    english: "Earth",
    symbol: "⬡",
    tagline: "Structural Integrity & Endurance",
    description: "Every foundation we lay honours the land. Structural integrity, material quality, and site sensitivity define our construction ethos. We build to outlast generations.",
    color: "#8B7355", // Terracotta / Warm Timber
    glow: "rgba(139, 115, 85, 0.18)",
  },
  {
    number: "02",
    name: "Jal",
    english: "Water",
    symbol: "◈",
    tagline: "Serenity & Restorative Flow",
    description: "Serenity and flow. Thoughtful water planning, rainwater harvesting, and calm, restorative zen gardens. Homes engineered to adapt to the natural rhythm of life.",
    color: "#3B82F6", // Azure / Serenity
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    number: "03",
    name: "Agni",
    english: "Fire",
    symbol: "△",
    tagline: "Energy, Light & Vitality",
    description: "Warmth and dynamic energy. From thoughtfully oriented solar lighting to the vibrancy of community gathering lounges, we create homes that feel truly alive.",
    color: "#C9A84C", // Brand Gold / Energy
    glow: "rgba(201, 168, 76, 0.22)",
  },
  {
    number: "04",
    name: "Vayu",
    english: "Air",
    symbol: "○",
    tagline: "Natural Cross-Ventilation",
    description: "Cross-ventilation engineered from the blueprint. Double-height windows, green sky corridors, and open cantilevered terraces ensure every residence breathes naturally.",
    color: "#10B981", // Sage / Breeze
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    number: "05",
    name: "Akash",
    english: "Space",
    symbol: "◻",
    tagline: "The Canvas of Possibility",
    description: "The ultimate luxury is space. Generous ceiling heights, minimal column intrusion, and acoustic privacy give each resident the freedom and quiet to grow into themselves.",
    color: "#8B5CF6", // Slate / Ether
    glow: "rgba(139, 92, 246, 0.15)",
  },
];

export default function Philosophy() {
  const [activeTab, setActiveTab] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const activeElement = ELEMENTS[activeTab];

  return (
    <section 
      id="philosophy" 
      className="relative py-28 lg:py-36 overflow-hidden bg-[#f8f5ef] rounded-3xl mx-2 my-2 border border-white/80 shadow-sm transition-colors duration-1000"
    >
      {/* ── Dynamic Ambient Mood Light (Shifts color based on active element) ── */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] lg:w-[60rem] lg:h-[60rem] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: activeElement.glow }}
      />
      
      {/* Subtle Grid Overlay for architectural precision */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,43,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,43,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1c2b1e]/10 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#c9a84c]" />
              <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
                Our Core Philosophy
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c2b1e] leading-[1.08] font-playfair">
              Five forces.{" "}
              <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
                One living blueprint.
              </span>
            </h2>
          </div>

          <p className="text-[#1c2b1e]/70 text-sm md:text-base max-w-sm leading-relaxed font-normal">
            Ancient philosophy recognised five elemental forces that compose all existence. We have engineered them into the literal foundation of every T5E residence.
          </p>
        </motion.div>

        {/* =========================================================
            DESKTOP VIEW: Interactive Expanding Monoliths (lg: flex)
           ========================================================= */}
        <div className="hidden lg:flex gap-4 h-[500px] w-full">
          {ELEMENTS.map((el, idx) => {
            const isActive = activeTab === idx;

            return (
              <motion.div
                key={el.number}
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setActiveTab(idx)}
                layout
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 flex flex-col justify-between p-8 ${
                  isActive
                    ? "flex-[3] bg-white/90 backdrop-blur-2xl border-white shadow-[0_20px_60px_rgba(28,43,30,0.12)]"
                    : "flex-[0.7] bg-white/40 backdrop-blur-md border-white/60 hover:bg-white/60 hover:border-white opacity-70 hover:opacity-100"
                }`}
              >
                {/* Top Number + Symbol Accent */}
                <div className="flex items-center justify-between z-10">
                  <span 
                    className="text-xs font-bold tracking-[0.25em] font-jakarta"
                    style={{ color: isActive ? el.color : "#1c2b1e", opacity: isActive ? 1 : 0.5 }}
                  >
                    {el.number}
                  </span>
                  <motion.span 
                    className="text-3xl"
                    style={{ color: el.color }}
                    animate={isActive ? { rotate: [0, 15, 0], scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {el.symbol}
                  </motion.span>
                </div>

                {/* Giant Watermark Symbol in Background of Active Card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.08, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-[-20px] bottom-[-20px] text-[18rem] leading-none select-none pointer-events-none font-serif"
                    style={{ color: el.color }}
                  >
                    {el.symbol}
                  </motion.div>
                )}

                {/* Middle Content (Only visible when active) */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: 0.15 }}
                      className="my-auto z-10 max-w-lg"
                    >
                      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 bg-black/5" style={{ color: el.color }}>
                        {el.english} · {el.tagline}
                      </div>
                      <h3 className="text-4xl font-bold text-[#1c2b1e] mb-4 font-playfair">
                        {el.name}
                      </h3>
                      <p className="text-[#1c2b1e]/75 text-base leading-relaxed font-normal">
                        {el.description}
                      </p>
                    </motion.div>
                  ) : (
                    /* Vertical Text when collapsed */
                    <div className="my-auto flex items-center justify-center">
                      <span className="text-xl font-bold text-[#1c2b1e] tracking-widest uppercase -rotate-90 whitespace-nowrap font-playfair opacity-80">
                        {el.name}
                      </span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Bottom Status / Indicator */}
                <div className="z-10 flex items-center justify-between border-t border-[#1c2b1e]/10 pt-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1c2b1e]/40 font-jakarta">
                    {isActive ? "Active Principle" : "Click to expand"}
                  </span>
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? "w-6" : ""}`}
                    style={{ backgroundColor: isActive ? el.color : "rgba(28,43,30,0.2)" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            MOBILE VIEW: Interactive Vertical Stack (lg: hidden)
           ========================================================= */}
        <div className="flex lg:hidden flex-col gap-4">
          {ELEMENTS.map((el, idx) => {
            const isActive = activeTab === idx;

            return (
              <motion.div
                key={el.number}
                onClick={() => setActiveTab(isActive ? -1 : idx)}
                layout
                className={`rounded-2xl border transition-all duration-500 overflow-hidden p-6 ${
                  isActive
                    ? "bg-white/95 backdrop-blur-xl border-white shadow-lg"
                    : "bg-white/50 backdrop-blur-md border-white/60"
                }`}
              >
                {/* Card Header Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-widest font-jakarta" style={{ color: el.color }}>
                      {el.number}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1c2b1e] font-playfair">
                      {el.name}
                    </h3>
                    <span className="text-xs text-[#1c2b1e]/50 uppercase font-jakarta">
                      ({el.english})
                    </span>
                  </div>
                  <span className="text-2xl" style={{ color: el.color }}>
                    {el.symbol}
                  </span>
                </div>

                {/* Expanded Description */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-[#1c2b1e]/10"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: el.color }}>
                        {el.tagline}
                      </p>
                      <p className="text-sm text-[#1c2b1e]/80 leading-relaxed">
                        {el.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Brand Quote Anchor ── */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-[#1c2b1e]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#1c2b1e]/50 font-jakarta">
            The T5E Architectural Guarantee
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-semibold text-[#1c2b1e]">
              All 5 principles active across 100% of developments
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}