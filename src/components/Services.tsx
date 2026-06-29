"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, CheckCircle, User, Flower2, BookOpen } from "lucide-react";
import servicesData from "@/data/services.json";

function ServiceCard({ service, index, getServiceIcon, handleInquireService }: {
  service: any;
  index: number;
  getServiceIcon: (iconName: string) => React.ReactNode;
  handleInquireService: (title: string) => void;
}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -10,
        borderColor: "rgba(197, 168, 128, 0.4)",
        boxShadow: "0 25px 50px -12px rgba(197, 168, 128, 0.2)",
      }}
      className="glass-card p-8 md:p-10 rounded-sm border border-stone-200/40 dark:border-stone-850 flex flex-col justify-between transition-all duration-300 ease-out h-full"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {/* Icon */}
        {getServiceIcon(service.icon)}

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-base text-foreground/60 leading-[1.8] font-light mb-8">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm md:text-base text-foreground/80 font-light">
              <CheckCircle size={14} className="text-gold-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline & CTA */}
      <div className="mt-auto" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center text-sm text-foreground/50 font-medium mb-6">
          <Clock size={14} className="mr-2" />
          <span>Timeline: {service.duration}</span>
        </div>
        
        <motion.button
          onClick={() => handleInquireService(service.title)}
          whileHover={{ scale: 1.02, backgroundColor: "var(--gold-500)", color: "#000000", borderColor: "var(--gold-500)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4.5 bg-transparent border border-foreground/25 text-foreground font-semibold tracking-[0.15em] uppercase text-[12px] rounded-sm transition-all duration-300 clickable"
        >
          {service.buttonText || "Book / Inquire"}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const handleInquireService = (title: string) => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const subjectInput = document.querySelector("#subject") as HTMLInputElement;
      const messageInput = document.querySelector("#message") as HTMLTextAreaElement;
      if (subjectInput) {
        subjectInput.value = `Service Inquiry: ${title}`;
      }
      if (messageInput) {
        messageInput.value = `Hi Parth, I am interested in your "${title}" service. Please share details regarding the pricing, availability, and next steps.`;
      }
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "portrait":
        return <User className="text-gold-500 mb-6" size={32} strokeWidth={1.2} />;
      case "devotional":
        return <Flower2 className="text-gold-500 mb-6" size={32} strokeWidth={1.2} />;
      case "mentorship":
        return <BookOpen className="text-gold-500 mb-6" size={32} strokeWidth={1.2} />;
      default:
        return null;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-background-secondary border-t border-border relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            Collaborate & Learn
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            Artistic Services
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              getServiceIcon={getServiceIcon}
              handleInquireService={handleInquireService}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
