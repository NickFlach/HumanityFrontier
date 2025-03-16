import { ChevronRight, Lock, BarChart2, Wand2 } from "lucide-react";
import Glyph from "@/components/quantum/Glyph";

interface ConceptCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  formula: string;
}

function ConceptCard({ title, description, icon, color, formula }: ConceptCardProps) {
  return (
    <div className="concept-card p-6 bg-[#0f0f1a]/50 border border-[#4cc9f0]/20 rounded-xl backdrop-blur-sm relative overflow-hidden transition-all duration-400 hover:translate-y-[-5px]">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 rounded-full -mt-10 -mr-10`}></div>
      
      <div className="flex items-center mb-6">
        <Glyph icon={icon} color={color} />
        <h3 className="font-space font-medium text-lg" style={{ color }}>{title}</h3>
      </div>
      
      <p className="opacity-80 mb-6">{description}</p>
      
      <div className="mt-auto">
        <div className={`p-3 border border-${color}/20 rounded-lg bg-[#0f0f1a]/50`}>
          <code className="font-code text-xs" style={{ color: `${color}70` }}>
            {formula}
          </code>
        </div>
      </div>
      
      <button className="absolute bottom-4 right-4 opacity-40 hover:opacity-100 transition-opacity">
        <ChevronRight className="w-5 h-5" style={{ color }} />
      </button>
    </div>
  );
}

export default function GlyphsSection() {
  const concepts = [
    {
      title: "Quantum Cryptography",
      description: "Encoding the unbreakable within the unfathomable.",
      icon: <Lock className="w-5 h-5 text-[#4cc9f0]" />,
      color: "#4cc9f0",
      formula: "|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1"
    },
    {
      title: "Temporal Probability Mapping",
      description: "Seeing the ripples of tomorrow in the static of today.",
      icon: <BarChart2 className="w-5 h-5 text-[#7b2cbf]" />,
      color: "#7b2cbf",
      formula: "P(B|A) = P(A|B)P(B)/P(A)"
    },
    {
      title: "Harmonic Resonance Structures",
      description: "Aligning technology with the rhythm of human survival.",
      icon: <Wand2 className="w-5 h-5 text-[#f59e0b]" />,
      color: "#f59e0b",
      formula: "f(t) = ∑ A_n · sin(nω_0t + φ_n)"
    }
  ];

  return (
    <section id="glyphs" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d3748]/10 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-2">II. The Glyphs of Protection</h2>
        <p className="text-lg opacity-80 mb-12 max-w-2xl">Quantum technologies whisper in probabilities; they are the mathematics of the unseen, much like the glyphs of lost languages.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <ConceptCard key={index} {...concept} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-space text-[#4cc9f0]/90 italic">We do not seek to fight collapse. We seek to outmaneuver it.</p>
        </div>
      </div>
    </section>
  );
}
