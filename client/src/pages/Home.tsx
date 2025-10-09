import HeroSection from "@/sections/HeroSection";
import EnigmaSection from "@/sections/EnigmaSection";
import GlyphsSection from "@/sections/GlyphsSection";
import PreventionSection from "@/sections/PreventionSection";
import CipherSection from "@/sections/CipherSection";
import LegacySection from "@/sections/LegacySection";
import ConclusionSection from "@/sections/ConclusionSection";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EnigmaSection />
      <GlyphsSection />
      <PreventionSection />
      <CipherSection />
      <LegacySection />
      <ConclusionSection />
      <Footer />
    </>
  );
}
