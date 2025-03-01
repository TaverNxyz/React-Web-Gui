
import React, { useRef, useEffect } from "react";
import { MapPin } from "lucide-react";

interface MiniMapProps {
  isActive: boolean;
  entities: any[];
}

export const MiniMap: React.FC<MiniMapProps> = ({ isActive, entities }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw map background
    ctx.fillStyle = '#0A0A0C';
    ctx.fillRect(0, 0, width, height);
    
    if (!isActive) {
      return;
    }
    
    // Draw map floor plan
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 2;
    
    // Draw outer walls
    ctx.beginPath();
    ctx.rect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
    ctx.stroke();
    
    // Draw inner walls and rooms
    // Room 1
    ctx.beginPath();
    ctx.rect(width * 0.1, height * 0.1, width * 0.3, height * 0.3);
    ctx.stroke();
    
    // Room 2
    ctx.beginPath();
    ctx.rect(width * 0.1, height * 0.4, width * 0.2, height * 0.3);
    ctx.stroke();
    
    // Room 3
    ctx.beginPath();
    ctx.rect(width * 0.4, height * 0.4, width * 0.2, height * 0.3);
    ctx.stroke();
    
    // Room 4
    ctx.beginPath();
    ctx.rect(width * 0.6, height * 0.1, width * 0.3, height * 0.3);
    ctx.stroke();
    
    // Room 5
    ctx.beginPath();
    ctx.rect(width * 0.7, height * 0.4, width * 0.2, height * 0.5);
    ctx.stroke();
    
    // Center corridor
    ctx.beginPath();
    ctx.rect(width * 0.3, height * 0.4, width * 0.1, height * 0.3);
    ctx.stroke();
    
    // Draw player position (center)
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.fill();
    
    // Draw player vision cone
    const coneAngle = 45 * (Math.PI / 180); // 45 degrees in radians
    const coneLength = width * 0.2;
    
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.5);
    ctx.arc(width * 0.5, height * 0.5, coneLength, -coneAngle/2, coneAngle/2);
    ctx.closePath();
    
    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.5, 0,
      width * 0.5, height * 0.5, coneLength
    );
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw entities on map
    entities.forEach(entity => {
      // Convert radar coordinates to map coordinates
      const mapX = (entity.x / 200 + 0.5) * width;
      const mapY = (entity.y / 200 + 0.5) * height;
      
      // Draw entity
      ctx.beginPath();
      ctx.arc(mapX, mapY, 4, 0, Math.PI * 2);
      ctx.fillStyle = entity.type === 'hostile' ? 'rgba(255, 50, 50, 0.8)' : 'rgba(50, 255, 50, 0.8)';
      ctx.fill();
    });
    
  }, [isActive, entities]);
  
  // Resize canvas to match container
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
          <MapPin size={48} className="text-cyan-400/40 mb-4" />
          <p className="text-cyan-400/80 text-xl font-semibold">Map Offline</p>
          <p className="text-cyan-400/60 text-sm mt-2">Activate system to view map</p>
        </div>
      )}
    </div>
  );
};
