import { useEffect, useRef, useState } from "react";

interface NodeType {
  x: number;
  y: number;
  radius: number;
  angle: number;
  distance: number;
}

interface CipherVisualizationProps {
  input?: string;
  className?: string;
}

export default function CipherVisualization({ input, className }: CipherVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cipherInput, setCipherInput] = useState(input || "");
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    container.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate hash from input
    const stringToHash = (input || "quantum shield").toLowerCase();
    let hash = 0;
    for (let i = 0; i < stringToHash.length; i++) {
      hash = (hash << 5) - hash + stringToHash.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    // Set seed for pseudo-random generation
    let seedValue = Math.abs(hash);
    const random = () => {
      const x = Math.sin(seedValue) * 10000;
      seedValue++; // Increment after use
      return x - Math.floor(x);
    };
    
    // Draw visualization
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.8;
    
    // Draw circles
    for (let i = 0; i < 5; i++) {
      const radius = maxRadius * (0.2 + i * 0.15);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(123, 44, 191, ${0.1 + i * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw nodes
    const numNodes = 12 + (stringToHash.length % 8);
    const nodes: NodeType[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const angle = random() * Math.PI * 2;
      const distance = random() * maxRadius * 0.8;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const radius = 2 + random() * 4;
      
      nodes.push({ x, y, radius, angle, distance });
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76, 201, 240, ${0.5 + random() * 0.5})`;
      ctx.fill();
    }
    
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      const connections = 1 + Math.floor(random() * 3);
      
      for (let j = 0; j < connections; j++) {
        const targetIndex = Math.floor(random() * nodes.length);
        if (targetIndex !== i) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[targetIndex].x, nodes[targetIndex].y);
          ctx.strokeStyle = `rgba(76, 201, 240, ${0.1 + random() * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    // Animate
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw circles
      for (let i = 0; i < 5; i++) {
        const radius = maxRadius * (0.2 + i * 0.15);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(123, 44, 191, ${0.1 + i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.angle += 0.002 * (i % 2 === 0 ? 1 : -1);
        node.x = centerX + Math.cos(node.angle) * node.distance;
        node.y = centerY + Math.sin(node.angle) * node.distance;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76, 201, 240, ${0.5 + random() * 0.5})`;
        ctx.fill();
      }
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const connections = 1 + Math.floor(seedValue % 3);
        
        for (let j = 0; j < connections; j++) {
          const targetIndex = (i + j + 1) % nodes.length;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[targetIndex].x, nodes[targetIndex].y);
          ctx.strokeStyle = `rgba(76, 201, 240, ${0.1 + random() * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    };
  }, [input]);
  
  return (
    <div 
      ref={containerRef}
      id="cipher-visualization"
      className={className || "absolute inset-0 w-full h-full"}
    />
  );
}
