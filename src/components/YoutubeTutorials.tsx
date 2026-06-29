"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Eye } from "lucide-react";
import { YoutubeIcon as Youtube } from "./BrandIcons";
import tutorialsData from "@/data/tutorials.json";

export default function YoutubeTutorials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideo = (id: string) => {
    setActiveVideoId(id);
    document.body.style.overflow = "hidden"; // Lock scroll
  };

  const closeVideo = () => {
    setActiveVideoId(null);
    document.body.style.overflow = "unset"; // Unlock scroll
  };

  return (
    <section id="tutorials" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="flex flex-col">
            <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
              Learn the Craft
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
              YouTube Drawing Tutorials
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mt-6" />
          </div>
          
          <a
            href="https://youtube.com/@psartwork"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-base tracking-[0.12em] font-semibold text-red-500 hover:text-red-600 transition-colors uppercase mt-6 md:mt-0 border-b border-red-500/25 pb-1.5 clickable"
          >
            <Youtube size={16} />
            <span>Visit PS Art Work Channel</span>
          </a>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutorialsData.map((tutorial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={tutorial.id}
              onClick={() => openVideo(tutorial.videoId)}
              className="group cursor-pointer flex flex-col bg-card border border-border rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 video-playable"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-stone-250 dark:bg-stone-950">
                <Image
                  src={`https://img.youtube.com/vi/${tutorial.videoId}/hqdefault.jpg`}
                  alt={tutorial.title}
                  fill
                  className="object-cover transition-transform duration-750 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-gold-500/90 text-black flex items-center justify-center shadow-lg group-hover:bg-white transition-colors duration-300"
                  >
                    <Play size={24} className="fill-current ml-1" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 text-[10px] text-white font-medium rounded-sm">
                  {tutorial.duration}
                </div>

                {/* Level Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-gold-500 text-black text-[9px] font-bold tracking-widest uppercase rounded-sm">
                  {tutorial.level}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <h3 className="font-serif text-xl md:text-2xl font-light text-foreground group-hover:text-gold-500 transition-colors mb-5 leading-snug">
                  {tutorial.title}
                </h3>
                <div className="flex items-center text-[11px] md:text-[12px] text-foreground/50 font-semibold tracking-wider uppercase mt-auto">
                  <Eye size={14} className="mr-1.5" /> {tutorial.views} Views
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeVideo}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors z-50 clickable"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-4xl aspect-[16/9] bg-black rounded-sm overflow-hidden shadow-2xl border border-white/5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
