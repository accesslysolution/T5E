import Hero from "@/components/Hero";
import StatsBand from "@/components/Statsband";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Legacy from "@/components/Legacy";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    // We remove the fragment <> and wrap in a div if needed for specific page-level padding,
    // though the current structure is perfect for full-width sections.
    <div className="flex flex-col w-full">
      <Hero />
      <StatsBand />
      <Philosophy />
      <Projects />
      <Legacy />
      <Contact />
    </div>
  );
}