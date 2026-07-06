"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const ELEMENTS = [
  { name: "Earth", symbol: "⬡", sub: "Prithvi", description: "Grounded foundations" },
  { name: "Water", symbol: "◈", sub: "Jal", description: "Fluid spaces" },
  { name: "Fire", symbol: "△", sub: "Agni", description: "Vibrant energy" },
  { name: "Air", symbol: "○", sub: "Vayu", description: "Open breathing" },
  { name: "Space", symbol: "◻", sub: "Akash", description: "Infinite possibility" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      el.style.setProperty("--rx", `${y}deg`);
      el.style.setProperty("--ry", `${x}deg`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1C2B1E]"
      style={{ perspective: "1200px" }}
    >
      {/* Background texture grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

      {/* 5 Elements indicator */}
      <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
        {ELEMENTS.map((el) => (
          <div key={el.name} className="group relative flex flex-col items-center gap-1">
            <div className="w-px h-5 bg-white/10" />
            <div className="relative">
              <span className="writing-mode-vertical text-[#C9A84C]/40 text-xs font-light tracking-[0.3em] uppercase hidden lg:block">
                {el.name}
              </span>
              <span className="lg:hidden text-[#C9A84C]/30 text-[10px]">{el.symbol}</span>
            </div>
          </div>
        ))}
        <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* Left accent line */}
      <div className="absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9A84C]/40" />
        <span className="writing-mode-vertical text-[#C9A84C]/30 text-[9px] tracking-[0.4em] uppercase">
          Established · Pune · MMXX
        </span>
        <div className="w-px h-24 bg-gradient-to-t from-transparent to-[#C9A84C]/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-[#C9A84C]/50" />
          <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase font-light">
            Where Elements Meet Excellence
          </span>
          <div className="h-px w-16 bg-[#C9A84C]/50" />
        </div>

        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight mb-6">
          Homes Shaped
          <br />
          <span className="text-[#C9A84C] italic">By Nature</span>
          <br />
          <span className="text-white/60 text-4xl sm:text-5xl lg:text-6xl">Defined By You</span>
        </h1>

        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-12 font-light">
          Premium residences in Pune crafted around the five elements of nature —
          each space a conversation between Earth, Water, Fire, Air, and Space.
        </p>

        {/* Five element pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ELEMENTS.map((el) => (
            <div
              key={el.name}
              className="px-4 py-2 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-500 group cursor-default"
            >
              <span className="text-[#C9A84C]/50 text-xs mr-2 group-hover:text-[#C9A84C] transition-colors">
                {el.symbol}
              </span>
              <span className="text-white/40 text-xs tracking-wider uppercase group-hover:text-white/70 transition-colors">
                {el.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#projects"
            className="px-8 py-4 bg-[#C9A84C] text-[#1C2B1E] text-sm tracking-widest uppercase font-medium hover:bg-[#E0BC6A] transition-colors duration-300"
          >
            View Projects
          </Link>
          <Link
            href="/#philosophy"
            className="px-8 py-4 border border-white/20 text-white/70 text-sm tracking-widest uppercase hover:border-white/50 hover:text-white transition-all duration-300"
          >
            Our Philosophy
          </Link>
        </div>
      </div>
    </section>
  );
}