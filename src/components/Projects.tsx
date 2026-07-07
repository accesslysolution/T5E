"use client";
import { useRef } from "react";
import Link from "next/link";
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
    statusColor: "#C9A84C",
    units: "2 & 3 BHK",
    highlight: "Sweeping cantilevered balconies · Warm timber cladding",
    element: "Prithvi",
    elementSymbol: "⬡",
    elementDesc: "Solid foundations and quality construction — homes built to stand strong for generations.",
    gradient: "linear-gradient(160deg, #2C1F0E 0%, #1C2B1E 100%)",
    accentColor: "#C9A84C",
  },
  {
    id: 2,
    slug: "t5e-apex",
    name: "T5E Apex",
    location: "Pune",
    type: "Twin-Wing Tower",
    status: "Under Development",
    statusColor: "#7AADAA",
    units: "2 & 3 BHK",
    highlight: "Rooftop clubhouse · Sky lounge & lawn",
    element: "Akash",
    elementSymbol: "◻",
    elementDesc: "Room to breathe — well-proportioned homes, sky views and a sense of quiet expanse.",
    gradient: "linear-gradient(160deg, #1A1E2E 0%, #1C2B1E 100%)",
    accentColor: "#9B8FA6",
  },
  {
    id: 3,
    slug: "the-element",
    name: "The Element",
    location: "Pune",
    type: "Premium Residences",
    status: "Under Development",
    statusColor: "#5A9E6F",
    units: "2 & 3 BHK",
    highlight: "Backlit jali facade · Indoor games lounge",
    element: "Vayu",
    elementSymbol: "○",
    elementDesc: "Breath and openness — cross-ventilation, generous balconies and fresh, moving air.",
    gradient: "linear-gradient(160deg, #0E1E1A 0%, #1C2B1E 100%)",
    accentColor: "#7AADAA",
  },
  {
    id: 4,
    slug: "siddhivinayak-vishwa",
    name: "Siddhivinayak Vishwa",
    location: "Wagholi, Pune",
    type: "Modern Contemporary",
    status: "Under Development",
    statusColor: "#C9A84C",
    units: "1, 2 & 3 BHK",
    highlight: "Timber-framed balconies · Landscaped stilt",
    element: "Jal",
    elementSymbol: "◈",
    elementDesc: "Serenity and flow — thoughtful water planning, harvesting and calm, restorative spaces.",
    gradient: "linear-gradient(160deg, #1C2B1E 0%, #1A2530 100%)",
    accentColor: "#60A5FA",
  },
];

type Project = typeof PROJECTS[0];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Link href={`/projects/${p.slug}`} className="block">
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...TRANSITION_BASE, delay: index * 0.1 }}
        className="group relative overflow-hidden cursor-pointer flex flex-col"
        style={{ background: p.gradient, minHeight: "500px" }}
      >
        {/* Top accent bar */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, ${p.accentColor}, transparent)`,
            transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Glass sheen on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        <div className="p-7 lg:p-8 flex flex-col h-full">

          {/* Symbol + status */}
          <div className="flex items-start justify-between mb-8">
            <span
              className="text-4xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"
              style={{ color: p.accentColor }}
            >
              {p.elementSymbol}
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: p.statusColor,
                border: `1px solid ${p.statusColor}30`,
                background: `${p.statusColor}10`,
                fontFamily: "var(--font-jakarta)",
              }}
            >
              {p.status}
            </span>
          </div>

          {/* Core info */}
          <div className="flex-1 flex flex-col">
            <h3
              className="text-xl lg:text-2xl font-light text-white leading-snug mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {p.name}
            </h3>
            <p
              className="text-[11px] tracking-widest uppercase mb-2"
              style={{ color: p.accentColor, opacity: 0.75, fontFamily: "var(--font-jakarta)" }}
            >
              {p.element}
            </p>
            <p
              className="text-white/30 text-xs italic mb-5 leading-relaxed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {p.elementDesc}
            </p>
            <p
              className="text-[10px] tracking-[0.15em] uppercase"
              style={{ color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-jakarta)" }}
            >
              {p.location}
            </p>
          </div>

          {/* Stats */}
          <div
            className="mt-6 pt-6 grid grid-cols-2 gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-jakarta)" }}>Config</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-jakarta)" }}>{p.units}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-jakarta)" }}>Type</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-jakarta)" }}>{p.type}</p>
            </div>
          </div>

          {/* Highlight strip */}
          <div
            className="mt-5 px-4 py-3 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.accentColor}25`,
              borderLeft: `2px solid ${p.accentColor}`,
            }}
          >
            <p className="text-[10px] italic" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-playfair)" }}>
              {p.highlight}
            </p>
          </div>

          {/* CTA row */}
          <div className="mt-6 flex items-center justify-between">
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-jakarta)", transition: "color 0.3s ease" }}
            >
              View Details
            </span>
            <span
              className="text-base group-hover:translate-x-1 transition-transform duration-300 inline-block"
              style={{ color: p.accentColor, opacity: 0.5 }}
            >
              {"→"}
            </span>
          </div>

        </div>
      </motion.article>
    </Link>
  );
}

function ViewAllLink() {
  return (
    <Link
      href="/projects"
      className="self-start lg:self-auto flex items-center gap-2"
      style={{
        color: "#C9A84C",
        fontSize: "11px",
        letterSpacing: "0.2em",
        textTransform: "uppercase" as const,
        paddingBottom: "4px",
        borderBottom: "1px solid rgba(201,168,76,0.35)",
        fontFamily: "var(--font-jakarta)",
        transition: "border-color 0.4s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "#C9A84C"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "rgba(201,168,76,0.35)"; }}
    >
      <span>View all projects</span>
      <span style={{ display: "inline-block", marginLeft: "6px" }}>{"→"}</span>
    </Link>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="py-28 lg:py-36 overflow-hidden" style={{ background: "#1C2B1E" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...TRANSITION_BASE }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div>
            <p className="text-[10px] tracking-[0.38em] uppercase mb-5" style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-jakarta)" }}>
              Our Portfolio
            </p>
            <h2 className="text-5xl lg:text-6xl font-light text-white leading-[1.08]" style={{ fontFamily: "var(--font-playfair)" }}>
              Crafted spaces,{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                lasting legacies.
              </span>
            </h2>
          </div>
          <ViewAllLink />
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}