import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111A12] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          
          {/* Brand & Logo */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image 
                  src="/logo.avif" 
                  alt="The 5 Elements Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span
                className="text-white/50 text-lg font-light"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The 5 Elements
              </span>
            </Link>
            <p className="text-white/20 text-xs tracking-widest uppercase">
              Real Estate · Pune
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-center">
            {[
              { label: "About", href: "/about" },
              { label: "Projects", href: "/#projects" },
              { label: "Philosophy", href: "/#philosophy" },
              { label: "Environment", href: "/environment" },
              { label: "Legacy", href: "/#legacy" },
              { label: "Contact", href: "/#contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/25 text-xs tracking-widest uppercase hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RERA + legal */}
          <div className="lg:text-right">
            <p className="text-white/15 text-[10px] tracking-wide uppercase">
              MahaRERA Registration No: A52100029799
            </p>
            <p className="text-white/15 text-[10px] mt-1">
              © {year} The 5 Elements. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Symbols */}
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