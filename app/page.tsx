import dynamic from "next/dynamic";
import type { Metadata } from "next";
import About from "@/components/About";
import MediaSection from "@/components/MediaSection";
import ContactCTA from "@/components/ContactCTA";
import CustomSystemsSection from "@/components/CustomSystemsSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import DienstenAanpak from "@/components/DienstenAanpak";
import TechStackLoop from "@/components/TechStackLoop";
import Testimonials from "@/components/Testimonials";
import ValueStats from "@/components/ValueStats";

const FeaturedWork = dynamic(() => import("@/components/FeaturedWork"));
const ShowreelSection = dynamic(() => import("@/components/ShowreelSection"));

export const metadata: Metadata = {
  title: "Tinsights | Professioneel Webdesign & SEO in Nederland",
  description:
    "Tinsights bouwt snelle, professionele websites voor Nederlandse ondernemers. Webdesign, SEO, hosting en meer. Gevestigd in Groningen, actief door heel Nederland.",
  openGraph: {
    title: "Tinsights | Webdesign & SEO Bureau Nederland",
    description: "Professionele websites voor Nederlandse ondernemers. Snel, betaalbaar en SEO geoptimaliseerd.",
    url: "https://tinsights.nl",
    siteName: "Tinsights",
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "https://tinsights.nl",
  },
  robots: { index: true, follow: true },
};

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
