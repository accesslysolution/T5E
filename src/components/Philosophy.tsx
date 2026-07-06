const ELEMENTS = [
  {
    number: "01",
    name: "Prithvi",
    english: "Earth",
    symbol: "⬡",
    description:
      "Every foundation we lay honours the land. Structural integrity, material quality, and site sensitivity define our construction ethos. We build to outlast generations.",
    color: "#8B7355",
  },
  {
    number: "02",
    name: "Jal",
    english: "Water",
    symbol: "◈",
    description:
      "Spaces that breathe and flow. Open layouts, natural light corridors, and design that moves with life — not against it. Homes that adapt to how you truly live.",
    color: "#4A7FA5",
  },
  {
    number: "03",
    name: "Agni",
    english: "Fire",
    symbol: "△",
    description:
      "Warmth in every corner. From the glow of thoughtfully placed lighting to the energy of vibrant community spaces, we create homes that feel alive.",
    color: "#C9A84C",
  },
  {
    number: "04",
    name: "Vayu",
    english: "Air",
    symbol: "○",
    description:
      "Cross-ventilation engineered from the blueprint. Large windows, green corridors, and open terraces ensure every residence breathes naturally, day and night.",
    color: "#7AADAA",
  },
  {
    number: "05",
    name: "Akash",
    english: "Space",
    symbol: "◻",
    description:
      "The fifth element — the canvas of possibility. Generous proportions, minimal intrusion, and thoughtful silence give each resident room to grow into themselves.",
    color: "#9B8FA6",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[#8B7355] text-xs tracking-[0.4em] uppercase mb-4">
              Our Foundation
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-[#1C2B1E] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Five forces.
              <br />
              <span className="italic text-[#8B7355]">One vision.</span>
            </h2>
          </div>
          <p className="text-[#2C2C2C]/60 text-base max-w-sm leading-relaxed lg:text-right">
            Ancient Indian philosophy recognised five fundamental elements that compose all of existence.
            We've made them the blueprint for every home we build.
          </p>
        </div>

        {/* Elements grid */}
        <div className="space-y-0">
          {ELEMENTS.map((el, i) => (
            <div
              key={el.number}
              className={`group flex flex-col lg:flex-row items-start gap-6 lg:gap-12 py-10 border-b border-[#1C2B1E]/10 last:border-b-0 hover:bg-white/50 transition-colors duration-500 px-6 -mx-6 cursor-default ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Number + Symbol */}
              <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2 min-w-[80px]">
                <span className="text-[10px] tracking-[0.35em] text-[#8B7355] uppercase">
                  {el.number}
                </span>
                <span
                  className="text-4xl opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ color: el.color }}
                >
                  {el.symbol}
                </span>
              </div>

              {/* Name */}
              <div className="min-w-[160px]">
                <h3
                  className="text-3xl font-light text-[#1C2B1E] group-hover:text-[#1C2B1E] transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {el.name}
                </h3>
                <p
                  className="text-sm tracking-widest uppercase mt-1"
                  style={{ color: el.color }}
                >
                  {el.english}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#2C2C2C]/65 leading-relaxed text-base max-w-xl flex-1">
                {el.description}
              </p>

              {/* Decorative bar */}
              <div
                className="hidden lg:block self-center h-16 w-px opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundColor: el.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
