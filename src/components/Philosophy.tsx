"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ELEMENTS = [
  {
    number: "01",
    name: "Prithvi",
    english: "Earth",
    symbol: "⬡",
    tagline: "Structural Integrity & Endurance",
    description:
      "Every foundation we lay honours the land. Structural integrity, material quality, and site sensitivity define our construction ethos. We build to outlast generations.",
    color: "#8B7355",
    glow: "rgba(139, 115, 85, 0.18)",
    image: "/img/Prithvi.avif",
  },
  {
    number: "02",
    name: "Jal",
    english: "Water",
    symbol: "◈",
    tagline: "Serenity & Restorative Flow",
    description:
      "Serenity and flow. Thoughtful water planning, rainwater harvesting, and calm, restorative zen gardens. Homes engineered to adapt to the natural rhythm of life.",
    color: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.15)",
    image: "/img/Jal.avif",
  },
  {
    number: "03",
    name: "Agni",
    english: "Fire",
    symbol: "△",
    tagline: "Energy, Light & Vitality",
    description:
      "Warmth and dynamic energy. From thoughtfully oriented solar lighting to the vibrancy of community gathering lounges, we create homes that feel truly alive.",
    color: "#C9A84C",
    glow: "rgba(201, 168, 76, 0.22)",
    image: "/img/Agni.avif",
  },
  {
    number: "04",
    name: "Vayu",
    english: "Air",
    symbol: "○",
    tagline: "Natural Cross-Ventilation",
    description:
      "Cross-ventilation engineered from the blueprint. Double-height windows, green sky corridors, and open cantilevered terraces ensure every residence breathes naturally.",
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.15)",
    image: "/img/Vayu.avif",
  },
  {
    number: "05",
    name: "Akash",
    english: "Space",
    symbol: "◻",
    tagline: "The Canvas of Possibility",
    description:
      "The ultimate luxury is space. Generous ceiling heights, minimal column intrusion, and acoustic privacy give each resident the freedom and quiet to grow into themselves.",
    color: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.15)",
    image: "/img/Akash.avif",
  },
];

