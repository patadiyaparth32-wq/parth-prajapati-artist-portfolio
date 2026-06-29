"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { InstagramIcon as Instagram } from "./BrandIcons";

export default function InstagramFeed() {
  const feedItems = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600",
      likes: "2,450",
      comments: "142",
      type: "post",
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600",
      likes: "4,120",
      comments: "284",
      type: "reel",
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
      likes: "1,890",
      comments: "98",
      type: "post",
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
      likes: "3,200",
      comments: "167",
      type: "reel",
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600",
      likes: "2,910",
      comments: "115",
      type: "post",
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=600",
      likes: "5,340",
      comments: "410",
      type: "post",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background-secondary border-y border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            Social Showcase
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            Instagram Feed & Reels
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {feedItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
              key={item.id}
              className="group relative aspect-square bg-stone-200 dark:bg-stone-900 overflow-hidden rounded-sm border border-stone-200/40 dark:border-stone-800/40"
            >
              <a
                href="https://instagram.com/ps_art_work_04"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image
                  src={item.image}
                  alt="Instagram artwork preview"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 200px"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <div className="flex items-center text-white text-xs">
                    <Heart size={14} className="fill-current mr-1" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center text-white text-xs">
                    <MessageCircle size={14} className="fill-current mr-1" />
                    <span>{item.comments}</span>
                  </div>
                  {item.type === "reel" && (
                    <div className="absolute top-2 right-2 text-white/80">
                      <span className="text-[8px] tracking-widest font-bold uppercase bg-black/40 px-1.5 py-0.5 rounded-sm">
                        Reel
                      </span>
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://instagram.com/ps_art_work_04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black font-semibold tracking-wider uppercase text-[11px] rounded-sm transition-all duration-300 clickable"
          >
            <Instagram size={14} />
            <span>Follow @ps_art_work_04 (Art)</span>
          </a>
          <a
            href="https://instagram.com/parth__prajapati____o07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border border-foreground/20 text-foreground/80 hover:border-foreground hover:text-foreground font-semibold tracking-wider uppercase text-[11px] rounded-sm transition-all duration-300 clickable"
          >
            <Instagram size={14} />
            <span>Follow @parth__prajapati____o07 (Personal)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
