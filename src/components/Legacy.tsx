"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "We weren't just buying a flat — we were choosing how we'd live. The 5 Elements understood that better than we did.",
    name: "Rohit & Priya Deshmukh",
    location: "Prithvi Heights, Wagholi",
    year: "2023",
  },
  {
    quote: "The attention to natural ventilation is remarkable. Even in summer, our home feels cool and alive without running AC all day.",
    name: "Surekha Joshi",
    location: "Vayu Greens, Baner",
    year: "2022",
  },
  {
    quote: "Five years on, the building looks exactly as it did at handover. That speaks to the quality of materials and the honesty of the developer.",
    name: "Amol Khandagale",
    location: "Vayu Greens, Baner",
    year: "2019",
  },
];

const REASONS = [
  {
    title: "No Compromise on Materials",
    body: "Every specification is locked before construction begins — and it stays locked. What's on paper is what you walk into.",
  },
  {
    title: "On-Time Delivery Record",
    body: "In a sector notorious for delays, we've delivered every project within 90 days of commitment. We treat your possession date as a contract.",
  },
  {
    title: "Post-Possession Commitment",
    body: "Our relationship doesn't end at handover. Dedicated maintenance, swift response, and a community that's looked after — for years, not months.",
  },
  {
    title: "Design Integrity",
    body: "We engage architects who build fewer projects and think more carefully. No copy-paste floor plans — every project is site-specific.",
  },
];

function ReasonCard({ r, index }: { r: typeof REASONS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-9 lg:p-11 transition-all duration-500 overflow-hidden"
      style={{
        background: "#F5F0E8",
        border: "1px solid rgba(28,43,30,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(28,43,30,0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#F5F0E8";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Expanding gold bar */}
      <div
        className="w-8 h-px mb-7 group-hover:w-14 transition-all duration-500"
        style={{
          background: "linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.3))",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <h3
        className="text-xl font-medium text-[#1C2B1E] mb-3 leading-snug"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {r.title}
      </h3>

      <p
        className="text-[#2C2C2C]/58 text-sm leading-[1.85]"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {r.body}
      </p>
    </motion.div>
  );
}

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col p-8 lg:p-9 transition-all duration-500"
      style={{
        background: "#FFFFFF",
        borderTop: "2px solid #C9A84C",
        borderRadius: "2px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px rgba(28,43,30,0.12), 0 0 0 1px rgba(201,168,76,0.15)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {/* Decorative quote mark */}
      <span
        className="text-6xl font-serif leading-none mb-5 block"
        style={{ color: "#C9A84C", opacity: 0.22, fontFamily: "var(--font-playfair)", lineHeight: 1 }}
      >
        "
      </span>

      <p
        className="text-[#1C2B1E]/68 text-base leading-[1.9] mb-8 italic flex-1"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {t.quote}
      </p>

      <div style={{ borderTop: "1px solid rgba(28,43,30,0.08)", paddingTop: "1.25rem" }}>
        <p
          className="text-[#1C2B1E] text-sm font-medium"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {t.name}
        </p>
        <p
          className="text-[10px] tracking-[0.18em] uppercase mt-1"
          style={{ color: "#8B7355", fontFamily: "var(--font-jakarta)" }}
        >
          {t.location}
        </p>
        <p
          className="text-[10px] mt-0.5"
          style={{ color: "rgba(28,43,30,0.22)", fontFamily: "var(--font-jakarta)" }}
        >
          {t.year}
        </p>
      </div>
    </motion.div>
  );
}

export default function Legacy() {
  const whyRef    = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: false, margin: "-80px" });
  const testRef    = useRef<HTMLDivElement>(null);
  const testInView = useInView(testRef, { once: false, margin: "-80px" });

  return (
    <section id="legacy" className="py-28 lg:py-36 overflow-hidden" style={{ background: "#F5F0E8" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Why us ── */}
        <div className="mb-28 lg:mb-36">
          <motion.div
            ref={whyRef}
            initial={{ opacity: 0, y: 28 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <p
              className="text-[10px] tracking-[0.38em] uppercase mb-5"
              style={{ color: "#8B7355", fontFamily: "var(--font-jakarta)" }}
            >
              The 5 Elements Difference
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-[#1C2B1E] leading-[1.08]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Excellence isn't a promise.
              <br />
              <span className="italic" style={{ color: "#8B7355" }}>It's a record.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(28,43,30,0.08)" }}>
            {REASONS.map((r, i) => (
              <ReasonCard key={i} r={r} index={i} />
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div>
          <motion.div
            ref={testRef}
            initial={{ opacity: 0, y: 28 }}
            animate={testInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <p
              className="text-[10px] tracking-[0.38em] uppercase mb-5"
              style={{ color: "#8B7355", fontFamily: "var(--font-jakarta)" }}
            >
              Resident Voices
            </p>
            <h2
              className="text-4xl lg:text-5xl font-light text-[#1C2B1E] leading-[1.12]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              From the people who call
              <br />
              <span className="italic">our spaces home.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}