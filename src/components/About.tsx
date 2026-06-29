"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen } from "lucide-react";
import { YoutubeIcon as Youtube, InstagramIcon as Instagram } from "./BrandIcons";

function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const stats = [
    {
      id: "stat-1",
      label: "YouTube",
      targetNumber: 945,
      suffix: "+ Subscribers",
      sub: "PS Art Work",
      icon: <Youtube className="text-red-500" size={20} />,
      link: "https://youtube.com/@psartwork?si=gSBah6YupK8lemum",
    },
    {
      id: "stat-2",
      label: "Instagram",
      targetNumber: 400,
      suffix: "+ Followers",
      sub: "@ps_art_work_04",
      icon: <Instagram className="text-pink-500" size={20} />,
      link: "https://www.instagram.com/ps_art_work_04/",
    },
  ];

  const titleWords = "Behind the Pencil: Parth Prajapati".split(" ");

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Section Heading with Split-Text Animation */}
        <div className="flex flex-col mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            The Artist & Educator
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground flex flex-wrap gap-x-3 gap-y-1">
            {titleWords.map((word, i) => (
              <span key={i} className="block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            className="w-16 h-[1px] bg-gold-500 mt-6 origin-left"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image with clipping mask reveal */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full p-4 bg-card border border-border shadow-xl rounded-sm"
            >
              <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800"
                  alt="Parth Prajapati's Art Studio Workspace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-500" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-500" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-500" />
            </motion.div>
          </div>

          {/* Right Column: Bio & Brand Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6"
              >
                "Every drawing begins with observation, patience, and passion."
              </motion.h3>
              
              {/* Line-by-Line Staggered Paragraph Reveal */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.3
                    }
                  }
                }}
                className="space-y-6 text-foreground/70 leading-[1.8] font-light text-lg md:text-xl"
              >
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                >
                  I am Parth Prajapati, a self-driven drawing artist from India with a passion for creating realistic and expressive artworks. My artistic journey began in 2023, focusing on graphite, charcoal, and colour pencil drawings.
                </motion.p>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                >
                  Over time, I have explored portraits, wildlife, mythology, nature, and detailed pencil compositions while continuously improving my skills through practice and experimentation.
                </motion.p>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                >
                  Alongside creating artworks, I also teach drawing to students and enjoy helping beginners build confidence in sketching and observation. My goal is to inspire creativity while continuing to grow as an artist.
                </motion.p>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                >
                  Every artwork I create reflects patience, precision, and my love for traditional hand-drawn art.
                </motion.p>
              </motion.div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 w-full">
                {stats.map((stat, index) => (
                  <motion.a
                    href={stat.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5, borderColor: "rgba(212, 175, 55, 0.6)", boxShadow: "0 15px 30px -10px rgba(212, 175, 55, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: true }}
                    transition={{ 
                      default: { duration: 0.8, delay: 0.6 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 0.3 },
                      boxShadow: { duration: 0.3 }
                    }}
                    key={stat.id}
                    className="p-8 glass-card rounded-sm border border-stone-200/40 dark:border-stone-800/40 flex flex-col justify-between hover:text-gold-500 transition-colors duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      {stat.icon}
                      <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-foreground/50 font-semibold uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <div>
                      <div className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2 group-hover:text-gold-500 transition-colors duration-300">
                        <Counter value={stat.targetNumber} />
                        {stat.suffix}
                      </div>
                      <div className="text-[11px] md:text-[12px] tracking-wider text-gold-500 uppercase font-medium">
                        {stat.sub}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
