import Image from "next/image";
import Link from "next/link";

const ELEMENTS = [
  { name: "Prithvi", title: "Earth", desc: "Solid foundations and quality construction — homes built to stand strong.", num: "1", img: "/img/element-01.jpeg" },
  { name: "Jal", title: "Water", desc: "Serenity and flow — thoughtful water planning and calm, restorative spaces.", num: "2", img: "/img/element-02.jpeg" },
  { name: "Agni", title: "Fire", desc: "Warmth and energy — sun-filled interiors that glow with life.", num: "3", img: "/img/element-03.jpeg" },
  { name: "Vayu", title: "Air", desc: "Breath and openness — cross-ventilation and generous balconies.", num: "4", img: "/img/element-04.jpeg" },
  { name: "Aakash", title: "Space", desc: "Room to breathe — well-proportioned homes and open sky views.", num: "5", img: "/img/element-05.jpeg" },
];

const TEAM = [
  { initials: "RJ", name: "Rajesh Jadhav", role: "Founder & Managing Director", bio: "Two decades in Pune real estate, with a builder's obsession for doing things properly." },
  { initials: "SP", name: "Sneha Patil", role: "Director — Design & Architecture", bio: "Leads the design language that gives every T5E address its distinctive character." },
  { initials: "AK", name: "Amit Kulkarni", role: "Head — Quality & Construction", bio: "Guards the build standard on site, from foundation to final finish." },
  { initials: "PD", name: "Priya Deshpande", role: "Head — Sales & Customer Relations", bio: "Your first point of contact — here to make the buying journey clear and calm." },
  { initials: "VM", name: "Vikram Mehta", role: "Head — Projects & Planning", bio: "Keeps every project on programme without ever compromising on quality." },
  { initials: "NR", name: "Neha Rao", role: "Legal & RERA Compliance", bio: "Ensures every approval, document and disclosure is in order and up to date." },
];

export default function AboutPage() {
  return (
    <main className="bg-[#1C2B1E] text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4 block">About T5E</span>
          <h1 className="font-playfair text-6xl md:text-8xl font-light mb-8 leading-[0.95]">Fewer homes,<br />made better.</h1>
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase">Home / About</p>
        </div>
        <div className="relative h-[500px] w-full">
          <Image src="/img/chaitanya-1.jpeg" alt="T5E Architecture" fill className="object-cover" />
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[450px]">
          <Image src="/img/vishwa-1.jpeg" alt="Our Story" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-6">Our Story</h2>
          <p className="text-2xl font-light text-white/80 leading-relaxed">
            T5E was founded on a conviction that has become rare in real estate — that a home is a deeply personal thing, and deserves to be designed like one. Rather than chase scale, we deliberately keep our portfolio small so that every project receives the attention it deserves.
          </p>
        </div>
      </section>

      {/* The Elements */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-12">The Name: Why "T5E"?</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {ELEMENTS.map((el) => (
            <div key={el.name} className="group relative h-[400px] overflow-hidden border border-white/10">
              <Image src={el.img} alt={el.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <span className="text-white/30 text-2xl font-playfair mb-2">{el.num}</span>
                <h3 className="text-xl font-playfair">{el.title}</h3>
                <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest mb-2">{el.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promise & Principles */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid md:grid-cols-2 gap-8">
        <div className="bg-[#233325] p-12">
          <h2 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-6">Our Promise</h2>
          <h3 className="text-3xl font-playfair mb-8">Quality is not negotiable.</h3>
          <ul className="space-y-4 text-white/70">
            <li>• Sound engineering and quality-checked materials.</li>
            <li>• Finishes that endure — chosen for years, not months.</li>
            <li>• Full transparency — RERA-compliant documentation.</li>
          </ul>
        </div>
        <div className="relative h-full min-h-[400px]">
          <Image src="/img/apex-1.jpeg" alt="Quality Promise" fill className="object-cover" />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-white/10 py-12">
        {[{n: "4", l: "Signature Projects"}, {n: "2", l: "Pune Micro-markets"}, {n: "100%", l: "Design-Led"}, {n: "RERA", l: "Compliant"}].map((s, i) => (
          <div key={i}>
            <div className="text-4xl font-playfair text-[#C9A84C] mb-2">{s.n}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Team & Gallery */}
      <section className="max-w-7xl mx-auto px-6 mb-32 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-12">The People</h2>
          <div className="space-y-8">
            {TEAM.map((member) => (
              <div key={member.initials} className="border-b border-white/10 pb-8">
                <div className="text-2xl font-playfair text-[#C9A84C] mb-2">{member.initials}</div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-[#C9A84C] text-[10px] uppercase tracking-widest mb-2">{member.role}</p>
                <p className="text-white/50 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[300px]"><Image src="/img/chaitanya-2.jpeg" alt="Project" fill className="object-cover" /></div>
          <div className="relative h-[300px] mt-12"><Image src="/img/vishwa-2.jpeg" alt="Project" fill className="object-cover" /></div>
          <div className="relative h-[300px]"><Image src="/img/element-06.jpeg" alt="Project" fill className="object-cover" /></div>
          <div className="relative h-[300px] mt-12"><Image src="/img/element-07.jpeg" alt="Project" fill className="object-cover" /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6">
        <h2 className="text-3xl font-playfair mb-6">Come See For Yourself</h2>
        <p className="text-white/60 mb-10 max-w-md mx-auto">Arrange a private visit to any of our sites at a time that suits you.</p>
        <Link href="/#contact" className="px-10 py-4 bg-[#C9A84C] text-[#1C2B1E] uppercase tracking-widest text-sm hover:bg-white transition-all">
          Arrange a Visit
        </Link>
      </section>
    </main>
  );
}