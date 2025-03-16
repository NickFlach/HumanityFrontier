import { useEffect, useRef } from 'react';

interface QuantumVisualizationProps {
  id: string;
  color?: string;
  speed?: number;
  className?: string;
}

export default function QuantumVisualization({ 
  id, 
  color = 'rgba(76, 201, 240, 0.3)', 
  speed = 10000,
  className
}: QuantumVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const numCircles = 15;
    const circles: HTMLDivElement[] = [];
    
    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement('div');
      circle.style.position = 'absolute';
      circle.style.width = `${Math.random() * 30 + 10}px`;
      circle.style.height = circle.style.width;
      circle.style.backgroundColor = color;
      circle.style.borderRadius = '50%';
      circle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      circle.style.left = `${Math.random() * 100}%`;
      circle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(circle);
      circles.push(circle);
      
      // Animation
      function animate() {
        const duration = Math.random() * speed + (speed / 2);
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const opacity = Math.random() * 0.3 + 0.1;
        
        const animation = circle.animate([
          { transform: 'translate(0, 0)', opacity: circle.style.opacity },
          { transform: `translate(${x}px, ${y}px)`, opacity: opacity.toString() }
        ], {
          duration,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          fill: 'forwards'
        });
        
        animation.onfinish = animate;
      }
      
      animate();
    }
    
    return () => {
      circles.forEach(circle => circle.remove());
    };
  }, [color, speed]);
  
  return (
    <div
      ref={containerRef}
      id={id}
      className={className || "h-full w-full"}
    />
  );
}
