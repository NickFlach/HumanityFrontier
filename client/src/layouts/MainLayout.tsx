import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen w-full text-white font-sans bg-[#1a1a2e]">
      <style>{`
        :root {
          --font-space: 'Space Grotesk', sans-serif;
          --font-code: 'Fira Code', monospace;
        }
        
        .font-space {
          font-family: var(--font-space);
        }
        
        .font-code {
          font-family: var(--font-code);
        }

        .quantum-aegis {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
      
      {/* Fixed particle background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className={cn("relative z-10")}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
