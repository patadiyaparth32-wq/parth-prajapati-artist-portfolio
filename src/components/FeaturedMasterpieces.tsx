"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";
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

export default function FeaturedMasterpieces() {
  const featuredArt = (galleryData as Artwork[]).filter((art) => art.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredArt.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredArt.length) % featuredArt.length);
  };

  const currentArt = featuredArt[currentIndex];

  const handleInquire = (title: string) => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      // Find the subject input and set its value
      const subjectInput = document.querySelector("#subject") as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${title}`;
      }
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="featured" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="flex flex-col">
            <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
              Curated Showcase
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              Featured Masterpieces
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mt-6" />
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center space-x-4 mt-8 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:border-gold-500 hover:text-gold-500 transition-colors clickable"
              aria-label="Previous masterpiece"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="font-serif text-sm tracking-widest text-foreground/50">
              {String(currentIndex + 1).padStart(2, "0")} / {String(featuredArt.length).padStart(2, "0")}
            </span>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-foreground hover:border-gold-500 hover:text-gold-500 transition-colors clickable"
              aria-label="Next masterpiece"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Cinematic Slide Display */}
        <div className="relative min-h-[550px] lg:min-h-[600px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArt.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center"
            >
              {/* Left Column: Huge Framed Artwork with Viewport Slide & Blur Reveal */}
              <motion.div 
                initial={{ opacity: 0, x: -60, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex justify-center"
              >
                <div className="relative w-full max-w-[480px] aspect-[4/5] p-6 bg-stone-100/50 dark:bg-stone-900 rounded-sm artwork-shadow border border-stone-200/60 dark:border-stone-800/80 flex items-center justify-center">
                  {/* Museum Frame Border */}
                  <div className="absolute inset-0 border-[6px] border-neutral-950 shadow-inner rounded-sm" />
                  
                  {/* Matte Board */}
                  <div className="w-full h-full bg-[#fbfaf8] p-4 shadow-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 border border-neutral-200/40" />
                    
                    {/* Inner Drawing */}
                    <div className="w-full h-full relative overflow-hidden gallery-viewable">
                      <Image
                        src={currentArt.image}
                        alt={currentArt.title}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Detailed Storytelling with Staggered Elements */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.1
                    }
                  }
                }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex items-center space-x-4 mb-6"
                >
                  <span className="text-[11px] md:text-[12px] tracking-[0.2em] font-semibold text-gold-500 uppercase border border-gold-500/30 px-2.5 py-0.5 rounded-sm">
                    {currentArt.categories[0].charAt(0).toUpperCase() + currentArt.categories[0].slice(1)}
                  </span>
                  <span className={`text-[10px] md:text-[11px] tracking-widest uppercase font-semibold ${
                    currentArt.status === "Available" ? "text-emerald-500" : "text-rose-500 dark:text-rose-400"
                  }`}>
                    • {currentArt.status}
                  </span>
                </motion.div>

                <motion.h3 
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 tracking-tight leading-tight"
                >
                  {currentArt.title}
                </motion.h3>

                {/* Specs Table */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="grid grid-cols-2 gap-6 py-6 border-y border-foreground/10 mb-8"
                >
                  <div>
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1.5">
                      Medium
                    </span>
                    <span className="text-sm md:text-base text-foreground/80 font-light">
                      {currentArt.medium}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1.5">
                      Dimensions
                    </span>
                    <span className="text-sm md:text-base text-foreground/80 font-light">
                      {currentArt.size}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1.5">
                      Year
                    </span>
                    <span className="text-sm md:text-base text-foreground/80 font-light">
                      {currentArt.year}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1.5">
                      Acquisition
                    </span>
                    <span className="text-sm md:text-base text-foreground/80 font-light">
                      {currentArt.status === "Available" ? "Available for Purchase" : "Private Collection"}
                    </span>
                  </div>
                </motion.div>

                {/* The Story */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="mb-10"
                >
                  <h4 className="text-sm md:text-base tracking-widest font-semibold uppercase text-gold-500 mb-3 flex items-center">
                    <CornerDownRight size={14} className="mr-2" /> Behind the Masterpiece
                  </h4>
                  <p className="text-base md:text-lg text-foreground/70 leading-[1.8] font-light">
                    {currentArt.description}
                  </p>
                </motion.div>

                {/* Action Button */}
                {currentArt.status === "Available" && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                  >
                    <motion.button
                      onClick={() => handleInquire(currentArt.title)}
                      whileHover={{ scale: 1.03, backgroundColor: "var(--gold-500)", color: "#000000", borderColor: "var(--gold-500)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-5 bg-transparent border border-gold-500 text-gold-500 font-semibold tracking-[0.15em] uppercase text-[13px] rounded-sm transition-all duration-300 clickable"
                    >
                      Inquire About This Piece
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
