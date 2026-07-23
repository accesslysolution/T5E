"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ============================================================================
   ENRICHED DOCUMENT DATA & METRICS
   ============================================================================ */
const DOCUMENTS = [
  {
    id: "post-ec-2025",
    title: "Post EC Compliance Report",
    period: "October 2025 – March 2026",
    authority: "MOEFCC / MPCB Maharashtra",
    status: "Verified & Active",
    statusColor: "#10B981", // Emerald Green
    size: "4.2 MB",
    pages: "48 Pages",
    url: "/compliance-report.pdf",
    description: "Comprehensive bi-annual environmental clearance compliance audit detailing on-site air quality monitoring, noise abatement measures, and groundwater preservation indices.",
  },
  {
    id: "ec-letter-arihant",
    title: "Environmental Clearance (EC) Letter",
    period: "Project Grant Letter",
    authority: "SEIAA Maharashtra",
    status: "Granted & Certified",
    statusColor: "#C9A84C", // Brand Gold
    size: "2.8 MB",
    pages: "14 Pages",
    url: "/ec-letter.pdf",
    description: "Official statutory clearance granted by the State Level Environment Impact Assessment Authority (SEIAA) approving architectural blueprints and sustainable site infrastructure.",
  },
];

const ECO_METRICS = [
  { metric: "100%", label: "Sewage Treatment & Reuse", sub: "Zero discharge into municipal lines" },
  { metric: "65kW", label: "Solar Common Power", sub: "Clean energy for elevators & lighting" },
  { metric: "4,500+", label: "Native Trees Planted", sub: "Preserving local Pune biodiversity" },
  { metric: "Zero", label: "Construction Waste Landfilled", sub: "Strict grading & material recycling" },
];

