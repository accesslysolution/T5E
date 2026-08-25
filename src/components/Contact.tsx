"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Transition,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TRANSITION_BASE: Transition = { duration: 0.9, ease: EASE };

const CONTACT_ITEMS = [
  {
    label: "Call us",
    value: "+91 91755 90507",
    href: "tel:+919175590507",
    sub: "Mon–Sat, 10am–7pm",
  },
  {
    label: "Alternative",
    value: "+91 75582 99969",
    href: "tel:+917558299969",
    sub: "For general enquiries",
  },
  {
    label: "Write to us",
    value: "info@t5e.co.in",
    href: "mailto:info@t5e.co.in",
    sub: "We respond within 24 hours",
  },
  {
    label: "Corp Office",
    value:
      "Office No. 23, Building C2, Bramha Estate, Nr Jyoti Restaurant, Kondhwa Kh, Pune — 411048",
    href: null,
    sub: "By appointment preferred",
  },
];

const PROJECTS = [
  { value: "chaitanya", label: "Siddhivinayak Chaitanya" },
  { value: "apex", label: "T5E Apex" },
  { value: "vishwa", label: "Siddhivinayak Vishwa" },
  { value: "element", label: "The Element" },
  { value: "other", label: "Not sure yet" },
];

/* --------------------------------------------------------------------------
   Field styling

   Longhand only. Mixing the `border` shorthand with a conditional
   `borderColor` makes React drop a longhand key between renders while the
   shorthand stays — that is what triggers the "Removing a style property
   during rerender" warning. Every key in the focus object also exists in the
   base object, so keys change value rather than appearing and vanishing.
   -------------------------------------------------------------------------- */

const inputBaseStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255,255,255,0.10)",
  borderRadius: "8px",
  boxShadow: "none",
  fontFamily: "var(--font-jakarta)",
  transition:
    "border-color 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1)",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "rgba(201,168,76,0.55)",
  background: "rgba(255,255,255,0.07)",
  boxShadow: "0 0 0 3px rgba(201,168,76,0.10)",
};

const fieldStyle = (focused: boolean): React.CSSProperties => ({
  ...inputBaseStyle,
  ...(focused ? inputFocusStyle : {}),
});

const inputClassName =
  "w-full px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/25";

const labelClassName =
  "block text-[9px] tracking-[0.28em] uppercase mb-2 text-white/30";

const labelStyle: React.CSSProperties = { fontFamily: "var(--font-jakarta)" };

/* -------------------------------------------------------------------------- */
/*  LuxInput                                                                   */
/* -------------------------------------------------------------------------- */

function LuxInput({
  id,
  type = "text",
  placeholder,
  required,
  autoComplete,
  inputMode,
  value,
  onChange,
}: {
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      autoComplete={autoComplete}
      inputMode={inputMode}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputClassName}
      style={fieldStyle(focused)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */

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
        style={{
          fontFamily: "var(--font-playfair)",
          color: "#C9A84C",
          opacity: 0.025,
        }}
      >
        5
      </div>

      {/* Top gold radial glow */}
      <div
        aria-hidden
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
            transition={TRANSITION_BASE}
          >
            <p
              className="text-[10px] tracking-[0.38em] uppercase mb-5"
              style={{
                color: "rgba(201,168,76,0.6)",
                fontFamily: "var(--font-jakarta)",
              }}
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
              className="text-white/45 text-base leading-[1.85] mb-12 max-w-sm"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Every great home starts with a conversation. Tell us what
              you&apos;re looking for and we&apos;ll show you what&apos;s
              possible.
            </p>

            {/* Contact items */}
            <div>
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
                    aria-hidden
                    className="w-px flex-shrink-0 rounded-full opacity-25 transition-opacity duration-500 group-hover:opacity-70"
                    style={{
                      background:
                        "linear-gradient(to bottom, #c9a84c, rgba(201,168,76,0.1))",
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

                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-white text-sm leading-relaxed hover:text-[#e0c274] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p
                        className="text-white text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-jakarta)" }}
                      >
                        {c.value}
                      </p>
                    )}

                    <p
                      className="text-[10px] mt-0.5 text-white/30"
                      style={{ fontFamily: "var(--font-jakarta)" }}
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
                  role="status"
                  aria-live="polite"
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
                    className="text-white/45 max-w-xs leading-relaxed text-sm"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    We&apos;ve received your enquiry and will reach out within
                    24 hours. Great homes are worth the conversation.
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
                        htmlFor="name"
                        className={labelClassName}
                        style={labelStyle}
                      >
                        Full Name *
                      </label>
                      <LuxInput
                        id="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className={labelClassName}
                        style={labelStyle}
                      >
                        Phone *
                      </label>
                      <LuxInput
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(v) => setForm({ ...form, phone: v })}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className={labelClassName}
                      style={labelStyle}
                    >
                      Email
                    </label>
                    <LuxInput
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>

                  {/* Project select */}
                  <div>
                    <label
                      htmlFor="project"
                      className={labelClassName}
                      style={labelStyle}
                    >
                      Project of Interest
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={form.project}
                      onChange={(e) =>
                        setForm({ ...form, project: e.target.value })
                      }
                      onFocus={() => setSelectFocused(true)}
                      onBlur={() => setSelectFocused(false)}
                      className="w-full px-4 py-3.5 text-sm appearance-none cursor-pointer outline-none"
                      style={{
                        ...fieldStyle(selectFocused),
                        color: form.project ? "#fff" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      <option value="" style={{ background: "#1C2B1E" }}>
                        Select a project
                      </option>
                      {PROJECTS.map((p) => (
                        <option
                          key={p.value}
                          value={p.value}
                          style={{ background: "#1C2B1E" }}
                        >
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className={labelClassName}
                      style={labelStyle}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're looking for…"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      onFocus={() => setTextareaFocused(true)}
                      onBlur={() => setTextareaFocused(false)}
                      className={inputClassName + " resize-none"}
                      style={fieldStyle(textareaFocused)}
                    />
                  </div>

                  {/* Submit — hover handled in CSS, not by writing to
                      element.style, which fights React for the node. */}
                  <button type="submit" className="t5e-submit">
                    <span className="t5e-submit__sheen" aria-hidden="true" />
                    <span className="relative">Send Enquiry</span>
                  </button>

                  <p
                    className="text-center text-[10px] text-white/20"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    By enquiring, you agree to be contacted by The 5 Elements
                    team.
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