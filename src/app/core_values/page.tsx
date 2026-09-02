import type { Metadata } from "next";
import Link from "next/link";
import CoreValuesHero from "@/components/CoreValuesHero";
import Philosophy from "@/components/Philosophy";
import Legacy from "@/components/Legacy";

export const metadata: Metadata = {
  title: "Core Values | The 5 Elements",
  description:
    "The five elemental principles behind every T5E residence — and the contractual record that proves we build to them.",
  openGraph: {
    title: "Core Values | The 5 Elements",
    description:
      "Five forces, one living blueprint. The philosophy and the engineered record behind every T5E development.",
    images: ["/img/Akash.avif"],
  },
};

export default function CoreValuesPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#1c2b1e]">
      {/* 1 — Page hero */}
      <CoreValuesHero />

      {/* 2 — The philosophy: five elements */}
      <Philosophy />

      {/* 3 — Bridge: principle → practice */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#c9a84c]" />
            <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
              From Principle to Practice
            </p>
            <span className="w-8 h-[2px] bg-[#c9a84c]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c2b1e] leading-[1.15] font-playfair mb-6">
            A philosophy is only worth the{" "}
            <span className="italic font-light bg-gradient-to-r from-[#a8852f] via-[#c9a84c] to-[#e2c97e] bg-clip-text text-transparent">
              record that backs it.
            </span>
          </h2>

          <p className="text-[#1c2b1e]/70 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Every developer in Pune can name a philosophy. Fewer can show you the
            specification sheets, the handover dates, and the residents who have
            lived inside those decisions for five years. Below is ours — measured,
            not marketed.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <span className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent" />
          </div>
        </div>
      </section>

      {/* 4 — The record: guarantees + resident voices */}
      <Legacy />

      {/* 5 — Closing CTA */}
      <section className="px-6 lg:px-12 pb-24 lg:pb-32 pt-8">
        <div className="max-w-7xl mx-auto rounded-3xl bg-[#1c2b1e] text-white p-10 sm:p-14 lg:p-20 relative overflow-hidden shadow-[0_25px_70px_rgba(28,43,30,0.25)]">
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-[30rem] h-[30rem] bg-[#c9a84c]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#c9a84c]" />
                <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#c9a84c] font-jakarta">
                  See It For Yourself
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] font-playfair mb-5">
                Values are easiest to judge{" "}
                <span className="italic font-light text-[#e2c97e]">on site.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
                Walk a floor plate, check a material spec, speak to a resident.
                We would rather you verify than take our word for it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/projects"
                className="px-6 py-3.5 rounded-xl bg-[#c9a84c] text-[#1c2b1e] font-bold text-xs uppercase tracking-[0.2em] text-center hover:bg-[#e2c97e] transition-colors font-jakarta"
              >
                View Projects
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3.5 rounded-xl border border-white/25 text-white font-bold text-xs uppercase tracking-[0.2em] text-center hover:bg-white/10 hover:border-white/50 transition-all font-jakarta"
              >
                Book a Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}