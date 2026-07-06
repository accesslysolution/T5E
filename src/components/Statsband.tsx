const STATS = [
  { value: "12+", label: "Projects Delivered", sub: "Across Pune" },
  { value: "2,400+", label: "Families Housed", sub: "And thriving" },
  { value: "18", label: "Acres Developed", sub: "Of prime land" },
  { value: "₹500Cr+", label: "In Real Estate", sub: "Value created" },
];

export default function StatsBand() {
  return (
    <section className="bg-[#151F17] py-16 border-y border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#C9A84C]/10">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="px-8 py-6 flex flex-col items-center text-center group"
            >
              <span
                className="text-4xl lg:text-5xl font-light text-[#C9A84C] mb-2 group-hover:scale-105 transition-transform duration-500"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.value}
              </span>
              <span className="text-white/60 text-sm tracking-wide uppercase">
                {s.label}
              </span>
              <span className="text-white/25 text-xs mt-1">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
