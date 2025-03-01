
import React, { useRef, useEffect } from "react";
import { Crosshair, Target } from "lucide-react";

interface RadarDisplayProps {
  isActive: boolean;
  range: number;
  zoomLevel: number;
  entities: any[];
}

export const RadarDisplay: React.FC<RadarDisplayProps> = ({ 
  isActive, 
  range, 
  zoomLevel,
  entities
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw radar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.9;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw radar background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    
    // Draw horizontal and vertical lines
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Draw circular radar boundary and rings
    for (let i = 1; i <= 3; i++) {
      const radius = (maxRadius / 3) * i;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = i === 3 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 240, 255, 0.15)';
      ctx.stroke();
      
      // Draw range label
      if (isActive) {
        const rangeLabel = Math.round((range / 3) * i).toString();
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.font = '10px monospace';
        ctx.fillText(rangeLabel + 'm', centerX + radius - 20, centerY - 5);
      }
    }
    
    // Draw scanning line if active
    if (isActive) {
      const time = Date.now() / 1000;
      const angle = (time % 4) * (Math.PI / 2);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw radar "glow" along the scan line
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, angle - 0.2, angle + 0.2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw entities
    entities.forEach(entity => {
      const scaleFactor = maxRadius / range;
      const entityX = centerX + entity.x * scaleFactor * zoomLevel;
      const entityY = centerY + entity.y * scaleFactor * zoomLevel;
      
      // Skip if outside display area
      if (entityX < 0 || entityX > width || entityY < 0 || entityY > height) {
        return;
      }
      
      // Draw entity
      ctx.beginPath();
      ctx.arc(entityX, entityY, 4, 0, Math.PI * 2);
      ctx.fillStyle = entity.type === 'hostile' ? 'rgba(255, 50, 50, 0.8)' : 'rgba(50, 255, 50, 0.8)';
      ctx.fill();
      
      // Draw entity "ping" animation
      const pingSize = ((Date.now() % 2000) / 2000) * 15 + 5;
      ctx.beginPath();
      ctx.arc(entityX, entityY, pingSize, 0, Math.PI * 2);
      ctx.strokeStyle = entity.type === 'hostile' ? 'rgba(255, 50, 50, 0.3)' : 'rgba(50, 255, 50, 0.3)';
      ctx.stroke();
      
      // Draw heading line
      const headingRad = (entity.heading * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(entityX, entityY);
      ctx.lineTo(
        entityX + Math.cos(headingRad) * 12,
        entityY + Math.sin(headingRad) * 12
      );
      ctx.strokeStyle = entity.type === 'hostile' ? 'rgba(255, 50, 50, 0.8)' : 'rgba(50, 255, 50, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw crosshair in center
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 1;
    
    const crosshairSize = 10;
    ctx.beginPath();
    // Top
    ctx.moveTo(centerX, centerY - crosshairSize);
    ctx.lineTo(centerX, centerY - 2);
    // Right
    ctx.moveTo(centerX + crosshairSize, centerY);
    ctx.lineTo(centerX + 2, centerY);
    // Bottom
    ctx.moveTo(centerX, centerY + crosshairSize);
    ctx.lineTo(centerX, centerY + 2);
    // Left
    ctx.moveTo(centerX - crosshairSize, centerY);
    ctx.lineTo(centerX - 2, centerY);
    ctx.stroke();
    
  }, [isActive, range, zoomLevel, entities]);
  
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
          <Target size={48} className="text-cyan-400/40 mb-4" />
          <p className="text-cyan-400/80 text-xl font-semibold">System Inactive</p>
          <p className="text-cyan-400/60 text-sm mt-2">Activate to begin scanning</p>
        </div>
      )}
    </div>
  );
};
