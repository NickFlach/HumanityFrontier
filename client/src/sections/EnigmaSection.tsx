import { Button } from "@/components/ui/button";
import QuantumVisualization from "@/components/quantum/QuantumVisualization";

export default function EnigmaSection() {
  return (
    <section id="enigma" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-8">I. The Unfolding Enigma</h2>
            <div className="space-y-6">
              <p className="opacity-90">Some say knowledge is meant to be read; others know it is meant to be decoded.</p>
              
              <p className="opacity-80">The Quantum Shield does not belong merely to the realm of comprehension, but to that of resonance. It stands as a linguistic obelisk, a living cipher—one that, if unlocked, may guide humanity away from collapse and towards transcendence.</p>
              
              <p className="opacity-90 font-medium text-[#7b2cbf]">This is not just a tool. It is a mechanism for those who listen between the words.</p>
            </div>
            
            <div className="mt-8 flex">
              <Button 
                variant="outline"
                className="group relative overflow-hidden bg-[#0f0f1a] border border-[#7b2cbf]/50 py-2 px-6 rounded-lg font-space text-[#7b2cbf] hover:bg-[#7b2cbf]/10 transition-all duration-300 text-sm"
              >
                <span className="relative z-10">DECODE THE ENIGMA</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7b2cbf] group-hover:w-full transition-all duration-300"></span>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-80 border border-[#4cc9f0]/30 rounded-lg bg-[#0f0f1a]/50 backdrop-blur-sm overflow-hidden relative">
              <div className="quantum-visualization-container absolute inset-0">
                <QuantumVisualization id="enigma-visualization" color="rgba(76, 201, 240, 0.3)" speed={10000} />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0f0f1a] to-transparent">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse mr-2"></span>
                  <span className="font-code text-xs text-[#10b981]">QUANTUM STATE: OBSERVING</span>
                </div>
                <div className="font-code text-xs text-[#4cc9f0]/80 mt-1">
                  ψ(x,t) = A·sin(kx - ωt + φ) * exp(-i·Et/ħ)
                </div>
              </div>
            </div>
            
            <div className="absolute -top-10 -right-10 w-24 h-24 border border-[#7b2cbf]/20 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite] opacity-40">
              <div className="w-20 h-20 border border-[#4cc9f0]/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
