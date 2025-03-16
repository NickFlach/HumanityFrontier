import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlyphProps {
  icon: ReactNode;
  color: string;
  className?: string;
  size?: number;
}

export default function Glyph({ icon, color, className, size = 40 }: GlyphProps) {
  return (
    <div className={cn("glyph relative mr-4", className)}>
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center",
          `bg-${color}/20`
        )}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`
        }}
      >
        {icon}
      </div>
      <div 
        className="absolute inset-0 border border-current rounded-full opacity-30 animate-spin-slow"
        style={{ 
          color,
          animationDuration: "8s"
        }}
      />
      <div 
        className="absolute inset-[4px] border border-current rounded-full opacity-50 animate-spin-slow"
        style={{ 
          color,
          animationDuration: "4s",
          animationDirection: "reverse"
        }}
      />
    </div>
  );
}
