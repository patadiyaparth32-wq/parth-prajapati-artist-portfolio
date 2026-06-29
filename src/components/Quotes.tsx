"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import quotesData from "@/data/quotes.json";

export default function Quotes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the text layers
  const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Use the third quote (Parth's philosophy) as the main centerpiece
  const featuredQuote = quotesData[2] || quotesData[0];

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden bg-stone-950 text-white"
    >
      {/* Background Dark Textured Graphic */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div style={{ y: yText }} className="flex flex-col items-center">
          {/* Quote Mark */}
          <span className="font-serif text-7xl md:text-9xl text-gold-500/15 leading-none select-none">
            “
          </span>
          
          {/* Quote Text */}
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-light italic text-stone-100 leading-relaxed max-w-4xl -mt-6 md:-mt-12 mb-8">
            {featuredQuote.text}
          </h2>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-gold-550/40 mb-6" />

          {/* Author */}
          <span className="text-[11px] tracking-[0.3em] font-semibold text-gold-500 uppercase">
            {featuredQuote.author}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
