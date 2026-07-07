"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, type Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TRANSITION_BASE: Transition = { duration: 0.9, ease: EASE };

const CONTACT_ITEMS = [
  {
    label: "Call us",
    value: "+91 91755 90507",
    sub: "Mon–Sat, 10am–7pm",
  },
  {
    label: "Alternative",
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
    value: "Office No. 23, Building C2, Bramha Estate, Nr Jyoti Restaurant, Kondhwa Kh, Pune — 411048",
    sub: "By appointment preferred",
  },
];

const inputBaseStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "8px",
  fontFamily: "var(--font-jakarta)",
  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "rgba(201,168,76,0.55)",
  background: "rgba(255,255,255,0.07)",
  boxShadow: "0 0 0 3px rgba(201,168,76,0.10)",
};

const inputClassName =
  "w-full px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/22";

function LuxInput({
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputClassName}
      style={{ ...inputBaseStyle, ...(focused ? inputFocusStyle : {}) }}
    />
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectFocused, setSelectFocused] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: "#1C2B1E" }}
    >
      {/* Decorative giant "5" */}
      <div
        aria-hidden
        className="absolute -right-16 top-1/2 -translate-y-1/2 text-[380px] font-light select-none pointer-events-none leading-none"
        style={{ fontFamily: "var(--font-playfair)", color: "#C9A84C", opacity: 0.025 }}
      >
        5
      </div>

      {/* Top gold radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: info ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...TRANSITION_BASE }}
          >
            <p
              className="text-[10px] tracking-[0.38em] uppercase mb-5"
              style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-jakarta)" }}
            >
              Begin Your Journey
            </p>

            <h2
              className="text-5xl lg:text-6xl font-light text-white leading-[1.08] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s find your
              <br />
              <span
                className="italic"
                style={{
                  background:
                    "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                element.
              </span>
            </h2>

            <p
              className="text-white/40 text-base leading-[1.85] mb-12 max-w-sm"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Every great home starts with a conversation. Tell us what you&apos;re
              looking for and we&apos;ll show you what&apos;s possible.
            </p>

            {/* Contact items */}
            <div className="space-y-0">
              {CONTACT_ITEMS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...TRANSITION_BASE, delay: 0.2 + i * 0.1 }}
                  className="group flex gap-5 py-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {/* Accent bar */}
                  <div
                    className="w-px flex-shrink-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, #c9a84c, rgba(201,168,76,0.1))",
                      opacity: 0.22,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  <div>
                    <p
                      className="text-[9px] tracking-[0.28em] uppercase mb-1"
                      style={{
                        color: "rgba(201,168,76,0.50)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      {c.label}
                    </p>
                    <p
                      className="text-white text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {c.value}
                    </p>
                    <p
                      className="text-[10px] mt-0.5"
                      style={{
                        color: "rgba(255,255,255,0.28)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      {c.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...TRANSITION_BASE, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-full flex flex-col items-center justify-center text-center gap-7 py-20"
                >
                  <motion.span
                    className="text-5xl"
                    style={{ color: "#C9A84C" }}
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, ease: EASE }}
                  >
                    ✦
                  </motion.span>
                  <h3
                    className="text-3xl font-light text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Thank you.
                  </h3>
                  <p
                    className="text-white/40 max-w-xs leading-relaxed text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    We&apos;ve received your enquiry and will reach out within 24 hours.
                    Great homes are worth the conversation.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-[9px] tracking-[0.28em] uppercase mb-2"
                        style={{
                          color: "rgba(255,255,255,0.30)",
                          fontFamily: "var(--font-jakarta)",
                        }}
                      >
                        Full Name *
                      </label>
                      <LuxInput
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[9px] tracking-[0.28em] uppercase mb-2"
                        style={{
                          color: "rgba(255,255,255,0.30)",
                          fontFamily: "var(--font-jakarta)",
                        }}
                      >
                        Phone *
                      </label>
                      <LuxInput
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.28em] uppercase mb-2"
                      style={{
                        color: "rgba(255,255,255,0.30)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      Email
                    </label>
                    <LuxInput
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>

                  {/* Project select */}
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.28em] uppercase mb-2"
                      style={{
                        color: "rgba(255,255,255,0.30)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      Project of Interest
                    </label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      className="w-full px-4 py-3.5 text-sm appearance-none cursor-pointer outline-none"
                      style={{
                        ...inputBaseStyle,
                        color: form.project ? "#fff" : "rgba(255,255,255,0.25)",
                        ...(selectFocused ? inputFocusStyle : {}),
                      }}
                    >
                      <option value=""         style={{ background: "#1C2B1E" }}>Select a project</option>
                      <option value="chaitanya" style={{ background: "#1C2B1E" }}>Siddhivinayak Chaitanya</option>
                      <option value="apex"      style={{ background: "#1C2B1E" }}>T5E Apex</option>
                      <option value="vishwa"    style={{ background: "#1C2B1E" }}>Siddhivinayak Vishwa</option>
                      <option value="element"   style={{ background: "#1C2B1E" }}>The Element</option>
                      <option value="other"     style={{ background: "#1C2B1E" }}>Not sure yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.28em] uppercase mb-2"
                      style={{
                        color: "rgba(255,255,255,0.30)",
                        fontFamily: "var(--font-jakarta)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you're looking for…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setTextareaFocused(true)}
                      onBlur={() => setTextareaFocused(false)}
                      className={inputClassName + " resize-none"}
                      style={{
                        ...inputBaseStyle,
                        ...(textareaFocused ? inputFocusStyle : {}),
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group relative w-full py-4 text-[11px] tracking-[0.22em] uppercase font-semibold text-[#1C2B1E] overflow-hidden rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #e2c97e 0%, #c9a84c 50%, #a8852f 100%)",
                      boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
                      fontFamily: "var(--font-jakarta)",
                      transition: "box-shadow 0.4s ease, transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 12px 48px rgba(201,168,76,0.55)";
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 32px rgba(201,168,76,0.35)";
                      (e.currentTarget as HTMLElement).style.transform = "none";
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)",
                      }}
                    />
                    <span className="relative">Send Enquiry</span>
                  </button>

                  <p
                    className="text-center text-[10px]"
                    style={{
                      color: "rgba(255,255,255,0.18)",
                      fontFamily: "var(--font-jakarta)",
                    }}
                  >
                    By enquiring, you agree to be contacted by The 5 Elements team.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}