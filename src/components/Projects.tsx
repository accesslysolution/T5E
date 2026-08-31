"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Transition } from "framer-motion";

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
    elementSymbol: "⬡",
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
    elementSymbol: "◻",
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
    elementSymbol: "○",
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
    elementSymbol: "◈",
    elementDesc: "Serenity and flow — thoughtful water planning, harvesting and calm, restorative spaces.",
    image: "/img/vishwa-1.jpeg",
  },
];

type Project = typeof PROJECTS[0];

function ProjectCard({ 
  p, 
  index, 
  activeIndex, 
  total,
  isMobile,
  onClick 
}: { 
  p: Project; 
  index: number; 
  activeIndex: number;
  total: number;
  isMobile: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isActive = index === activeIndex;

  /* ── 3D Spherical Orbit Mathematics ── */
  let offset = (index - (activeIndex % total) + total) % total;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const angleRad = (offset * 2 * Math.PI) / total;

  const radiusX = isMobile ? 220 : 440;   
  const radiusZ = isMobile ? 180 : 260;   
  const orbitWaveY = isMobile ? 15 : 35;  

  const xTarget = Math.sin(angleRad) * radiusX;
  const zTarget = (Math.cos(angleRad) - 1) * radiusZ;
  const yTarget = Math.sin(angleRad) * -orbitWaveY;
  const rotateYTarget = -Math.sin(angleRad) * 32; 
  
  const scaleTarget = 0.65 + 0.35 * ((Math.cos(angleRad) + 1) / 2);
  const opacityTarget = Math.max(0.15, 0.2 + 0.8 * ((Math.cos(angleRad) + 1) / 2));
  const zIndexTarget = Math.round(100 + Math.cos(angleRad) * 50);

  /* ── Interactive 3D Mouse Spherical Tilt (Active Card Only) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const tiltX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    mouseX.set(clientX / width - 0.5);
    mouseY.set(clientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        x: xTarget,
        y: yTarget,
        z: zTarget,
        rotateY: rotateYTarget,
        scale: scaleTarget,
        opacity: opacityTarget,
        zIndex: zIndexTarget,
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: isActive ? tiltX : 0,
        rotateY: isActive ? tiltY : rotateYTarget,
        transformStyle: "preserve-3d",
      }}
      // Added `filter` to the transitions and applied `grayscale` to inactive states
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[370px] lg:max-w-[410px] h-[580px] rounded-2xl bg-white/85 backdrop-blur-xl transition-[box-shadow,border-color,filter] duration-500 flex flex-col justify-between overflow-hidden ${
        isActive 
          ? "cursor-pointer border-[2px] border-[#c9a84c] shadow-[0_20px_60px_rgba(201,168,76,0.25)] ring-4 ring-[#c9a84c]/10 hover:shadow-[0_25px_65px_rgba(201,168,76,0.3)] grayscale-0" 
          : "cursor-pointer pointer-events-auto border border-white/70 shadow-[0_15px_40px_rgba(28,43,30,0.08)] grayscale"
      }`}
    >
      {/* Top Gold Hover Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e2c97e] via-[#c9a84c] to-[#a8852f] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-30 ${
        isActive ? "w-full" : "w-0"
      }`} />

      {/* ── Top Project Image Showcase ── */}
      <div className="relative w-full h-56 overflow-hidden bg-[#1c2b1e]/5" style={{ transform: "translateZ(25px)" }}>
        {isActive ? (
          <Link
            href={`/projects/${p.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full h-full relative group"
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 85vw, 410px"
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-105 group-hover:scale-110"
              priority={index < 2}
            />
          </Link>
        ) : (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 85vw, 410px"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100" // grayscale relies on parent div now
            priority={index < 2}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20 opacity-85 pointer-events-none transition-opacity duration-500" />
        
        {/* Floating Element Symbol Badge over image */}
        <div className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border flex items-center justify-center text-[#c9a84c] text-xl shadow-md pointer-events-none transition-colors duration-500 ${isActive ? 'border-[#c9a84c]/50' : 'border-white'}`}>
          {p.elementSymbol}
        </div>

        {/* Floating Status Badge */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <span
            className="text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full font-jakarta shadow-sm backdrop-blur-md"
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
      <div className="p-6 lg:p-7 flex flex-col flex-1 justify-between z-20" style={{ transform: "translateZ(35px)" }}>
        
        <div>
          <h3 className="text-2xl font-bold text-[#1c2b1e] leading-snug mb-1 font-playfair transition-colors duration-300">
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
              <p className="text-[9px] tracking-widest uppercase text-[#1c2b1e]/40 font-semibold mb-0.5">Config</p>
              <p className="text-xs font-bold text-[#1c2b1e]">{p.units}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest uppercase text-[#1c2b1e]/40 font-semibold mb-0.5">Type</p>
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
          <div className="mt-5 pt-2 flex items-center justify-between border-t border-[#1c2b1e]/10 transition-colors">
            {isActive ? (
              <Link
                href={`/projects/${p.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between group/btn py-1.5 px-3 -mx-3 rounded-lg bg-[#c9a84c]/5 hover:bg-[#c9a84c]/15 transition-all duration-300"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#1c2b1e] font-jakarta group-hover/btn:text-[#c9a84c] transition-colors">
                  Explore Project
                </span>
                <span className="text-xl text-[#c9a84c] group-hover/btn:translate-x-2 transition-transform duration-300 inline-block">
                  →
                </span>
              </Link>
            ) : (
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#1c2b1e]/40 font-jakarta py-1.5">
                Click to orbit to front
              </span>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function ViewAllLink() {
  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#1c2b1e] hover:text-[#c9a84c] pb-1 border-b-2 border-[#c9a84c]/40 hover:border-[#c9a84c] font-jakarta transition-colors duration-300 group"
    >
      <span>View all projects</span>
      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
    </Link>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  /* ── Responsive Screen Check for Orbital Radiuses ── */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Sphere Carousel Navigation Controls ── */
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#f8f5ef] rounded-3xl mx-2 my-2 relative overflow-hidden border border-white/60 shadow-sm">
      
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
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1c2b1e]/10 pb-8"
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

        {/* ── 3D Spherical Stage ── */}
        <div 
          className="relative w-full h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
        >
          {/* ── Left Navigation Arrow ── */}
          <button
            onClick={handlePrev}
            aria-label="Previous project on sphere"
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#1c2b1e]/10 bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1c2b1e] hover:bg-[#1c2b1e] hover:text-[#c9a84c] hover:border-[#1c2b1e] transition-colors duration-300 shadow-[0_5px_15px_rgba(28,43,30,0.1)] cursor-pointer"
          >
            ←
          </button>

          {/* Swipe / Drag gesture detector wrapper */}
          <motion.div
            className="absolute inset-0 w-full h-full z-20"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) {
                handleNext();
              } else if (info.offset.x > threshold) {
                handlePrev();
              }
            }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard 
                key={p.id} 
                p={p} 
                index={i} 
                activeIndex={activeIndex}
                total={PROJECTS.length}
                isMobile={isMobile}
                onClick={() => setActiveIndex(i)} 
              />
            ))}
          </motion.div>

          {/* ── Right Navigation Arrow ── */}
          <button
            onClick={handleNext}
            aria-label="Next project on sphere"
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#1c2b1e]/10 bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1c2b1e] hover:bg-[#1c2b1e] hover:text-[#c9a84c] hover:border-[#1c2b1e] transition-colors duration-300 shadow-[0_5px_15px_rgba(28,43,30,0.1)] cursor-pointer"
          >
            →
          </button>
        </div>

        {/* ── Spherical Pagination Indicators ── */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIndex 
                  ? "w-10 bg-gradient-to-r from-[#e2c97e] to-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.5)]" 
                  : "w-2 bg-[#1c2b1e]/20 hover:bg-[#1c2b1e]/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}