import { useEffect, useRef } from "react";

interface GeopoliticalMapProps {
  className?: string;
}

export default function GeopoliticalMap({ className }: GeopoliticalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const nodes: HTMLDivElement[] = [];
    
    // Create nodes
    for (let i = 0; i < 20; i++) {
      const node = document.createElement("div");
      node.style.position = "absolute";
      node.style.width = "4px";
      node.style.height = "4px";
      node.style.backgroundColor = "rgba(76, 201, 240, 0.8)";
      node.style.borderRadius = "50%";
      node.style.left = `${Math.random() * 90 + 5}%`;
      node.style.top = `${Math.random() * 90 + 5}%`;
      node.style.boxShadow = "0 0 10px rgba(76, 201, 240, 0.5)";
      
      container.appendChild(node);
      nodes.push(node);
      
      // Pulse animation
      const duration = Math.random() * 3000 + 2000;
      node.animate([
        { opacity: 0.3, boxShadow: "0 0 5px rgba(76, 201, 240, 0.3)" },
        { opacity: 1, boxShadow: "0 0 15px rgba(76, 201, 240, 0.8)" },
        { opacity: 0.3, boxShadow: "0 0 5px rgba(76, 201, 240, 0.3)" }
      ], {
        duration,
        iterations: Infinity
      });
    }
    
    // Create connections between nodes
    const connections: HTMLDivElement[] = [];
    for (let i = 0; i < 15; i++) {
      const node1 = Math.floor(Math.random() * nodes.length);
      let node2 = Math.floor(Math.random() * nodes.length);
      while (node2 === node1) {
        node2 = Math.floor(Math.random() * nodes.length);
      }
      
      const connection = document.createElement("div");
      connection.style.position = "absolute";
      connection.style.backgroundColor = "rgba(76, 201, 240, 0.2)";
      connection.style.height = "1px";
      connection.style.transformOrigin = "left center";
      connection.style.zIndex = "0";
      
      const updateConnection = () => {
        const rect1 = nodes[node1].getBoundingClientRect();
        const rect2 = nodes[node2].getBoundingClientRect();
        
        const containerRect = container.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        connection.style.width = `${length}px`;
        connection.style.left = `${x1}px`;
        connection.style.top = `${y1}px`;
        connection.style.transform = `rotate(${angle}deg)`;
      };
      
      container.appendChild(connection);
      connections.push(connection);
      updateConnection();
      
      // Animate connection opacity
      connection.animate([
        { opacity: 0.1 },
        { opacity: 0.4 },
        { opacity: 0.1 }
      ], {
        duration: Math.random() * 4000 + 3000,
        iterations: Infinity
      });
    }
    
    return () => {
      nodes.forEach(node => node.remove());
      connections.forEach(connection => connection.remove());
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      id="geopolitical-map"
      className={className || "absolute inset-0"}
      style={{
        background: 'linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.7)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
}
