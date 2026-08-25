import Hero from "@/components/Hero";
import StatsBand from "@/components/Statsband";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Legacy from "@/components/Legacy";
import Contact from "@/components/Contact";
import VideoShowcase from "@/components/Videoshowcase";

export default function Home() {
  return (
    /*
     * Each section is independently responsible for its own
     * scroll-reveal animations via Framer Motion (whileInView).
     * This wrapper is intentionally minimal — sections breathe
     * at their own pace.
     */
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <VideoShowcase />
      <StatsBand />
      <Projects />
      <Philosophy />
      <Legacy />
      <Contact />
    </div>
  );
}