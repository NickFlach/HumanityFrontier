import { Twitter, Github, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#4cc9f0]/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="quantum-shield bg-[#7b2cbf]/20 w-8 h-8 flex items-center justify-center">
              <div className="quantum-shield bg-[#4cc9f0]/30 w-5 h-5"></div>
            </div>
            <span className="font-space text-sm text-[#4cc9f0]">QUANTUM SHIELD INITIATIVE</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">
              <span className="sr-only">Discord</span>
              <MessageSquare className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-[#4cc9f0]/10 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-xs text-[#4cc9f0]/60">&copy; {new Date().getFullYear()} Quantum Aegis Initiative. All rights encrypted.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-[#4cc9f0]/60 hover:text-[#4cc9f0] transition-colors">Quantum Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
