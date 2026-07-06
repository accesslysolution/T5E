const ELEMENTS = {
  Prithvi: { name: "Prithvi (Earth)", desc: "Solid foundations and quality construction.", symbol: "⬡", color: "#C9A84C" },
  Jal: { name: "Jal (Water)", desc: "Serenity and flow.", symbol: "💧", color: "#60A5FA" },
  Agni: { name: "Agni (Fire)", desc: "Warmth and energy.", symbol: "🔥", color: "#F87171" },
  Vayu: { name: "Vayu (Air)", desc: "Breath and openness.", symbol: "○", color: "#5A9E6F" },
  Aakash: { name: "Aakash (Space)", desc: "Room to breathe.", symbol: "◻", color: "#9B8FA6" }
};

const PROJECTS = [
  {
    id: 1,
    name: "Siddhivinayak Chaitanya",
    tagline: "Sculpted living on NIBM Road.",
    location: "NIBM Road, Pune",
    type: "Boutique / Low-density",
    status: "Under Development",
    statusColor: "#C9A84C",
    units: "2 & 3 BHK",
    floors: 7,
    highlight: "Sweeping cantilevered balconies · Warm timber cladding",
    element: "Prithvi",
    elementSymbol: "⬡",
    elementDesc: "Solid foundations and quality construction — homes built to stand strong for generations.",
    gradient: "from-[#2C1F0E] to-[#1C2B1E]",
    accentColor: "#C9A84C",
  },
  {
    id: 2,
    name: "T5E Apex",
    tagline: "Life, elevated to the rooftop.",
    location: "Pune",
    type: "Twin-Wing Tower",
    status: "Under Development",
    statusColor: "#7AADAA",
    units: "2 & 3 BHK",
    floors: 12,
    highlight: "Rooftop clubhouse · Sky lounge & lawn",
    element: "Aakash",
    elementSymbol: "◻",
    elementDesc: "Room to breathe — well-proportioned homes, sky views and a sense of quiet expanse.",
    gradient: "from-[#1A1E2E] to-[#1C2B1E]",
    accentColor: "#9B8FA6",
  },
  {
    id: 3,
    name: "The Element",
    tagline: "A facade with character.",
    location: "Pune",
    type: "Premium Residences",
    status: "Under Development",
    statusColor: "#5A9E6F",
    units: "2 & 3 BHK",
    floors: 8,
    highlight: "Backlit jali facade · Indoor games lounge",
    element: "Vayu",
    elementSymbol: "○",
    elementDesc: "Breath and openness — cross-ventilation, generous balconies and fresh, moving air.",
    gradient: "from-[#0E1E1A] to-[#1C2B1E]",
    accentColor: "#7AADAA",
  },
  {
    id: 4,
    name: "Siddhivinayak Vishwa",
    tagline: "Bright, contemporary living.",
    location: "Wagholi, Pune",
    type: "Modern Contemporary",
    status: "Under Development",
    statusColor: "#C9A84C",
    units: "1, 2 & 3 BHK",
    floors: 10,
    highlight: "Timber-framed balconies · Landscaped stilt",
    element: "Jal",
    elementSymbol: "💧",
    elementDesc: "Serenity and flow — thoughtful water planning, harvesting and calm, restorative spaces.",
    gradient: "from-[#1C2B1E] to-[#2C3E50]",
    accentColor: "#60A5FA",
  },
];




export default function Projects() {
  return (
    <section id="projects" className="bg-[#1C2B1E] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[#C9A84C]/60 text-xs tracking-[0.4em] uppercase mb-4">Our Portfolio</p>
            <h2 className="text-5xl lg:text-6xl font-light text-white leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Crafted spaces, <br />
              <span className="italic text-[#C9A84C]">lasting legacies.</span>
            </h2>
          </div>
          <a href="#contact" className="self-start lg:self-auto text-sm tracking-widest uppercase text-[#C9A84C] border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors">
            View all projects →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {PROJECTS.map((p) => (
            <article key={p.id} className={`bg-gradient-to-b ${p.gradient} group cursor-pointer hover:brightness-110 transition-all duration-500 relative overflow-hidden`}>
              <div className="h-px w-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: p.accentColor }} />
              
              <div className="p-8 lg:p-8 flex flex-col h-full min-h-[480px]">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl opacity-25 group-hover:opacity-60 transition-opacity duration-500" style={{ color: p.accentColor }}>
                    {p.elementSymbol}
                  </span>
                  <span className="text-[10px] tracking-[0.35em] uppercase px-3 py-1 border" style={{ color: p.statusColor, borderColor: `${p.statusColor}40` }}>
                    {p.status}
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-xl font-light text-white mb-2 leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>{p.name}</h3>
                  <p className="text-[#C9A84C]/80 text-[10px] uppercase tracking-widest mb-2">{p.element}</p>
                  <p className="text-white/35 text-xs italic mb-4">{p.elementDesc}</p>
                  <p className="text-white/50 text-xs tracking-widest uppercase">📍 {p.location}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="flex justify-between">
                    <p className="text-white/25 text-[10px] tracking-widest uppercase">Config</p>
                    <p className="text-white/70 text-xs">{p.units}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/25 text-[10px] tracking-widest uppercase">Type</p>
                    <p className="text-white/70 text-xs">{p.type}</p>
                  </div>
                </div>

                <div className="mt-6 px-4 py-3 border-l-2 bg-white/5" style={{ borderColor: p.accentColor }}>
                  <p className="text-[10px] text-white/40 italic">{p.highlight}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-white/20 group-hover:text-white/50 transition-colors">Details</span>
                  <span className="text-lg opacity-30 group-hover:opacity-70 transition-all duration-300" style={{ color: p.accentColor }}>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}