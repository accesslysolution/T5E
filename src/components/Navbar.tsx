"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Projects", href: "/#projects" },
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Environment", href: "/environment" }, // Separate page route
    { label: "Legacy", href: "/#legacy" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1C2B1E]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.avif" 
              alt="The 5 Elements Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-playfair text-xl tracking-wide text-white block">
              The 5 Elements
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.25em] text-[#C9A84C] uppercase font-light -mt-0.5">
              Real Estate · Pune
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs lg:text-sm tracking-widest uppercase text-white/70 hover:text-[#C9A84C] transition-colors duration-300 whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="ml-2 lg:ml-4 px-5 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs lg:text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#1C2B1E] transition-all duration-300"
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#1C2B1E] transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-screen py-6" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-white/70 hover:text-[#C9A84C] transition-colors py-2 border-b border-white/10"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-widest uppercase text-center"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}