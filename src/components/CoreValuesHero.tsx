"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLIDE_DURATION = 5000;

const ELEMENTS = [
  {
    number: "01",
    name: "Prithvi",
    english: "Earth",
    symbol: "⬡",
    color: "#8B7355",
    image: "/img/Prithvi.avif",
    headline: "structural, not stated.",
    line: "Every foundation we lay honours the land. Material grade, structural integrity and site sensitivity are locked before the first pour — and they stay locked.",
  },
  {
    number: "02",
    name: "Jal",
    english: "Water",
    symbol: "◈",
    color: "#3B82F6",
    image: "/img/Jal.avif",
    headline: "planned, not patched.",
    line: "Water is designed into the blueprint, not retrofitted around it. Harvesting, drainage and restorative water courts are drawn on day one.",
  },
  {
    number: "03",
    name: "Agni",
    english: "Fire",
    symbol: "△",
    color: "#C9A84C",
    image: "/img/Agni.avif",
    headline: "oriented, not accidental.",
    line: "Light and warmth follow from orientation, not fixtures. Every wing is turned to the sun before a single window is placed.",
  },
  {
    number: "04",
    name: "Vayu",
    english: "Air",
    symbol: "○",
    color: "#10B981",
    image: "/img/Vayu.avif",
    headline: "engineered, not assumed.",
    line: "Cross-ventilation is modelled floor by floor. Every home is designed to breathe on its own before the air conditioning is switched on.",
  },
  {
    number: "05",
    name: "Akash",
    english: "Space",
    symbol: "◻",
    color: "#8B5CF6",
    image: "/img/Akash.avif",
    headline: "given, not sold back.",
    line: "Ceiling height, column-free spans and acoustic separation are non-negotiables — the quiet expanse you notice long after the brochure is gone.",
  },
];

export default function CoreValuesHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const el = ELEMENTS[active];

  const goTo = useCallback((idx: number) => {
    setActive(((idx % ELEMENTS.length) + ELEMENTS.length) % ELEMENTS.length);
  }, []);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (paused) return;

    // Respect reduced-motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % ELEMENTS.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, active]);

  return (
    <section className="relative pt-32 lg:pt-36 pb-16 lg:pb-20 px-6 lg:px-12 overflow-hidden">
      {/* ── Ambient glow — shifts with the active element ── */}
      <div
        className="absolute top-10 right-0 w-[45rem] h-[35rem] rounded-full blur-[130px] pointer-events-none transition-colors duration-1000 ease-out"
        style={{ backgroundColor: `${el.color}1f` }}
      />
      <div className="absolute top-20 left-0 w-[30rem] h-[30rem] bg-[#c9a84c]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,43,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,43,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================
              LEFT — Text column (5 cols)
             ========================================================= */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#c9a84c]" />
                <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
                  What We Build On
                </p>
              </div>

              {/* Static first line + rotating second line */}
              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] text-[#1c2b1e]">
                Our core values are{" "}
                <span className="block mt-1 min-h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={el.number}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent inline-block"
                    >
                      {el.headline}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </motion.div>

            {/* Rotating element label + copy */}
            <div className="mt-8 min-h-[190px] sm:min-h-[170px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={el.number}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-5 font-jakarta"
                    style={{
                      color: el.color,
                      backgroundColor: `${el.color}14`,
                      border: `1px solid ${el.color}38`,
                    }}
                  >
                    <span className="text-sm leading-none">{el.symbol}</span>
                    <span>
                      {el.number} · {el.name} ({el.english})
                    </span>
                  </div>

                  <p className="text-[#1c2b1e]/75 text-base lg:text-[1.05rem] leading-relaxed max-w-md">
                    {el.line}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Progress rail ── */}
            <div className="mt-8 flex items-center gap-2.5">
              {ELEMENTS.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={item.number}
                    onClick={() => goTo(idx)}
                    aria-label={`Show ${item.name}`}
                    className="group relative h-[3px] rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                    style={{
                      width: isActive ? 56 : 24,
                      backgroundColor: "rgba(28,43,30,0.15)",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        key={`fill-${active}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "100%" : "100%" }}
                        transition={{
                          duration: paused ? 0.3 : SLIDE_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                );
              })}

              <span className="ml-2 text-[10px] font-mono text-[#1c2b1e]/35 tabular-nums">
                {el.number} / 05
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT — Image carousel (7 cols)
             ========================================================= */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/70 shadow-[0_30px_80px_rgba(28,43,30,0.2)] bg-[#1c2b1e]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={el.number}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={el.image}
                    alt={`${el.name} — ${el.english}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority={active === 0}
                    className="object-cover"
                  />

                  {/* Readability scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15" />

                  {/* Element colour wash */}
                  <div
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{ backgroundColor: el.color, opacity: 0.3 }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Corner symbol badge */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/25">
                <span className="text-xl leading-none" style={{ color: el.color }}>
                  {el.symbol}
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 font-jakarta">
                  {el.english}
                </span>
              </div>

              {/* Bottom caption bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cap-${el.number}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-end justify-between gap-4"
                  >
                    <div>
                      <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-none">
                        {el.name}
                      </h2>
                      <p className="mt-1.5 text-[10px] tracking-[0.25em] uppercase font-bold text-white/70 font-jakarta">
                        Element {el.number} of 05
                      </p>
                    </div>

                    <span className="hidden sm:block font-playfair text-6xl font-bold text-white/15 leading-none select-none">
                      {el.number}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Thumbnail strip ── */}
            <div className="mt-4 grid grid-cols-5 gap-2.5 sm:gap-3">
              {ELEMENTS.map((item, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={item.number}
                    onClick={() => goTo(idx)}
                    aria-label={`Show ${item.name}`}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "border-white shadow-lg scale-[1.03]"
                        : "border-white/40 hover:border-white/80 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="120px"
                      className={`object-cover transition-all duration-500 ${
                        isActive ? "grayscale-0" : "grayscale-[70%]"
                      }`}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        backgroundColor: item.color,
                        opacity: isActive ? 0.12 : 0.3,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] text-white">
                      {item.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}