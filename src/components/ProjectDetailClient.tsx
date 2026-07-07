"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { type Transition } from "framer-motion";
import { type ProjectData } from "@/lib/projects";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const T: Transition = { duration: 0.8, ease: EASE };

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const allImages = [...project.heroImages, ...project.galleryImages];

  return (
    <div className="min-h-screen" style={{ background: "#1C2B1E" }}>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {allImages[0] && (
          <div className="absolute inset-0 z-0">
            <Image
              src={allImages[0]}
              alt={project.name}
              fill
              priority
              className="object-cover object-center"
              quality={90}
            />
            <div className="absolute inset-0 bg-[#1C2B1E]/55 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B1E] via-[#1C2B1E]/30 to-transparent" />
          </div>
        )}

        {/* Back link */}
        <div className="absolute top-28 left-6 lg:left-12 z-20">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-jakarta)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#C9A84C"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            {"←"} All Projects
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={T}
          >
            {/* Element badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl" style={{ color: project.accentColor }}>{project.elementSymbol}</span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ color: project.accentColor, fontFamily: "var(--font-jakarta)" }}
              >
                {project.element}
              </span>
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${project.accentColor}60, transparent)` }} />
            </div>

            <h1
              className="text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.name}
            </h1>

            <p
              className="text-xl font-light italic mb-8"
              style={{ color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-playfair)" }}
            >
              {project.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <span
                className="text-[9px] tracking-[0.3em] uppercase px-4 py-2 rounded-full"
                style={{
                  color: project.statusColor,
                  border: `1px solid ${project.statusColor}40`,
                  background: `${project.statusColor}12`,
                  fontFamily: "var(--font-jakarta)",
                }}
              >
                {project.status}
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-jakarta)" }}
              >
                {project.location}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About + Highlights ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={T}
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-5"
                style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-jakarta)" }}
              >
                About the Project
              </p>
              <div
                className="h-px w-12 mb-8"
                style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }}
              />
              <p
                className="text-white/60 text-base lg:text-lg leading-[1.9]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {project.about}
              </p>

              {/* Element philosophy */}
              <div
                className="mt-10 p-6 rounded-xl"
                style={{
                  background: `${project.accentColor}08`,
                  border: `1px solid ${project.accentColor}20`,
                  borderLeft: `3px solid ${project.accentColor}`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" style={{ color: project.accentColor }}>{project.elementSymbol}</span>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: project.accentColor, fontFamily: "var(--font-jakarta)" }}
                  >
                    The {project.element} Philosophy
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed italic"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-playfair)" }}
                >
                  {project.elementDesc}
                </p>
              </div>
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...T, delay: 0.15 }}
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-5"
                style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-jakarta)" }}
              >
                Project Highlights
              </p>
              <div
                className="h-px w-12 mb-8"
                style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }}
              />

              <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                {project.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...T, delay: i * 0.08 }}
                    className="p-5"
                    style={{ background: "#1C2B1E" }}
                  >
                    <p
                      className="text-[9px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "rgba(201,168,76,0.50)", fontFamily: "var(--font-jakarta)" }}
                    >
                      {h.label}
                    </p>
                    <p
                      className="text-white text-sm font-light"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {h.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.galleryImages.length > 0 && (
        <section className="py-16 lg:py-20" style={{ background: "#151F17" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={T}
              className="mb-12"
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase mb-3"
                style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-jakarta)" }}
              >
                Gallery
              </p>
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...project.heroImages.slice(1), ...project.galleryImages].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...T, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => setLightbox(src)}
                >
                  <Image
                    src={src}
                    alt={`${project.name} gallery ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={85}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    style={{ background: "rgba(28,43,30,0.45)" }}
                  >
                    <span className="text-white/80 text-2xl">⊕</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RERA ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={T}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-10 p-8 lg:p-10 rounded-2xl"
            style={{
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.14)",
            }}
          >
            {/* QR code */}
            <div
              className="relative flex-shrink-0 rounded-xl overflow-hidden"
              style={{
                width: 120,
                height: 120,
                border: "1px solid rgba(201,168,76,0.25)",
                background: "#fff",
                padding: "8px",
              }}
            >
              <Image
                src={project.qrImage}
                alt="RERA QR Code"
                fill
                className="object-contain p-2"
              />
            </div>

            {/* RERA text */}
            <div>
              <p
                className="text-[9px] tracking-[0.3em] uppercase mb-3"
                style={{ color: "rgba(201,168,76,0.55)", fontFamily: "var(--font-jakarta)" }}
              >
                MahaRERA Registration
              </p>
              <p
                className="text-white text-lg font-light mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.name}
              </p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.20)",
                }}
              >
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{ color: "rgba(201,168,76,0.60)", fontFamily: "var(--font-jakarta)" }}
                >
                  RERA No:
                </span>
                <span
                  className="text-sm font-mono"
                  style={{ color: "#C9A84C" }}
                >
                  {project.reraNumber}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-jakarta)", maxWidth: "480px" }}
              >
                Scan the QR code to verify this project on the MahaRERA portal. All details, plans and specifications are indicative and subject to change. Buyers are advised to conduct independent due diligence before purchase.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-20" style={{ background: "#111A12" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={T}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-6"
              style={{ color: "rgba(201,168,76,0.55)", fontFamily: "var(--font-jakarta)" }}
            >
              Interested in this project?
            </p>
            <h2
              className="text-4xl lg:text-5xl font-light text-white mb-10"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s start a{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                conversation.
              </span>
            </h2>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-[11px] tracking-[0.22em] uppercase font-semibold text-[#1C2B1E]"
              style={{
                background: "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
                fontFamily: "var(--font-jakarta)",
              }}
            >
              Enquire Now
              <span>{"→"}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-12"
          style={{ background: "rgba(0,0,0,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <motion.div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: "16/9" }}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={T}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Gallery preview"
              fill
              className="object-contain rounded-xl"
              quality={95}
            />
          </motion.div>
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </motion.div>
      )}

    </div>
  );
}