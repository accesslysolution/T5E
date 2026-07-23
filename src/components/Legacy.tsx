"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const REASONS = [
  {
    id: "materials",
    code: "SPEC-01 // LOCKED",
    title: "No Compromise on Materials",
    body: "Every specification is locked before construction begins — and it stays locked. What's on paper is what you walk into.",
    metric: "100%",
    metricLabel: "Grade-A Certified Steel & Concrete",
    badge: "Zero Spec Changes",
  },
  {
    id: "delivery",
    code: "TIME-02 // VERIFIED",
    title: "On-Time Delivery Record",
    body: "In a sector notorious for delays, we've delivered every project within 90 days of commitment. We treat your possession date as a contract.",
    metric: "90 Days",
    metricLabel: "Max Handover Window Guaranteed",
    badge: "Contractual Timeline",
  },
  {
    id: "commitment",
    code: "CARE-03 // ACTIVE",
    title: "Post-Possession Commitment",
    body: "Our relationship doesn't end at handover. Dedicated maintenance, swift response, and a community that's looked after — for years, not months.",
    metric: "5+ Years",
    metricLabel: "Dedicated On-Site Maintenance Care",
    badge: "Multi-Year Support",
  },
  {
    id: "integrity",
    code: "ARCH-04 // CUSTOM",
    title: "Design Integrity",
    body: "We engage architects who build fewer projects and think more carefully. No copy-paste floor plans — every project is site-specific.",
    metric: "Zero",
    metricLabel: "Copy-Paste Layouts Across Portfolio",
    badge: "Site-Specific Architecture",
  },
];

const TESTIMONIALS = [
  {
    id: "rohit",
    quote: "We weren't just buying a flat — we were choosing how we'd live. The 5 Elements understood that better than we did. The attention to natural light and airflow has genuinely transformed our daily routine.",
    name: "Rohit & Priya Deshmukh",
    location: "Prithvi Heights, Wagholi",
    year: "2023",
    projectType: "3 BHK Bespoke Residence",
    duration: "0:42",
  },
  {
    id: "surekha",
    quote: "The attention to natural ventilation is remarkable. Even in mid-summer, our home feels cool and alive without running the air conditioning all day. You can feel the 'Vayu' principle in every room.",
    name: "Surekha Joshi",
    location: "Vayu Greens, Baner",
    year: "2022",
    projectType: "2 BHK Zen Apartment",
    duration: "0:35",
  },
  {
    id: "amol",
    quote: "Five years on, the building exterior and common areas look exactly as they did at handover. That speaks volumes about the quality of materials and the uncompromising honesty of the developer.",
    name: "Amol Khandagale",
    location: "Vayu Greens, Baner",
    year: "2019",
    projectType: "2 BHK Residence",
    duration: "0:51",
  },
];

