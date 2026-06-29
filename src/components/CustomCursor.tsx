"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "play" | "view">("default");
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const hoverable = target.closest("a, button, [role='button'], .clickable");
      const playable = target.closest(".video-playable");
      const viewable = target.closest(".gallery-viewable");

      if (viewable) {
        setCursorType("view");
      } else if (playable) {
        setCursorType("play");
      } else if (hoverable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-gold-500 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 custom-cursor pointer-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: cursorType === "hover" ? 48 : cursorType === "play" || cursorType === "view" ? 72 : 24,
        height: cursorType === "hover" ? 48 : cursorType === "play" || cursorType === "view" ? 72 : 24,
        backgroundColor: cursorType === "play" || cursorType === "view" ? "rgba(197, 168, 128, 0.15)" : "rgba(197, 168, 128, 0)",
        borderColor: cursorType === "hover" ? "#ffffff" : "#c5a880",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {cursorType === "play" && (
        <span className="text-[9px] tracking-widest text-gold-400 font-semibold uppercase">Play</span>
      )}
      {cursorType === "view" && (
        <span className="text-[9px] tracking-widest text-gold-400 font-semibold uppercase">View</span>
      )}
    </motion.div>
  );
}
