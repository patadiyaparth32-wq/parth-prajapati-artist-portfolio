"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import galleryData from "@/data/gallery.json";

interface Artwork {
  id: string;
  title: string;
  categories: string[];
  medium: string;
  size?: string;
  year: string;
  image: string;
  description: string;
  featured?: boolean;
  status?: string;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find the specific masterpiece for the Hero section ("Colors of Auspicious Beginnings")
  const masterpiece = (galleryData as Artwork[]).find(
    (art) => art.id === "masterpiece-4" || art.title === "Colors of Auspicious Beginnings"
  );
  
  const fallbackMasterpiece: Artwork = {
    id: "masterpiece-4",
    title: "Colors of Auspicious Beginnings",
    categories: ["masterpiece", "colour"],
    medium: "Color Pencil on Paper",
    year: "2024",
    image: "/images/gallery/ganesha.jpg",
    description: "This contemporary portrayal of Lord Ganesha combines vibrant colors with traditional symbolism to represent wisdom, prosperity, and new beginnings."
  };

  const selectedMasterpiece = masterpiece || fallbackMasterpiece;
  
  // Motion values for parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Parallax transforms for different layers
  const x1 = useTransform(mouseX, [0, 1], [-10, 10]);
  const y1 = useTransform(mouseY, [0, 1], [-10, 10]);
  const x2 = useTransform(mouseX, [0, 1], [-20, 20]);
  const y2 = useTransform(mouseY, [0, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    
    // Update spotlight position via CSS custom properties for high performance
    containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
    containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paragraphWords = "Experience hyperrealistic charcoal and graphite drawings by Parth Prajapati (Artist). Merging traditional fine art, cinematic storytelling, and academic drawing mentorship.".split(" ");

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-20"
      style={{
        backgroundImage: "radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight), transparent 80%)"
      }}
    >
      {/* Background Decorative Grid/Abstract Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Typography Content (approx 58% width) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-[11px] tracking-[0.3em] font-semibold text-gold-500 uppercase">
              Immersive Digital Art Exhibition
            </span>
          </motion.div>

          {/* Main Title with Split-Text Simulation */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-foreground mb-5 max-w-lg">
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(8px)", letterSpacing: "0.1em" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                Capturing the
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1 font-italic italic font-normal">
              <motion.span
                initial={{ y: "100%", opacity: 0, scale: 0.96 }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  backgroundPosition: ["100% 0", "-100% 0"]
                }}
                transition={{ 
                  y: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
                  opacity: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
                  scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
                  backgroundPosition: { delay: 1.6, duration: 2.5, ease: "easeInOut" }
                }}
                style={{
                  backgroundImage: "linear-gradient(120deg, #b8976a 0%, #c5a880 25%, #e0d0b8 50%, #c5a880 75%, #8a6537 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                className="block text-shadow-sm"
              >
                Soul of Silence
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
                className="block"
              >
                in Black & White.
              </motion.span>
            </span>
          </h1>

          {/* Description with Staggered Words */}
          <div className="text-base md:text-lg text-foreground/60 max-w-xl mb-8 leading-[1.8] font-light flex flex-wrap gap-x-1.5 gap-y-0.5">
            {paragraphWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + i * 0.02, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Call To Actions with Spring & Hover Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1.5 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <motion.button
              onClick={() => scrollToSection("#gallery")}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(197, 168, 128, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gold-gradient text-black font-semibold tracking-[0.15em] uppercase text-[13px] rounded-sm hover:opacity-90 transition-all shadow-lg clickable"
            >
              Enter Exhibition
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(197,168,128,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-transparent border border-foreground/25 text-foreground font-semibold tracking-[0.15em] uppercase text-[13px] rounded-sm transition-all clickable"
            >
              Commission Artwork
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column: Floating Masterpiece Frame with Parallax & Breathing (approx 42% width) */}
        <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ x: x1, y: y1 }}
            className="relative w-[340px] h-[460px] md:w-[460px] md:h-[625px] p-8 md:p-10 bg-stone-100/50 dark:bg-stone-900 rounded-sm artwork-shadow border border-stone-200/60 dark:border-stone-800 flex items-center justify-center select-none"
          >
            {/* Breathing Wrapper */}
            <motion.div
              className="w-full h-full flex items-center justify-center relative"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
            >
              {/* The Outer Museum Frame */}
              <div className="absolute inset-0 border-[10px] border-neutral-900 shadow-inner rounded-sm" />
              
              {/* Matte Board */}
              <div className="w-full h-full bg-[#fcfbf9] p-6 shadow-md flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border border-neutral-200/50" />
                
                {/* Inner Drawing */}
                <div className="w-full h-full relative overflow-hidden group">
                  <Image
                    src={selectedMasterpiece.image}
                    alt={`Featured masterpiece - ${selectedMasterpiece.title}`}
                    fill
                    priority
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Museum Caption Label (Floating Layer 2) */}
            <motion.div
              style={{ x: x2, y: y2 }}
              className="absolute -bottom-6 -right-6 md:-right-10 glass-card px-5 py-3.5 border border-stone-200/50 dark:border-white/10 shadow-xl min-w-[180px] max-w-[240px]"
            >
              <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-1">
                {selectedMasterpiece.title}
              </h3>
              <p className="text-[8px] tracking-[0.2em] text-gold-500 uppercase mt-1 font-bold">
                MASTERPIECE
              </p>
              <p className="text-[10px] text-foreground/50 mt-0.5 line-clamp-1">
                {selectedMasterpiece.medium}
              </p>
              <p className="text-[10px] text-foreground/40 font-light mt-0.5">
                {selectedMasterpiece.year}
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Scroll Indicator - Infinite Elegant Bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 2.4, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        onClick={() => scrollToSection("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer hover:opacity-100 transition-opacity z-10"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-light text-foreground mb-2">
          Scroll to explore
        </span>
        <div>
          <ArrowDown size={14} className="text-gold-500" />
        </div>
      </motion.div>
    </section>
  );
}