export default function Legacy() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredReason, setHoveredReason] = useState<number | null>(null);

  const whyRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
  const testRef = useRef<HTMLDivElement>(null);
  const testInView = useInView(testRef, { once: true, margin: "-60px" });

  const currentStory = TESTIMONIALS[activeTestimonial];

  return (
    <section id="legacy" className="py-28 lg:py-36 bg-[#f8f5ef] rounded-3xl mx-2 my-2 relative overflow-hidden border border-white/80 shadow-sm">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-[#c9a84c]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[35rem] h-[35rem] bg-[#1c2b1e]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,43,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,43,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* =========================================================
            PART 1: THE DIFFERENCE (Interactive Blueprint X-Ray)
           ========================================================= */}
        <div className="mb-32 lg:mb-40">
          <motion.div
            ref={whyRef}
            initial={{ opacity: 0, y: 28 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1c2b1e]/10 pb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#c9a84c]" />
                <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
                  The 5 Elements Guarantee
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c2b1e] leading-[1.08] font-playfair">
                Excellence isn&apos;t a promise. <br />
                <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
                  It&apos;s an engineered record.
                </span>
              </h2>
            </div>
            <p className="text-[#1c2b1e]/70 text-sm md:text-base max-w-sm leading-relaxed">
              Hover over our architectural pillars below to scan our contractual metrics and verify our building standards.
            </p>
          </motion.div>

          {/* Blueprint X-Ray Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((r, idx) => {
              const isHovered = hoveredReason === idx;

              return (
                <motion.div
                  key={r.id}
                  onMouseEnter={() => setHoveredReason(idx)}
                  onMouseLeave={() => setHoveredReason(null)}
                  onClick={() => setHoveredReason(isHovered ? null : idx)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer border min-h-[360px] ${
                    isHovered
                      ? "bg-[#1c2b1e] text-white border-[#1c2b1e] shadow-[0_20px_50px_rgba(28,43,30,0.25)] -translate-y-2"
                      : "bg-white/80 backdrop-blur-xl text-[#1c2b1e] border-white/80 shadow-[0_10px_30px_rgba(28,43,30,0.04)] hover:border-white"
                  }`}
                >
                  {/* Glowing Laser Scan Line on Hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent transition-opacity duration-500 shadow-[0_0_15px_#c9a84c] ${
                    isHovered ? "opacity-100 animate-pulse" : "opacity-0"
                  }`} />

                  {/* Top Code & Status */}
                  <div className="flex items-center justify-between z-10">
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase transition-colors duration-300 ${
                      isHovered ? "text-[#c9a84c]" : "text-[#1c2b1e]/40"
                    }`}>
                      {r.code}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isHovered ? "bg-[#c9a84c] scale-125 shadow-[0_0_8px_#c9a84c]" : "bg-[#1c2b1e]/20"
                    }`} />
                  </div>

                  {/* Dynamic Content Morph */}
                  <div className="my-auto z-10 py-6">
                    <AnimatePresence mode="wait">
                      {isHovered ? (
                        /* X-Ray Verified Metric State */
                        <motion.div
                          key="metric"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25 }}
                          className="flex flex-col"
                        >
                          <span className="text-4xl lg:text-5xl font-bold text-[#e2c97e] font-playfair mb-2 tracking-tight">
                            {r.metric}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-widest text-white/80 font-jakarta leading-relaxed">
                            {r.metricLabel}
                          </span>
                        </motion.div>
                      ) : (
                        /* Standard Promise State */
                        <motion.div
                          key="text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h3 className="text-2xl font-bold mb-3 font-playfair leading-snug group-hover:text-[#c9a84c] transition-colors">
                            {r.title}
                          </h3>
                          <p className="text-sm text-[#1c2b1e]/70 leading-relaxed font-normal">
                            {r.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Tactile Badge */}
                  <div className={`pt-4 border-t z-10 flex items-center justify-between transition-colors duration-300 ${
                    isHovered ? "border-white/10" : "border-[#1c2b1e]/10"
                  }`}>
                    <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${
                      isHovered ? "text-[#c9a84c]" : "text-[#1c2b1e]/60"
                    }`}>
                      {r.badge}
                    </span>
                    <span className={`text-xs transition-transform duration-300 ${
                      isHovered ? "translate-x-1 text-white" : "text-[#1c2b1e]/40"
                    }`}>
                      {isHovered ? "✦ Verified" : "Scan →"}
                    </span>
                  </div>

                  {/* Subtle Blueprint Watermark inside dark card */}
                  {isHovered && (
                    <div className="absolute -bottom-10 -right-10 text-white/[0.03] text-9xl font-mono select-none pointer-events-none">
                      T5E
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            PART 2: RESIDENT VOICES (Editorial Audio Storyboard)
           ========================================================= */}
        <div>
          <motion.div
            ref={testRef}
            initial={{ opacity: 0, y: 28 }}
            animate={testInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#c9a84c]" />
                <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
                  Resident Storyboard
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c2b1e] leading-[1.08] font-playfair">
                Living proof of <br />
                <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
                  architectural harmony.
                </span>
              </h2>
            </div>
            <p className="text-[#1c2b1e]/70 text-sm md:text-base max-w-xs leading-relaxed">
              Select a resident below to listen to their firsthand experience living inside a T5E ecosystem.
            </p>
          </motion.div>

          {/* Split-Screen Editorial Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Resident Selector Stack (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
              {TESTIMONIALS.map((t, idx) => {
                const isSelected = activeTestimonial === idx;

                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-500 border flex flex-col justify-between overflow-hidden cursor-pointer ${
                      isSelected
                        ? "bg-[#1c2b1e] text-white border-[#1c2b1e] shadow-lg scale-[1.02]"
                        : "bg-white/60 hover:bg-white/90 text-[#1c2b1e] border-white/80 hover:border-white"
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeResidentBorder"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c9a84c]"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold font-jakarta ${
                        isSelected ? "text-[#e2c97e]" : "text-[#1c2b1e]"
                      }`}>
                        {t.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-white/10 text-white" : "bg-[#1c2b1e]/5 text-[#1c2b1e]/60"
                      }`}>
                        {t.year}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isSelected ? "text-white/70" : "text-[#1c2b1e]/60"}>
                        {t.location}
                      </span>
                      <span className={`transition-transform duration-300 ${
                        isSelected ? "text-[#c9a84c] translate-x-1" : "text-[#1c2b1e]/30 group-hover:translate-x-1"
                      }`}>
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Editorial Audio Canvas (8 Cols) */}
            <div className="lg:col-span-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(28,43,30,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              
              {/* Giant Watermark Quotation */}
              <div className="absolute top-[-20px] right-6 text-[#c9a84c]/10 text-[14rem] md:text-[18rem] font-serif leading-none select-none pointer-events-none font-playfair">
                &ldquo;
              </div>

              {/* Top Audio Player Bar (Simulated Living Voice) */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#1c2b1e]/10 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1c2b1e] text-[#c9a84c] flex items-center justify-center shadow-md animate-pulse">
                    <span>▶</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1c2b1e] font-jakarta">
                      Resident Voice Log // {currentStory.id.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-[#1c2b1e]/50 font-mono">
                      AUDIO REC · {currentStory.duration} MIN · VERIFIED T5E HOMEOWNER
                    </p>
                  </div>
                </div>

                {/* Animated Ambient Soundwave */}
                <div className="hidden sm:flex items-center gap-1 h-6 px-4 py-1 rounded-full bg-[#1c2b1e]/5 border border-[#1c2b1e]/10">
                  {[40, 80, 30, 90, 60, 100, 45, 70, 35, 85, 50, 95].map((height, i) => (
                    <motion.span
                      key={i}
                      className="w-[2px] bg-[#c9a84c] rounded-full"
                      animate={{ height: [`${height * 0.2}%`, `${height}%`, `${height * 0.3}%`] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.08,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Quotation Content */}
              <div className="relative z-10 my-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-[#1c2b1e] leading-[1.45] italic font-playfair mb-8">
                      &ldquo;{currentStory.quote}&rdquo;
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1c2b1e]/10">
                      <div>
                        <h4 className="text-lg font-bold text-[#1c2b1e] font-jakarta flex items-center gap-2">
                          <span>{currentStory.name}</span>
                          <span className="text-xs text-[#c9a84c]" title="Verified Buyer">✦</span>
                        </h4>
                        <p className="text-xs font-semibold text-[#1c2b1e]/60 uppercase tracking-wider mt-0.5 font-jakarta">
                          {currentStory.location} · {currentStory.projectType}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f8f5ef] border border-[#c9a84c]/30 text-[11px] font-bold tracking-widest uppercase text-[#1c2b1e]">
                        <span>Handover Class of {currentStory.year}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}