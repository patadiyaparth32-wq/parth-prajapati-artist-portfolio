"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import resourcesData from "@/data/learning_resources.json";

export default function LearningResources() {
  const handleAccess = (title: string, price: string) => {
    if (price === "Free") {
      // If it's free, we can scroll to the contact section and pre-fill it for them
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        const subjectInput = document.querySelector("#subject") as HTMLInputElement;
        const messageInput = document.querySelector("#message") as HTMLTextAreaElement;
        if (subjectInput) {
          subjectInput.value = `Request Free Resource: ${title}`;
        }
        if (messageInput) {
          messageInput.value = `Hi Parth, I would love to receive a copy of your free resource "${title}". Please send it to my email. Thank you!`;
        }
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If premium, scroll to contact and inquire
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        const subjectInput = document.querySelector("#subject") as HTMLInputElement;
        const messageInput = document.querySelector("#message") as HTMLTextAreaElement;
        if (subjectInput) {
          subjectInput.value = `Inquiry: ${title} Course`;
        }
        if (messageInput) {
          messageInput.value = `Hi Parth, I'm interested in enrolling in your "${title}" course. Please share the details regarding syllabus, pricing, and batch availability.`;
        }
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="resources" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Abstract glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[11px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            Academic Hub
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-foreground">
            Learning Resources & Courses
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourcesData.map((resource, index) => (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={resource.id}
              className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image Banner */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-950">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 350px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
                
                {/* Price Badge */}
                <div className={`absolute top-4 right-4 px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-sm ${
                  resource.price === "Free" ? "bg-emerald-500 text-white" : "bg-gold-500 text-black"
                }`}>
                  {resource.price}
                </div>

                {/* Resource Type */}
                <div className="absolute bottom-4 left-4 text-[10px] text-white/90 font-medium uppercase tracking-wider flex items-center">
                  <BookOpen size={12} className="mr-1.5 text-gold-500" />
                  {resource.type}
                </div>
              </div>

              {/* Resource Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-xl font-light text-foreground mb-4 group-hover:text-gold-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed font-light mb-8">
                    {resource.description}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleAccess(resource.title, resource.price)}
                  className={`w-full py-3.5 rounded-sm font-semibold tracking-wider uppercase text-[10px] flex items-center justify-center space-x-2 transition-all duration-300 clickable ${
                    resource.price === "Free"
                      ? "bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5"
                      : "bg-gold-gradient text-black hover:opacity-90 shadow-md shadow-gold-500/5"
                  }`}
                >
                  {resource.price === "Free" ? (
                    <>
                      <Download size={13} />
                      <span>Get Free PDF</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink size={13} />
                      <span>Enroll in Masterclass</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
