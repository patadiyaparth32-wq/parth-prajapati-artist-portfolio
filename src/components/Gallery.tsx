"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, CornerDownRight, Eye } from "lucide-react";
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

interface GalleryProps {
  limitCategory?: string;
  hideFilters?: boolean;
  title?: string;
  subtitle?: string;
  id?: string;
}

export default function Gallery({
  limitCategory,
  hideFilters = false,
  title = "Complete Gallery",
  subtitle = "Online Exhibition",
  id = "gallery"
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [prevGalleryFilter, setPrevGalleryFilter] = useState("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All", value: "all" },
    { id: "masterpiece", label: "Masterpieces", value: "masterpiece" },
    { id: "pencil", label: "Pencil", value: "pencil" },
    { id: "colour", label: "Colour", value: "colour" },
    { id: "exhibition", label: "Exhibitions", value: "exhibition" }
  ];

  // Calculate count of actual gallery artworks (Masterpieces + Pencil + Colour only)
  const galleryArtworksCount = (galleryData as Artwork[]).filter((art) =>
    art.categories.some((cat) => ["masterpiece", "pencil", "colour"].includes(cat))
  ).length;

  // Handle filter button clicks
  const handleFilterClick = (categoryValue: string) => {
    if (categoryValue === "exhibition") {
      setSelectedCategory("exhibition");
      const exhibitionSection = document.getElementById("exhibition");
      if (exhibitionSection) {
        exhibitionSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setSelectedCategory(categoryValue);
      setPrevGalleryFilter(categoryValue);
    }
  };

  // Sync active filter button with page scroll
  useEffect(() => {
    if (hideFilters) return;

    const galleryEl = document.getElementById("gallery");
    const exhibitionEl = document.getElementById("exhibition");

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px",
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "exhibition") {
            setSelectedCategory("exhibition");
          } else if (entry.target.id === "gallery") {
            setSelectedCategory(prevGalleryFilter);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (galleryEl) observer.observe(galleryEl);
    if (exhibitionEl) observer.observe(exhibitionEl);

    return () => {
      observer.disconnect();
    };
  }, [hideFilters, prevGalleryFilter]);

  // Helper for premium display labels
  const getCategoryLabel = (categoryValue: string) => {
    const mapping: Record<string, string> = {
      masterpiece: "Masterpiece",
      pencil: "Pencil",
      colour: "Colour",
      student: "Student Work",
      exhibition: "Exhibition",
      other: "Other"
    };
    return mapping[categoryValue] || categoryValue;
  };

  // Base artworks is all artworks if no limitCategory is specified, or pre-filtered if limitCategory is set
  const baseArtworks = limitCategory
    ? (galleryData as Artwork[]).filter((art) => art.categories.includes(limitCategory))
    : (galleryData as Artwork[]);

  // Filtered artworks:
  // - If selectedCategory is "exhibition", we keep showing the previously selected gallery filter
  const activeFilter = selectedCategory === "exhibition" ? prevGalleryFilter : selectedCategory;

  // Filtered artworks:
  // - If we are in "All" tab (activeFilter === "all") and no limitCategory is set, we exclude student and exhibition.
  // - Otherwise, we filter by the active category.
  const filteredArtworks = limitCategory
    ? baseArtworks
    : activeFilter === "all"
      ? baseArtworks.filter((art) => !art.categories.includes("student") && !art.categories.includes("exhibition"))
      : baseArtworks.filter((art) => art.categories.includes(activeFilter));

  const openLightbox = (id: string) => {
    const index = filteredArtworks.findIndex((art) => art.id === id);
    if (index !== -1) {
      setActiveImageIndex(index);
      document.body.style.overflow = "hidden"; // Lock scroll
    }
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = "unset"; // Unlock scroll
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredArtworks.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredArtworks.length) % filteredArtworks.length);
    }
  };

  const handleInquire = (title: string) => {
    closeLightbox();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const subjectInput = document.querySelector("#subject") as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${title}`;
      }
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentLightboxArt = activeImageIndex !== null ? filteredArtworks[activeImageIndex] : null;

  return (
    <section id={id} className="py-24 md:py-32 bg-background-secondary border-t border-border relative overflow-hidden w-full">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            {title}
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Category Filters */}
        {!hideFilters && (
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 max-w-4xl">
            {categories.map((cat) => {
              const isAll = cat.value === "all";
              const count = isAll ? galleryArtworksCount : 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilterClick(cat.value)}
                  className={`px-5 py-2.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-widest rounded-sm border transition-all duration-300 clickable ${
                    selectedCategory === cat.value
                      ? "bg-gold-500 text-black border-gold-500 shadow-md"
                      : "bg-transparent border-foreground/10 text-foreground/80 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat.label}{isAll ? ` (${count})` : ""}
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Perfectly Aligned Grid */}
        <div className="w-full flex justify-center">
          <motion.div 
            layout
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((art) => (
                <motion.div
                  key={art.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.96 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    },
                    exit: { 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.96,
                      transition: { duration: 0.4 }
                    },
                    hover: {
                      y: -6,
                      borderColor: "rgba(197, 168, 128, 0.3)",
                      boxShadow: "0 25px 50px -12px rgba(197, 168, 128, 0.15)",
                      transition: { duration: 0.4, ease: "easeOut" }
                    }
                  }}
                  whileHover="hover"
                  onClick={() => openLightbox(art.id)}
                  className="w-full bg-card rounded-2xl overflow-hidden border border-border shadow-md transition-all duration-550 group cursor-pointer flex flex-col h-[460px] md:h-[480px]"
                >
                  {/* Artwork Image Container */}
                  <div className="relative w-full h-[320px] md:h-[340px] overflow-hidden">
                    <motion.div 
                      className="w-full h-full relative"
                      variants={{
                        visible: { scale: 1, filter: "brightness(1)" },
                        hover: { 
                          scale: 1.05, 
                          filter: "brightness(1.1)",
                          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                    >
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </motion.div>
                    
                    {/* Hover Overlay with CTA */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <motion.div
                        variants={{
                          hover: { scale: 1, opacity: 1, y: 0 },
                          visible: { scale: 0.9, opacity: 0, y: 10 }
                        }}
                        className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] tracking-widest font-semibold uppercase flex items-center space-x-2 shadow-lg"
                      >
                        <Eye size={12} />
                        <span>
                          {limitCategory === "student"
                            ? "View Student Work"
                            : limitCategory === "exhibition"
                              ? "View Exhibition"
                              : "View Artwork"}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Details (Fixed Height) */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-transparent dark:bg-stone-900/20">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] md:text-[11px] tracking-[0.2em] font-bold text-gold-500 uppercase">
                          {getCategoryLabel(art.categories[0])}
                        </span>
                        {art.year && (
                          <span className="text-[10px] md:text-[11px] text-foreground/40 font-light">
                            {art.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-light text-foreground group-hover:text-gold-500 transition-colors duration-300 line-clamp-1">
                        {art.title}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/50 font-light line-clamp-1 mt-2">
                      {art.medium}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors z-50 clickable"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation Left */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors z-50 clickable"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Navigation Right */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors z-50 clickable"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Main Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-6xl max-h-[90vh] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center overflow-y-auto lg:overflow-visible bg-stone-900/40 p-6 md:p-10 rounded-sm border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Large Image */}
              <div className="lg:col-span-7 flex justify-center items-center h-[350px] md:h-[500px] lg:h-[600px] relative">
                <div className="relative w-full h-full max-w-[500px] p-4 bg-stone-950 border border-white/10 flex items-center justify-center">
                  <div className="w-full h-full bg-[#fbfaf8] p-3 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full relative">
                      <Image
                        src={currentLightboxArt.image}
                        alt={currentLightboxArt.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 600px"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Details & Story */}
              <div className="lg:col-span-5 text-white flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-[10px] tracking-[0.2em] font-semibold text-gold-500 uppercase border border-gold-500/30 px-2 py-0.5 rounded-sm">
                    {getCategoryLabel(currentLightboxArt.categories[0])}
                  </span>
                  <span className={`text-[9px] tracking-widest uppercase font-semibold ${
                    currentLightboxArt.status === "Available" ? "text-emerald-400" : "text-rose-500 dark:text-rose-400"
                  }`}>
                    • {currentLightboxArt.status}
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-light mb-4 tracking-tight leading-tight">
                  {currentLightboxArt.title}
                </h3>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 text-sm">
                  <div>
                    <span className="text-[9px] tracking-widest text-white/40 font-semibold uppercase block mb-1">
                      Medium
                    </span>
                    <span className="text-stone-300 font-light">
                      {currentLightboxArt.medium}
                    </span>
                  </div>
                  {currentLightboxArt.size && (
                    <div>
                      <span className="text-[9px] tracking-widest text-white/40 font-semibold uppercase block mb-1">
                        Dimensions
                      </span>
                      <span className="text-stone-300 font-light">
                        {currentLightboxArt.size}
                      </span>
                    </div>
                  )}
                  <div className="mt-2">
                    <span className="text-[9px] tracking-widest text-white/40 font-semibold uppercase block mb-1">
                      Year
                    </span>
                    <span className="text-stone-300 font-light">
                      {currentLightboxArt.year}
                    </span>
                  </div>
                  {currentLightboxArt.status && (
                    <div className="mt-2">
                      <span className="text-[9px] tracking-widest text-white/40 font-semibold uppercase block mb-1">
                        Status
                      </span>
                      <span className="text-stone-300 font-light">
                        {currentLightboxArt.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {currentLightboxArt.description && (
                  <div className="mb-8">
                    <h4 className="text-[10px] tracking-widest font-semibold uppercase text-gold-500 mb-2 flex items-center">
                      <CornerDownRight size={10} className="mr-1.5" /> Story behind the art
                    </h4>
                    <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-light">
                      {currentLightboxArt.description}
                    </p>
                  </div>
                )}

                {/* CTA */}
                {currentLightboxArt.status === "Available" && (
                  <div>
                    <button
                      onClick={() => handleInquire(currentLightboxArt.title)}
                      className="w-full py-3.5 bg-gold-gradient text-black font-semibold tracking-wider uppercase text-[10px] rounded-sm hover:opacity-90 transition-opacity clickable"
                    >
                      Inquire About This Piece
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
