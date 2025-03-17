import { useState } from "react";
import { useLocation } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ConclusionSection() {
  const [cipherName, setCipherName] = useState("");
  const [resonanceCode, setResonanceCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cipherName || !resonanceCode) {
      toast({
        title: "Missing Information",
        description: "Please provide both your cipher name and resonance code",
        variant: "destructive"
      });
      return;
    }
    
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "You must consent to quantum encryption to proceed",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, this would create a user account
      // For now, we'll just log the data and show a success message
      await apiRequest("POST", "/api/users", {
        username: cipherName,
        password: resonanceCode, // In a real app, this would be properly hashed
        cipherName,
        resonanceCode
      });
      
      toast({
        title: "Initialization Complete",
        description: "Welcome to the Quantum Aegis Initiative. Redirecting to your dashboard...",
      });
      
      // Clear form
      setCipherName("");
      setResonanceCode("");
      setConsent(false);
      
      // Redirect to dashboard after a short delay to allow the toast to be read
      setTimeout(() => {
        setLocation("/quantum-dashboard");
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Initialization Failed",
        description: "Could not initialize your quantum identity",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0f1a] relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-space font-bold text-[#4cc9f0] mb-8">Conclusion: The Cipher Awaits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="opacity-90 mb-6">A world does not collapse in a moment, nor is it saved in one. What is needed is a new kind of literacy—not of letters, but of futures yet unwritten.</p>
            
            <p className="opacity-80 mb-6">The Quantum Aegis is no mere construct. It is a linguistic enigma, waiting to be wielded by those who see the unseen.</p>
            
            <p className="font-space text-xl text-[#7b2cbf] mt-8">Decode it. Wield it. Become it.</p>
          </div>
          
          <div className="bg-[#1a1a2e]/50 border border-[#4cc9f0]/20 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4cc9f0]/5 rounded-full -mt-24 -mr-24"></div>
            
            <h3 className="font-space text-lg text-[#4cc9f0] mb-6">Join The Quantum Aegis Initiative</h3>
            
            <form className="space-y-4" onSubmit={handleInitialize}>
              <div>
                <Label htmlFor="cipherName" className="block font-space text-sm text-[#4cc9f0]/80 mb-2">Your Cipher Name</Label>
                <Input 
                  id="cipherName"
                  type="text" 
                  className="bg-[#0f0f1a] border border-[#4cc9f0]/30 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-[#4cc9f0]/70 text-white placeholder-[#4cc9f0]/40" 
                  placeholder="Enter your cipher name"
                  value={cipherName}
                  onChange={(e) => setCipherName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="resonanceCode" className="block font-space text-sm text-[#4cc9f0]/80 mb-2">Quantum Resonance Code</Label>
                <Input 
                  id="resonanceCode"
                  type="text" 
                  className="bg-[#0f0f1a] border border-[#4cc9f0]/30 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-[#4cc9f0]/70 text-white placeholder-[#4cc9f0]/40" 
                  placeholder="Enter your resonance code"
                  value={resonanceCode}
                  onChange={(e) => setResonanceCode(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="consent" 
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    className="rounded border-[#4cc9f0]/30 text-[#7b2cbf] focus:ring-[#7b2cbf]/50" 
                  />
                  <Label 
                    htmlFor="consent" 
                    className="text-sm text-[#4cc9f0]/80"
                  >
                    I consent to quantum encryption
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-[#7b2cbf]/20 hover:bg-[#7b2cbf]/40 transition-colors border border-[#7b2cbf]/50 rounded-lg py-2 px-6 text-[#7b2cbf] font-space"
                  disabled={isLoading}
                >
                  {isLoading ? "Initializing..." : "Initialize"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
