"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { YoutubeIcon as Youtube, InstagramIcon as Instagram } from "./BrandIcons";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "featured",
      "gallery",
      "student-works",
      "exhibition",
      "journey",
      "services",
      "contact"
    ];

    const intersectingSections = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          intersectingSections.add(id);
        } else {
          intersectingSections.delete(id);
        }
      });

      if (intersectingSections.size === 0) return;

      // Find the section closest to the center of the viewport
      let closestSectionId = "";
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      intersectingSections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestSectionId = id;
          }
        }
      });

      if (closestSectionId) {
        const hash = `#${closestSectionId}`;
        if (hash === "#student-works" || hash === "#exhibition") {
          setActiveSection("#gallery");
        } else if (hash === "#hero") {
          setActiveSection(""); // No menu item highlighted in Hero
        } else {
          setActiveSection(hash);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { name: "Contact", href: "#contact" },
    { name: "About", href: "#about" },
    { name: "Masterpieces", href: "#featured" },
    { name: "Gallery", href: "#gallery" },
    { name: "Journey", href: "#journey" },
    { name: "Services", href: "#services" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-40 transition-[padding,background-color,border-color] duration-300 ${
          isScrolled
            ? "glass-card py-4 border-b border-stone-200/30 dark:border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col text-left group clickable"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.2em] text-foreground transition-colors group-hover:text-gold-500">
              PARTH PRAJAPATI
            </span>
            <span className="text-[10px] tracking-[0.4em] text-gold-500 font-medium uppercase mt-0.5">
              Artist
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative py-2 font-medium tracking-[0.15em] text-foreground/80 hover:text-gold-500 transition-colors uppercase text-[13px] md:text-[14px]"
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Socials & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="https://youtube.com/@psartwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-gold-500 transition-colors clickable"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://instagram.com/ps_art_work_04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-gold-500 transition-colors clickable"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 text-foreground/85 hover:text-gold-500 transition-all clickable"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5 text-foreground/85 hover:text-gold-500 transition-all clickable"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: "-100%" }
        }
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 w-full h-screen bg-background z-30 flex flex-col justify-center px-8 md:hidden"
      >
        <div className="flex flex-col space-y-6 text-center">
          {navItems.map((item, index) => (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="font-serif text-2xl tracking-wider text-foreground hover:text-gold-500 transition-colors uppercase"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMobileMenuOpen ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex justify-center space-x-8 pt-8 border-t border-foreground/10"
          >
            <a
              href="https://youtube.com/@psartwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold-500 transition-colors p-2"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://instagram.com/ps_art_work_04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold-500 transition-colors p-2"
            >
              <Instagram size={24} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
