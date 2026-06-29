"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
}

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Started the journey into drawing and visual art with a passion for learning. Focused on understanding pencil sketching, observation, shading, and artistic fundamentals through consistent daily practice.",
    },
    {
      year: "2024",
      title: "Growth Through Practice",
      description: "Expanded skills by exploring charcoal, graphite, and colour artworks. Created more detailed compositions, experimented with different subjects, and participated in local exhibitions to gain experience and confidence.",
    },
    {
      year: "2025",
      title: "Teaching & Building Community",
      description: "Started mentoring students and sharing artistic knowledge through drawing classes. Helped young artists improve their creativity while continuing to build a personal portfolio with original artworks.",
    },
    {
      year: "2026",
      title: "Growing as an Artist",
      description: "Continuing to create new artworks, improve techniques, participate in exhibitions, and build a professional artist portfolio. Focused on consistent growth, quality, and reaching a wider audience in the future.",
    },
  ];

  useGSAP(
    () => {
      // Animate the vertical timeline line drawing down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 25%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      // Animate milestones fading in
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-24 md:py-32 bg-background-secondary border-y border-border relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-accent uppercase mb-3">
            His Evolution
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            The Artist's Journey
          </h2>
          <div className="w-16 h-[1px] bg-accent mt-6" />
        </div>

        {/* Timeline Container */}
        <div ref={triggerRef} className="relative w-full">
          {/* Vertical Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full h-full bg-accent origin-top transform scale-y-0"
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-16 md:space-y-24 relative">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className="timeline-item flex flex-col md:flex-row items-stretch w-full"
                >
                  {/* Left Side (Desktop) */}
                  <div className="hidden md:flex items-center justify-end w-1/2 pr-12 text-right">
                    {isEven && (
                      <div className="max-w-xl">
                        <span className="font-serif text-5xl md:text-6xl font-extralight text-accent/85 block mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-base md:text-lg text-foreground-secondary leading-[1.8] font-light">
                          {milestone.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dot in Middle */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-accent -translate-x-1/2 flex items-center justify-center z-10 shadow-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  {/* Right Side / Mobile Layout */}
                  <div className="flex items-center justify-start w-full md:w-1/2 pl-12 md:pl-12">
                    {(!isEven || typeof window !== 'undefined' && window.innerWidth < 768) ? (
                      <div className="max-w-xl">
                        <span className="font-serif text-5xl md:text-6xl font-extralight text-accent/85 block mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-base md:text-lg text-foreground-secondary leading-[1.8] font-light">
                          {milestone.description}
                        </p>
                      </div>
                    ) : (
                      // Spacer for desktop even elements
                      <div className="hidden md:block w-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
