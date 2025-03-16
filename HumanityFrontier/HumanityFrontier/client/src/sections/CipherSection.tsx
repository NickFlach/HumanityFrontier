import { useState } from "react";
import { Send, BookText, MoveHorizontal, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import CipherVisualization from "@/components/quantum/CipherVisualization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CipherFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CipherFeature({ icon, title, description }: CipherFeatureProps) {
  return (
    <div className="flex">
      <div className="w-12 h-12 rounded-full bg-[#7b2cbf]/20 flex items-center justify-center mr-4 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-space text-[#7b2cbf] mb-2">{title}</h4>
        <p className="opacity-80">{description}</p>
      </div>
    </div>
  );
}

export default function CipherSection() {
  const [cipherInput, setCipherInput] = useState("");
  const { toast } = useToast();

  const handleCipherSubmit = async () => {
    if (!cipherInput.trim()) {
      toast({
        title: "Please enter a cipher input",
        description: "Your personal cipher cannot be empty",
        variant: "destructive"
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/exploration", {
        userId: "anonymous", // In a real app, this would be the authenticated user's ID
        cipherInput,
        sectionExplored: "individual-cipher"
      });

      toast({
        title: "Cipher Processed",
        description: "Your personal cipher has been analyzed and visualized",
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Could not process your cipher input",
        variant: "destructive"
      });
    }
  };

  const features = [
    {
      icon: <BookText className="w-6 h-6 text-[#7b2cbf]" />,
      title: "Linguistic Alchemy",
      description: "A way to rewrite one's narrative in unseen frequencies."
    },
    {
      icon: <MoveHorizontal className="w-6 h-6 text-[#7b2cbf]" />,
      title: "Strategic Autonomy",
      description: "The art of moving without being moved."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#7b2cbf]" />,
      title: "Meta-Conscious Synchronization",
      description: "Finding alignment in the dissonance of reality."
    }
  ];

  return (
    <section id="cipher" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2d3748]/10 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-2">IV. The Individual Cipher</h2>
        <p className="text-lg opacity-80 mb-12 max-w-2xl">But what of the personal? A world saved is nothing if the self is lost. The Quantum Shield does not merely safeguard civilizations—it safeguards the traveler within.</p>
        
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2">
            <div className="bg-[#0f0f1a]/50 border border-[#4cc9f0]/20 p-8 rounded-xl backdrop-blur-sm h-full">
              <h3 className="font-space text-xl text-[#7b2cbf] mb-6">To the seeker of self, it offers:</h3>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <CipherFeature key={index} {...feature} />
                ))}
              </div>
              
              <p className="font-space text-lg text-[#4cc9f0]/80 mt-8">We are both the shield and the wielder. The key and the lock.</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-[#0f0f1a]/50 border border-[#4cc9f0]/20 p-8 rounded-xl backdrop-blur-sm h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7b2cbf]/10 rounded-full -mt-32 -mr-32"></div>
              
              <h3 className="font-space text-xl text-[#4cc9f0] mb-6 relative z-10">Personal Cipher Visualization</h3>
              
              <div className="h-72 relative">
                <CipherVisualization input={cipherInput} />
              </div>
              
              <div className="mt-6 relative z-10">
                <label className="block font-space text-sm text-[#4cc9f0]/80 mb-2">Your Cipher Input:</label>
                <div className="flex">
                  <Input 
                    type="text" 
                    placeholder="Enter your personal cipher..." 
                    className="bg-[#0f0f1a] border border-[#4cc9f0]/30 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-[#4cc9f0]/70 text-white placeholder-[#4cc9f0]/40" 
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                  />
                  <Button 
                    className="ml-2 bg-[#4cc9f0]/20 hover:bg-[#4cc9f0]/40 transition-colors rounded-lg px-4 flex items-center"
                    onClick={handleCipherSubmit}
                  >
                    <Send className="w-5 h-5 text-[#4cc9f0]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
