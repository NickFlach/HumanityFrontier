import { cn } from "@/lib/utils";

interface QuantumAegisProps {
  size?: number;
  className?: string;
  animated?: boolean;
  children?: React.ReactNode;
  innerClassName?: string;
}

export default function QuantumAegis({ 
  size = 64, 
  className, 
  animated = true,
  children,
  innerClassName
}: QuantumAegisProps) {
  return (
    <div 
      className={cn(
        "relative quantum-aegis", 
        animated && "animate-pulse-slow",
        className
      )}
      style={{ 
        width: `${size}px`, 
        height: `${size}px` 
      }}
    >
      <div 
        className={cn(
          "absolute inset-0 quantum-aegis bg-[#7b2cbf]/10 border border-[#7b2cbf]/30",
          animated && "animate-pulse-slow"
        )}
      />
      <div 
        className={cn(
          "absolute inset-[4px] quantum-aegis bg-[#4cc9f0]/20 border border-[#4cc9f0]/40",
          animated && "animate-pulse-slow"
        )}
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className={cn(
          "absolute inset-[8px] quantum-aegis bg-gradient-to-br from-[#1a1a2e] to-[#2d3748] flex items-center justify-center",
          innerClassName
        )}
      >
        {children || (
          <div className="font-code text-[#4cc9f0]/80 text-xs tracking-widest">
            ΨQUANTUMΨ
          </div>
        )}
      </div>
    </div>
  );
}