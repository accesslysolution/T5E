"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Hero strip — element atmospheres alternating with real project work */
const HERO_IMAGES = [
  { src: "/img/Prithvi.avif", alt: "Prithvi — Earth" },
  { src: "/img/chaitanya-1.jpeg", alt: "Siddhivinayak Chaitanya" },
  { src: "/img/Agni.avif", alt: "Agni — Fire" },
  { src: "/img/apex-1.jpeg", alt: "T5E Apex" },
  { src: "/img/Akash.avif", alt: "Akash — Space" },
];

const CHAPTERS = [
  {
    num: "01",
    heading: "Why we started",
    body: "T5E was founded on a conviction that has become rare — that a home is a personal sanctuary and deserves to be designed like one. We keep the portfolio deliberately small, because scale and care rarely survive in the same building.",
    img: "/img/vishwa-1.jpeg",
    caption: "Siddhivinayak Vishwa · Wagholi",
  },
  {
    num: "02",
    heading: "How we build",
    body: "Every site has its own micro-climate, wind trajectory and solar path. We engage boutique architects to draw a bespoke blueprint for each plot. No two T5E buildings share a floor plan or a facade.",
    img: "/img/element-03.jpeg",
    caption: "The Element · Backlit jali facade",
  },
  {
    num: "03",
    heading: "What we guarantee",
    body: "We treat blueprints as binding and specifications as fixed. What you see on paper at consultation is the finish you walk into on possession day — verified by third-party audit, not by our own word.",
    img: "/img/chaitanya-2.jpeg",
    caption: "Siddhivinayak Chaitanya · NIBM Road",
  },
];

const FACTS = [
  { value: "4", label: "Signature projects" },
  { value: "2", label: "Pune micro-markets" },
  { value: "100%", label: "Design-led builds" },
  { value: "RERA", label: "Fully compliant" },
];

const PORTFOLIO = [
  {
    slug: "siddhivinayak-chaitanya",
    name: "Siddhivinayak Chaitanya",
    location: "NIBM Road, Pune",
    element: "Prithvi",
    img: "/img/element-10.jpeg",
  },
  {
    slug: "t5e-apex",
    name: "T5E Apex",
    location: "Pune",
    element: "Akash",
    img: "/img/element-04.jpeg",
  },
  {
    slug: "siddhivinayak-vishwa",
    name: "Siddhivinayak Vishwa",
    location: "Wagholi, Pune",
    element: "Jal",
    img: "/img/element-05.jpeg",
  },
  {
    slug: "the-element",
    name: "The Element",
    location: "Pune",
    element: "Vayu",
    img: "/img/element-08.jpeg",
  },
];

const TEAM = [
  { name: "Rajesh Jadhav", role: "Founder & Managing Director" },
  { name: "Sneha Patil", role: "Design & Architecture" },
  { name: "Amit Kulkarni", role: "Quality & Construction" },
  { name: "Vikram Mehta", role: "Projects & Planning" },
  { name: "Priya Deshpande", role: "Sales & Customer Relations" },
  { name: "Neha Rao", role: "Legal & RERA Compliance" },
];

