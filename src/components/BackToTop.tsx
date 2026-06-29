"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={isHovered ? { opacity: 1, y: -8 } : { opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 bg-[#FAF8F5] dark:bg-[#111111] text-[#B08A5A] dark:text-[#E6D0B3] text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1.5 rounded border border-black/8 dark:border-white/12 shadow-xl backdrop-blur-sm select-none pointer-events-none whitespace-nowrap"
          >
            Back to Top
          </motion.span>

          {/* Floating Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{
              y: -3,
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-14 h-14 rounded-full bg-[#FAF8F5] dark:bg-[#111111] border border-black/8 dark:border-white/12 flex items-center justify-center text-[#B08A5A] dark:text-[#E6D0B3] shadow-2xl backdrop-blur-md focus:outline-none group clickable hover:bg-[#F3EFE8] dark:hover:bg-[#161616] hover:border-[#B08A5A] dark:hover:border-[#E6D0B3] hover:shadow-[0_0_15px_rgba(176,138,90,0.4)] dark:hover:shadow-[0_0_15px_rgba(230,208,179,0.4)] transition-[background-color,border-color,transform,box-shadow] duration-300"
            aria-label="Back to top"
          >
            <motion.div
              variants={{
                hover: { y: -3 },
                initial: { y: 0 }
              }}
              animate={isHovered ? "hover" : "initial"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ArrowUp size={20} strokeWidth={1.5} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
