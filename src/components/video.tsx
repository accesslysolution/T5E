'use client';

import { motion, Variants } from 'framer-motion';

export default function VideoShowcase() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="relative w-full bg-white py-24 px-6 md:px-12 overflow-hidden rounded-3xl mx-2 my-2">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#1C2B1E]/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Text Content */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[#c9a84c]"></span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#c9a84c]">
              The Signature Collection
            </span>
          </motion.div>
          
          <motion.h2 
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C2B1E] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Experience <br/> True Elegance
          </motion.h2>

          <motion.p 
            variants={fadeUpVariant}
            className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg max-w-md"
          >
            Step inside our most exclusive developments. Every corner is meticulously crafted to blend modern architectural brilliance with the tranquil elements of nature. Watch the vision come to life.
          </motion.p>

          <motion.div variants={fadeUpVariant}>
            <button className="relative px-8 py-3 text-xs tracking-[0.2em] uppercase font-semibold text-white bg-[#1C2B1E] overflow-hidden group rounded-full transition-shadow hover:shadow-lg hover:shadow-[#1C2B1E]/20">
              <span className="relative z-10">View Full Gallery</span>
              <span className="absolute inset-0 bg-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Video Container */}
        <motion.div 
          className="lg:col-span-7 w-full relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Outer elegant frame */}
          <div className="relative p-2 md:p-3 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(28,43,30,0.15)] border border-gray-100">
            {/* Aspect ratio wrapper for responsive video */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 group">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uR4dbOCN2s4?start=21&rel=0&modestbranding=1"
                title="T5E Signature Collection Showcase"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              ></iframe>
            </div>
            
            {/* Decorative Gold Accent on the corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#c9a84c] rounded-br-3xl z-[-1]"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#c9a84c] rounded-tl-3xl z-[-1]"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}