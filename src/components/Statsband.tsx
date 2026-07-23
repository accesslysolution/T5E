"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "12+",     label: "Projects Delivered", sub: "Across Pune" },
  { value: "2,400+",  label: "Families Housed",    sub: "And thriving" },
  { value: "18",      label: "Acres Developed",    sub: "Of prime land" },
  { value: "₹500Cr+", label: "In Real Estate",     sub: "Value created" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section className="relative py-12 px-4 md:px-8 overflow-hidden bg-[#f4f4f2]">
      
      {/* Outer Floating Glass Card */}
      <div className="max-w-7xl mx-auto rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(28,43,30,0.05)] relative overflow-hidden">
        
        {/* Top Gold Accent Rule */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

        {/* Ambient Gold Glow behind numbers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_100%)] pointer-events-none" />

        <div ref={ref} className="px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#c9a84c]/20 border-b border-[#c9a84c]/10 lg:border-none">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex flex-col items-center justify-center text-center px-6 lg:px-10 py-12 lg:py-14 relative ${
                  /* Fix borders on mobile 2x2 grid */
                  i % 2 !== 0 ? "border-l border-[#c9a84c]/20 lg:border-none" : ""
                }`}
              >
                {/* Hover Gold Wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_75%)]" />

                {/* Value */}
                <span
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent drop-shadow-sm"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.value}
                </span>

                {/* Label */}
                <span
                  className="text-[#1c2b1e] font-bold text-xs tracking-[0.18em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {s.label}
                </span>

                {/* Sub */}
                <span
                  className="text-[#1c2b1e]/60 text-[11px] tracking-wide font-medium"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {s.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gold Accent Rule */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
        
      </div>
    </section>
  );
}