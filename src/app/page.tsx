import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedMasterpieces from "@/components/FeaturedMasterpieces";
import Gallery from "@/components/Gallery";
import Journey from "@/components/Journey";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Premium Navbar */}
      <Navbar />

      <main className="relative min-h-screen bg-background text-foreground">
        {/* Cinematic Hero Landing */}
        <Hero />

        {/* Validated Contact Form */}
        <Contact />

        {/* Narrative Biography & Stats */}
        <About />

        {/* Immersive Featured Artworks Slider */}
        <FeaturedMasterpieces />

        {/* Complete Gallery */}
        <Gallery />

        {/* Student Works Section */}
        <Gallery
          limitCategory="student"
          hideFilters={true}
          title="Student Works"
          subtitle="Nurturing Creativity & Talent"
          id="student-works"
        />

        {/* Exhibition Section */}
        <Gallery
          limitCategory="exhibition"
          hideFilters={true}
          title="Exhibition"
          subtitle="Art Showcases & Events"
          id="exhibition"
        />

        {/* ScrollTrigger Career Timeline */}
        <Journey />

        {/* Professional Services */}
        <Services />

        {/* Collectors & Students Testimonials */}
        <Testimonials />

        {/* Accordion FAQ */}
        <FAQ />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Premium Back to Top Button */}
      <BackToTop />

      {/* Developer Credit Bar */}
      <div className="w-full min-h-[50px] py-3 bg-[#0A0A0A] border-t border-gold-500/15 flex items-center justify-center text-center px-4">
        <p className="text-[12px] text-white/65 font-light tracking-wide flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
          <span>Designed & Developed by</span>
          <a
            href="https://gmwebstudio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:text-gold-400 font-medium transition-colors duration-300"
          >
            GM Web Studio
          </a>
          <span className="text-[#D4AF37]/40">•</span>
          <span>Gaurav Mandli</span>
          <span className="text-[#D4AF37]/40">•</span>
          <a
            href="mailto:gauravmandli2004@gmail.com"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            gauravmandli2004@gmail.com
          </a>
          <span className="text-[#D4AF37]/40">•</span>
          <a
            href="tel:+917777932591"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            +91 7777932591
          </a>
        </p>
      </div>
    </>
  );
}
