import { useEffect, useRef } from "react";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles: Particle[] = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const element = document.createElement("div");
      element.classList.add(
        "absolute", 
        "rounded-full", 
        "bg-[#4cc9f0]/30",
        "bg-gradient-radial",
        "from-[#4cc9f0]/40",
        "to-transparent"
      );
      
      const size = Math.random() * 5 + 2;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      
      const opacity = Math.random() * 0.5 + 0.2;
      element.style.opacity = opacity.toString();
      
      container.appendChild(element);
      
      const speed = Math.random() * 0.5 + 0.1;
      const angle = Math.random() * Math.PI * 2;
      
      particles.push({
        element,
        x,
        y,
        size,
        speed,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animate = () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary check
        if (particle.x < 0) {
          particle.x = 100;
          particle.element.style.opacity = "0";
          setTimeout(() => {
            particle.element.style.opacity = particle.opacity.toString();
          }, 100);
        } else if (particle.x > 100) {
          particle.x = 0;
          particle.element.style.opacity = "0";
          setTimeout(() => {
            particle.element.style.opacity = particle.opacity.toString();
          }, 100);
        }
        
        if (particle.y < 0) {
          particle.y = 100;
          particle.element.style.opacity = "0";
          setTimeout(() => {
            particle.element.style.opacity = particle.opacity.toString();
          }, 100);
        } else if (particle.y > 100) {
          particle.y = 0;
          particle.element.style.opacity = "0";
          setTimeout(() => {
            particle.element.style.opacity = particle.opacity.toString();
          }, 100);
        }
        
        // Update element position
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      particlesRef.current.forEach(particle => {
        particle.element.remove();
      });
      particlesRef.current = [];
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none opacity-30 z-0"
      id="particle-container"
    />
  );
}
