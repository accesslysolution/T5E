"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ELEMENTS = [
  {
    number: "01", name: "Prithvi", english: "Earth", symbol: "⬡",
    description: "Every foundation we lay honours the land. Structural integrity, material quality, and site sensitivity define our construction ethos. We build to outlast generations.",
    color: "#8B7355",
  },
  {
    number: "02", name: "Jal", english: "Water", symbol: "◈",
    description: "Serenity and flow. Thoughtful water planning, harvesting, and calm, restorative spaces. Homes that adapt to the natural rhythm of life.",
    color: "#60A5FA",
  },
  {
    number: "03", name: "Agni", english: "Fire", symbol: "△",
    description: "Warmth and energy. From thoughtfully placed lighting to the vibrancy of community spaces, we create homes that feel truly alive.",
    color: "#C9A84C",
  },
  {
    number: "04", name: "Vayu", english: "Air", symbol: "○",
    description: "Cross-ventilation engineered from the blueprint. Large windows, green corridors, and open terraces ensure every residence breathes naturally, day and night.",
    color: "#5A9E6F",
  },
  {
    number: "05", name: "Akash", english: "Space", symbol: "◻",
    description: "The canvas of possibility. Generous proportions, minimal intrusion, and thoughtful silence give each resident room to grow into themselves.",
    color: "#9B8FA6",
  },
];

function ElementRow({ el, index }: { el: typeof ELEMENTS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col lg:flex-row items-start gap-8 lg:gap-12 py-10 lg:py-12 relative cursor-default"
      style={{ borderBottom: "1px solid rgba(28,43,30,0.10)" }}
    >
      {/* Hover wash */}
      <div
        className="absolute inset-0 -mx-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl pointer-events-none"
        style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(4px)" }}
      />

      {/* Number + symbol column */}
      <div className="relative flex flex-row lg:flex-col items-center lg:items-center gap-5 lg:gap-3 min-w-[72px]">
        <span
          className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: el.color, opacity: 0.55, fontFamily: "var(--font-jakarta)" }}
        >
          {el.number}
        </span>
        <motion.span
          className="text-4xl"
          style={{ color: el.color }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
        >
          {el.symbol}
        </motion.span>
      </div>

      {/* Name column */}
      <div className="relative min-w-[160px]">
        <h3
          className="text-3xl lg:text-4xl font-light text-[#1C2B1E] leading-none"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {el.name}
        </h3>
        <p
          className="text-[10px] tracking-[0.25em] uppercase mt-2"
          style={{ color: el.color, fontFamily: "var(--font-jakarta)" }}
        >
          {el.english}
        </p>
      </div>

      {/* Description + animated gold bar */}
      <div className="relative flex-1">
        {/* Animated bar on hover */}
        <div
          className="absolute -left-0 top-1 w-0 h-px group-hover:w-8 transition-all duration-500"
          style={{ background: el.color, transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        />
        <p
          className="text-[#2C2C2C]/62 text-base leading-[1.85] max-w-2xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {el.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-80px" });

  return (
    <section id="philosophy" className="py-28 lg:py-36 overflow-hidden" style={{ background: "#F5F0E8" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <div>
            <p
              className="text-[10px] tracking-[0.38em] uppercase mb-5"
              style={{ color: "#8B7355", fontFamily: "var(--font-jakarta)" }}
            >
              Our Foundation
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-[#1C2B1E] leading-[1.08]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Five forces.{" "}
              <span className="italic" style={{ color: "#8B7355" }}>One vision.</span>
            </h2>
          </div>

          <p
            className="text-[#2C2C2C]/55 text-base max-w-xs leading-[1.85] lg:text-right"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Ancient philosophy recognised five fundamental elements that compose all of existence.
            We have made them the core blueprint for every home we build.
          </p>
        </motion.div>

        {/* Elements rows */}
        <div className="relative">
          {ELEMENTS.map((el, i) => (
            <ElementRow key={el.number} el={el} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}