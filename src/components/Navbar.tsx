"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Height of the fixed header (h-20), plus a little breathing room, so an
   anchored section never lands underneath the bar. */
const HEADER_OFFSET = 96;

/* How long to keep waiting for a section to appear after navigating home. */
const SCROLL_WAIT_MS = 4000;

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Environment", href: "/environment" },
  { label: "Legacy", href: "/#legacy" },
  { label: "Contact", href: "/#contact" },
] as const;

/* Section ids the in-page links point at, in document order. */
const SECTION_IDS = LINKS.filter((l) => l.href.startsWith("/#")).map((l) =>
  l.href.slice(2)
);

/* -------------------------------------------------------------------------- */
/*  useActiveSection                                                           */
/*  Watches the in-page sections and reports whichever one owns the middle     */
/*  band of the viewport. Only runs on the home page, where those anchors      */
/*  actually resolve.                                                          */
/* -------------------------------------------------------------------------- */

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!elements.length) return;

    const visible = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (!visible.size) {
          setActive(null);
          return;
        }

        // Whichever tracked section currently covers the most of the band.
        const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(topId);
      },
      {
        // Narrow band through the middle of the screen, so a section only
        // counts as "active" once it's genuinely what you're looking at.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);

  return active;
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const prefersReducedMotion = useReducedMotion();

  /* Where we were headed when we left another page. */
  const pendingHash = useRef<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ---- which link is current --------------------------------------------- */

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return isHome && activeSection === null;
      if (href.startsWith("/#"))
        return isHome && activeSection === href.slice(2);
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, isHome, activeSection]
  );

  /* ---- scroll to an in-page section --------------------------------------- */

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;

      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      return true;
    },
    [prefersReducedMotion]
  );

  /* ---- in-page links: go home first when we're elsewhere -------------------
     A bare <Link href="/#projects"> from another route asks Next to change the
     route and resolve the hash in one step — but #projects doesn't exist in
     the DOM yet when the scroll fires, so you land at the top of the home
     page. Instead: remember the target, push "/", then scroll once the
     section actually appears. */

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return; // a real route — let Next handle it

      // Leave modifier clicks alone (open in new tab, etc).
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      e.preventDefault();
      const id = href.slice(2);
      const wasOpen = menuOpen;
      setMenuOpen(false);

      if (isHome) {
        // The mobile menu locks body scroll; wait for that to unwind or the
        // scroll silently does nothing.
        window.setTimeout(
          () => {
            scrollToId(id);
            window.history.replaceState(null, "", href);
          },
          wasOpen ? 80 : 0
        );
        return;
      }

      pendingHash.current = id;
      router.push("/");
    },
    [isHome, menuOpen, router, scrollToId]
  );

  /* ---- finish a deferred jump once the home page has rendered ------------- */

  useEffect(() => {
    if (pathname !== "/" || !pendingHash.current) return;

    const id = pendingHash.current;
    const started = performance.now();
    let raf = 0;
    const corrections: number[] = [];

    const attempt = () => {
      if (scrollToId(id)) {
        pendingHash.current = null;
        window.history.replaceState(null, "", `/#${id}`);

        // The hero video and images settle after first paint and shift
        // everything below them, so re-measure a couple of times.
        corrections.push(
          window.setTimeout(() => scrollToId(id), 300),
          window.setTimeout(() => scrollToId(id), 800)
        );
        return;
      }

      if (performance.now() - started < SCROLL_WAIT_MS) {
        raf = requestAnimationFrame(attempt);
      } else {
        pendingHash.current = null;
      }
    };

    raf = requestAnimationFrame(attempt);

    return () => {
      cancelAnimationFrame(raf);
      corrections.forEach(window.clearTimeout);
    };
  }, [pathname, scrollToId]);

  /* ---- close the menu on navigation --------------------------------------- */

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ---- lock scroll without shifting the fixed bar ------------------------- */

  useEffect(() => {
    if (!menuOpen) return;

    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1C2B1E]/95 backdrop-blur-xl shadow-lg border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-10 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c] focus-visible:outline-offset-4"
          >
            <motion.div
              className="relative w-11 h-11 flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Image
                src="/logo.avif"
                alt="The 5 Elements"
                fill
                sizes="44px"
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

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-3"
            aria-label="Primary"
          >
            {LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={isActive(l.href)}
                onNavigate={handleNav}
              />
            ))}

            <motion.div
              className="ml-3"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/#contact"
                onClick={(e) => handleNav(e, "/#contact")}
                className="relative px-7 py-2.5 text-[10px] tracking-[0.2em] uppercase font-bold text-[#1C2B1E] overflow-hidden group rounded-full inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                }}
              >
                <span className="relative z-10 drop-shadow-sm">Enquire</span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)",
                  }}
                />
              </Link>
            </motion.div>
          </nav>

          {/* Burger */}
          <motion.button
            type="button"
            className="md:hidden relative z-50 p-2 flex flex-col justify-center items-center gap-1.5 w-12 h-12"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-[#c9a84c] origin-center"
              animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#c9a84c] self-end"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-[#c9a84c] origin-center"
              animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </motion.button>
        </div>

        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #c9a84c, #e2c97e, #c9a84c)",
            boxShadow: "0 0 10px rgba(201,168,76,0.5)",
          }}
          aria-hidden="true"
        />
      </motion.header>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center px-8 bg-[#1C2B1E] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div
              className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none translate-x-1/3"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <nav className="flex flex-col z-10 mt-12" aria-label="Mobile">
              {LINKS.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 + i * 0.06,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => {
                        handleNav(e, l.href);
                        setMenuOpen(false);
                      }}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center gap-4 py-4 border-b border-white/10"
                    >
                      <span
                        className={`text-sm transition-opacity duration-300 ${
                          active
                            ? "text-[#e0c274] opacity-100"
                            : "text-[#c9a84c] opacity-0 group-hover:opacity-70"
                        }`}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                      <span
                        className={`text-3xl font-light tracking-wide transition-all duration-300 ${
                          active
                            ? "text-white pl-1"
                            : "text-white/70 group-hover:text-white group-hover:pl-2"
                        }`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {l.label}
                      </span>
                      <span
                        className={`ml-auto text-xl transition-opacity duration-300 ${
                          active
                            ? "text-[#e0c274] opacity-100"
                            : "text-[#c9a84c] opacity-0 group-hover:opacity-100"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
              className="mt-12 z-10"
            >
              <Link
                href="/#contact"
                onClick={(e) => {
                  handleNav(e, "/#contact");
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-5 rounded-full text-[12px] tracking-[0.25em] uppercase font-bold text-[#1C2B1E]"
                style={{
                  background:
                    "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
                }}
              >
                Enquire Now
              </Link>
            </motion.div>

            <motion.p
              className="mt-8 text-[10px] text-center tracking-[0.25em] uppercase text-white/30 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Real Estate · Pune · Est. 2010
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  NavLink                                                                    */
/* -------------------------------------------------------------------------- */

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onNavigate(e, href)}
      aria-current={active ? "page" : undefined}
      className={`relative group px-3 py-2 text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c] focus-visible:outline-offset-2 ${
        active ? "text-white" : "text-white/65 hover:text-white"
      }`}
    >
      {label}

      {/* Hover underline — grows from the centre. */}
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
        aria-hidden="true"
      />

      {/* Active marker — a shared layoutId lets it slide between links
          instead of blinking out and back in. */}
      {active && (
        <motion.span
          layoutId="nav-active"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #e0c274, transparent)",
            boxShadow: "0 0 12px rgba(201,168,76,0.6)",
          }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}