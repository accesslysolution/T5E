"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const ELEMENTS = [
  { name: "Earth", symbol: "⬡", sub: "Prithvi" },
  { name: "Water", symbol: "💧", sub: "Jal" },
  { name: "Fire", symbol: "△", sub: "Agni" },
  { name: "Air", symbol: "○", sub: "Vayu" },
  { name: "Space", symbol: "◻", sub: "Akash" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
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
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/chaitanya-1.jpeg"
          alt="T5E Luxury Architecture"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#1C2B1E]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2B1E]/40 via-transparent to-[#1C2B1E]/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Brand Tagline */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-[#C9A84C]/60" />
          <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-light">
            T5E · The Five Elements · Pune
          </span>
          <div className="h-px w-16 bg-[#C9A84C]/60" />
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight mb-8">
          Homes built on <br />
          <span className="text-[#C9A84C] italic">the five elements</span>
          <br />
          <span className="text-white/70 text-4xl sm:text-5xl lg:text-6xl">of life.</span>
        </h1>

        {/* Description */}
        <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed mb-12 font-light">
          T5E draws its name from the Pancha Mahabhoota — earth, water, fire, air and space. 
          We craft a limited collection of quality-first residences where those elements shape every home.
        </p>

        {/* Element Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ELEMENTS.map((el) => (
            <div
              key={el.name}
              className="px-4 py-2 border border-white/20 hover:border-[#C9A84C]/50 transition-all duration-500 group cursor-default"
            >
              <span className="text-[#C9A84C]/60 text-xs mr-2 group-hover:text-[#C9A84C] transition-colors">
                {el.symbol}
              </span>
              <span className="text-white/50 text-xs tracking-wider uppercase group-hover:text-white/80 transition-colors">
                {el.sub}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#projects"
            className="px-8 py-4 bg-[#C9A84C] text-[#1C2B1E] text-sm tracking-widest uppercase font-medium hover:bg-[#E0BC6A] transition-colors duration-300"
          >
            Explore Projects
          </Link>
          <Link
            href="/#philosophy"
            className="px-8 py-4 border border-white/30 text-white/80 text-sm tracking-widest uppercase hover:border-white/60 hover:text-white transition-all duration-300"
          >
            Our Philosophy
          </Link>
        </div>
      </div>
    </section>
  );
}