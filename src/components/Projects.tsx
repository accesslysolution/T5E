"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, type Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TRANSITION_BASE: Transition = { duration: 0.75, ease: EASE };

const PROJECTS = [
  {
    id: 1,
    slug: "siddhivinayak-chaitanya",
    name: "Siddhivinayak Chaitanya",
    location: "NIBM Road, Pune",
    type: "Boutique / Low-density",
    status: "Under Development",
    statusColor: "#c9a84c", // Brand Gold
    units: "2 & 3 BHK",
    highlight: "Sweeping cantilevered balconies · Warm timber cladding",
    element: "Prithvi",
    elementSymbol: "⛰︎", // Earth / Mountain Symbol
    elementDesc: "Solid foundations and quality construction — homes built to stand strong for generations.",
    image: "/img/chaitanya-1.jpeg",
  },
  {
    id: 2,
    slug: "t5e-apex",
    name: "T5E Apex",
    location: "Pune",
    type: "Twin-Wing Tower",
    status: "Under Development",
    statusColor: "#1c2b1e", // Brand Dark
    units: "2 & 3 BHK",
    highlight: "Rooftop clubhouse · Sky lounge & lawn",
    element: "Akash",
    elementSymbol: "✧", // Space / Cosmic Star Symbol
    elementDesc: "Room to breathe — well-proportioned homes, sky views and a sense of quiet expanse.",
    image: "/img/apex-1.jpeg",
  },
  {
    id: 3,
    slug: "the-element",
    name: "The Element",
    location: "Pune",
    type: "Premium Residences",
    status: "Under Development",
    statusColor: "#1c2b1e",
    units: "2 & 3 BHK",
    highlight: "Backlit jali facade · Indoor games lounge",
    element: "Vayu",
    elementSymbol: "༄", // Air / Wind Gust Symbol
    elementDesc: "Breath and openness — cross-ventilation, generous balconies and fresh, moving air.",
    image: "/img/element-02.jpeg",
  },
  {
    id: 4,
    slug: "siddhivinayak-vishwa",
    name: "Siddhivinayak Vishwa",
    location: "Wagholi, Pune",
    type: "Modern Contemporary",
    status: "Under Development",
    statusColor: "#c9a84c",
    units: "1, 2 & 3 BHK",
    highlight: "Timber-framed balconies · Landscaped stilt",
    element: "Jal",
    elementSymbol: "≋", // Water / Flowing Waves Symbol
    elementDesc: "Serenity and flow — thoughtful water planning, harvesting and calm, restorative spaces.",
    image: "/img/vishwa-1.jpeg",
  },
];

type Project = typeof PROJECTS[0];

