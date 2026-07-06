const TESTIMONIALS = [
  {
    quote:
      "We weren't just buying a flat — we were choosing how we'd live. The 5 Elements understood that better than we did.",
    name: "Rohit & Priya Deshmukh",
    location: "Prithvi Heights, Wagholi",
    year: "2023",
  },
  {
    quote:
      "The attention to natural ventilation is remarkable. Even in summer, our home feels cool and alive without running AC all day.",
    name: "Surekha Joshi",
    location: "Vayu Greens, Baner",
    year: "2022",
  },
  {
    quote:
      "Five years on, the building looks exactly as it did at handover. That speaks to the quality of materials and the honesty of the developer.",
    name: "Amol Khandagale",
    location: "Vayu Greens, Baner",
    year: "2019",
  },
];

const REASONS = [
  {
    title: "No Compromise on Materials",
    body: "Every specification is locked before construction begins — and it stays locked. What's on paper is what you walk into.",
  },
  {
    title: "On-Time Delivery Record",
    body: "In a sector notorious for delays, we've delivered every project within 90 days of commitment. We treat your possession date as a contract.",
  },
  {
    title: "Post-Possession Commitment",
    body: "Our relationship doesn't end at handover. Dedicated maintenance, swift response, and a community that's looked after — for years, not months.",
  },
  {
    title: "Design Integrity",
    body: "We engage architects who build fewer projects and think more carefully. No copy-paste floor plans — every project is site-specific.",
  },
];

export default function Legacy() {
  return (
    <section id="legacy" className="bg-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Why us */}
        <div className="mb-28">
          <div className="mb-14">
            <p className="text-[#8B7355] text-xs tracking-[0.4em] uppercase mb-4">
              The 5 Elements Difference
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-[#1C2B1E] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Excellence isn't a promise.
              <br />
              <span className="italic text-[#8B7355]">It's a record.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1C2B1E]/10">
            {REASONS.map((r, i) => (
              <div
                key={i}
                className="bg-[#F5F0E8] p-8 lg:p-10 group hover:bg-white transition-colors duration-500"
              >
                <div className="w-10 h-px bg-[#C9A84C] mb-6 group-hover:w-16 transition-all duration-500" />
                <h3
                  className="text-xl font-medium text-[#1C2B1E] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {r.title}
                </h3>
                <p className="text-[#2C2C2C]/60 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="mb-14">
            <p className="text-[#8B7355] text-xs tracking-[0.4em] uppercase mb-4">
              Resident Voices
            </p>
            <h2
              className="text-4xl lg:text-5xl font-light text-[#1C2B1E]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              From the people who call
              <br />
              <span className="italic">our spaces home.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 border-t-2 border-[#C9A84C] group hover:shadow-lg transition-all duration-500"
              >
                <span className="text-[#C9A84C] text-5xl font-serif leading-none block mb-4 opacity-30">
                  "
                </span>
                <p
                  className="text-[#1C2B1E]/70 text-base leading-relaxed mb-8 italic"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t.quote}
                </p>
                <div className="border-t border-[#1C2B1E]/10 pt-4">
                  <p className="text-[#1C2B1E] text-sm font-medium">{t.name}</p>
                  <p className="text-[#8B7355] text-xs mt-1">{t.location}</p>
                  <p className="text-[#1C2B1E]/25 text-xs mt-0.5">{t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
