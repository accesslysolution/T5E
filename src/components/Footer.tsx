"use client";

import Link from "next/link";
import Image from "next/image";
import { useSectionNav } from "./useSectionNav";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Environment", href: "/environment" },
  { label: "Legacy", href: "/#legacy" },
  { label: "Contact", href: "/#contact" },
] as const;

const ELEMENTS = [
  { symbol: "⬡", name: "Earth" },
  { symbol: "◈", name: "Water" },
  { symbol: "△", name: "Fire" },
  { symbol: "○", name: "Air" },
  { symbol: "◻", name: "Space" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const { handleNav } = useSectionNav();

  return (
    <footer className="relative overflow-hidden" style={{ background: "#0d1710" }}>
      {/* ── Top gold divider ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(226,201,126,0.8) 50%, rgba(201,168,76,0.5) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Ambient radial glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* ── Brand ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div
                className="relative w-9 h-9 transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.3))" }}
              >
                <Image
                  src="/logo.avif"
                  alt="The 5 Elements"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span
                className="text-lg font-light text-white/85 group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The 5 Elements
              </span>
            </Link>

            <p className="text-[9px] tracking-[0.3em] text-[#c9a84c]/75 uppercase">
              Real Estate · Pune
            </p>

            <p
              className="text-white/45 text-sm leading-relaxed max-w-[260px]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Where the five elements of nature inspire every space we craft.
            </p>

            <div
              className="h-px w-12"
              style={{
                background:
                  "linear-gradient(90deg, rgba(201,168,76,0.6), transparent)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── Navigate ── */}
          <nav className="lg:col-span-4 lg:col-start-6" aria-label="Footer">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#c9a84c]/70 mb-6">
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="group flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/55 hover:text-[#e0c274] transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c] focus-visible:outline-offset-2"
                >
                  <span
                    className="w-0 group-hover:w-2 h-px bg-[#c9a84c] transition-all duration-300"
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* ── Compliance ── */}
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-3 lg:text-right">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#c9a84c]/70 mb-3">
              Compliance
            </p>
            <div
              className="inline-flex lg:justify-end items-center gap-2 px-3 py-2 rounded-md w-fit lg:ml-auto"
              style={{
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <span className="text-[#c9a84c]/85 text-[8px] tracking-wider uppercase">
                MahaRERA
              </span>
              <span className="text-white/60 text-[8px] font-mono">
                A52100029799
              </span>
            </div>
            <p className="text-white/40 text-[10px] leading-relaxed mt-2">
              © {year} The 5 Elements.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>

        {/* ── Elements + disclaimer ── */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <ul className="flex items-center gap-5">
            {ELEMENTS.map((el) => (
              <li key={el.name} className="group flex flex-col items-center gap-1">
                <span
                  className="text-base text-[#c9a84c]/35 group-hover:text-[#c9a84c]/90 group-hover:scale-125 transition-[color,transform] duration-500"
                  aria-hidden="true"
                >
                  {el.symbol}
                </span>
                <span className="text-[7px] tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  {el.name}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-white/35 text-[9px] max-w-xs sm:text-right leading-relaxed">
            All property details, plans, and specifications are indicative and
            subject to change. Buyers are advised to conduct independent due
            diligence before purchase.
          </p>
        </div>

        {/* ── Credit ── */}
        <div
          className="mt-8 pt-6 flex justify-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[9px] tracking-[0.22em] uppercase text-white/30">
            Website by{" "}
            <a
              href="https://lupaentertainment.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c]/80 hover:text-[#e0c274] underline-offset-4 hover:underline transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c] focus-visible:outline-offset-2"
            >
              Lupa Entertainment
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}