import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The 5 Elements | Where Elements Meet Excellence",
  description:
    "Premium real estate developer in Pune. Crafting exceptional living spaces where the five elements of nature inspire every design.",
  openGraph: {
    title: "The 5 Elements | Where Elements Meet Excellence",
    description:
      "Premium real estate developer in Pune. Crafting exceptional living spaces where the five elements of nature inspire every design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${playfair.variable}
        ${jakarta.variable}
        h-full antialiased scroll-smooth
      `}
    >
      <head>
        {/* Preconnect for Google Fonts performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body
        className="min-h-screen flex flex-col bg-[#1C2B1E] text-white"
        style={{ fontFamily: "var(--font-jakarta, var(--font-geist-sans))" }}
      >
        {/* Luxury scroll progress indicator */}
        <ScrollProgress />

        <Preloader />
        <Navbar />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

/* ── Scroll Progress Bar ──────────────────────────────────── */
function ScrollProgress() {
  return (
    <div
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #c9a84c, #e2c97e, #c9a84c)",
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 9999,
        pointerEvents: "none",
        transition: "transform 80ms linear",
      }}
    />
  );
}