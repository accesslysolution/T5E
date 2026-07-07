"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TRANSITION_BASE: Transition = {
  duration: 0.9,
  ease: EASE,
};

const ELEMENTS = [
  { name: "Earth", symbol: "⬡", sub: "Prithvi" },
  { name: "Water", symbol: "◈", sub: "Jal" },
  { name: "Fire",  symbol: "△", sub: "Agni" },
  { name: "Air",   symbol: "○", sub: "Vayu" },
  { name: "Space", symbol: "◻", sub: "Akash" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      el.style.setProperty("--rx", `${y}deg`);
      el.style.setProperty("--ry", `${x}deg`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24"
      style={{ perspective: "1200px" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/chaitanya-1.jpeg"
          alt="T5E Luxury Architecture"
          fill
          priority
          className="object-cover object-center scale-105"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#1C2B1E]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2B1E]/60 via-transparent to-[#1C2B1E]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(28,43,30,0.55)_100%)]" />
      </div>

      {/* ── Floating decorative lines ── */}
      <motion.div
        className="absolute top-1/4 left-8 w-px h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.5), transparent)" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-8 w-px h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)" }}
        animate={{ opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_BASE, delay: 0.1 }}
          className="mb-10 flex items-center justify-center gap-5"
        >
          <div
            className="h-px w-14"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7))" }}
          />
          <span
            className="text-[#C9A84C] text-[10px] tracking-[0.38em] uppercase font-light"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            T5E · The Five Elements · Pune
          </span>
          <div
            className="h-px w-14"
            style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.7), transparent)" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_BASE, delay: 0.25 }}
          className="mb-10 leading-[1.08] tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] font-light text-white">
            Homes built on
          </span>
          <span
            className="block text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold italic"
            style={{
              background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 45%, #a8852f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            the five elements
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl font-light text-white/55 mt-2">
            of life.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_BASE, delay: 0.42 }}
          className="text-white/55 text-base lg:text-lg max-w-[480px] mx-auto leading-[1.85] mb-14 font-light"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          T5E draws its name from the Pancha Mahabhoota — earth, water, fire, air and space.
          We craft a limited collection of quality-first residences where those elements shape every home.
        </motion.p>

        {/* Element pills */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_BASE, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-2.5 mb-14"
        >
          {ELEMENTS.map((el) => (
            <div
              key={el.name}
              className="group flex items-center gap-2.5 px-5 py-2.5 cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                backdropFilter: "blur(12px)",
                transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.10)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.40)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              <span
                className="text-xs"
                style={{
                  color: "rgba(201,168,76,0.6)",
                  transition: "color 0.4s ease",
                }}
              >
                {el.symbol}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-jakarta)",
                  transition: "color 0.4s ease",
                }}
              >
                {el.sub}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...TRANSITION_BASE, delay: 0.68 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/#projects"
            className="group relative px-9 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#1C2B1E] rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
              boxShadow: "0 8px 32px rgba(201,168,76,0.38)",
              transition: "box-shadow 0.4s ease, transform 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(201,168,76,0.55)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.38)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
              }}
            />
            <span className="relative">Explore Projects</span>
          </Link>

          <Link
            href="/#philosophy"
            className="px-9 py-4 text-[11px] tracking-[0.2em] uppercase font-light rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.75)",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.50)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.20)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Our Philosophy
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase text-white/25"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
      </motion.div>
    </section>
  );
}