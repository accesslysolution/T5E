"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ============================================================================
   DATA & TOKENS
   ============================================================================ */
const ELEMENTS = [
  { name: "Prithvi", title: "Earth", desc: "Solid foundations and quality construction — homes built to stand strong for generations with structural integrity.", num: "01", img: "/img/element-01.jpeg", color: "#8B7355" },
  { name: "Jal", title: "Water", desc: "Serenity and flow — thoughtful rainwater harvesting, water planning, and calm, restorative zen gardens.", num: "02", img: "/img/element-02.jpeg", color: "#3B82F6" },
  { name: "Agni", title: "Fire", desc: "Warmth and energy — sun-filled interiors engineered for optimal solar orientation that glow with natural life.", num: "03", img: "/img/element-03.jpeg", color: "#C9A84C" },
  { name: "Vayu", title: "Air", desc: "Breath and openness — engineered cross-ventilation, green sky corridors, and generous cantilevered balconies.", num: "04", img: "/img/element-04.jpeg", color: "#10B981" },
  { name: "Aakash", title: "Space", desc: "Room to breathe — well-proportioned homes, acoustic privacy, and open sky views with zero column intrusion.", num: "05", img: "/img/element-05.jpeg", color: "#8B5CF6" },
];

const TEAM = [
  { initials: "RJ", name: "Rajesh Jadhav", role: "Founder & Managing Director", bio: "Two decades in Pune real estate, with a builder's obsession for doing things properly and a refusal to chase scale over substance." },
  { initials: "SP", name: "Sneha Patil", role: "Director — Design & Architecture", bio: "Leads the architectural language that gives every T5E address its distinctive character, blending modernism with environmental harmony." },
  { initials: "AK", name: "Amit Kulkarni", role: "Head — Quality & Construction", bio: "Guards the build standard on site, locking specifications before foundation pours and enforcing strict grade-A material audits." },
  { initials: "PD", name: "Priya Deshpande", role: "Head — Sales & Customer Relations", bio: "Your first point of contact — here to make the home-buying journey transparent, contractual, and completely calm." },
  { initials: "VM", name: "Vikram Mehta", role: "Head — Projects & Planning", bio: "Keeps every project on programme without ever compromising on quality, enforcing our strict 90-day delivery guarantee." },
  { initials: "NR", name: "Neha Rao", role: "Legal & RERA Compliance", bio: "Ensures every approval, document, title deed, and RERA disclosure is meticulously verified, transparent, and up to date." },
];

const STORY_CHAPTERS = [
  {
    title: "The Conviction",
    subtitle: "Why we started",
    text: "T5E was founded on a conviction that has become rare in modern real estate — that a home is a deeply personal sanctuary, and deserves to be designed like one. Rather than chase mass-market scale or generic tower blocks, we deliberately keep our portfolio small.",
    img: "/img/vishwa-1.jpeg",
    highlight: "100% Boutique & Low-Density Focus",
  },
  {
    title: "The Approach",
    subtitle: "How we build",
    text: "Every site has its own micro-climate, wind trajectory, and solar path. We engage specialized boutique architects to craft bespoke blueprints for every individual plot. No two T5E buildings share the exact same floor plan or facade.",
    img: "/img/chaitanya-2.jpeg",
    highlight: "Zero Copy-Paste Blueprints",
  },
  {
    title: "The Standard",
    subtitle: "What we guarantee",
    text: "We treat blueprints as binding contracts and specifications as sacred promises. What you see on paper during your initial consultation is precisely the grade-A material finish you walk into on possession day.",
    img: "/img/apex-1.jpeg",
    highlight: "90-Day Max Possession Guarantee",
  },
];

const PROMISE_PILLARS = [
  {
    title: "Sound Engineering & Grade-A Materials",
    proof: "We conduct multi-stage third-party structural audits and publish material verification certificates for every homeowner.",
  },
  {
    title: "Enduring Finishes & Weather Resistance",
    proof: "Exterior cladding and interior fittings are selected through rigorous accelerated-aging tests to ensure they endure for decades.",
  },
  {
    title: "Absolute Title & RERA Transparency",
    proof: "Zero hidden clauses. Every approval, encumbrance report, and RERA filing is accessible before you sign a single document.",
  },
];

