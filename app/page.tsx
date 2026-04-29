import About from "@/components/About";
import MediaSection from "@/components/MediaSection";
import ContactCTA from "@/components/ContactCTA";
import CustomSystemsSection from "@/components/CustomSystemsSection";
import FAQ from "@/components/FAQ";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import DienstenAanpak from "@/components/DienstenAanpak";
import ShowreelSection from "@/components/ShowreelSection";
import TechStackLoop from "@/components/TechStackLoop";
import Testimonials from "@/components/Testimonials";
import ValueStats from "@/components/ValueStats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueStats />
      <CustomSystemsSection />
      <DienstenAanpak />
      <TechStackLoop />
      <FeaturedWork />
      <Testimonials />
      <About />
      <ShowreelSection />
      <MediaSection />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
