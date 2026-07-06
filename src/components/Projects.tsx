const PROJECTS = [
  {
    id: 1,
    name: "Prithvi Heights",
    tagline: "Where the ground breathes gold",
    location: "Wagholi, Pune",
    type: "Premium Apartments",
    status: "Ongoing",
    statusColor: "#C9A84C",
    units: "2 & 3 BHK",
    possession: "Dec 2025",
    floors: 7,
    highlight: "Standalone tower · No society congestion",
    element: "Earth",
    elementSymbol: "⬡",
    gradient: "from-[#2C1F0E] to-[#1C2B1E]",
    accentColor: "#C9A84C",
  },
  {
    id: 2,
    name: "Akash Residency",
    tagline: "Luxury in every breath of space",
    location: "Kharadi, Pune",
    type: "Sky Villas",
    status: "Upcoming",
    statusColor: "#7AADAA",
    units: "3 & 4 BHK",
    possession: "2026",
    floors: 14,
    highlight: "Sky-level terraces · Panoramic views",
    element: "Space",
    elementSymbol: "◻",
    gradient: "from-[#1A1E2E] to-[#1C2B1E]",
    accentColor: "#9B8FA6",
  },
  {
    id: 3,
    name: "Vayu Greens",
    tagline: "Where air becomes architecture",
    location: "Baner, Pune",
    type: "Eco Residences",
    status: "Completed",
    statusColor: "#5A9E6F",
    units: "1, 2 & 3 BHK",
    possession: "Possession Ready",
    floors: 5,
    highlight: "100% cross-ventilated · Green certified",
    element: "Air",
    elementSymbol: "○",
    gradient: "from-[#0E1E1A] to-[#1C2B1E]",
    accentColor: "#7AADAA",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#1C2B1E] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[#C9A84C]/60 text-xs tracking-[0.4em] uppercase mb-4">
              Our Portfolio
            </p>
            <h2
              className="text-5xl lg:text-6xl font-light text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Crafted spaces,
              <br />
              <span className="italic text-[#C9A84C]">lasting legacies.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start lg:self-auto text-sm tracking-widest uppercase text-[#C9A84C] border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors"
          >
            View all projects →
          </a>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className={`bg-gradient-to-b ${p.gradient} group cursor-pointer hover:brightness-110 transition-all duration-500 relative overflow-hidden`}
            >
              {/* Top accent bar */}
              <div
                className="h-px w-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: p.accentColor }}
              />

              <div className="p-8 lg:p-10 flex flex-col h-full min-h-[420px]">
                {/* Element badge */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-3xl opacity-25 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ color: p.accentColor }}
                  >
                    {p.elementSymbol}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.35em] uppercase px-3 py-1 border"
                    style={{
                      color: p.statusColor,
                      borderColor: `${p.statusColor}40`,
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                {/* Project name */}
                <div className="mb-6 flex-1">
                  <h3
                    className="text-2xl lg:text-3xl font-light text-white mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-white/35 text-sm italic mb-4">{p.tagline}</p>

                  {/* Location */}
                  <p className="text-white/50 text-xs tracking-widest uppercase">
                    📍 {p.location}
                  </p>
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-auto">
                  {[
                    { label: "Type", value: p.units },
                    { label: "Floors", value: `G + ${p.floors}` },
                    { label: "Possession", value: p.possession },
                    { label: "Category", value: p.type },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <p className="text-white/25 text-[10px] tracking-widest uppercase mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-white/70 text-sm">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlight */}
                <div
                  className="mt-6 px-4 py-3 border-l-2 bg-white/5"
                  style={{ borderColor: p.accentColor }}
                >
                  <p className="text-xs text-white/40 italic">{p.highlight}</p>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-white/20 group-hover:text-white/50 transition-colors">
                    View Details
                  </span>
                  <span
                    className="text-lg opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: p.accentColor }}
                  >
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
