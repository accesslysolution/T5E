"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const links = [
  { label: "About",       href: "/about" },
  { label: "Projects",    href: "/#projects" },
  { label: "Philosophy",  href: "/#philosophy" },
  { label: "Environment", href: "/environment" },
  { label: "Legacy",      href: "/#legacy" },
  { label: "Contact",     href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* ── Smooth Scroll Progress for Gold Bottom Border ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main header ── */}
      <motion.header
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1C2B1E]/95 backdrop-blur-xl shadow-lg border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <motion.div
              className="relative w-11 h-11 flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Image
                src="/logo.avif"
                alt="The 5 Elements Logo"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.3)]"
                priority
              />
            </motion.div>

            <div className="flex flex-col justify-center">
              <span
                className="text-xl md:text-2xl tracking-wide text-white leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The 5 Elements
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.3em] text-[#c9a84c] uppercase font-medium mt-1">
                Real Estate · Pune
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {links.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} />
            ))}

            {/* Enquire CTA */}
            <motion.div
              className="ml-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/#contact"
                className="relative px-7 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold text-[#1C2B1E] overflow-hidden group rounded-full inline-block"
                style={{
                  background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                }}
              >
                <span className="relative z-10 drop-shadow-sm">Enquire</span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                  }}
                />
              </Link>
            </motion.div>
          </nav>

          {/* ── Mobile burger ── */}
          <motion.button
            className="md:hidden relative z-50 p-2 flex flex-col justify-center items-center gap-1.5 w-12 h-12"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-[#c9a84c] origin-center"
              animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#c9a84c] self-end"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-[#c9a84c] origin-center"
              animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>
        </div>

        {/* ── Animated Scroll Progress Bottom Border ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #c9a84c, #e2c97e, #c9a84c)",
            boxShadow: "0 0 10px rgba(201,168,76,0.5)"
          }}
        />
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-[#1C2B1E]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-0 z-40 flex flex-col justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative gold orb */}
              <div
                className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none translate-x-1/3"
                style={{
                  background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
                }}
              />

              {/* Nav links with stagger */}
              <nav className="flex flex-col gap-2 z-10 mt-12">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 py-4 border-b border-white/10"
                    >
                      {/* Gold tick on hover */}
                      <motion.span
                        className="text-[#c9a84c] text-sm"
                        initial={{ opacity: 0, width: 0 }}
                        whileHover={{ opacity: 1, width: "auto" }}
                      >
                        ✦
                      </motion.span>
                      <span
                        className="text-3xl font-light text-white/80 group-hover:text-white group-hover:pl-2 transition-all duration-300 tracking-wide"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {l.label}
                      </span>
                      <span className="ml-auto text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 z-10"
              >
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex items-center justify-center gap-2
                    w-full py-5 rounded-full
                    text-[12px] tracking-[0.25em] uppercase font-bold text-[#1C2B1E]
                  "
                  style={{
                    background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                    boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
                  }}
                >
                  Enquire Now
                </Link>
              </motion.div>

              {/* Bottom meta */}
              <motion.p
                className="mt-8 text-[10px] text-center tracking-[0.25em] uppercase text-white/30 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                Real Estate · Pune · Est. 2010
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop nav link with animated underline ── */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative group px-3 py-2 text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap"
    >
      {label}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </Link>
  );
}