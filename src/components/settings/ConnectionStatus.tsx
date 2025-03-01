
import React from "react";
import { useInterop } from "@/contexts/InteropContext";
import { Badge } from "@/components/ui/badge";
import { Signal, SignalOff } from "lucide-react";

const ConnectionStatus: React.FC = () => {
  const { isConnected } = useInterop();

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isConnected ? "outline" : "destructive"}
        className={isConnected ? "bg-green-500/20 text-green-400" : ""}
      >
        {isConnected ? (
          <>
            <Signal className="w-3 h-3 mr-1" />
            Connected
          </>
        ) : (
          <>
            <SignalOff className="w-3 h-3 mr-1" />
            Disconnected
          </>
        )}
      </Badge>
    </div>
  );
};

export default ConnectionStatus;
