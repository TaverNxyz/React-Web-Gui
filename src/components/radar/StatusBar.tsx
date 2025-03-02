
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Signal, WifiOff } from "lucide-react";

interface StatusBarProps {
  message: string;
  isActive: boolean;
  isConnected: boolean;
  entities: any[];
}

export const StatusBar: React.FC<StatusBarProps> = ({ message, isActive, isConnected, entities }) => {
  const hostileCount = entities.filter(e => e.type === 'hostile').length;
  const friendlyCount = entities.filter(e => e.type === 'friendly').length;
  
  return (
    <div className="w-full h-10 neo-blur rounded-md flex items-center px-4 justify-between text-xs text-cyan-400/70">
      <div className="flex items-center gap-2">
        {isConnected ? (
          <Signal size={14} className={isActive ? "text-green-400" : "text-red-400"} />
        ) : (
          <WifiOff size={14} className="text-red-400" />
        )}
        <span>{message}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-red-500/20 text-red-400 h-6 text-xs">
            Hostile: {hostileCount}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-green-500/20 text-green-400 h-6 text-xs">
            Friendly: {friendlyCount}
          </Badge>
        </div>
        <div className="text-xs opacity-70">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
