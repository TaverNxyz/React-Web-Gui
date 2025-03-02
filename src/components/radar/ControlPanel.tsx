
import React from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Compass, Target, Crosshair } from "lucide-react";

interface ControlPanelProps {
  isActive: boolean;
  range: number;
  setRange: (value: number) => void;
  zoomLevel: number;
  setZoomLevel: (value: number) => void;
  entities: any[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  range,
  setRange,
  zoomLevel,
  setZoomLevel,
  entities
}) => {
  // Calculate recent nearest entity
  const nearestEntity = entities.length > 0
    ? entities.reduce((nearest, current) => 
        current.distance < nearest.distance ? current : nearest, 
        entities[0])
    : null;
    
  return (
    <>
      <Card className="neo-blur p-4 rounded-lg">
        <h3 className="text-lg font-medium text-cyan mb-4 flex items-center gap-2">
          <Crosshair size={16} />
          Radar Controls
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-cyan-400/70">Range</label>
              <span className="text-sm font-mono text-cyan-400">
                {range}m
              </span>
            </div>
            <Slider
              disabled={!isActive}
              value={[range]}
              min={50}
              max={500}
              step={25}
              onValueChange={(value) => setRange(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-cyan-400/70">Zoom</label>
              <span className="text-sm font-mono text-cyan-400">
                {zoomLevel.toFixed(1)}x
              </span>
            </div>
            <Slider
              disabled={!isActive}
              value={[zoomLevel]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoomLevel(value[0])}
              className="py-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isActive}
              className="border-cyan-800/20 hover:bg-cyan-900/20"
            >
              <Target className="mr-2 h-4 w-4" />
              Focus
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={!isActive}
              className="border-cyan-800/20 hover:bg-cyan-900/20"
            >
              <Compass className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="neo-blur p-4 rounded-lg">
        <h3 className="text-lg font-medium text-cyan mb-4">Target Information</h3>
        
        {nearestEntity ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-cyan-400/70">Type:</span>
              <Badge className={nearestEntity.type === 'hostile' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                {nearestEntity.type === 'hostile' ? 'Hostile' : 'Friendly'}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-cyan-400/70">Distance:</span>
              <span className="text-cyan-400 font-mono">{Math.round(nearestEntity.distance)}m</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-cyan-400/70">Heading:</span>
              <span className="text-cyan-400 font-mono">{Math.round(nearestEntity.heading)}°</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-cyan-400/70">Coordinates:</span>
              <span className="text-cyan-400 font-mono">
                {Math.round(nearestEntity.x)}, {Math.round(nearestEntity.y)}
              </span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 border-cyan-800/20 hover:bg-cyan-900/20"
            >
              Track Target
            </Button>
          </div>
        ) : (
          <div className="text-cyan-400/50 text-sm text-center py-4">
            {isActive ? "No targets detected" : "System inactive"}
          </div>
        )}
      </Card>
      
      <Card className="neo-blur p-4 rounded-lg">
        <h3 className="text-lg font-medium text-cyan mb-2">System Status</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-cyan-400/70">Signal Strength:</span>
            <span className="text-green-400">Excellent</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cyan-400/70">Memory Usage:</span>
            <span className="text-cyan-400">32%</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cyan-400/70">Error Rate:</span>
            <span className="text-cyan-400">0.02%</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-cyan-400/70">Last Update:</span>
            <span className="text-cyan-400 font-mono">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </Card>
    </>
  );
};
