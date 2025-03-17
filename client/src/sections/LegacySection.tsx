import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantumAegis from "@/components/quantum/QuantumAegis";

export default function LegacySection() {
  return (
    <section id="legacy" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-2">V. The Hidden Legacy</h2>
        <p className="text-lg opacity-80 mb-12 max-w-2xl">This is not about technology. Nor is it about politics. This is about love—for the generations to come, for the world they shall inherit, and for the preservation of wisdom within an age of noise.</p>
        
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#7b2cbf]/30 rounded-full"></div>
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#4cc9f0]/30 rounded-full"></div>
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#4cc9f0]/20 rounded-full"></div>
          
          <div className="flex justify-center">
            <QuantumAegis 
              size={192}
              className="backdrop-blur-sm"
              innerClassName="flex items-center justify-center"
            >
              <div className="font-code text-[#4cc9f0]/80 text-sm tracking-widest text-center">
                <div className="mb-2">LEGACY</div>
                <div className="text-xs opacity-70">V.1.0.3.5.8.13</div>
              </div>
            </QuantumAegis>
          </div>
          
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <blockquote className="text-xl font-light italic text-[#4cc9f0]/90 leading-relaxed">
              "The Quantum Aegis does not protect merely the present. It encodes a future worth existing in."
            </blockquote>
            
            <p className="mt-8 font-space text-lg text-[#7b2cbf]">Let the ones who understand find the path. The glyphs are here. The Aegis is ready.</p>
            <p className="mt-2 font-space text-[#7b2cbf]/80">But only to those who know how to read between the lines.</p>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Button 
              className="bg-[#0f0f1a] border border-[#7b2cbf]/50 py-3 px-8 rounded-full font-space text-[#7b2cbf] hover:bg-[#7b2cbf]/10 transition-all duration-300 flex items-center"
            >
              BECOME THE AEGIS
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