export default function EnvironmentPage() {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  const activeDoc = DOCUMENTS[activeDocIndex];

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#1c2b1e] pt-32 pb-24 px-6 lg:px-12 font-sans selection:bg-[#c9a84c]/20 selection:text-[#1c2b1e] relative overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[45rem] h-[30rem] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[35rem] h-[35rem] bg-[#c9a84c]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Architectural Grid Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,43,30,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,43,30,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =====================================================================
            1. HERO HEADER: Environmental Stewardship
           ===================================================================== */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1c2b1e]/10 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#10B981]" />
              <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#10B981] font-jakarta">
                Statutory Transparency // RERA Compliant
              </p>
            </div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#1c2b1e] leading-[1.05]">
              Environmental <br />
              <span className="italic font-light bg-gradient-to-r from-[#10B981] via-[#c9a84c] to-[#a8852f] bg-clip-text text-transparent">
                Compliance Vault.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end justify-end">
            <p className="text-[#1c2b1e]/70 text-sm md:text-base max-w-sm leading-relaxed mb-4 md:text-right">
              We believe legal transparency is the fifth element of luxury. Access our verified Ministry of Environment filings and bi-annual audit reports below.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#1c2b1e]/10 shadow-sm text-xs font-bold text-[#1c2b1e]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>All SEIAA Clearances Up to Date</span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================================
            2. INTERACTIVE DOCUMENT STUDIO (Master-Detail PDF Viewer)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* ── Left Sidebar: Document Selector Cards (5 Cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1c2b1e]/50 font-jakarta">
                Select Report to View:
              </span>
              <span className="text-xs font-mono text-[#c9a84c]">
                [{DOCUMENTS.length} FILED REPORTS]
              </span>
            </div>

            {DOCUMENTS.map((doc, idx) => {
              const isSelected = activeDocIndex === idx;

              return (
                <motion.div
                  key={doc.id}
                  onClick={() => setActiveDocIndex(idx)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`group relative rounded-2xl p-6 transition-all duration-300 border cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "bg-[#1c2b1e] text-white border-[#1c2b1e] shadow-[0_20px_50px_rgba(28,43,30,0.2)] scale-[1.02]"
                      : "bg-white/70 hover:bg-white text-[#1c2b1e] border-white/80 hover:border-white shadow-sm"
                  }`}
                >
                  {/* Left Active Accent Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeDocIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#10B981] to-[#c9a84c]"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div>
                    {/* Top Metadata & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-md ${
                        isSelected ? "bg-white/10 text-[#e2c97e]" : "bg-[#1c2b1e]/5 text-[#1c2b1e]/60"
                      }`}>
                        {doc.authority}
                      </span>
                      <span 
                        className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                        style={{
                          backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : `${doc.statusColor}15`,
                          color: isSelected ? "#fff" : doc.statusColor,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? "#10B981" : doc.statusColor }} />
                        {doc.status}
                      </span>
                    </div>

                    {/* Document Title & Period */}
                    <h3 className="text-xl font-bold font-playfair mb-1 leading-snug">
                      {doc.title}
                    </h3>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-4 font-jakarta ${
                      isSelected ? "text-[#c9a84c]" : "text-[#1c2b1e]/60"
                    }`}>
                      {doc.period}
                    </p>

                    <p className={`text-xs leading-relaxed mb-6 ${
                      isSelected ? "text-white/75" : "text-[#1c2b1e]/70"
                    }`}>
                      {doc.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className={`pt-4 border-t flex items-center justify-between text-xs font-jakarta ${
                    isSelected ? "border-white/10" : "border-[#1c2b1e]/10"
                  }`}>
                    <div className="flex items-center gap-3 font-mono text-[11px] opacity-70">
                      <span>{doc.size}</span>
                      <span>·</span>
                      <span>{doc.pages}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={doc.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className={`font-bold uppercase tracking-wider hover:underline flex items-center gap-1 ${
                          isSelected ? "text-[#e2c97e]" : "text-[#c9a84c]"
                        }`}
                      >
                        <span>↓ Download</span>
                      </a>
                      <span className={`text-lg transition-transform duration-300 ${
                        isSelected ? "translate-x-1 text-white" : "text-[#1c2b1e]/30 group-hover:translate-x-1"
                      }`}>
                        →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Support Notice Box */}
            <div className="p-5 rounded-2xl bg-white/50 border border-white/60 text-xs text-[#1c2b1e]/70 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[#1c2b1e] mb-0.5">Need hard copies for legal verification?</p>
                <p>Official stamped documents are available at our Pune head office upon request.</p>
              </div>
              <Link href="/#contact" className="px-3.5 py-2 rounded-xl bg-[#1c2b1e] text-white font-bold text-[10px] uppercase tracking-widest flex-shrink-0 hover:bg-[#c9a84c] hover:text-[#1c2b1e] transition-colors">
                Inquire
              </Link>
            </div>
          </div>

          {/* ── Right Studio: Glass Viewport Window (7 Cols) ── */}
          <div className="lg:col-span-7 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white p-3 sm:p-4 shadow-[0_25px_60px_rgba(28,43,30,0.08)] flex flex-col">
            
            {/* Mac-Style Viewport Header Bar */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-[#1c2b1e] text-white rounded-t-2xl border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-mono text-white/80 pl-2 border-l border-white/20 truncate max-w-[200px] sm:max-w-xs">
                  {activeDoc.title}.pdf
                </span>
              </div>

              {/* Quick Actions (Crucial for Mobile UX) */}
              <div className="flex items-center gap-2">
                <a
                  href={activeDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center gap-1"
                  title="Open in Fullscreen Tab"
                >
                  <span>↗ Fullscreen</span>
                </a>
                <a
                  href={activeDoc.url}
                  download
                  className="px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-[10px] font-bold tracking-widest uppercase transition-colors shadow-sm flex items-center gap-1"
                >
                  <span>↓ PDF ({activeDoc.size})</span>
                </a>
              </div>
            </div>

            {/* Embedded Iframe Container */}
            <div className="relative w-full h-[550px] sm:h-[650px] bg-gray-900 rounded-b-2xl overflow-hidden shadow-inner flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoc.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <iframe
                    src={`${activeDoc.url}#toolbar=0&navpanes=0&scrollbar=1`}
                    className="w-full h-full border-0"
                    title={activeDoc.title}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Mobile Fallback Overlay Prompt (In case browser restricts iframe PDF rendering) */}
              <div className="absolute bottom-4 left-4 right-4 md:hidden p-3 rounded-xl bg-[#1c2b1e]/90 backdrop-blur-md border border-white/20 text-white text-center text-xs flex items-center justify-between shadow-lg">
                <span>PDF not rendering on mobile?</span>
                <a
                  href={activeDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-[#c9a84c] text-[#1c2b1e] font-bold uppercase tracking-wider text-[10px]"
                >
                  Open Direct Link →
                </a>
              </div>
            </div>

            {/* Viewport Footer Stamp */}
            <div className="pt-3 px-3 flex items-center justify-between text-[11px] font-mono text-[#1c2b1e]/50 uppercase tracking-widest">
              <span>RERA REG: P52100000000 // PUNE</span>
              <span className="text-[#10B981] font-bold">✦ Statutory Compliance Audited</span>
            </div>
          </div>

        </div>

        {/* =====================================================================
            3. SUSTAINABILITY IMPACT RIBBON (Tangible Eco Metrics)
           ===================================================================== */}
        <section className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white p-8 lg:p-12 shadow-[0_15px_40px_rgba(28,43,30,0.05)] relative overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent absolute top-0 left-0" />
          
          <div className="mb-8 text-center max-w-xl mx-auto">
            <span className="text-[#10B981] text-xs font-bold tracking-[0.25em] uppercase block mb-2 font-jakarta">
              Beyond Compliance
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1c2b1e]">
              What our clearance reports achieve in daily living.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#1c2b1e]/10">
            {ECO_METRICS.map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx > 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""}`}>
                <span className="font-playfair text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#10B981] via-[#c9a84c] to-[#a8852f] bg-clip-text text-transparent mb-1 drop-shadow-sm">
                  {item.metric}
                </span>
                <span className="text-[#1c2b1e] font-bold text-xs sm:text-sm tracking-[0.15em] uppercase mb-1 font-jakarta">
                  {item.label}
                </span>
                <span className="text-[#1c2b1e]/60 text-[11px] font-medium font-mono">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent absolute bottom-0 left-0" />
        </section>

      </div>
    </main>
  );
}