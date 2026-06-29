"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { YoutubeIcon as Youtube, InstagramIcon as Instagram } from "./BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#FAF8F4] dark:bg-stone-950 text-stone-600 dark:text-stone-400 py-16 border-t border-stone-200 dark:border-white/5 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-200 dark:border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex flex-col text-left group mb-6"
            >
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-stone-900 dark:text-white transition-colors group-hover:text-gold-500">
                PARTH PRAJAPATI
              </span>
              <span className="text-[10px] tracking-[0.4em] text-gold-500 font-medium uppercase mt-0.5">
                Artist
              </span>
            </a>
            <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed font-light max-w-sm">
              Professional drawing artist, fine art educator, and content creator. Capturing depth and emotion in charcoal and graphite. Mentoring the next generation of artists.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-stone-900 dark:text-white text-xs font-semibold tracking-widest uppercase mb-6">
              Exhibition Hub
            </h4>
            <ul className="space-y-3.5 text-xs font-light">
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#gallery");
                  }}
                  className="relative pb-0.5 text-stone-600 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-500 transition-colors group inline-block"
                >
                  Complete Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a
                  href="#tutorials"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#tutorials");
                  }}
                  className="relative pb-0.5 text-stone-600 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-500 transition-colors group inline-block"
                >
                  Drawing Tutorials
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#services");
                  }}
                  className="relative pb-0.5 text-stone-600 dark:text-stone-400 hover:text-gold-500 dark:hover:text-gold-500 transition-colors group inline-block"
                >
                  Artistic Services
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Contact Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="text-stone-900 dark:text-white text-xs font-semibold tracking-widest uppercase mb-6">
              Connect Globally
            </h4>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href="https://youtube.com/@psartwork"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors clickable"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </motion.a>
              <motion.a
                href="https://instagram.com/ps_art_work_04"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/20 transition-colors clickable"
                aria-label="Instagram Art"
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a
                href="mailto:patadiyaparth32@gmail.com"
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-gold-500/10 hover:text-gold-500 hover:border-gold-500/20 transition-colors clickable"
                aria-label="Email"
              >
                <Mail size={16} />
              </motion.a>
            </div>
            <p className="text-xs text-stone-550 dark:text-stone-500 leading-relaxed font-light">
              Direct inquiries:{" "}
              <a href="mailto:patadiyaparth32@gmail.com" className="text-stone-700 dark:text-stone-300 hover:text-gold-500 transition-colors">
                patadiyaparth32@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-stone-500 dark:text-stone-600 font-light">
          <p>
            &copy; {currentYear} Parth Prajapati. All rights reserved. Designed with passion.
          </p>
          
          <button
            onClick={scrollToTop}
            className="mt-6 sm:mt-0 flex items-center space-x-2 text-stone-500 hover:text-gold-500 transition-colors focus:outline-none group clickable"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <span className="p-1 rounded-full border border-stone-200 dark:border-stone-800 group-hover:border-gold-500/30 transition-colors">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>

      </motion.div>
    </footer>
  );
}
