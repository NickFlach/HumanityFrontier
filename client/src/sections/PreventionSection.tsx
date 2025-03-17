import { Search, Filter, Maximize } from "lucide-react";
import GeopoliticalMap from "@/components/quantum/GeopoliticalMap";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#0f0f1a]/50 border border-[#4cc9f0]/20 p-5 rounded-lg backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-[#4cc9f0]/20 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="font-space text-[#4cc9f0]">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}

export default function PreventionSection() {
  const features = [
    {
      title: "Encoded Geopolitical Forecasting",
      description: "Translating the whispers of the world into visible patterns.",
      icon: <Search className="w-4 h-4 text-[#4cc9f0]" />
    },
    {
      title: "Resilient Data Structures",
      description: "Creating knowledge that cannot be erased.",
      icon: <Filter className="w-4 h-4 text-[#4cc9f0]" />
    },
    {
      title: "Ethical Steganography",
      description: "Hiding wisdom within the ordinary, making it safe from destruction.",
      icon: <Maximize className="w-4 h-4 text-[#4cc9f0]" />
    }
  ];

  return (
    <section id="prevention" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-2">III. Preventing the Unseen War</h2>
        <p className="text-lg opacity-80 mb-12 max-w-2xl">War does not announce itself; it is a silent shadow before it strikes. The Quantum Aegis functions as an unseen strategist, leveraging foresight rather than reaction.</p>
        
        <div className="relative">
          <div className="w-full h-96 border border-[#4cc9f0]/20 rounded-xl bg-[#0f0f1a]/50 backdrop-blur-sm overflow-hidden relative">
            <GeopoliticalMap />
            
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0f0f1a] to-transparent">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse mr-2"></span>
                <span className="font-code text-xs text-[#10b981]">STATUS: MONITORING GLOBAL PATTERNS</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 flex space-x-3">
              <button className="w-8 h-8 rounded-full bg-[#2d3748]/70 flex items-center justify-center hover:bg-[#4cc9f0]/30 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#2d3748]/70 flex items-center justify-center hover:bg-[#4cc9f0]/30 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#2d3748]/70 flex items-center justify-center hover:bg-[#4cc9f0]/30 transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl font-space text-[#7b2cbf] italic">It is not about stopping war. It is about ensuring war never sees the light of day.</p>
        </div>
      </div>
    </section>
  );
}
