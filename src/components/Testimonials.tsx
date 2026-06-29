"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Auto play logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext(); // Swipe left -> next
    } else if (diff < -50) {
      handlePrev(); // Swipe right -> prev
    }
    setTouchStartX(null);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-background-secondary border-y border-border relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            Voices & Appreciation
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            Collector & Student Stories
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Testimonials Slider */}
        <div 
          className="relative min-h-[300px] flex flex-col items-center justify-center text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gold-500/20 mb-8"
          >
            <Quote size={56} className="fill-current" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Review Text with Staggered Words */}
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-[1.8] max-w-4xl mb-10 flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
                <span>“</span>
                {currentTestimonial.text.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.015, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
                <span>”</span>
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35, type: "spring", stiffness: 120, damping: 15 }}
                  className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-500/30"
                >
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                    sizes="50px"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-left"
                >
                  <h4 className="font-serif text-lg font-semibold text-foreground flex items-center gap-3">
                    {currentTestimonial.name}
                    <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border border-gold-500/25 bg-gold-500/5 text-gold-500 font-medium">
                      {currentTestimonial.category === "client" ? "Collector" : "Student"}
                    </span>
                  </h4>
                  <p className="text-[11px] md:text-[12px] tracking-[0.15em] text-gold-500 uppercase mt-0.5">
                    {currentTestimonial.role}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-6 mt-12">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:border-gold-500 hover:text-gold-500 transition-colors clickable"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs font-serif text-foreground/40">
              {currentIndex + 1} / {testimonialsData.length}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:border-gold-500 hover:text-gold-500 transition-colors clickable"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
