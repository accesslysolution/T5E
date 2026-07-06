"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to your API
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#1C2B1E] py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 text-[400px] font-light opacity-[0.03] select-none pointer-events-none"
        style={{ fontFamily: "var(--font-playfair)", color: "#C9A84C" }}
      >
        5
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left — info */}
          <div>
            <p className="text-[#C9A84C]/60 text-xs tracking-[0.4em] uppercase mb-4">
              Begin Your Journey
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-white leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let's find your
              <br />
              <span className="italic text-[#C9A84C]">element.</span>
            </h2>

            <p className="text-white/40 text-base leading-relaxed mb-12 max-w-sm">
              Every great home starts with a conversation. Tell us what you're looking for
              and we'll show you what's possible.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  label: "Call us",
                  value: "+91 91755 90507",
                  sub: "Mon–Sat, 10am–7pm",
                },
                {
                  label: "Alternative Number",
                  value: "+91 75582 99969",
                  sub: "For general enquiries",
                },
                {
                  label: "Write to us",
                  value: "info@t5e.co.in",
                  sub: "We respond within 24 hours",
                },
                {
                  label: "Corp Office",
                  value: "Office No. 23, Building C2, Bramha Estate, Nr Jyoti Restaurant, Kondhwa Kh, Pune - 411048",
                  sub: "By appointment preferred",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex gap-6 group border-b border-white/5 pb-6"
                >
                  <div className="w-1 bg-[#C9A84C]/20 group-hover:bg-[#C9A84C]/60 transition-colors duration-500 flex-shrink-0 rounded-full" />
                  <div>
                    <p className="text-[#C9A84C]/50 text-xs tracking-widest uppercase mb-1">
                      {c.label}
                    </p>
                    <p className="text-white text-base leading-relaxed">{c.value}</p>
                    <p className="text-white/30 text-xs mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-16">
                <span className="text-5xl text-[#C9A84C]">✦</span>
                <h3
                  className="text-3xl font-light text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Thank you.
                </h3>
                <p className="text-white/40 max-w-xs leading-relaxed">
                  We've received your enquiry and will reach out within 24 hours.
                  Great homes are worth the conversation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/30 text-xs tracking-widest uppercase block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-xs tracking-widest uppercase block mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors placeholder:text-white/20"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/30 text-xs tracking-widest uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="text-white/30 text-xs tracking-widest uppercase block mb-2">
                    Project of Interest
                  </label>
                  <select
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1C2B1E]">Select a project</option>
                    <option value="chaitanya" className="bg-[#1C2B1E]">Siddhivinayak Chaitanya</option>
                    <option value="apex" className="bg-[#1C2B1E]">T5E Apex</option>
                    <option value="vishwa" className="bg-[#1C2B1E]">Siddhivinayak Vishwa</option>
                    <option value="vishwa" className="bg-[#1C2B1E]">The Elements</option>
                    <option value="other" className="bg-[#1C2B1E]">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/30 text-xs tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-[#C9A84C]/50 focus:outline-none transition-colors resize-none placeholder:text-white/20"
                    placeholder="Tell us what you're looking for…"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A84C] text-[#1C2B1E] text-sm tracking-widest uppercase font-medium hover:bg-[#E0BC6A] transition-colors duration-300 active:scale-[0.99]"
                >
                  Send Enquiry
                </button>

                <p className="text-white/20 text-xs text-center">
                  By enquiring, you agree to be contacted by The 5 Elements team.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}