export default function AboutPage() {
  /* ── Interactive States ── */
  const [activeStoryTab, setActiveStoryTab] = useState(0);
  const [activeElementTab, setActiveElementTab] = useState(0);
  const [activeTeamMember, setActiveTeamMember] = useState(0);
  const [expandedPromise, setExpandedPromise] = useState<number | null>(0);

  /* ── Scroll Hooks ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-60px" });

  const currentStory = STORY_CHAPTERS[activeStoryTab];
  const currentElement = ELEMENTS[activeElementTab];
  const currentLeader = TEAM[activeTeamMember];

  return (
    <main className="bg-[#f8f5ef] text-[#1c2b1e] min-h-screen font-sans selection:bg-[#c9a84c]/20 selection:text-[#1c2b1e]">
      
      {/* =====================================================================
          1. HERO SECTION: Editorial Split-Screen
         ===================================================================== */}
      <section ref={heroRef} className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Gold Glow */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#c9a84c]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase">
                About The 5 Elements
              </span>
            </div>
            
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-[#1c2b1e] mb-8 leading-[0.98]">
              Fewer homes, <br />
              <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
                made better.
              </span>
            </h1>

            <p className="text-[#1c2b1e]/75 text-base sm:text-lg max-w-xl leading-relaxed mb-10 font-normal">
              We are a Pune-based boutique real estate developer obsessed with architectural integrity, environmental harmony, and contractual transparency.
            </p>

            <div className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-bold text-[#1c2b1e]/50 border-t border-[#1c2b1e]/10 pt-6">
              <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#1c2b1e]">About Us</span>
            </div>
          </motion.div>

          {/* Right Framed Image with Floating Glass Badge */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(28,43,30,0.12)] border border-white p-2 bg-white/60 backdrop-blur-md">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image src="/img/chaitanya-1.jpeg" alt="T5E Architecture" fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover object-center" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Authentication Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/85 backdrop-blur-xl border border-white shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#c9a84c]">
                    T5E Quality Mark
                  </p>
                  <p className="text-sm font-bold text-[#1c2b1e] font-playfair">
                    Est. 2010 · Pune Micro-Markets
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1c2b1e] text-[#c9a84c] flex items-center justify-center font-bold text-lg shadow-inner">
                  ✦
                </div>
              </div>
            </div>
            
            {/* Decorative Gold Accent Frame Behind */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#c9a84c] rounded-br-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#c9a84c] rounded-tl-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. OUR STORY: Interactive Narrative Switcher
         ===================================================================== */}
      <section ref={storyRef} className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#1c2b1e]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Canvas that morphs with tab switch */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative h-[440px] w-full rounded-3xl overflow-hidden bg-white p-2.5 shadow-[0_15px_45px_rgba(28,43,30,0.08)] border border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStory.img}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                >
                  <Image src={currentStory.img} alt={currentStory.title} fill sizes="(max-width: 1024px) 100vw, 450px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2b1e]/80 via-transparent to-transparent" />
                  
                  {/* Floating Highlight Tag */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#c9a84c] text-[#1c2b1e] text-[10px] font-bold tracking-widest uppercase mb-2 shadow-sm">
                      Chapter {activeStoryTab + 1} // 03
                    </span>
                    <p className="text-white font-bold text-lg font-playfair drop-shadow-sm">
                      {currentStory.highlight}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Interactive Chapter Tabs & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 lg:pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#c9a84c] text-xs font-bold tracking-[0.25em] uppercase">
                Our Narrative
              </span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1c2b1e] mb-8">
              Built on principle, <br />
              <span className="italic font-light text-[#c9a84c]">driven by purpose.</span>
            </h2>

            {/* Chapter Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-white/70 border border-white shadow-sm self-start">
              {STORY_CHAPTERS.map((ch, idx) => {
                const isSelected = activeStoryTab === idx;
                return (
                  <button
                    key={ch.title}
                    onClick={() => setActiveStoryTab(idx)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#1c2b1e] text-white shadow-md"
                        : "text-[#1c2b1e]/60 hover:text-[#1c2b1e] hover:bg-white/50"
                    }`}
                  >
                    {ch.title}
                  </button>
                );
              })}
            </div>

            {/* Changing Text Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="min-h-[160px]"
              >
                <h3 className="text-xl font-bold text-[#c9a84c] mb-3 font-playfair">
                  {currentStory.subtitle}
                </h3>
                <p className="text-base sm:text-lg text-[#1c2b1e]/80 leading-relaxed font-normal">
                  {currentStory.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 mt-6 border-t border-[#1c2b1e]/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#1c2b1e]/50">
              <span>Click chapters to explore</span>
              <span className="text-[#c9a84c]">✦ T5E Heritage</span>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          3. THE ELEMENTS: Master-Detail Interactive Stage
         ===================================================================== */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
            The Name: Why &ldquo;T5E&rdquo;?
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1c2b1e] mb-4">
            Five elemental forces. <br />
            <span className="italic font-light text-[#c9a84c]">One living blueprint.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1c2b1e]/70">
            Select an element below to see how ancient philosophy translates into tangible architectural engineering in every project.
          </p>
        </div>

        {/* Master-Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 5 Clickable Element Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
            {ELEMENTS.map((el, idx) => {
              const isSelected = activeElementTab === idx;
              return (
                <button
                  key={el.name}
                  onClick={() => setActiveElementTab(idx)}
                  className={`group relative w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#1c2b1e] text-white border-[#1c2b1e] shadow-xl scale-[1.02]"
                      : "bg-white/70 hover:bg-white text-[#1c2b1e] border-white/80 hover:border-white shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                      isSelected ? "bg-white/10 text-[#e2c97e]" : "bg-[#1c2b1e]/5 text-[#1c2b1e]/50"
                    }`}>
                      {el.num}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold font-playfair leading-tight">
                        {el.name}
                      </h3>
                      <p className={`text-[10px] tracking-widest uppercase font-bold mt-0.5 ${
                        isSelected ? "text-[#c9a84c]" : "text-[#1c2b1e]/50"
                      }`}>
                        {el.title} Principle
                      </p>
                    </div>
                  </div>

                  <span className={`text-xl font-light transition-transform duration-300 ${
                    isSelected ? "text-[#c9a84c] translate-x-1" : "text-[#1c2b1e]/30 group-hover:translate-x-1"
                  }`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Large Display Showcase Window (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-3 sm:p-4 shadow-[0_20px_50px_rgba(28,43,30,0.08)] border border-white flex flex-col">
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-900 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentElement.img}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image src={currentElement.img} alt={currentElement.name} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#c9a84c] uppercase tracking-widest block mb-1">
                        Element // {currentElement.num}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-bold font-playfair drop-shadow-md">
                        {currentElement.name} ({currentElement.title})
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Description Box */}
            <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentElement.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base sm:text-lg text-[#1c2b1e]/80 leading-relaxed font-normal mb-6"
                >
                  {currentElement.desc}
                </motion.p>
              </AnimatePresence>

              <div className="pt-4 border-t border-[#1c2b1e]/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#1c2b1e]/50">
                <span>Active T5E Engineering Principle</span>
                <span className="text-[#c9a84c]">✦ Standard in 100% of homes</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          4. PROMISE & PRINCIPLES: The High-Contrast "Dark Vault"
         ===================================================================== */}
      <section className="bg-[#1c2b1e] text-white py-24 lg:py-32 relative overflow-hidden my-12 rounded-3xl mx-2 sm:mx-6 border border-white/10 shadow-2xl">
        {/* Ambient Glows inside Dark Vault */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Interactive Verification Pillars (7 Cols) */}
            <div className="lg:col-span-7">
              <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase block mb-4">
                Our Contractual Promise
              </span>
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light mb-8 leading-[1.05]">
                Quality is <br />
                <span className="italic font-normal bg-gradient-to-r from-[#e2c97e] via-[#c9a84c] to-[#a8852f] bg-clip-text text-transparent">
                  never negotiable.
                </span>
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-normal">
                We believe a developer should be judged by what happens on the construction site, not just in the brochure. Click our pillars below to see how we verify our standards.
              </p>

              {/* Interactive Pillars Accordion */}
              <div className="space-y-3">
                {PROMISE_PILLARS.map((pillar, idx) => {
                  const isExpanded = expandedPromise === idx;
                  return (
                    <div 
                      key={pillar.title}
                      onClick={() => setExpandedPromise(isExpanded ? null : idx)}
                      className={`rounded-2xl border transition-all duration-300 p-5 cursor-pointer ${
                        isExpanded 
                          ? "bg-white/10 border-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.15)]" 
                          : "bg-white/5 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={`text-base sm:text-lg font-bold font-playfair flex items-center gap-3 ${
                          isExpanded ? "text-[#e2c97e]" : "text-white"
                        }`}>
                          <span className="text-[#c9a84c] text-xs">✦</span>
                          {pillar.title}
                        </h3>
                        <span className="text-white/40 font-mono text-sm">
                          {isExpanded ? "−" : "+"}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-white/75 leading-relaxed pt-3 mt-3 border-t border-white/10 font-normal">
                              {pillar.proof}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Quality Verification Image Frame (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/20 p-2 bg-white/5 backdrop-blur-md shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image src="/img/apex-1.jpeg" alt="Quality Promise" fill sizes="(max-width: 1024px) 100vw, 450px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2b1e] via-transparent to-transparent opacity-90" />
                </div>

                {/* Overlay Seal */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1c2b1e]/90 backdrop-blur-xl border border-[#c9a84c]/30 text-center">
                  <span className="text-2xl text-[#c9a84c] block mb-1">🔒</span>
                  <h4 className="text-white font-bold font-playfair text-lg mb-1">
                    100% RERA Compliant
                  </h4>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-mono">
                    Zero Compromise Audit Record
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. STATS: Floating Gold Counter Ribbon
         ===================================================================== */}
      <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(28,43,30,0.08)] grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1c2b1e]/10">
          {[
            { n: "4", l: "Signature Projects", sub: "Pune Micro-markets" },
            { n: "2", l: "Prime Locations", sub: "Carefully selected" },
            { n: "100%", l: "Design-Led Builds", sub: "Zero copy-paste plans" },
            { n: "RERA", l: "Fully Compliant", sub: "Verified transparency" },
          ].map((s, i) => (
            <div key={i} className={`flex flex-col items-center justify-center text-center ${i > 0 ? "pt-6 md:pt-0" : ""}`}>
              <span className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent mb-1 drop-shadow-sm">
                {s.n}
              </span>
              <span className="text-[#1c2b1e] font-bold text-xs sm:text-sm tracking-[0.18em] uppercase mb-0.5">
                {s.l}
              </span>
              <span className="text-[#1c2b1e]/50 text-[11px] font-medium font-mono">
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. THE PEOPLE: Executive Rolodex & Asymmetric Gallery Collage
         ===================================================================== */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
            The Leadership & Vision
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1c2b1e]">
            The people behind <br />
            <span className="italic font-light text-[#c9a84c]">the architecture.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive Leadership Rolodex (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1c2b1e]/50 mb-2">
              Click to view executive profile:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TEAM.map((member, idx) => {
                const isSelected = activeTeamMember === idx;
                return (
                  <button
                    key={member.initials}
                    onClick={() => setActiveTeamMember(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#1c2b1e] text-white border-[#1c2b1e] shadow-md scale-[1.02]"
                        : "bg-white/60 hover:bg-white text-[#1c2b1e] border-white/80 hover:border-white shadow-sm"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-playfair font-bold text-lg flex-shrink-0 ${
                      isSelected ? "bg-[#c9a84c] text-[#1c2b1e]" : "bg-[#1c2b1e]/5 text-[#c9a84c]"
                    }`}>
                      {member.initials}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-sm truncate">{member.name}</h4>
                      <p className={`text-[10px] tracking-wider uppercase truncate ${
                        isSelected ? "text-[#e2c97e]" : "text-[#1c2b1e]/50"
                      }`}>
                        {member.role.split("—")[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Spotlight Executive Bio Card */}
            <div className="mt-4 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(28,43,30,0.06)] relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-8xl font-playfair font-bold text-[#1c2b1e]/[0.04] select-none pointer-events-none">
                {currentLeader.initials}
              </div>

              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-[10px] font-bold tracking-widest uppercase mb-4 border border-[#c9a84c]/20">
                  Executive Spotlight
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#1c2b1e] mb-1">
                  {currentLeader.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-6">
                  {currentLeader.role}
                </p>
                <p className="text-sm sm:text-base text-[#1c2b1e]/80 leading-relaxed font-normal">
                  &ldquo;{currentLeader.bio}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: Asymmetric Floating Gallery Collage (6 Cols) */}
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#1c2b1e]/50 mb-4">
              Architectural Gallery & Moments:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden shadow-md border border-white group">
                  <Image src="/img/chaitanya-2.jpeg" alt="Project Gallery" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold font-playfair">Siddhivinayak Chaitanya</span>
                  </div>
                </div>
                <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md border border-white group">
                  <Image src="/img/vishwa-2.jpeg" alt="Project Gallery" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold font-playfair">Siddhivinayak Vishwa</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 sm:pt-12">
                <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md border border-white group">
                  <Image src="/img/element-06.jpeg" alt="Project Gallery" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold font-playfair">The Element Facade</span>
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden shadow-md border border-white group">
                  <Image src="/img/element-07.jpeg" alt="Project Gallery" fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold font-playfair">Interior Craftsmanship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          7. CTA: Luxury VIP Invitation Pass Card
         ===================================================================== */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto mb-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1c2b1e] to-[#243323] text-white p-8 sm:p-14 lg:p-16 shadow-[0_25px_70px_rgba(28,43,30,0.2)] overflow-hidden border border-[#c9a84c]/30 text-center">
          
          {/* Shimmering Gold Border Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#c9a84c]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#c9a84c]/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Invitation Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#c9a84c]/40 text-[#e2c97e] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            <span>✦ Private Invitation Pass</span>
          </div>

          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-tight">
            Come see the quality <br />
            <span className="italic font-normal bg-gradient-to-r from-[#e2c97e] via-[#c9a84c] to-[#a8852f] bg-clip-text text-transparent">
              for yourself.
            </span>
          </h2>

          <p className="text-white/75 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed font-normal">
            We invite you to arrange a private, uninterrupted visit to any of our Pune developments. Experience our architectural proportions, cross-ventilation, and grade-A material finishes in person.
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/#contact" 
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#e2c97e] via-[#c9a84c] to-[#a8852f] text-[#1c2b1e] font-bold text-xs tracking-[0.2em] uppercase shadow-lg hover:shadow-[0_10px_30px_rgba(201,168,76,0.4)] hover:scale-105 transition-all duration-300"
            >
              Arrange a Private Visit →
            </Link>
            <Link 
              href="/projects" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-[0.2em] uppercase border border-white/20 transition-all duration-300"
            >
              Explore Portfolio
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-white/50 uppercase tracking-widest">
            <span>📍 Pune Micro-Markets</span>
            <span>·</span>
            <span>🚗 On-Site Valet & Walkthrough</span>
            <span>·</span>
            <span>🔒 100% Transparent Consultation</span>
          </div>
        </div>
      </section>

    </main>
  );
}