export default function Philosophy() {
  const [activeTab, setActiveTab] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const activeElement = ELEMENTS[activeTab] ?? ELEMENTS[0];

  return (
    <section
      id="philosophy"
      className="relative py-28 lg:py-36 overflow-hidden bg-[#f8f5ef] rounded-3xl mx-2 my-2 border border-white/80 shadow-sm transition-colors duration-1000"
    >
      {/* ── Dynamic Ambient Mood Light ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] lg:w-[60rem] lg:h-[60rem] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-out"
        style={{ background: activeElement.glow }}
      />

      {/* Subtle Grid Overlay */}
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
            Ancient philosophy recognised five elemental forces that compose all
            existence. We have engineered them into the literal foundation of
            every T5E residence.
          </p>
        </motion.div>

        {/* =========================================================
            DESKTOP VIEW: Expanding Image Monoliths (lg: flex)
           ========================================================= */}
        <div className="hidden lg:flex gap-4 h-[560px] w-full">
          {ELEMENTS.map((el, idx) => {
            const isActive = activeTab === idx;
            return (
              <motion.div
                key={el.number}
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setActiveTab(idx)}
                layout
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 flex flex-col justify-between p-6 xl:p-7 ${
                  isActive
                    ? "flex-[3] border-white/90 shadow-[0_25px_70px_rgba(28,43,30,0.25)]"
                    : "flex-[0.7] border-white/50 hover:border-white/80 shadow-md"
                }`}
              >
                {/* ── Background Image Layer ── */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={el.image}
                    alt={`${el.name} — ${el.english}`}
                    fill
                    sizes="(max-width: 1024px) 0px, 60vw"
                    priority={idx < 2}
                    className={`object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "scale-105 grayscale-0 saturate-[1.05] brightness-100"
                        : "scale-100 grayscale-[85%] brightness-[0.92] group-hover:grayscale-[40%] group-hover:brightness-100"
                    }`}
                  />

                  {/* Light bottom-up scrim only — keeps the photo readable, not washed */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive
                        ? "bg-gradient-to-t from-black/45 via-black/10 to-black/20"
                        : "bg-gradient-to-t from-black/55 via-black/25 to-black/30"
                    }`}
                  />

                  {/* Element colour tint */}
                  <div
                    className="absolute inset-0 mix-blend-soft-light transition-opacity duration-700"
                    style={{
                      backgroundColor: el.color,
                      opacity: isActive ? 0.35 : 0.2,
                    }}
                  />
                </div>

                {/* Top Number + Symbol Accent */}
                <div className="flex items-start justify-between z-10">
                  <span className="text-[11px] font-bold tracking-[0.25em] font-jakarta text-white/85 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/25">
                    {el.number}
                  </span>
                  <motion.span
                    className="text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{ color: el.color }}
                    animate={isActive ? { rotate: [0, 15, 0], scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {el.symbol}
                  </motion.span>
                </div>

                {/* Middle / Bottom Content */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active-content"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.4, delay: 0.12 }}
                      className="z-10 mt-auto w-full max-w-xl"
                    >
                      {/* ── Frosted Glass Text Box ── */}
                      <div className="rounded-2xl bg-white/82 backdrop-blur-2xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.18)] p-6 xl:p-7">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 font-jakarta"
                          style={{
                            color: el.color,
                            backgroundColor: `${el.color}1a`,
                            border: `1px solid ${el.color}40`,
                          }}
                        >
                          {el.english} · {el.tagline}
                        </div>

                        <h3 className="text-4xl xl:text-5xl font-bold text-[#1c2b1e] mb-3 font-playfair leading-tight">
                          {el.name}
                        </h3>

                        <p className="text-[#1c2b1e]/85 text-sm xl:text-base leading-relaxed font-normal">
                          {el.description}
                        </p>

                        {/* Footer row inside the glass box */}
                        <div className="mt-5 pt-4 flex items-center justify-between border-t border-[#1c2b1e]/12">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1c2b1e]/50 font-jakarta">
                            Active Principle
                          </span>
                          <div
                            className="h-2 w-8 rounded-full transition-all duration-500"
                            style={{ backgroundColor: el.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── Collapsed: vertical name on a slim glass pill ── */
                    <div className="z-10 my-auto flex items-center justify-center">
                      <div className="rounded-full bg-white/25 backdrop-blur-md border border-white/40 px-4 py-6">
                        <span className="block text-lg font-bold text-white tracking-[0.2em] uppercase -rotate-90 whitespace-nowrap font-playfair drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                          {el.name}
                        </span>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Collapsed-state bottom dot */}
                {!isActive && (
                  <div className="z-10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white/60 transition-all duration-500" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            MOBILE VIEW: Vertical Stack with Image Banners (lg: hidden)
           ========================================================= */}
        <div className="flex lg:hidden flex-col gap-4">
          {ELEMENTS.map((el, idx) => {
            const isActive = activeTab === idx;
            return (
              <motion.div
                key={el.number}
                onClick={() => setActiveTab(isActive ? -1 : idx)}
                layout
                className={`relative rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? "border-white/90 shadow-lg"
                    : "border-white/60 shadow-sm"
                }`}
              >
                {/* Full-bleed image background */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={el.image}
                    alt={`${el.name} — ${el.english}`}
                    fill
                    sizes="100vw"
                    className={`object-cover transition-all duration-700 ${
                      isActive ? "grayscale-0 scale-105" : "grayscale-[80%] scale-100"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/50 via-black/15 to-black/25"
                        : "bg-black/45"
                    }`}
                  />
                  <div
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{ backgroundColor: el.color, opacity: isActive ? 0.3 : 0.18 }}
                  />
                </div>

                <div className={`transition-all duration-500 ${isActive ? "pt-28" : "pt-0"}`}>
                  <div className="p-4">
                    {/* ── Frosted Glass Text Box ── */}
                    <div className="rounded-xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.15)] p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span
                            className="text-[11px] font-bold tracking-widest font-jakarta"
                            style={{ color: el.color }}
                          >
                            {el.number}
                          </span>
                          <h3 className="text-2xl font-bold text-[#1c2b1e] font-playfair">
                            {el.name}
                          </h3>
                          <span className="text-[11px] text-[#1c2b1e]/50 uppercase font-jakarta">
                            ({el.english})
                          </span>
                        </div>
                        <span
                          className="text-2xl transition-transform duration-300"
                          style={{
                            color: el.color,
                            transform: isActive ? "rotate(45deg)" : "none",
                          }}
                        >
                          {isActive ? "+" : el.symbol}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-[#1c2b1e]/12 overflow-hidden"
                          >
                            <p
                              className="text-[11px] font-bold uppercase tracking-wider mb-2 font-jakarta"
                              style={{ color: el.color }}
                            >
                              {el.tagline}
                            </p>
                            <p className="text-sm text-[#1c2b1e]/85 leading-relaxed">
                              {el.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
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