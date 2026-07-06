export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111A12] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p
              className="text-white/50 text-lg font-light mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 5 Elements
            </p>
            <p className="text-white/20 text-xs tracking-widest uppercase">
              Real Estate · Pune · MMXX
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8">
            {["Projects", "Philosophy", "Legacy", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/25 text-xs tracking-widest uppercase hover:text-[#C9A84C] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* RERA + legal */}
          <div className="text-right">
            <p className="text-white/15 text-[10px] tracking-wide">
              RERA No: P52100012345
            </p>
            <p className="text-white/15 text-[10px] mt-1">
              © {year} The 5 Elements. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 5 elements symbols */}
          <div className="flex gap-4 items-center">
            {["⬡", "◈", "△", "○", "◻"].map((s, i) => (
              <span key={i} className="text-[#C9A84C]/15 text-lg">
                {s}
              </span>
            ))}
          </div>
          <p className="text-white/10 text-[10px] max-w-md text-center sm:text-right leading-relaxed">
            All property details, plans, and specifications are indicative and subject to change.
            Buyers are advised to conduct independent due diligence before purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
