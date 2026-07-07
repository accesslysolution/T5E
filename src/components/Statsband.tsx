"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "12+",    label: "Projects Delivered", sub: "Across Pune" },
  { value: "2,400+", label: "Families Housed",     sub: "And thriving" },
  { value: "18",     label: "Acres Developed",     sub: "Of prime land" },
  { value: "₹500Cr+",label: "In Real Estate",      sub: "Value created" },
];

export default function StatsBand() {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      className="relative py-0 overflow-hidden"
      style={{ background: "#111A12" }}
    >
      {/* Gold top rule */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 30%, rgba(226,201,126,0.9) 50%, rgba(201,168,76,0.6) 70%, transparent 100%)",
        }}
      />

      {/* Ambient glow behind numbers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 100%)",
        }}
      />

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
          style={{ borderColor: "rgba(201,168,76,0.10)" }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center justify-center text-center px-6 lg:px-10 py-14 relative"
              style={{ borderColor: "rgba(201,168,76,0.10)" }}
            >
              {/* Hover gold wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 75%)" }}
              />

              {/* Value */}
              <span
                className="text-4xl lg:text-5xl font-light mb-2 group-hover:scale-105 transition-transform duration-500"
                style={{
                  fontFamily: "var(--font-playfair)",
                  background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 60%, #a8852f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </span>

              {/* Label */}
              <span
                className="text-white/55 text-[11px] tracking-[0.18em] uppercase mb-1"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.label}
              </span>

              {/* Sub */}
              <span
                className="text-white/22 text-[10px] tracking-wide"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {s.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gold bottom rule */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 30%, rgba(226,201,126,0.9) 50%, rgba(201,168,76,0.6) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}