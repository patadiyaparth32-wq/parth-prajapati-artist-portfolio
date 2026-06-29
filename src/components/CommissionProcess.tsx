"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Edit3, ShieldCheck } from "lucide-react";

export default function CommissionProcess() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We discuss the subject, dimensions, and photo references. Once the layout, price, and timeline are finalized, a 50% booking deposit is made.",
      icon: <MessageSquare size={22} className="text-gold-500" />,
    },
    {
      number: "02",
      title: "Conceptual Sketch",
      description: "I create a quick digital or pencil composition draft to finalize the lighting angle and cropping. This ensures we are aligned on the vision before final work.",
      icon: <PenTool size={22} className="text-gold-500" />,
    },
    {
      number: "03",
      title: "Detailed Execution",
      description: "Using premium archival charcoal and graphite on acid-free paper, I spend 20 to 50 hours detailing the piece, sending you mid-progress updates.",
      icon: <Edit3 size={22} className="text-gold-500" />,
    },
    {
      number: "04",
      title: "Fixative & Secure Delivery",
      description: "The drawing is sprayed with a professional fixative, wrapped in protective glassine paper, packed between wooden/foam boards, and shipped worldwide.",
      icon: <ShieldCheck size={22} className="text-gold-500" />,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            The Commission Process
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Steps Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-foreground/10 z-0" />

          {steps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={step.number}
              className="flex flex-col items-start relative z-10 group"
            >
              {/* Step Circle */}
              <div className="w-16 h-16 rounded-full bg-background-secondary border border-border flex items-center justify-center mb-6 shadow-md group-hover:border-accent transition-colors duration-300 relative">
                {step.icon}
                {/* Step Number Badge */}
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black font-serif text-[11px] md:text-[12px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-foreground/60 leading-[1.8] font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
