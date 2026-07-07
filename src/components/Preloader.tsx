"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#1C2B1E" }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Outer slow pulse ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 220, height: 220,
              border: "1px solid rgba(201,168,76,0.15)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* SVG spinning arc */}
          <div className="relative flex items-center justify-center mb-10">
            <motion.svg
              width="180" height="180" viewBox="0 0 100 100"
              className="absolute"
              style={{ rotate: -90 }}
            >
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="url(#goldArc)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0.8] }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <defs>
                <linearGradient id="goldArc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e2c97e" />
                  <stop offset="50%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#a8852f" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Logo drop-in */}
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7, duration: 0.9,
                type: "spring", stiffness: 140, damping: 14,
              }}
              className="relative w-20 h-20"
              style={{ filter: "drop-shadow(0 0 16px rgba(201,168,76,0.30))" }}
            >
              <Image src="/logo.avif" alt="The 5 Elements" fill className="object-contain" priority />
            </motion.div>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1
              className="text-[#C9A84C] text-xl tracking-[0.42em] uppercase font-light mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 5 Elements
            </h1>
            <p
              className="text-[9px] tracking-[0.38em] uppercase"
              style={{ color: "rgba(201,168,76,0.38)", fontFamily: "var(--font-jakarta)" }}
            >
              Real Estate · Pune
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px w-24 overflow-hidden rounded-full"
            style={{ background: "rgba(201,168,76,0.12)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #e2c97e, #c9a84c, #a8852f)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}