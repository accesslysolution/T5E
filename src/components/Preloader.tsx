"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Total duration set to 2.8s to allow all animations to complete gracefully
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C2B1E]"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Logo & Circle Container */}
          <div className="relative flex items-center justify-center mb-8">
            {/* The Continuous Doodle Circle */}
            <motion.svg
              width="180"
              height="180"
              viewBox="0 0 100 100"
              className="absolute"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ 
                  pathLength: [0, 1, 1], 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                }}
              />
            </motion.svg>

            {/* The Logo that 'Drops' into the center */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8, 
                type: "spring", 
                stiffness: 150, 
                damping: 10 
              }}
              className="relative w-20 h-20"
            >
              <Image
                src="/logo.avif"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Premium Golden Text Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.5, 
              duration: 1, 
              ease: "easeOut" 
            }}
            className="text-center"
          >
            <h1 
              className="text-[#C9A84C] text-xl tracking-[0.4em] uppercase font-light"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 5 Elements
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}