function ProjectCard({ p, innerRef }: { p: Project; innerRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    // Sizing Wrapper: 1 card on mobile, 2 on tablet, 3 on desktop
    <div ref={innerRef} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0">
      <Link
        href={`/projects/${p.slug}`}
        className="block relative w-full h-full rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-white/80 shadow-[0_15px_40px_rgba(28,43,30,0.06)] hover:shadow-[0_25px_60px_rgba(201,168,76,0.3)] hover:border-[#c9a84c] hover:ring-4 hover:ring-[#c9a84c]/15 hover:scale-[1.02] transition-all duration-300 overflow-hidden group flex flex-col justify-between"
        style={{ minHeight: "580px" }}
      >
        {/* Top Gold Hover Accent Bar */}
        <div className="h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-[#e2c97e] via-[#c9a84c] to-[#a8852f] transition-all duration-500 ease-out" />

        {/* ── Animated SVG Outline Drawing Effect ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-50">
          <rect
            rx="15"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              x: "1px",
              y: "1px",
            }}
            className="fill-none stroke-[#c9a84c] stroke-[3px] opacity-0 group-hover:opacity-100 [stroke-dasharray:2500] [stroke-dashoffset:2500] group-hover:[stroke-dashoffset:0] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </svg>

        {/* ── Top Project Image Showcase ── */}
        <div className="relative w-full h-56 overflow-hidden bg-[#1c2b1e]/5">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 85vw, 410px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20 opacity-85 pointer-events-none transition-opacity duration-500" />

          {/* Floating Element Symbol Badge with Frosted White Block */}
          <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-white/60 group-hover:border-[#c9a84c]/50 flex items-center justify-center text-[#c9a84c] text-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] pointer-events-none transition-colors duration-300">
            {p.elementSymbol}
          </div>

          {/* Floating Status Badge */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <span
              className="text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full font-jakarta shadow-sm backdrop-blur-md transition-colors"
              style={{
                color: p.statusColor,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: `1px solid ${p.statusColor}40`,
              }}
            >
              {p.status}
            </span>
          </div>
        </div>

        {/* ── Card Body Content ── */}
        <div className="p-6 lg:p-7 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[#1c2b1e] leading-snug mb-1 font-playfair group-hover:text-[#c9a84c] transition-colors duration-300">
              {p.name}
            </h3>
            <p className="text-[11px] tracking-widest uppercase text-[#c9a84c] font-bold mb-2 font-jakarta">
              {p.element}
            </p>
            <p className="text-[#1c2b1e]/70 text-xs italic mb-4 leading-relaxed font-playfair">
              {p.elementDesc}
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#1c2b1e]/50 font-jakarta mb-3">
              {p.location}
            </p>

            {/* Stats */}
            <div className="py-2.5 grid grid-cols-2 gap-4 border-t border-[#1c2b1e]/10 font-jakarta">
              <div>
                <p className="text-[9px] tracking-widest uppercase text-[#1c2b1e]/40 font-semibold mb-0.5">
                  Config
                </p>
                <p className="text-xs font-bold text-[#1c2b1e]">{p.units}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-widest uppercase text-[#1c2b1e]/40 font-semibold mb-0.5">
                  Type
                </p>
                <p className="text-xs font-bold text-[#1c2b1e] truncate">{p.type}</p>
              </div>
            </div>

            {/* Highlight Strip */}
            <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-[#f8f5ef]/90 border border-[#c9a84c]/20 border-l-[3px] border-l-[#c9a84c]">
              <p className="text-[11px] italic text-[#1c2b1e]/85 font-playfair leading-normal">
                {p.highlight}
              </p>
            </div>

            {/* ── Primary Link Redirect Row ── */}
            <div className="mt-5 pt-2 flex items-center justify-between border-t border-[#1c2b1e]/10">
              <div className="w-full flex items-center justify-between py-1.5 px-3 -mx-3 rounded-lg group-hover:bg-[#c9a84c]/10 transition-colors duration-300">
                <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1c2b1e] font-jakarta group-hover:text-[#c9a84c] transition-colors">
                  Explore Project
                </span>
                <span className="text-xl text-[#c9a84c] group-hover:translate-x-2 transition-transform duration-300 inline-block">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ViewAllLink() {
  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1c2b1e] hover:text-[#c9a84c] pb-1 border-b-2 border-[#c9a84c]/40 hover:border-[#c9a84c] font-jakarta transition-colors duration-300 group"
    >
      <span>View all projects</span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </Link>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  /* ── Dynamic Width & Layout Calculator ── */
  useEffect(() => {
    const updateLayout = () => {
      let visible = 3; // Desktop
      if (window.innerWidth < 640) visible = 1; // Mobile
      else if (window.innerWidth < 1024) visible = 2; // Tablet
      
      setCardsToShow(visible);
      
      if (cardRef.current) {
        // Measure card width + gap (1.5rem = 24px)
        setCardWidth(cardRef.current.offsetWidth + 24);
      }
      
      // Prevent scrolling past empty space on resize
      setActiveIndex((prev) => Math.min(prev, Math.max(0, PROJECTS.length - visible)));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - cardsToShow);

  const handleNext = () => setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const handlePrev = () => setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  /* ── Auto-Slide Timer ── */
  useEffect(() => {
    // Do not set interval if hovered or if there's nowhere to scroll to
    if (isHovered || maxIndex === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [isHovered, maxIndex, activeIndex]); // Resets timer if manually clicked so it doesn't double skip

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 bg-[#f8f5ef] rounded-3xl mx-2 my-2 relative overflow-hidden border border-white/60 shadow-sm"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#1c2b1e]/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...TRANSITION_BASE }}
          className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1c2b1e]/10 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#c9a84c]" />
              <p className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#c9a84c] font-jakarta">
                Our Portfolio
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c2b1e] leading-[1.1] font-playfair">
              Crafted spaces,{" "}
              <span className="italic bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
                lasting legacies.
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <ViewAllLink />
          </div>
        </motion.div>

        {/* ── 2D Linear Carousel Stage ── */}
        <div 
          className="relative w-full py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden px-1 py-4 -my-4 -mx-1">
            <motion.div
              className="flex gap-6"
              animate={{ x: -(activeIndex * cardWidth) }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: -(maxIndex * cardWidth), right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) handleNext();
                else if (info.offset.x > threshold) handlePrev();
              }}
            >
              {PROJECTS.map((p, idx) => (
                <ProjectCard key={p.id} p={p} innerRef={idx === 0 ? cardRef : undefined} />
              ))}
            </motion.div>
          </div>

          {/* ── Navigation Arrows ── */}
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#1c2b1e]/10 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1c2b1e] hover:bg-[#1c2b1e] hover:text-[#c9a84c] transition-colors duration-300 shadow-[0_5px_15px_rgba(28,43,30,0.1)] cursor-pointer"
          >
            ←
          </button>

          <button
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#1c2b1e]/10 bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1c2b1e] hover:bg-[#1c2b1e] hover:text-[#c9a84c] transition-colors duration-300 shadow-[0_5px_15px_rgba(28,43,30,0.1)] cursor-pointer"
          >
            →
          </button>
        </div>

        {/* ── Dynamic Pagination Indicators ── */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-3 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === activeIndex
                    ? "w-10 bg-gradient-to-r from-[#e2c97e] to-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                    : "w-2 bg-[#1c2b1e]/20 hover:bg-[#1c2b1e]/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}