/* ── Reusable reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const stripY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <main className="bg-[#faf8f4] text-[#1c2b1e] font-sans selection:bg-[#c9a84c]/25">
      {/* =====================================================================
          1 · MASTHEAD
         ===================================================================== */}
      <section className="px-6 lg:px-12 pt-32 lg:pt-44 pb-14 lg:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta mb-10"
          >
            About · The 5 Elements · Pune
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-playfair text-[3rem] sm:text-[4.5rem] lg:text-[6rem] font-bold leading-[0.95] tracking-[-0.02em] text-[#1c2b1e]"
          >
            Fewer homes,
            <br />
            <span className="italic font-semibold text-[#a8852f]">made better.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 pt-8 border-t-2 border-[#1c2b1e]/15 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end"
          >
            <p className="font-playfair text-lg sm:text-xl font-medium leading-[1.65] text-[#1c2b1e]/85 max-w-xl">
              A boutique developer working in a handful of Pune micro-markets,
              building on the belief that architectural integrity is a matter of
              restraint rather than budget.
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta whitespace-nowrap">
              Est. 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2 · IMAGE STRIP
         ===================================================================== */}
      <section ref={heroRef} className="overflow-hidden">
        <motion.div style={{ y: stripY }} className="w-full">
          <div className="grid grid-cols-5 gap-[2px] h-[36vh] sm:h-[48vh] lg:h-[62vh]">
            {HERO_IMAGES.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + idx * 0.09, ease: EASE }}
                className="relative overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="20vw"
                  priority={idx < 3}
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[#1c2b1e]/10 group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="px-6 lg:px-12 pt-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#1c2b1e]/55 font-bold font-jakarta">
              Five elements · Four addresses
            </p>
            <Link
              href="/core_values"
              className="text-[10px] tracking-[0.25em] uppercase text-[#a8852f] font-bold font-jakarta hover:text-[#8a6d26] transition-colors"
            >
              Our core values →
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3 · THE ACCOUNT — chapters with facing images
         ===================================================================== */}
      <section className="px-6 lg:px-12 py-24 lg:py-36">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta pb-6 border-b-2 border-[#1c2b1e]/15">
              The Account
            </p>
          </Reveal>

          <div className="divide-y divide-[#1c2b1e]/15">
            {CHAPTERS.map((ch, idx) => (
              <Reveal key={ch.num} delay={idx * 0.08}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center py-14 lg:py-20 ${
                    idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text */}
                  <div>
                    <span className="font-playfair text-3xl font-bold text-[#c9a84c] leading-none block mb-5">
                      {ch.num}
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 leading-snug">
                      {ch.heading}
                    </h2>
                    <p className="text-[#1c2b1e]/80 text-base font-medium leading-[1.8] max-w-lg">
                      {ch.body}
                    </p>
                  </div>

                  {/* Image */}
                  <figure className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden group">
                      <Image
                        src={ch.img}
                        alt={ch.caption}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-[filter,transform] duration-1000 group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#1c2b1e]/55 font-bold font-jakarta">
                      {ch.caption}
                    </figcaption>
                  </figure>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4 · PULL QUOTE
         ===================================================================== */}
      <section className="px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <blockquote className="bg-[#1c2b1e] text-[#faf8f4] px-8 sm:px-14 lg:px-20 py-16 lg:py-24">
              <p className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-semibold italic leading-[1.45] max-w-3xl">
                A developer should be judged by what happens on the construction
                site, not by what appears in the brochure.
              </p>
              <footer className="mt-10 pt-6 border-t border-white/20 text-[10px] tracking-[0.3em] uppercase text-[#e2c97e] font-bold font-jakarta">
                Rajesh Jadhav · Founder
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          5 · THE RECORD
         ===================================================================== */}
      <section className="px-6 lg:px-12 py-24 lg:py-36">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta pb-6 border-b-2 border-[#1c2b1e]/15">
              The Record
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1c2b1e]/15 border-b border-[#1c2b1e]/15 border-l">
            {FACTS.map((f, idx) => (
              <Reveal key={f.label} delay={idx * 0.06}>
                <div className="px-5 sm:px-7 py-10 lg:py-14">
                  <p className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-none mb-3 text-[#1c2b1e]">
                    {f.value}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#1c2b1e]/65 font-bold font-jakarta">
                    {f.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-[#1c2b1e]/70 font-medium leading-relaxed max-w-lg">
              Every approval, encumbrance report and RERA filing is available for
              inspection before you sign anything. Third-party structural audits
              are published to homeowners at handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================================
          6 · THE PORTFOLIO — four addresses
         ===================================================================== */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-36">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta pb-6 border-b-2 border-[#1c2b1e]/15">
              The Portfolio
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 pt-12">
            {PORTFOLIO.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.07}>
                <Link href="/#projects" className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden mb-4">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 45vw"
                      className="object-cover grayscale-[25%] group-hover:grayscale-0 transition-[filter,transform] duration-1000 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex items-baseline justify-between gap-4 border-t-2 border-[#1c2b1e]/15 pt-4">
                    <div>
                      <h3 className="font-playfair text-xl sm:text-2xl font-bold group-hover:text-[#a8852f] transition-colors duration-300 leading-tight">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta">
                        {p.location} · {p.element}
                      </p>
                    </div>
                    <span className="text-lg text-[#c9a84c] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7 · THE PEOPLE
         ===================================================================== */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-36">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta pb-6 border-b-2 border-[#1c2b1e]/15">
              The People
            </p>
          </Reveal>

          <div className="divide-y divide-[#1c2b1e]/15">
            {TEAM.map((m, idx) => (
              <Reveal key={m.name} delay={idx * 0.04}>
                <div className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8 py-6 lg:py-7">
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold group-hover:text-[#a8852f] transition-colors duration-300">
                    {m.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#1c2b1e]/60 font-bold font-jakarta sm:text-right">
                    {m.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8 · CLOSE
         ===================================================================== */}
      <section className="px-6 lg:px-12 pb-32 lg:pb-40">
        <div className="max-w-5xl mx-auto border-t-2 border-[#1c2b1e]/15 pt-16 lg:pt-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-5">
                  Quality is easiest to judge{" "}
                  <span className="italic font-semibold text-[#a8852f]">in person.</span>
                </h2>
                <p className="text-[#1c2b1e]/80 text-base font-medium leading-relaxed max-w-md">
                  Walk a floor plate, check a specification, speak to a resident.
                  We would rather you verify than take our word for it.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/#contact"
                  className="px-7 py-4 bg-[#1c2b1e] text-[#faf8f4] text-[10px] tracking-[0.25em] uppercase font-bold font-jakarta text-center hover:bg-[#a8852f] transition-colors duration-300"
                >
                  Arrange a visit
                </Link>
                <Link
                  href="/#projects"
                  className="px-7 py-4 border-2 border-[#1c2b1e]/30 text-[#1c2b1e] text-[10px] tracking-[0.25em] uppercase font-bold font-jakarta text-center hover:border-[#1c2b1e] hover:bg-[#1c2b1e] hover:text-[#faf8f4] transition-all duration-300"
                >
                  Portfolio
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}