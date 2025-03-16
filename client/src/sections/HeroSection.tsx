import { useState, useEffect } from "react";
import QuantumShield from "@/components/quantum/QuantumShield";
import QuantumVisualization from "@/components/quantum/QuantumVisualization";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToExplore = () => {
    const enigmaSection = document.getElementById("enigma");
    if (enigmaSection) {
      enigmaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a1a2e] opacity-90"></div>
        <QuantumVisualization id="hero-particles" color="rgba(76, 201, 240, 0.3)" speed={15000} className="absolute inset-0" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-space font-bold mb-6 leading-tight">
          <span className="text-[#4cc9f0]">Quantum Shield:</span> The Ciphered Aegis of a New Dawn
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90 mb-10 max-w-2xl mx-auto">
          Before there were alphabets, before ink met parchment, there were symbols cast in shadow, and tongues that spoke in spirals.
        </p>
        
        <div className="flex justify-center">
          <div className="relative w-64 h-64 animate-[float_3s_ease-in-out_infinite]">
            <QuantumShield size={256} />
          </div>
        </div>
        
        <div className="mt-12">
          <Button 
            onClick={() => scrollToExplore()}
            className="bg-[#0f0f1a] border border-[#4cc9f0]/50 py-3 px-8 rounded-full font-space text-[#4cc9f0] hover:bg-[#4cc9f0]/20 transition-all duration-300 flex items-center mx-auto"
          >
            DECODE THE CIPHER
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p className="text-sm text-[#4cc9f0]/80 font-code mb-2">Scroll to Explore</p>
        <ChevronDown className="w-6 h-6 mx-auto animate-bounce text-[#4cc9f0]/80" />
      </div>
    </section>
  );
}
