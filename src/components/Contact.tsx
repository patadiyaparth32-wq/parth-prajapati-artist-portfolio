"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional().refine(
    (val) => !val || /^[0-9+\s-]{8,15}$/.test(val),
    { message: "Please enter a valid phone number" }
  ),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof contactSchema>;

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea";
  register: any;
  error?: { message?: string };
}

// Reusable Form Field Component to guarantee 100% visual and behavioral consistency
const FormField = ({ id, label, type = "text", register, error }: FormFieldProps) => {
  const isTextarea = type === "textarea";

  return (
    <div className="relative w-full">
      {isTextarea ? (
        <textarea
          id={id}
          placeholder=" "
          {...register}
          className="w-full min-h-[120px] bg-transparent border-b border-foreground/10 py-3 text-sm text-foreground focus:outline-none transition-all duration-300 focus:border-b-2 focus:border-gold-500 resize-none peer"
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder=" "
          {...register}
          className="w-full h-12 bg-transparent border-b border-foreground/10 py-3 text-sm text-foreground focus:outline-none transition-all duration-300 focus:border-b-2 focus:border-gold-500 peer"
        />
      )}
      
      {/* Floating Label (translateY + scale for smooth GPU acceleration) */}
      <label
        htmlFor={id}
        className="absolute left-0 top-0 text-foreground/40 uppercase tracking-wider transition-all duration-300 transform origin-left pointer-events-none text-xs translate-y-[-14px] scale-85 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-14px] peer-focus:scale-85 peer-focus:text-gold-500"
      >
        {label}
      </label>

      {/* Reserved Space for Error Message to prevent layout shifts */}
      <div className="min-h-[20px] mt-1">
        <AnimatePresence initial={false}>
          {error?.message && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-red-500 block"
            >
              {error.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSuccess(false);

    try {
      // 1. Fetch user's public IP
      let ipAddress = "Unknown";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          ipAddress = ipData.ip || "Unknown";
        }
      } catch (ipError) {
        console.error("Failed to fetch IP:", ipError);
      }

      // 2. Detect device type
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
      const device = isMobile ? "Mobile" : "Desktop";

      // 3. Construct payload
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject,
        message: data.message,
        ip: ipAddress,
        browser: userAgent,
        device: device
      };

      // 4. Send to local Next.js API Route (which proxies to Google Apps Script Web App)
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success === true) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errMsg = result.error || result.message || "Failed to submit. Please check your inputs and try again.";
        throw new Error(errMsg);
      }
    } catch (error: any) {
      console.error("Failed to send message:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again, or reach out directly via email or Instagram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Global CSS overrides for Chrome autofill styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        #contact input:-webkit-autofill,
        #contact textarea:-webkit-autofill {
          transition: background-color 5000s ease-in-out 0s !important;
          -webkit-text-fill-color: currentColor !important;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[12px] md:text-[13px] tracking-[0.3em] font-semibold text-gold-500 uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
            Connect with the Artist
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                Let's discuss your vision
              </h3>
              <p className="text-base md:text-lg text-foreground/60 leading-[1.8] font-light mb-10">
                Whether you want to commission a hyperrealistic charcoal portrait, inquire about brand illustrations, enroll in 1-on-1 mentorship, or just say hello—feel free to reach out. I will get back to you within 24 to 48 hours.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F2EB] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 flex items-center justify-center text-gold-500">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1">
                      Call / WhatsApp
                    </span>
                    <a href="tel:+918849898797" className="text-base text-foreground hover:text-gold-500 transition-colors font-medium">
                      +91 88498 98797
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F2EB] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 flex items-center justify-center text-gold-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1">
                      Email Address
                    </span>
                    <a href="mailto:patadiyaparth32@gmail.com" className="text-base text-foreground hover:text-gold-500 transition-colors font-medium">
                      patadiyaparth32@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F2EB] dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 flex items-center justify-center text-gold-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-[11px] tracking-widest text-foreground/40 font-semibold uppercase block mb-1">
                      Location
                    </span>
                    <span className="text-base text-foreground font-medium">
                      Gujarat, India (Available Worldwide)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Note */}
            <div className="mt-12 p-6 border-l border-gold-500 bg-[#F5F2EB] dark:bg-stone-900/40 rounded-sm">
              <p className="text-xs text-foreground/60 leading-relaxed font-light italic">
                “Art is not what you see, but what you make others see. Let's create something timeless together.”
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 rounded-sm border border-stone-200/40 dark:border-stone-850">
              <motion.form 
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-4"
              >
                
                {/* Name */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FormField
                    id="name"
                    label="Your Name *"
                    register={register("name")}
                    error={errors.name}
                  />
                </motion.div>

                {/* Grid: Email & Phone */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    id="email"
                    label="Email Address *"
                    type="email"
                    register={register("email")}
                    error={errors.email}
                  />
                  <FormField
                    id="phone"
                    label="Phone Number (Optional)"
                    register={register("phone")}
                    error={errors.phone}
                  />
                </motion.div>

                {/* Subject */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FormField
                    id="subject"
                    label="Subject *"
                    register={register("subject")}
                    error={errors.subject}
                  />
                </motion.div>

                {/* Message */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <FormField
                    id="message"
                    label="Your Message *"
                    type="textarea"
                    register={register("message")}
                    error={errors.message}
                  />
                </motion.div>

                {/* Alert Messages */}
                <AnimatePresence mode="wait">
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      className="text-xs text-red-500 p-3 bg-red-500/10 rounded-sm mb-4"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-xs text-emerald-500 p-3 bg-emerald-500/10 rounded-sm flex items-center space-x-2 mb-4"
                    >
                      <CheckCircle size={14} />
                      <span>Your message has been sent successfully! Parth will contact you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.01, boxShadow: "0 15px 30px rgba(197, 168, 128, 0.2)" }}
                    whileTap={isSubmitting ? {} : { scale: 0.99 }}
                    className="w-full h-14 bg-gold-gradient text-black font-semibold tracking-[0.15em] uppercase text-[13px] rounded-sm flex items-center justify-center relative hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 clickable focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center justify-center space-x-2"
                        >
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending message...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center justify-center space-x-2"
                        >
                          <Send size={14} />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>

              </motion.form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
